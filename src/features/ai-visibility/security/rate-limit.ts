import { createHash } from 'node:crypto'

const DAY_MS = 24 * 60 * 60 * 1000
const memoryCounters = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
  persistent: boolean
}

function sanityConfig() {
  return {
    projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN || '',
    apiVersion: process.env.SANITY_API_VERSION || 'v2026-08-01',
  }
}

function supabaseConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  }
}

function utcDayReset(now: number) {
  const date = new Date(now)
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
}

function counterId(scope: string, key: string, now: number) {
  const day = new Date(now).toISOString().slice(0, 10).replaceAll('-', '')
  const digest = createHash('sha256').update(key).digest('hex').slice(0, 32)
  return `api-rate-${scope}-${day}-${digest}`
}

function memoryLimit(id: string, limit: number, now: number): RateLimitResult {
  const current = memoryCounters.get(id)
  if (!current || current.resetAt <= now) {
    memoryCounters.set(id, { count: 1, resetAt: now + DAY_MS })
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0, persistent: false }
  }
  current.count += 1
  const allowed = current.count <= limit
  return {
    allowed,
    remaining: Math.max(0, limit - current.count),
    retryAfterSeconds: allowed ? 0 : Math.ceil((current.resetAt - now) / 1000),
    persistent: false,
  }
}

async function sanityCounter(id: string, scope: string, limit: number, now: number) {
  const config = sanityConfig()
  if (!config.projectId || !config.dataset || !config.token) return null
  const resetAt = new Date(now + DAY_MS).toISOString()
  const url = `https://${config.projectId}.api.sanity.io/${config.apiVersion}/data/mutate/${config.dataset}?returnDocuments=true&visibility=sync&tag=ai-visibility-rate-limit`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(5_000),
    body: JSON.stringify({
      mutations: [
        {
          createIfNotExists: {
            _id: id,
            _type: 'apiRateLimit',
            scope,
            count: 0,
            resetAt,
          },
        },
        {
          patch: {
            id,
            inc: { count: 1 },
            set: { lastSeenAt: new Date(now).toISOString() },
          },
        },
      ],
    }),
  })
  if (!response.ok) return null
  const payload = (await response.json()) as Record<string, unknown>
  const results = Array.isArray(payload.results) ? payload.results : []
  const patched = [...results].reverse().find((entry) => {
    if (!entry || typeof entry !== 'object') return false
    const row = entry as Record<string, unknown>
    return row.documentId === id || row.id === id
  }) as Record<string, unknown> | undefined
  const document =
    patched?.document && typeof patched.document === 'object'
      ? (patched.document as Record<string, unknown>)
      : null
  let count = typeof document?.count === 'number' ? document.count : null
  if (count === null) {
    const queryUrl = new URL(
      `https://${config.projectId}.api.sanity.io/${config.apiVersion}/data/query/${config.dataset}`,
    )
    queryUrl.searchParams.set('query', '*[_id == $id][0].count')
    queryUrl.searchParams.set('$id', JSON.stringify(id))
    queryUrl.searchParams.set('tag', 'ai-visibility-rate-limit-read')
    const queryResponse = await fetch(queryUrl, {
      headers: { Authorization: `Bearer ${config.token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    })
    if (queryResponse.ok) {
      const queryPayload = (await queryResponse.json()) as Record<string, unknown>
      count = typeof queryPayload.result === 'number' ? queryPayload.result : null
    }
  }
  if (count === null) return null
  const allowed = count <= limit
  return {
    allowed,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds: allowed ? 0 : Math.ceil(DAY_MS / 1000),
    persistent: true,
  } satisfies RateLimitResult
}

async function supabaseCounter(id: string, scope: string, limit: number, now: number) {
  const config = supabaseConfig()
  if (!config.url || !config.serviceKey) return null

  const endpoint = new URL('/rest/v1/visitor_sessions', config.url)
  const resetAt = utcDayReset(now)
  const headers = {
    apikey: config.serviceKey,
    Authorization: `Bearer ${config.serviceKey}`,
    'Content-Type': 'application/json',
  }

  if (scope === 'ai-scan-global') {
    const cleanupUrl = new URL(endpoint)
    cleanupUrl.searchParams.set('page_path', 'like./api-rate/%')
    cleanupUrl.searchParams.set('last_seen_at', `lt.${new Date(now).toISOString()}`)
    await fetch(cleanupUrl, {
      method: 'DELETE',
      headers,
      signal: AbortSignal.timeout(5_000),
    }).catch(() => undefined)
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const readUrl = new URL(endpoint)
    readUrl.searchParams.set('session_id', `eq.${id}`)
    readUrl.searchParams.set('select', 'session_id,ip_hash')
    readUrl.searchParams.set('limit', '1')
    const readResponse = await fetch(readUrl, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    })
    if (!readResponse.ok) return null
    const rows = (await readResponse.json()) as Array<Record<string, unknown>>
    const current = Number.parseInt(String(rows[0]?.ip_hash || '0'), 10)

    if (!rows.length) {
      const createResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=representation' },
        signal: AbortSignal.timeout(5_000),
        body: JSON.stringify({
          session_id: id,
          ip_hash: '1',
          user_agent: 'api-rate-limit',
          page_path: `/api-rate/${scope}`,
          last_seen_at: new Date(resetAt).toISOString(),
        }),
      })
      if (createResponse.ok) {
        return {
          allowed: true,
          remaining: Math.max(0, limit - 1),
          retryAfterSeconds: 0,
          persistent: true,
        } satisfies RateLimitResult
      }
      if (createResponse.status === 409) continue
      return null
    }

    if (!Number.isFinite(current) || current >= limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000)),
        persistent: true,
      } satisfies RateLimitResult
    }

    const next = current + 1
    const updateUrl = new URL(endpoint)
    updateUrl.searchParams.set('session_id', `eq.${id}`)
    updateUrl.searchParams.set('ip_hash', `eq.${current}`)
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=representation' },
      signal: AbortSignal.timeout(5_000),
      body: JSON.stringify({
        ip_hash: String(next),
        last_seen_at: new Date(resetAt).toISOString(),
      }),
    })
    if (!updateResponse.ok) return null
    const updated = (await updateResponse.json()) as unknown[]
    if (!updated.length) continue
    return {
      allowed: next <= limit,
      remaining: Math.max(0, limit - next),
      retryAfterSeconds: next <= limit ? 0 : Math.max(1, Math.ceil((resetAt - now) / 1000)),
      persistent: true,
    } satisfies RateLimitResult
  }

  return null
}

export async function checkRateLimit(input: {
  scope: string
  key: string
  limit: number
  strict?: boolean
}): Promise<RateLimitResult> {
  const now = Date.now()
  const id = counterId(input.scope, input.key, now)
  try {
    const supabase = await supabaseCounter(id, input.scope, input.limit, now)
    if (supabase) return supabase
    const persistent = await sanityCounter(id, input.scope, input.limit, now)
    if (persistent) return persistent
  } catch {
    // Costly provider routes can fail closed; free preflight routes use the local fallback.
  }
  if (input.strict) {
    return { allowed: false, remaining: 0, retryAfterSeconds: 60, persistent: false }
  }
  return memoryLimit(id, input.limit, now)
}

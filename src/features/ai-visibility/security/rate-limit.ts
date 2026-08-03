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

export async function checkRateLimit(input: {
  scope: string
  key: string
  limit: number
  strict?: boolean
}): Promise<RateLimitResult> {
  const now = Date.now()
  const id = counterId(input.scope, input.key, now)
  try {
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

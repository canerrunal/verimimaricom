import { afterEach, describe, expect, it, vi } from 'vitest'
import { checkRateLimit } from './rate-limit'

function configureSupabase() {
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project.supabase.co')
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'service-role-test-key')
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('persistent rate limit', () => {
  it('creates the first daily Supabase counter row', async () => {
    configureSupabase()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response('[]', { status: 200 }))
      .mockResolvedValueOnce(new Response('[{"session_id":"counter"}]', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await checkRateLimit({ scope: 'scan', key: 'visitor-a', limit: 2, strict: true })

    expect(result).toMatchObject({ allowed: true, remaining: 1, persistent: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('increments an existing counter with a compare-and-set filter', async () => {
    configureSupabase()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('[{"session_id":"counter","ip_hash":"1"}]', { status: 200 }),
      )
      .mockResolvedValueOnce(new Response('[{"session_id":"counter"}]', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await checkRateLimit({ scope: 'scan', key: 'visitor-b', limit: 2, strict: true })
    const updateUrl = String(fetchMock.mock.calls[1][0])

    expect(result).toMatchObject({ allowed: true, remaining: 0, persistent: true })
    expect(updateUrl).toContain('ip_hash=eq.1')
  })

  it('blocks without another write when the daily cap is reached', async () => {
    configureSupabase()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('[{"session_id":"counter","ip_hash":"2"}]', { status: 200 }),
      )
    vi.stubGlobal('fetch', fetchMock)

    const result = await checkRateLimit({ scope: 'scan', key: 'visitor-c', limit: 2, strict: true })

    expect(result).toMatchObject({ allowed: false, remaining: 0, persistent: true })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

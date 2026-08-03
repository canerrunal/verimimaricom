import { describe, expect, it } from 'vitest'
import { normalizeDomain, parsePreflightInput } from './scan'

describe('AI visibility input validation', () => {
  it('normalizes a bare domain', () => {
    expect(normalizeDomain('Example.com').data).toBe('https://example.com/')
  })

  it.each([
    'localhost',
    'file:///etc/passwd',
    'https://user:pass@example.com',
    'https://example.com:8080',
  ])('rejects unsupported target %s', (value) => expect(normalizeDomain(value).success).toBe(false))

  it('requires scan authorization consent', () => {
    const result = parsePreflightInput({ domain: 'example.com', consent: false })
    expect(result.success).toBe(false)
    expect(result.error).toContain('yetkiniz')
  })
})

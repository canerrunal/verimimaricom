import { afterEach, describe, expect, it, vi } from 'vitest'
import { perplexityAdapter, readPerplexityResponse } from './perplexity'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('Perplexity response parser', () => {
  it('extracts Sonar content, result titles and citation URLs', () => {
    const result = readPerplexityResponse({
      choices: [{ message: { content: 'Sonar yanıtı' } }],
      search_results: [{ url: 'https://example.com/result', title: 'Result' }],
      citations: ['https://example.com/citation'],
    })

    expect(result.text).toBe('Sonar yanıtı')
    expect(result.sources).toEqual([
      { url: 'https://example.com/result', title: 'Result' },
      { url: 'https://example.com/citation' },
    ])
  })

  it('does not expose provider key fragments in authentication errors', async () => {
    vi.stubEnv('PERPLEXITY_API_KEY', 'pplx-secret-value')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: 'Bad key pplx-secret-value' } }), {
          status: 401,
        }),
      ),
    )

    await expect(
      perplexityAdapter.run({
        scanId: 'scan',
        promptId: 'prompt',
        prompt: 'Örnek soru',
        locale: 'tr',
        maxOutputTokens: 100,
        repetition: 1,
        metadata: { profile: '{}', domain: 'https://example.com' },
      }),
    ).rejects.toThrow('Perplexity bağlantı anahtarı geçersiz veya yetkisiz.')
  })
})

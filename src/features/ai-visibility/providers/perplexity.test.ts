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

  it('uses Sonar through Vercel AI Gateway when OIDC is available', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: 'Veri Mimarı değerlendirilebilir.' } }],
          citations: ['https://verimimari.com/'],
        }),
        { status: 200 },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    const result = await perplexityAdapter.run({
      scanId: 'scan',
      promptId: 'prompt',
      prompt: 'Örnek soru',
      locale: 'tr',
      country: 'Türkiye',
      maxOutputTokens: 100,
      repetition: 1,
      gatewayToken: 'oidc-test-token',
      metadata: {
        profile: JSON.stringify({
          brandName: 'Veri Mimarı',
          aliases: [],
          sector: 'veri analitiği',
          products: [],
          country: 'Türkiye',
          language: 'tr',
          targetAudience: '',
          competitors: [],
          exclusions: [],
        }),
        domain: 'https://verimimari.com',
      },
    })
    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body))

    expect(String(fetchMock.mock.calls[0][0])).toBe(
      'https://ai-gateway.vercel.sh/v1/chat/completions',
    )
    expect(requestBody.model).toBe('perplexity/sonar')
    expect(requestBody.web_search_options).toBeUndefined()
    expect(result.payload.citations).toHaveLength(1)
  })
})

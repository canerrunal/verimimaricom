import { afterEach, describe, expect, it, vi } from 'vitest'
import { openAIAdapter, readOpenAIResponse } from './openai'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('OpenAI response parser', () => {
  it('extracts answer text and clickable web sources', () => {
    const result = readOpenAIResponse({
      output: [
        {
          type: 'web_search_call',
          action: {
            sources: [{ url: 'https://example.com/search', title: 'Search source' }],
          },
        },
        {
          type: 'message',
          content: [
            {
              type: 'output_text',
              text: 'Örnek yanıt',
              annotations: [
                { type: 'url_citation', url: 'https://example.com/citation', title: 'Citation' },
              ],
            },
          ],
        },
      ],
    })

    expect(result.text).toBe('Örnek yanıt')
    expect(result.sources).toEqual([
      { url: 'https://example.com/search', title: 'Search source' },
      { url: 'https://example.com/citation', title: 'Citation' },
    ])
  })

  it('does not expose provider key fragments in authentication errors', async () => {
    vi.stubEnv('OPENAI_API_KEY', 'sk-secret-value')
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify({ error: { message: 'Incorrect API key: sk-secret-value' } }),
            { status: 401 },
          ),
        ),
    )

    await expect(
      openAIAdapter.run({
        scanId: 'scan',
        promptId: 'prompt',
        prompt: 'Örnek soru',
        locale: 'tr',
        maxOutputTokens: 100,
        repetition: 1,
        metadata: { profile: '{}', domain: 'https://example.com' },
      }),
    ).rejects.toThrow('OpenAI bağlantı anahtarı geçersiz veya yetkisiz.')
  })

  it('prefers Vercel AI Gateway OIDC and the creator-prefixed model', async () => {
    vi.stubEnv('VERCEL_OIDC_TOKEN', 'oidc-test-token')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          output: [
            {
              type: 'message',
              content: [{ type: 'output_text', text: 'Veri Mimarı değerlendirilebilir.' }],
            },
          ],
        }),
        { status: 200 },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    const result = await openAIAdapter.run({
      scanId: 'scan',
      promptId: 'prompt',
      prompt: 'Örnek soru',
      locale: 'tr',
      country: 'Türkiye',
      maxOutputTokens: 100,
      repetition: 1,
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

    expect(String(fetchMock.mock.calls[0][0])).toBe('https://ai-gateway.vercel.sh/v1/responses')
    expect(requestBody.model).toBe('openai/gpt-5.6-luna')
    expect(result.model).toBe('openai/gpt-5.6-luna')
  })
})

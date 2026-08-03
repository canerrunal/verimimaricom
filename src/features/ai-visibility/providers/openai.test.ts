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
})

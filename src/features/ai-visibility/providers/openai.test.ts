import { describe, expect, it } from 'vitest'
import { readOpenAIResponse } from './openai'

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
})

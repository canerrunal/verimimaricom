import { describe, expect, it } from 'vitest'
import { readPerplexityResponse } from './perplexity'

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
})

import { describe, expect, it } from 'vitest'

import { rankRagContext } from './rank'

describe('rankRagContext external benchmark handling', () => {
  it('does not inject unrelated external measurements into every answer', () => {
    const context = rankRagContext([
      { kind: 'external-ai-benchmark', title: 'unrelated', _score: 0 },
      { kind: 'external-ai-benchmark', title: 'RTX 4060', _score: 2 },
    ])

    expect(context.externalAiBenchmarkHits).toHaveLength(1)
    expect(context.externalAiBenchmarkHits[0].title).toBe('RTX 4060')
  })
})

import { describe, expect, it } from 'vitest'
import type { ProviderObservation } from '../types'
import { calculateVisibility, rankDiscount, wilsonInterval } from './engine'

const observation = (patch: Partial<ProviderObservation>): ProviderObservation => ({
  provider: 'openai',
  model: 'test-model',
  status: 'success',
  promptId: 'prompt-1',
  prompt: 'Test prompt',
  responseText: 'Test response',
  mentioned: false,
  position: null,
  citedTarget: false,
  citations: [],
  competitorsMentioned: [],
  latencyMs: 100,
  timestamp: '2026-08-03T00:00:00.000Z',
  ...patch,
})

describe('AI visibility scoring', () => {
  it('uses discounted rank values', () => {
    expect(rankDiscount(1)).toBe(1)
    expect(rankDiscount(2)).toBeCloseTo(0.6309, 3)
    expect(rankDiscount(null)).toBe(0)
  })

  it('does not present zero mentions as a zero-width confidence interval', () => {
    const interval = wilsonInterval(0, 40)
    expect(interval.low).toBe(0)
    expect(interval.high).toBeGreaterThan(0)
  })

  it('separates failed provider calls from valid-run coverage', () => {
    const result = calculateVisibility([
      observation({ mentioned: true, position: 1, citedTarget: true }),
      observation({ provider: 'gemini', promptId: 'prompt-1' }),
      observation({ provider: 'anthropic', status: 'failed' }),
    ])
    expect(result.validRuns).toBe(2)
    expect(result.mentionCount).toBe(1)
    expect(result.coverage).toBe(50)
  })
})

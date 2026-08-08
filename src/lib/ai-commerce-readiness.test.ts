import { describe, expect, it } from 'vitest'
import {
  aiCommerceReadinessChecks,
  calculateAiCommerceReadiness,
} from '@/lib/ai-commerce-readiness'

describe('AI commerce readiness', () => {
  it('uses a transparent 100-point model', () => {
    expect(aiCommerceReadinessChecks.reduce((total, check) => total + check.weight, 0)).toBe(100)
    expect(
      calculateAiCommerceReadiness(aiCommerceReadinessChecks.map((check) => check.id)),
    ).toMatchObject({
      score: 100,
      status: 'strong',
      criticalGaps: [],
      priorities: [],
    })
  })

  it('keeps a high score blocked when a critical commerce gap remains', () => {
    const selected = aiCommerceReadinessChecks
      .filter((check) => check.id !== 'price-stock-checkout-sync')
      .map((check) => check.id)
    const result = calculateAiCommerceReadiness(selected)

    expect(result.score).toBe(91)
    expect(result.status).toBe('blocked')
    expect(result.criticalGaps.map((check) => check.id)).toContain('price-stock-checkout-sync')
    expect(result.priorities[0].id).toBe('price-stock-checkout-sync')
  })

  it('normalizes category scores and ignores unknown ids', () => {
    const result = calculateAiCommerceReadiness(['indexable-pages', 'unknown-check'])
    const discoverability = result.categories.find(
      (category) => category.category === 'discoverability',
    )

    expect(result.score).toBe(8)
    expect(result.completedCount).toBe(1)
    expect(discoverability).toMatchObject({ earned: 8, possible: 20, score: 40 })
  })

  it('sorts missing critical items before weighted improvements', () => {
    const result = calculateAiCommerceReadiness([])

    expect(result.status).toBe('blocked')
    expect(result.priorities.slice(0, 5).every((check) => check.critical)).toBe(true)
    expect(result.criticalGaps).toHaveLength(5)
  })
})

import { describe, expect, it } from 'vitest'
import { comparisonExampleMetrics, metricComparisons } from './comparisons'

describe('metric comparison content', () => {
  it('uses unique slugs and complete review metadata', () => {
    const slugs = metricComparisons.map((item) => item.slug)
    expect(metricComparisons.length).toBeGreaterThanOrEqual(8)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const item of metricComparisons) {
      expect(item.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(item.reviewDueAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(item.sources.length).toBeGreaterThanOrEqual(2)
      expect(item.example.presentation.inputs.length).toBeGreaterThanOrEqual(3)
      expect(item.example.presentation.results.length).toBeGreaterThanOrEqual(2)
      expect(item.example.presentation.results.some((result) => result.highlight)).toBe(true)
    }
  })

  it('calculates the example from one consistent data set', () => {
    const metrics = comparisonExampleMetrics(metricComparisons[0])
    expect(metrics.totalSpend).toBe(480_000)
    expect(metrics.metaRoas).toBeCloseTo(5.67, 2)
    expect(metrics.googleRoas).toBeCloseTo(5.56, 2)
    expect(metrics.mer).toBe(5)
    expect(metrics.attributionOverlap).toBe(300_000)
  })

  it('keeps all internal references on valid content namespaces', () => {
    for (const item of metricComparisons) {
      expect(item.relatedTool.href).toMatch(/^\/araclar\//)
      expect(item.relatedGuides.every((link) => link.href.startsWith('/rehberler/'))).toBe(true)
      expect(item.relatedTerms.every((link) => link.href.startsWith('/sozluk/'))).toBe(true)
    }
  })
})

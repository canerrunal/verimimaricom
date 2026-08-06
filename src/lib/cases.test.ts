import { describe, expect, it } from 'vitest'
import { DEMO_CASE_DISCLOSURE, demoCases, scenarioMetrics } from './cases'

describe('demo vaka veri modeli', () => {
  it('benzersiz ve dolu slug kullanır', () => {
    const slugs = demoCases.map((item) => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.every(Boolean)).toBe(true)
  })

  it('her vakayı açıkça simülasyon olarak etiketler', () => {
    for (const item of demoCases) {
      expect(item.disclosure).toBe(DEMO_CASE_DISCLOSURE)
      expect(item.dataSources.length).toBeGreaterThanOrEqual(3)
      expect(item.assumptions.length).toBeGreaterThanOrEqual(3)
      expect(item.limitations.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('ROAS ve katkı hesabını aynı veri zincirinden üretir', () => {
    for (const item of demoCases) {
      for (const scenario of [item.baseline, item.revised]) {
        const result = scenarioMetrics(scenario)
        expect(Number.isFinite(result.roas)).toBe(true)
        expect(result.roas).toBeGreaterThan(0)
        expect(result.preAdContribution).toBeCloseTo(scenario.netRevenue - result.preAdCosts, 2)
        expect(result.postAdContribution).toBeCloseTo(
          result.preAdContribution - scenario.adSpend,
          2,
        )
      }
    }
  })

  it('her vaka kendine özgü senaryo ve öne çıkan metrik taşır', () => {
    for (const item of demoCases) {
      expect(item.scenarioQuestion.length).toBeGreaterThan(20)
      expect(item.scenarioNarrative.length).toBeGreaterThan(80)
      expect(item.answerTitle).toBeTruthy()
      expect(item.answerDetail).toBeTruthy()
      expect(item.featuredMetric.label).toBeTruthy()
      expect(item.featuredMetric.value).toBeTruthy()
      expect(item.featuredMetric.detail).toBeTruthy()
    }
  })

  it('örnek vakanın katkı sonucu iyileşirken ROAS sabit kalır', () => {
    const item = demoCases[0]
    const before = scenarioMetrics(item.baseline)
    const after = scenarioMetrics(item.revised)
    expect(after.roas).toBeCloseTo(before.roas, 4)
    expect(after.postAdContribution).toBeGreaterThan(before.postAdContribution)
  })
})

import { describe, expect, it } from 'vitest'
import { CASE_ANALYSIS_DISCLOSURE, caseAnalyses, scenarioMetrics } from './cases'

describe('proje analizi veri modeli', () => {
  it('benzersiz ve dolu slug kullanır', () => {
    const slugs = caseAnalyses.map((item) => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.every(Boolean)).toBe(true)
  })

  it('her analizi gerçek ve anonimleştirilmiş proje verisi olarak etiketler', () => {
    for (const item of caseAnalyses) {
      expect(item.disclosure).toBe(CASE_ANALYSIS_DISCLOSURE)
      expect(item.dataSources.length).toBeGreaterThanOrEqual(3)
      expect(item.assumptions.length).toBeGreaterThanOrEqual(3)
      expect(item.limitations.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('ROAS ve katkı hesabını aynı veri zincirinden üretir', () => {
    for (const item of caseAnalyses) {
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

  it('her analiz kendine özgü senaryo ve öne çıkan metrik taşır', () => {
    for (const item of caseAnalyses) {
      expect(item.scenarioQuestion.length).toBeGreaterThan(20)
      expect(item.scenarioNarrative.length).toBeGreaterThan(80)
      expect(item.answerTitle).toBeTruthy()
      expect(item.answerDetail).toBeTruthy()
      expect(item.featuredMetric.label).toBeTruthy()
      expect(item.featuredMetric.value).toBeTruthy()
      expect(item.featuredMetric.detail).toBeTruthy()
    }
  })

  it('ilk analizin katkı sonucu iyileşirken ROAS sabit kalır', () => {
    const item = caseAnalyses[0]
    const before = scenarioMetrics(item.baseline)
    const after = scenarioMetrics(item.revised)
    expect(after.roas).toBeCloseTo(before.roas, 4)
    expect(after.postAdContribution).toBeGreaterThan(before.postAdContribution)
  })
})

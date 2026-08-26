import { describe, expect, it } from 'vitest'
import {
  formatTurkishDate,
  formatTurkishDateTime,
  getAiLabCatalog,
  getAiLabChangeReport,
} from './ai-lab-catalog'

describe('AI Local Lab catalog helpers', () => {
  it('exposes the synchronized catalog and its change report together', () => {
    const catalog = getAiLabCatalog()
    const changeReport = getAiLabChangeReport()

    expect(catalog.summary.benchmarkCount).toBe(changeReport.benchmarkCountAfter)
    expect(catalog.metadata.datasetVersion).toBe(changeReport.datasetVersion)
    expect(changeReport.addedBenchmarkIds).toHaveLength(catalog.summary.benchmarkCount)
  })

  it('formats source dates in Turkish', () => {
    expect(formatTurkishDate('2026-07-16')).toContain('Temmuz')
    expect(formatTurkishDateTime('2026-08-25T13:53:03.100Z')).toContain('2026')
  })
})

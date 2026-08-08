import { describe, expect, it } from 'vitest'
import { benchmarkReports } from '@/lib/reports'

describe('benchmark raporları', () => {
  it('gerçek pazar ortalaması iddiası taşımadığını açıkça belirtir', () => {
    for (const report of benchmarkReports) {
      expect(report.status.toLowerCase()).toContain('simülasyon')
      expect(report.limitations.length).toBeGreaterThanOrEqual(3)
      expect(report.methodology.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('her rapor karar ve sonraki adımlara bağlanır', () => {
    for (const report of benchmarkReports) {
      expect(report.rows.length).toBeGreaterThanOrEqual(5)
      expect(report.decisions.length).toBeGreaterThanOrEqual(3)
      expect(report.relatedTools.length).toBeGreaterThanOrEqual(2)
      expect(report.relatedGuides.length).toBeGreaterThanOrEqual(2)
    }
  })
})

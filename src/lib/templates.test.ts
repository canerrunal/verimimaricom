import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resourceTemplates } from '@/lib/templates'

describe('indirilebilir şablon kütüphanesi', () => {
  it('benzersiz slug ve gerçek CSV dosyaları sunar', () => {
    expect(new Set(resourceTemplates.map((item) => item.slug)).size).toBe(resourceTemplates.length)
    for (const item of resourceTemplates) {
      expect(item.downloadHref).toMatch(/^\/sablonlar\/[a-z0-9-]+\.csv$/)
      expect(fs.existsSync(path.join(process.cwd(), 'public', item.downloadHref))).toBe(true)
    }
  })

  it('her şablon yöntem ve kalite kontrolü içerir', () => {
    for (const item of resourceTemplates) {
      expect(item.steps.length).toBeGreaterThanOrEqual(4)
      expect(item.checks.length).toBeGreaterThanOrEqual(5)
      expect(item.metrics.length).toBeGreaterThanOrEqual(3)
      expect(item.relatedGuide.href).toMatch(/^\/rehberler\//)
      expect(item.relatedTool.href).toMatch(/^\/araclar\//)
    }
  })
})

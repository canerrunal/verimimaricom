import { describe, expect, it } from 'vitest'
import { analyzeReturnSignals } from './return-signal'

const sample = `sku,reason,text,rating,country
AYK-001,beden,42 numara dar geldi,2,DE
AYK-001,kalite,Dikiş sökük ve malzeme hasarlı,1,DE
KUP-050,teslimat,Kargo gecikti ve paket hasarlı,2,FR
TSH-204,,Renk görselden farklı,3,NL
TSH-204,,Çok memnun kaldım hızlı geldi,5,NL`

describe('iade ve yorum sinyali analizi', () => {
  it('sınıfları ve öncelikleri çıkarır', () => {
    const result = analyzeReturnSignals(sample)
    expect(result.rowCount).toBe(5)
    expect(result.issueCount).toBe(4)
    expect(result.positiveCount).toBe(1)
    expect(result.priorities[0].label).toBe('Ürün uyumu / beden')
    expect(result.priorities).toHaveLength(4)
  })

  it('eksik alanları güvenli varsayımla işler', () => {
    const result = analyzeReturnSignals('text\nBilinmeyen bir yorum')
    expect(result.unknownCount).toBe(1)
    expect(result.rows[0].sku).toBe('SKU belirtilmemiş')
    expect(result.actionabilityScore).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import {
  calculateProfit,
  extractMarketThresholds,
  extractEntityAnalysisRequest,
  extractPriceBounds,
  extractProductQuery,
  extractProfitInputs,
  isComparisonQuestion,
  isExplanationQuestion,
  isEntityAnalysisQuestion,
  looksLikeProfitQuestion,
  looksLikeMarketQuestion,
  missingProfitInputs,
} from './veri-assistant'

describe('Veri Asistanı karar araçları', () => {
  it('konuşmadaki son maliyet güncellemesini kullanır', () => {
    const inputs = extractProfitInputs([
      {
        role: 'user',
        content: '750 TL ye satarsam kaç kazanırım? Maliyetim 250, komisyon %15, kargo 80',
      },
      { role: 'assistant', content: 'Hesapladım.' },
      { role: 'user', content: 'Kargoyu 95 yap, iade maliyeti 20 olsun.' },
    ])

    expect(inputs).toEqual({ sale: 750, cost: 250, commission: 15, shipping: 95, returns: 20 })
    expect(missingProfitInputs(inputs)).toEqual([])
    expect(looksLikeProfitQuestion('Kargoyu 95 yap')).toBe(true)
  })

  it('değer önce yazılan doğal kârlılık cümlesini anlar', () => {
    expect(
      extractProfitInputs([
        {
          role: 'user',
          content:
            '1000 TL satış, 300 TL maliyet, yüzde 15 komisyon, 100 TL kargo, 40 TL iade ve 100 TL reklamla kârım ne?',
        },
      ]),
    ).toEqual({ sale: 1000, cost: 300, commission: 15, shipping: 100, returns: 40, adSpend: 100 })
  })

  it('kârı ve başa baş ROAS değerini deterministik hesaplar', () => {
    const result = calculateProfit({
      sale: 1000,
      cost: 300,
      commission: 15,
      shipping: 100,
      returns: 40,
      adSpend: 100,
    })

    expect(result?.netProfit).toBe(310)
    expect(result?.netMargin).toBe(31)
    expect(result?.breakEvenRoas).toBeCloseTo(2.439, 3)
  })

  it('ürün fiyat aralığını Türkçe sorudan çıkarır', () => {
    expect(extractPriceBounds('500 TL altında fırsat ürünlerini göster')).toEqual({
      max: 500,
      min: undefined,
    })
    expect(extractPriceBounds('500 TL altında fırsat skoru 10 üstü ürünleri bul')).toEqual({
      max: 500,
      min: undefined,
    })
  })

  it('ürün aramasından filtre ifadelerini temizler', () => {
    expect(extractProductQuery('500 TL altında fırsat skoru 10 üstü ürünleri bul')).toBe('')
    expect(extractProductQuery('çelik kolye 500 TL altında bul')).toBe('çelik kolye')
    expect(
      extractProductQuery('500 TL altı, en fazla 3 satıcılı, ayda 100 üstü satan ürün bul'),
    ).toBe('')
    expect(extractProductQuery('çamaşır kurutma makinesi', false, true)).toBe(
      'çamaşır kurutma makinesi',
    )
    expect(extractProductQuery('çamaşır kurutma makinesinde fiyatı düşenler')).toBe(
      'çamaşır kurutma makinesi',
    )
    expect(looksLikeMarketQuestion('çamaşır kurutma makinesinde fiyatı düşenler')).toBe(true)
  })

  it('gelişmiş pazar eşiklerini doğal dilden çıkarır', () => {
    expect(
      extractMarketThresholds(
        '4,5 puan üstü, fırsat skoru 20 üzerinde ve en az 100+ satan ürünleri bul',
      ),
    ).toEqual({
      minRating: 4.5,
      minOpportunityScore: 20,
      minObservedSales: 100,
      minMonthlyRunRate: undefined,
      maxObservedSellerCount: undefined,
      minObservedSellerCount: undefined,
    })
    expect(
      extractMarketThresholds('500 TL altı, en fazla 3 satıcılı, ayda 100 üstü satan ürün bul'),
    ).toMatchObject({ minMonthlyRunRate: 100, maxObservedSellerCount: 3 })
  })

  it('kategori, marka ve mağaza analiz niyetlerini çıkarır', () => {
    expect(extractEntityAnalysisRequest('Kozmetik kategorisini analiz et')).toEqual({
      type: 'category',
      query: 'Kozmetik',
    })
    expect(extractEntityAnalysisRequest('Nike markasını incele')).toEqual({
      type: 'brand',
      query: 'Nike',
    })
    expect(extractEntityAnalysisRequest('Embeauty markasını pazar bağlamıyla analiz et')).toEqual({
      type: 'brand',
      query: 'Embeauty',
    })
    expect(extractEntityAnalysisRequest('Örnek mağazasını özetle')).toEqual({
      type: 'store',
      query: 'Örnek',
    })
    expect(isEntityAnalysisQuestion('Kozmetik kategorisini analiz et')).toBe(true)
  })

  it('açıklama ve karşılaştırma niyetlerini ayırır', () => {
    expect(isExplanationQuestion('Bu rakam nereden çıktı?')).toBe(true)
    expect(isComparisonQuestion('Kozmetik ile elektroniği karşılaştır')).toBe(true)
  })
})

import { describe, expect, it } from 'vitest'
import {
  normalizeMarketProduct,
  selectMarketProducts,
  summarizeMarketProducts,
  type MarketProduct,
} from './trendyol-market'

const base = {
  profileSlug: 'cocuk',
  productId: '1',
  merchantId: '10',
  offerKey: '1:10',
  title: 'Manyetik Blok',
  brand: 'Örnek',
  category: 'Oyuncak',
  url: 'https://www.trendyol.com/ornek-p-1',
  sellerName: 'Örnek Satıcı',
  sellerScore: 90,
  price: 100,
  originalPrice: 120,
  discountPercent: 16.7,
  priceDeltaPercent: -10,
  currency: 'TRY',
  rankScope: 'cocuk:oyuncak',
  rankScopeLabel: 'Oyuncak',
  rankPosition: 2,
  compositePosition: 2,
  rankDelta: 5,
  trendScore: 90,
  opportunityScore: 80,
  stockStatus: 'InStock',
  stockSignal: null,
  salesSignal: 'Son 3 günde 1,5B+ ürün satıldı!',
  salesSignalDays: 3,
  salesSignalMin: 1500,
  salesSignalDailyMin: 500,
  rating: 4.7,
  ratingCount: 100,
  reviewCount: 80,
  reviewDelta: 4,
  questionCount: 10,
  campaigns: ['Kargo Bedava'],
  deliverySummary: 'Yarın kargoda',
  capturedAt: '2026-08-20T09:00:00+03:00',
  observedDate: '2026-08-20',
  detailStatus: 'refreshed',
} satisfies MarketProduct

describe('Trendyol market contract', () => {
  it('normalizes the public sales signal without claiming exact sales', () => {
    const product = normalizeMarketProduct(
      {
        product_id: '1',
        title: 'Manyetik Blok',
        url: 'https://www.trendyol.com/ornek-p-1',
        sales_signal: 'Son 3 günde 1,5B+ ürün satıldı!',
        sales_signal_min: 1500,
      },
      'cocuk',
    )
    expect(product?.salesSignalDays).toBe(3)
    expect(product?.salesSignalDailyMin).toBe(500)
  })

  it('builds transparent views from observed signals', () => {
    const stable = {
      ...base,
      productId: '2',
      offerKey: '2:10',
      title: 'Başka ürün',
      rankDelta: 0,
      priceDeltaPercent: 0,
      reviewDelta: 0,
    }
    expect(selectMarketProducts([stable, base], 'yukselenler')).toEqual([base])
    expect(selectMarketProducts([stable, base], 'fiyat-dususleri')).toEqual([base])
    expect(selectMarketProducts([stable, base], 'cok-satanlar', 'manyetik')).toEqual([base])
  })

  it('summarizes only observed values', () => {
    expect(summarizeMarketProducts([base, { ...base, productId: '2', price: 200 }])).toEqual({
      medianPrice: 200,
      risingCount: 2,
      priceDropCount: 2,
      stockRiskCount: 0,
    })
  })
})

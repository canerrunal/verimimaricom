import { describe, expect, it } from 'vitest'
import type { MarketProduct } from './trendyol-market'
import {
  analyzeEntity,
  buildEntityBenchmark,
  buildProductInsights,
  findEntityProducts,
  getEntityPeerProducts,
  monthlyDemandRunRateMin,
} from './veri-assistant-analytics'

function product(overrides: Partial<MarketProduct> = {}): MarketProduct {
  return {
    metrics: {},
    profileSlug: 'kozmetik',
    productId: '1',
    merchantId: '10',
    offerKey: '1:10',
    title: 'Örnek Serum',
    brand: 'Örnek Marka',
    category: 'Yüz Bakımı',
    url: 'https://www.trendyol.com/ornek-p-1',
    sellerName: 'Örnek Mağaza',
    sellerScore: 9.2,
    price: 300,
    originalPrice: 350,
    discountPercent: 14,
    priceDeltaPercent: -5,
    currency: 'TRY',
    rankScope: 'kozmetik:genel',
    rankScopeLabel: 'Kozmetik',
    rankPosition: 1,
    compositePosition: 1,
    rankDelta: 2,
    trendScore: 80,
    opportunityScore: 75,
    stockStatus: 'InStock',
    stockSignal: '100+ stok',
    salesSignal: 'Son 3 günde 300+ ürün satıldı!',
    salesSignalDays: 3,
    salesSignalMin: 300,
    salesSignalDailyMin: 100,
    rating: 4.5,
    ratingCount: 120,
    reviewCount: 100,
    reviewDelta: 5,
    questionCount: 3,
    campaigns: [],
    deliverySummary: null,
    capturedAt: '2026-08-23T12:00:00+03:00',
    observedDate: '2026-08-23',
    detailStatus: 'ok',
    ...overrides,
  }
}

describe('Veri Asistanı pazar analiz motoru', () => {
  it('görünür satış alt sınırını 30 günlük hıza dönüştürür', () => {
    expect(monthlyDemandRunRateMin(product())).toBe(3000)
  })

  it('aynı ürünün gözlemlerini ve görülen satıcılarını birleştirir', () => {
    const insights = buildProductInsights([
      product(),
      product({ profileSlug: 'genel-cok-satanlar', merchantId: '20', sellerName: 'İkinci Mağaza' }),
    ])

    expect(insights).toHaveLength(1)
    expect(insights[0]).toMatchObject({
      observationCount: 2,
      profileCount: 2,
      observedSellerCount: 2,
    })
  })

  it('kategori özetini yalnız tekilleştirilmiş gözlem evreninden üretir', () => {
    const analysis = analyzeEntity('category', 'Kozmetik', [
      product(),
      product({ productId: '2', offerKey: '2:10', title: 'Örnek Krem', price: 500 }),
    ])

    expect(analysis.productCount).toBe(2)
    expect(analysis.medianPrice).toBe(400)
    expect(analysis.monthlyDemandRunRateMin).toBe(6000)
    expect(analysis.monthlyRevenueRunRateMin).toBe(2_400_000)
  })

  it('marka ve mağazayı Türkçe metinle eşleştirir', () => {
    const products = [product()]
    expect(findEntityProducts(products, 'brand', 'örnek marka')).toHaveLength(1)
    expect(findEntityProducts(products, 'store', 'örnek mağaza')).toHaveLength(1)
  })

  it('markayı bulunduğu alt kategori kümesiyle karşılaştırır', () => {
    const entityProducts = [product()]
    const peerProducts = [
      ...entityProducts,
      product({
        productId: '2',
        offerKey: '2:11',
        merchantId: '11',
        brand: 'Rakip Marka',
        sellerName: 'Rakip Mağaza',
        price: 500,
        salesSignalDailyMin: 200,
      }),
      product({
        productId: '3',
        offerKey: '3:12',
        merchantId: '12',
        category: 'Saç Bakımı',
        price: 150,
      }),
    ]
    const entity = analyzeEntity('brand', 'Örnek Marka', entityProducts)
    const scopedPeers = getEntityPeerProducts('brand', entityProducts, peerProducts)
    const benchmark = buildEntityBenchmark(entity, scopedPeers, 'Yüz Bakımı gözlem kümesi')

    expect(scopedPeers).toHaveLength(2)
    expect(benchmark).toMatchObject({
      peerProductCount: 2,
      entityProductSharePercent: 50,
      peerMedianPrice: 400,
      medianPriceDeltaPercent: -25,
      peerMonthlyDemandRunRateMin: 9000,
      demandRunRateSharePercent: 33.3,
    })
  })
})

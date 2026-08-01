import { describe, expect, it } from 'vitest'
import { analyzePortfolio, createProduct } from './analysis'

describe('e-ticaret strateji analiz motoru', () => {
  it('birim ve aylık kârlılığı açık formülle hesaplar', () => {
    const product = createProduct({
      id: 'test',
      name: 'Test ürün',
      listPrice: 1_000,
      discountRate: 10,
      productCost: 300,
      marketplaceCommissionRate: 15,
      paymentFeeRate: 2,
      shippingCost: 50,
      packagingCost: 10,
      adCostPerOrder: 100,
      returnRate: 5,
      returnLoss: 100,
      monthlySales: 100,
      conversionRate: 2,
      currentCpc: 2,
    })

    const result = analyzePortfolio([product], {
      monthlyFixedCosts: 10_000,
      targetNetMargin: 15,
    }).products[0]

    expect(result.netSalePrice).toBe(900)
    expect(result.commissionCost).toBe(135)
    expect(result.paymentFeeCost).toBe(18)
    expect(result.expectedReturnLoss).toBe(5)
    expect(result.preAdContribution).toBe(382)
    expect(result.unitProfit).toBe(282)
    expect(result.monthlyRevenue).toBe(90_000)
    expect(result.operatingProfit).toBe(18_200)
    expect(result.breakEvenRoas).toBeCloseTo(900 / 382)
  })

  it('sabit giderleri ürünlerin ciro payına göre dağıtır', () => {
    const first = createProduct({ id: 'a', listPrice: 1_000, discountRate: 0, monthlySales: 100 })
    const second = createProduct({ id: 'b', listPrice: 500, discountRate: 0, monthlySales: 100 })
    const result = analyzePortfolio([first, second], {
      monthlyFixedCosts: 30_000,
      targetNetMargin: 20,
    })

    expect(result.products[0].allocatedFixedCost).toBeCloseTo(20_000)
    expect(result.products[1].allocatedFixedCost).toBeCloseTo(10_000)
    expect(
      result.products[0].allocatedFixedCost + result.products[1].allocatedFixedCost,
    ).toBeCloseTo(30_000)
  })

  it('hedef CPA ile maksimum CPC ilişkisini dönüşüm oranından kurar', () => {
    const product = createProduct({
      id: 'cpc',
      discountRate: 0,
      monthlySales: 100,
      conversionRate: 2.5,
    })
    const result = analyzePortfolio([product], {
      monthlyFixedCosts: 0,
      targetNetMargin: 10,
    }).products[0]

    expect(result.maxCpc).toBeCloseTo(result.targetCpa * 0.025)
  })

  it('zarar eden ürünü acil müdahale olarak sınıflandırır', () => {
    const product = createProduct({
      id: 'loss',
      listPrice: 500,
      discountRate: 0,
      productCost: 450,
      marketplaceCommissionRate: 20,
      paymentFeeRate: 3,
      shippingCost: 80,
      packagingCost: 20,
      adCostPerOrder: 100,
      monthlySales: 10,
    })
    const result = analyzePortfolio([product], {
      monthlyFixedCosts: 5_000,
      targetNetMargin: 20,
    }).products[0]

    expect(result.unitProfit).toBeLessThan(0)
    expect(result.decision).toBe('Acil müdahale')
    expect(result.healthScore).toBeLessThan(40)
  })

  it('geçersiz ve negatif girdileri güvenli aralığa çeker', () => {
    const product = createProduct({
      id: 'safe',
      listPrice: -100,
      discountRate: 140,
      productCost: -20,
      returnRate: -5,
      monthlySales: -3,
    })
    const result = analyzePortfolio([product], {
      monthlyFixedCosts: -100,
      targetNetMargin: 120,
    })

    expect(result.totalRevenue).toBe(0)
    expect(result.profitBridge.fixedCosts).toBe(0)
    expect(result.products[0].listPrice).toBe(0)
    expect(result.products[0].discountRate).toBe(99)
  })
})

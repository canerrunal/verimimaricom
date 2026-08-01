import { describe, expect, it } from 'vitest'
import {
  calculateRetailMediaEconomics,
  type RetailMediaEconomicsInput,
} from './retail-media-economics'

const baseInput: RetailMediaEconomicsInput = {
  attributedSales: 600_000,
  attributedOrders: 500,
  adSpend: 120_000,
  returnLossRate: 8,
  productCostRate: 42,
  marketplaceFeeRate: 15,
  fulfillmentCostPerOrder: 80,
  estimatedIncrementalShare: 45,
  targetIncrementalContribution: 20_000,
}

describe('calculateRetailMediaEconomics', () => {
  it('separates attributed performance from incremental contribution', () => {
    const result = calculateRetailMediaEconomics(baseInput)

    expect(result.panelRoas).toBe(5)
    expect(result.netAttributedSales).toBe(552_000)
    expect(result.attributedContributionBeforeAds).toBe(197_360)
    expect(result.attributedContributionAfterAds).toBe(77_360)
    expect(result.incrementalNetSales).toBeCloseTo(248_400)
    expect(result.estimatedNonIncrementalSales).toBeCloseTo(303_600)
    expect(result.incrementalContributionBeforeAds).toBeCloseTo(88_812)
    expect(result.netIncrementalContribution).toBeCloseTo(-31_188)
    expect(result.breakEvenIncrementalShare).toBeCloseTo(0.608, 3)
    expect(result.status).toBe('incremental-loss')
  })

  it('protects the target when incremental share is high enough', () => {
    const result = calculateRetailMediaEconomics({
      ...baseInput,
      estimatedIncrementalShare: 85,
    })

    expect(result.netIncrementalContribution).toBeCloseTo(47_756)
    expect(result.maxAdSpendAtTarget).toBeCloseTo(147_756)
    expect(result.status).toBe('target-protected')
  })

  it('identifies negative unit economics before media', () => {
    const result = calculateRetailMediaEconomics({
      ...baseInput,
      productCostRate: 80,
      marketplaceFeeRate: 25,
    })

    expect(result.attributedContributionBeforeAds).toBeLessThan(0)
    expect(result.breakEvenIncrementalShare).toBeNull()
    expect(result.status).toBe('negative-unit-economics')
  })

  it('handles invalid and out-of-range inputs safely', () => {
    const result = calculateRetailMediaEconomics({
      ...baseInput,
      adSpend: Number.NaN,
      attributedOrders: 0,
      estimatedIncrementalShare: 180,
    })

    expect(result.panelRoas).toBeNull()
    expect(result.incrementalNetSales).toBe(result.netAttributedSales)
    expect(result.status).toBe('invalid')
  })
})

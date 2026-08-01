import { describe, expect, it } from 'vitest'
import { calculateCustomerEconomics, type CustomerEconomicsInput } from './customer-economics'

const baseInput: CustomerEconomicsInput = {
  acquisitionSpend: 240_000,
  verifiedNewCustomers: 800,
  firstOrderNetRevenue: 900,
  firstOrderVariableCosts: 650,
  repeatOrders90d: 0.45,
  repeatOrderNetRevenue: 720,
  repeatOrderVariableCosts: 470,
  expectedReturnLoss90d: 25,
  targetContributionAfterAcquisition: 50,
}

describe('calculateCustomerEconomics', () => {
  it('calculates CAC and 90-day contribution economics', () => {
    const result = calculateCustomerEconomics(baseInput)

    expect(result.cac).toBe(300)
    expect(result.firstOrderContribution).toBe(250)
    expect(result.repeatContribution90d).toBe(112.5)
    expect(result.contributionLtv90d).toBe(337.5)
    expect(result.contributionLtvToCac).toBe(1.125)
    expect(result.contributionAfterAcquisition).toBe(37.5)
    expect(result.firstOrderRecoveryRate).toBeCloseTo(0.8333, 4)
    expect(result.maxCacAtTarget).toBe(287.5)
    expect(result.status).toBe('below-target')
  })

  it('marks a cohort that has not paid back acquisition cost', () => {
    const result = calculateCustomerEconomics({
      ...baseInput,
      repeatOrders90d: 0.1,
      expectedReturnLoss90d: 40,
    })

    expect(result.contributionLtv90d).toBe(235)
    expect(result.contributionAfterAcquisition).toBe(-65)
    expect(result.status).toBe('not-paid-back')
  })

  it('marks a cohort that protects the contribution target', () => {
    const result = calculateCustomerEconomics({
      ...baseInput,
      acquisitionSpend: 160_000,
    })

    expect(result.cac).toBe(200)
    expect(result.contributionAfterAcquisition).toBe(137.5)
    expect(result.totalContributionAfterAcquisition90d).toBe(110_000)
    expect(result.status).toBe('target-protected')
  })

  it('handles missing customers and non-finite values without division errors', () => {
    const result = calculateCustomerEconomics({
      ...baseInput,
      acquisitionSpend: Number.NaN,
      verifiedNewCustomers: 0,
    })

    expect(result.cac).toBe(0)
    expect(result.contributionLtvToCac).toBeNull()
    expect(result.firstOrderRecoveryRate).toBeNull()
    expect(result.status).toBe('invalid')
  })
})

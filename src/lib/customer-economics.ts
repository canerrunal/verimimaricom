export type CustomerEconomicsInput = {
  acquisitionSpend: number
  verifiedNewCustomers: number
  firstOrderNetRevenue: number
  firstOrderVariableCosts: number
  repeatOrders90d: number
  repeatOrderNetRevenue: number
  repeatOrderVariableCosts: number
  expectedReturnLoss90d: number
  targetContributionAfterAcquisition: number
}

export type CustomerEconomicsStatus =
  | 'invalid'
  | 'negative-economics'
  | 'not-paid-back'
  | 'below-target'
  | 'target-protected'

export type CustomerEconomicsResult = {
  cac: number
  firstOrderContribution: number
  repeatContribution90d: number
  contributionLtv90d: number
  contributionLtvToCac: number | null
  contributionAfterAcquisition: number
  firstOrderRecoveryRate: number | null
  requiredAdditionalContribution: number
  maxCacAtTarget: number
  totalContributionAfterAcquisition90d: number
  status: CustomerEconomicsStatus
}

function safeNumber(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

export function calculateCustomerEconomics(
  rawInput: CustomerEconomicsInput,
): CustomerEconomicsResult {
  const input = Object.fromEntries(
    Object.entries(rawInput).map(([key, value]) => [key, safeNumber(value)]),
  ) as CustomerEconomicsInput

  const cac =
    input.verifiedNewCustomers > 0 ? input.acquisitionSpend / input.verifiedNewCustomers : 0
  const firstOrderContribution = input.firstOrderNetRevenue - input.firstOrderVariableCosts
  const repeatContribution90d =
    input.repeatOrders90d * (input.repeatOrderNetRevenue - input.repeatOrderVariableCosts)
  const contributionLtv90d =
    firstOrderContribution + repeatContribution90d - input.expectedReturnLoss90d
  const contributionAfterAcquisition = contributionLtv90d - cac
  const contributionLtvToCac = cac > 0 ? contributionLtv90d / cac : null
  const firstOrderRecoveryRate = cac > 0 ? firstOrderContribution / cac : null
  const requiredAdditionalContribution = Math.max(
    0,
    cac + input.targetContributionAfterAcquisition - firstOrderContribution,
  )
  const maxCacAtTarget = Math.max(0, contributionLtv90d - input.targetContributionAfterAcquisition)
  const totalContributionAfterAcquisition90d =
    contributionAfterAcquisition * input.verifiedNewCustomers

  let status: CustomerEconomicsStatus = 'target-protected'
  if (input.verifiedNewCustomers <= 0 || input.acquisitionSpend <= 0) status = 'invalid'
  else if (contributionLtv90d <= 0) status = 'negative-economics'
  else if (contributionAfterAcquisition < 0) status = 'not-paid-back'
  else if (contributionAfterAcquisition < input.targetContributionAfterAcquisition)
    status = 'below-target'

  return {
    cac,
    firstOrderContribution,
    repeatContribution90d,
    contributionLtv90d,
    contributionLtvToCac,
    contributionAfterAcquisition,
    firstOrderRecoveryRate,
    requiredAdditionalContribution,
    maxCacAtTarget,
    totalContributionAfterAcquisition90d,
    status,
  }
}

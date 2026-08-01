export type RetailMediaEconomicsInput = {
  attributedSales: number
  attributedOrders: number
  adSpend: number
  returnLossRate: number
  productCostRate: number
  marketplaceFeeRate: number
  fulfillmentCostPerOrder: number
  estimatedIncrementalShare: number
  targetIncrementalContribution: number
}

export type RetailMediaEconomicsStatus =
  | 'invalid'
  | 'negative-unit-economics'
  | 'incremental-loss'
  | 'below-target'
  | 'target-protected'

export type RetailMediaEconomicsResult = {
  panelRoas: number | null
  netAttributedSales: number
  attributedContributionBeforeAds: number
  attributedContributionAfterAds: number
  incrementalNetSales: number
  estimatedNonIncrementalSales: number
  incrementalContributionBeforeAds: number
  netIncrementalContribution: number
  contributionRoas: number | null
  breakEvenIncrementalShare: number | null
  targetIncrementalShare: number | null
  maxAdSpendAtTarget: number
  status: RetailMediaEconomicsStatus
}

function amount(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

function rate(value: number) {
  return Math.min(100, amount(value)) / 100
}

export function calculateRetailMediaEconomics(
  rawInput: RetailMediaEconomicsInput,
): RetailMediaEconomicsResult {
  const input: RetailMediaEconomicsInput = {
    attributedSales: amount(rawInput.attributedSales),
    attributedOrders: amount(rawInput.attributedOrders),
    adSpend: amount(rawInput.adSpend),
    returnLossRate: amount(rawInput.returnLossRate),
    productCostRate: amount(rawInput.productCostRate),
    marketplaceFeeRate: amount(rawInput.marketplaceFeeRate),
    fulfillmentCostPerOrder: amount(rawInput.fulfillmentCostPerOrder),
    estimatedIncrementalShare: amount(rawInput.estimatedIncrementalShare),
    targetIncrementalContribution: amount(rawInput.targetIncrementalContribution),
  }

  const returnLossRate = rate(input.returnLossRate)
  const productCostRate = rate(input.productCostRate)
  const marketplaceFeeRate = rate(input.marketplaceFeeRate)
  const incrementalShare = rate(input.estimatedIncrementalShare)
  const netAttributedSales = input.attributedSales * (1 - returnLossRate)
  const attributedVariableCosts =
    netAttributedSales * (productCostRate + marketplaceFeeRate) +
    input.attributedOrders * input.fulfillmentCostPerOrder
  const attributedContributionBeforeAds = netAttributedSales - attributedVariableCosts
  const attributedContributionAfterAds = attributedContributionBeforeAds - input.adSpend
  const incrementalNetSales = netAttributedSales * incrementalShare
  const estimatedNonIncrementalSales = netAttributedSales - incrementalNetSales
  const incrementalOrders = input.attributedOrders * incrementalShare
  const incrementalVariableCosts =
    incrementalNetSales * (productCostRate + marketplaceFeeRate) +
    incrementalOrders * input.fulfillmentCostPerOrder
  const incrementalContributionBeforeAds = incrementalNetSales - incrementalVariableCosts
  const netIncrementalContribution = incrementalContributionBeforeAds - input.adSpend
  const panelRoas = input.adSpend > 0 ? input.attributedSales / input.adSpend : null
  const contributionRoas =
    input.adSpend > 0 ? incrementalContributionBeforeAds / input.adSpend : null
  const breakEvenIncrementalShare =
    attributedContributionBeforeAds > 0 ? input.adSpend / attributedContributionBeforeAds : null
  const targetIncrementalShare =
    attributedContributionBeforeAds > 0
      ? (input.adSpend + input.targetIncrementalContribution) / attributedContributionBeforeAds
      : null
  const maxAdSpendAtTarget = Math.max(
    0,
    incrementalContributionBeforeAds - input.targetIncrementalContribution,
  )

  let status: RetailMediaEconomicsStatus = 'target-protected'
  if (input.attributedSales <= 0 || input.attributedOrders <= 0 || input.adSpend <= 0)
    status = 'invalid'
  else if (attributedContributionBeforeAds <= 0) status = 'negative-unit-economics'
  else if (netIncrementalContribution < 0) status = 'incremental-loss'
  else if (netIncrementalContribution < input.targetIncrementalContribution) status = 'below-target'

  return {
    panelRoas,
    netAttributedSales,
    attributedContributionBeforeAds,
    attributedContributionAfterAds,
    incrementalNetSales,
    estimatedNonIncrementalSales,
    incrementalContributionBeforeAds,
    netIncrementalContribution,
    contributionRoas,
    breakEvenIncrementalShare,
    targetIncrementalShare,
    maxAdSpendAtTarget,
    status,
  }
}

export type ProductInput = {
  id: string
  name: string
  listPrice: number
  discountRate: number
  productCost: number
  marketplaceCommissionRate: number
  paymentFeeRate: number
  shippingCost: number
  packagingCost: number
  adCostPerOrder: number
  returnRate: number
  returnLoss: number
  monthlySales: number
  conversionRate: number
  currentCpc: number
}

export type AnalysisSettings = {
  monthlyFixedCosts: number
  targetNetMargin: number
}

export type StrategicDecision = 'Büyüt' | 'Optimize et' | 'Kontrollü test' | 'Acil müdahale'

export type ProductAnalysis = ProductInput & {
  netSalePrice: number
  commissionCost: number
  paymentFeeCost: number
  expectedReturnLoss: number
  preAdContribution: number
  unitProfit: number
  monthlyRevenue: number
  monthlyContribution: number
  allocatedFixedCost: number
  operatingProfit: number
  grossMargin: number
  contributionMargin: number
  operatingMargin: number
  actualRoas: number | null
  breakEvenRoas: number | null
  targetRoas: number | null
  breakEvenCpa: number
  targetCpa: number
  maxCpc: number
  recommendedListPrice: number | null
  breakEvenSalesUnits: number | null
  healthScore: number
  decision: StrategicDecision
  actions: string[]
}

export type ProfitBridge = {
  revenue: number
  productCosts: number
  commissions: number
  paymentFees: number
  shipping: number
  packaging: number
  returns: number
  advertising: number
  fixedCosts: number
  operatingProfit: number
}

export type PortfolioAnalysis = {
  products: ProductAnalysis[]
  totalRevenue: number
  totalContribution: number
  operatingProfit: number
  contributionMargin: number
  operatingMargin: number
  adSpend: number
  breakEvenRevenue: number | null
  healthScore: number
  managerSummary: string
  scaleProduct: ProductAnalysis | null
  interventionProduct: ProductAnalysis | null
  profitBridge: ProfitBridge
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))

const nonNegative = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0)

const percent = (value: number) => clamp(value, 0, 100) / 100

const ratio = (numerator: number, denominator: number): number | null =>
  denominator > 0 ? numerator / denominator : null

function scoreProduct(
  product: ProductInput,
  values: {
    contributionMargin: number
    operatingProfit: number
    actualRoas: number | null
    targetRoas: number | null
    maxCpc: number
    unitProfit: number
  },
  targetMargin: number,
) {
  let score = 100

  if (values.unitProfit <= 0) score -= 45
  else if (values.contributionMargin < targetMargin) {
    score -= Math.min(30, (targetMargin - values.contributionMargin) * 1.5)
  }

  if (values.operatingProfit < 0) score -= 20

  if (
    values.actualRoas !== null &&
    values.targetRoas !== null &&
    values.actualRoas < values.targetRoas
  ) {
    score -= Math.min(15, ((values.targetRoas - values.actualRoas) / values.targetRoas) * 25)
  }

  if (product.currentCpc > values.maxCpc && product.currentCpc > 0) {
    score -= Math.min(15, ((product.currentCpc - values.maxCpc) / product.currentCpc) * 30)
  }

  if (product.returnRate > 10) score -= Math.min(15, (product.returnRate - 10) * 1.2)

  return Math.round(clamp(score, 0, 100))
}

function decisionFor(
  score: number,
  operatingProfit: number,
  unitProfit: number,
): StrategicDecision {
  if (unitProfit <= 0 || score < 40) return 'Acil müdahale'
  if (score < 60 || operatingProfit < 0) return 'Kontrollü test'
  if (score < 80) return 'Optimize et'
  return 'Büyüt'
}

function buildActions(
  product: ProductInput,
  values: {
    contributionMargin: number
    operatingProfit: number
    targetCpa: number
    maxCpc: number
    recommendedListPrice: number | null
    netSalePrice: number
  },
  targetMargin: number,
) {
  const actions: string[] = []

  if (values.targetCpa <= 0) {
    actions.push(
      'Mevcut maliyet yapısı hedef marja reklam bütçesi bırakmıyor; fiyat ve ürün maliyetini birlikte gözden geçirin.',
    )
  } else if (product.currentCpc > values.maxCpc) {
    actions.push(
      `Mevcut CPC hedef kârlılığı koruyan ${formatCompact(values.maxCpc)} TL sınırının üzerinde.`,
    )
  }

  if (product.returnRate >= 10) {
    actions.push(
      'İade oranı yüksek; ürün açıklaması, görsel beklentisi ve paketleme süreci incelenmeli.',
    )
  }

  if (
    values.recommendedListPrice !== null &&
    values.recommendedListPrice > product.listPrice * 1.025
  ) {
    actions.push(
      `Hedeflenen %${targetMargin.toLocaleString('tr-TR')} net marj için liste fiyatı yaklaşık ${formatCompact(values.recommendedListPrice)} TL seviyesinde test edilmeli.`,
    )
  }

  if (values.operatingProfit < 0) {
    actions.push(
      'Aylık katkı sabit gider payını karşılamıyor; satış hacmi, fiyat ve reklam verimliliği birlikte iyileştirilmeli.',
    )
  }

  if (values.contributionMargin >= targetMargin && values.operatingProfit >= 0) {
    actions.push(
      'Ürün hedef marjı karşılıyor; bütçeyi kontrollü artırırken CPC ve iade oranını haftalık izleyin.',
    )
  }

  if (actions.length === 0) {
    actions.push(
      'Ürün pozitif katkı üretiyor; bir sonraki testte fiyat veya dönüşüm oranından yalnızca birini değiştirin.',
    )
  }

  return actions
}

function formatCompact(value: number) {
  return Math.round(value).toLocaleString('tr-TR')
}

export function createProduct(overrides: Partial<ProductInput> = {}): ProductInput {
  return {
    id: overrides.id ?? `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: overrides.name ?? 'Yeni ürün',
    listPrice: overrides.listPrice ?? 1_200,
    discountRate: overrides.discountRate ?? 10,
    productCost: overrides.productCost ?? 360,
    marketplaceCommissionRate: overrides.marketplaceCommissionRate ?? 15,
    paymentFeeRate: overrides.paymentFeeRate ?? 2.5,
    shippingCost: overrides.shippingCost ?? 75,
    packagingCost: overrides.packagingCost ?? 18,
    adCostPerOrder: overrides.adCostPerOrder ?? 180,
    returnRate: overrides.returnRate ?? 6,
    returnLoss: overrides.returnLoss ?? 150,
    monthlySales: overrides.monthlySales ?? 120,
    conversionRate: overrides.conversionRate ?? 2.4,
    currentCpc: overrides.currentCpc ?? 4.2,
  }
}

export function analyzePortfolio(
  rawProducts: ProductInput[],
  rawSettings: AnalysisSettings,
): PortfolioAnalysis {
  const settings = {
    monthlyFixedCosts: nonNegative(rawSettings.monthlyFixedCosts),
    targetNetMargin: clamp(rawSettings.targetNetMargin, 0, 95),
  }

  const products = rawProducts.map((product) => ({
    ...product,
    listPrice: nonNegative(product.listPrice),
    discountRate: clamp(product.discountRate, 0, 99),
    productCost: nonNegative(product.productCost),
    marketplaceCommissionRate: clamp(product.marketplaceCommissionRate, 0, 100),
    paymentFeeRate: clamp(product.paymentFeeRate, 0, 100),
    shippingCost: nonNegative(product.shippingCost),
    packagingCost: nonNegative(product.packagingCost),
    adCostPerOrder: nonNegative(product.adCostPerOrder),
    returnRate: clamp(product.returnRate, 0, 100),
    returnLoss: nonNegative(product.returnLoss),
    monthlySales: nonNegative(product.monthlySales),
    conversionRate: clamp(product.conversionRate, 0, 100),
    currentCpc: nonNegative(product.currentCpc),
  }))

  const revenues = products.map(
    (product) => product.listPrice * (1 - percent(product.discountRate)) * product.monthlySales,
  )
  const totalRevenue = revenues.reduce((sum, value) => sum + value, 0)

  const analyses = products.map<ProductAnalysis>((product, index) => {
    const discountMultiplier = 1 - percent(product.discountRate)
    const netSalePrice = product.listPrice * discountMultiplier
    const commissionCost = netSalePrice * percent(product.marketplaceCommissionRate)
    const paymentFeeCost = netSalePrice * percent(product.paymentFeeRate)
    const expectedReturnLoss = percent(product.returnRate) * product.returnLoss
    const preAdContribution =
      netSalePrice -
      product.productCost -
      commissionCost -
      paymentFeeCost -
      product.shippingCost -
      product.packagingCost -
      expectedReturnLoss
    const unitProfit = preAdContribution - product.adCostPerOrder
    const monthlyRevenue = revenues[index]
    const monthlyContribution = unitProfit * product.monthlySales
    const allocatedFixedCost =
      totalRevenue > 0
        ? settings.monthlyFixedCosts * (monthlyRevenue / totalRevenue)
        : products.length > 0
          ? settings.monthlyFixedCosts / products.length
          : 0
    const operatingProfit = monthlyContribution - allocatedFixedCost
    const grossMargin =
      netSalePrice > 0 ? ((netSalePrice - product.productCost) / netSalePrice) * 100 : 0
    const contributionMargin = netSalePrice > 0 ? (unitProfit / netSalePrice) * 100 : 0
    const operatingMargin = monthlyRevenue > 0 ? (operatingProfit / monthlyRevenue) * 100 : 0
    const actualRoas = ratio(netSalePrice, product.adCostPerOrder)
    const breakEvenRoas = ratio(netSalePrice, preAdContribution)
    const fixedCostPerUnit =
      product.monthlySales > 0 ? allocatedFixedCost / product.monthlySales : 0
    const targetProfitPerUnit = netSalePrice * percent(settings.targetNetMargin)
    const targetCpa = Math.max(0, preAdContribution - targetProfitPerUnit - fixedCostPerUnit)
    const targetRoas = ratio(netSalePrice, targetCpa)
    const maxCpc = targetCpa * percent(product.conversionRate)
    const channelRate = percent(product.marketplaceCommissionRate) + percent(product.paymentFeeRate)
    const priceDenominator =
      discountMultiplier * (1 - channelRate - percent(settings.targetNetMargin))
    const targetCostBase =
      product.productCost +
      product.shippingCost +
      product.packagingCost +
      expectedReturnLoss +
      product.adCostPerOrder +
      fixedCostPerUnit
    const recommendedListPrice = priceDenominator > 0 ? targetCostBase / priceDenominator : null
    const breakEvenSalesUnits = unitProfit > 0 ? settings.monthlyFixedCosts / unitProfit : null
    const healthScore = scoreProduct(
      product,
      { contributionMargin, operatingProfit, actualRoas, targetRoas, maxCpc, unitProfit },
      settings.targetNetMargin,
    )
    const decision = decisionFor(healthScore, operatingProfit, unitProfit)
    const actions = buildActions(
      product,
      {
        contributionMargin,
        operatingProfit,
        targetCpa,
        maxCpc,
        recommendedListPrice,
        netSalePrice,
      },
      settings.targetNetMargin,
    )

    return {
      ...product,
      netSalePrice,
      commissionCost,
      paymentFeeCost,
      expectedReturnLoss,
      preAdContribution,
      unitProfit,
      monthlyRevenue,
      monthlyContribution,
      allocatedFixedCost,
      operatingProfit,
      grossMargin,
      contributionMargin,
      operatingMargin,
      actualRoas,
      breakEvenRoas,
      targetRoas,
      breakEvenCpa: Math.max(0, preAdContribution),
      targetCpa,
      maxCpc,
      recommendedListPrice,
      breakEvenSalesUnits,
      healthScore,
      decision,
      actions,
    }
  })

  const totalContribution = analyses.reduce((sum, product) => sum + product.monthlyContribution, 0)
  const operatingProfit = totalContribution - settings.monthlyFixedCosts
  const contributionMargin = totalRevenue > 0 ? (totalContribution / totalRevenue) * 100 : 0
  const operatingMargin = totalRevenue > 0 ? (operatingProfit / totalRevenue) * 100 : 0
  const adSpend = analyses.reduce(
    (sum, product) => sum + product.adCostPerOrder * product.monthlySales,
    0,
  )
  const breakEvenRevenue =
    contributionMargin > 0 ? settings.monthlyFixedCosts / (contributionMargin / 100) : null
  const healthScore =
    totalRevenue > 0
      ? Math.round(
          analyses.reduce(
            (sum, product) => sum + product.healthScore * (product.monthlyRevenue / totalRevenue),
            0,
          ),
        )
      : analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, product) => sum + product.healthScore, 0) / analyses.length,
          )
        : 0

  const scaleProduct =
    analyses.length > 0
      ? [...analyses].sort(
          (a, b) => b.healthScore - a.healthScore || b.operatingProfit - a.operatingProfit,
        )[0]
      : null
  const interventionProduct =
    analyses.length > 0
      ? [...analyses].sort(
          (a, b) => a.healthScore - b.healthScore || a.operatingProfit - b.operatingProfit,
        )[0]
      : null

  const profitableCount = analyses.filter((product) => product.operatingProfit > 0).length
  const managerSummary = analyses.length
    ? `Portföyde ${analyses.length} ürünün ${profitableCount} tanesi sabit gider payı sonrası pozitif sonuç üretiyor. ${
        operatingProfit >= 0
          ? `Aylık tahmini faaliyet kârı ${formatCompact(operatingProfit)} TL.`
          : `Aylık tahmini faaliyet zararı ${formatCompact(Math.abs(operatingProfit))} TL; ilk müdahale ${interventionProduct?.name ?? 'en düşük skorlu ürün'} üzerinde yapılmalı.`
      } ${scaleProduct ? `${scaleProduct.name}, bütçe büyütme için portföydeki en güçlü aday.` : ''}`
    : 'Analiz için en az bir ürün ekleyin.'

  const profitBridge: ProfitBridge = {
    revenue: totalRevenue,
    productCosts: analyses.reduce(
      (sum, product) => sum + product.productCost * product.monthlySales,
      0,
    ),
    commissions: analyses.reduce(
      (sum, product) => sum + product.commissionCost * product.monthlySales,
      0,
    ),
    paymentFees: analyses.reduce(
      (sum, product) => sum + product.paymentFeeCost * product.monthlySales,
      0,
    ),
    shipping: analyses.reduce(
      (sum, product) => sum + product.shippingCost * product.monthlySales,
      0,
    ),
    packaging: analyses.reduce(
      (sum, product) => sum + product.packagingCost * product.monthlySales,
      0,
    ),
    returns: analyses.reduce(
      (sum, product) => sum + product.expectedReturnLoss * product.monthlySales,
      0,
    ),
    advertising: adSpend,
    fixedCosts: settings.monthlyFixedCosts,
    operatingProfit,
  }

  return {
    products: analyses,
    totalRevenue,
    totalContribution,
    operatingProfit,
    contributionMargin,
    operatingMargin,
    adSpend,
    breakEvenRevenue,
    healthScore,
    managerSummary,
    scaleProduct,
    interventionProduct,
    profitBridge,
  }
}

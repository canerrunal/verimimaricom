import type { MarketProduct } from './trendyol-market'

export type EvidenceKind = 'observed' | 'derived' | 'user' | 'estimate'

export type EvidenceFact = {
  label: string
  value: string
  kind: EvidenceKind
  note?: string
}

export type ProductInsight = {
  product: MarketProduct
  observationCount: number
  profileCount: number
  observedSellerCount: number
  observedSellerNames: string[]
  minObservedPrice: number | null
  maxObservedPrice: number | null
  monthlyDemandRunRateMin: number | null
}

export type EntityAnalysisType = 'category' | 'brand' | 'store'

export type EntityAnalysis = {
  type: EntityAnalysisType
  label: string
  productCount: number
  brandCount: number
  categoryCount: number
  observedSellerCount: number
  medianPrice: number | null
  minPrice: number | null
  maxPrice: number | null
  averageRating: number | null
  totalReviewCount: number
  monthlyDemandRunRateMin: number | null
  monthlyRevenueRunRateMin: number | null
  demandSignalProductCount: number
  topProducts: ProductInsight[]
}

function uniqueValues(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))]
}

function median(values: number[]) {
  if (!values.length) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

export function normalizeEntityText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9çğıöşü]+/g, ' ')
    .trim()
}

export function monthlyDemandRunRateMin(product: MarketProduct) {
  const daily = product.salesSignalDailyMin
  if (daily !== null && daily > 0) return Math.round(daily * 30)
  if (
    product.salesSignalMin !== null &&
    product.salesSignalMin > 0 &&
    product.salesSignalDays !== null &&
    product.salesSignalDays > 0
  ) {
    return Math.round((product.salesSignalMin / product.salesSignalDays) * 30)
  }
  return null
}

function representativeProduct(products: MarketProduct[]) {
  return [...products].sort((a, b) => {
    const captured = String(b.capturedAt).localeCompare(String(a.capturedAt))
    if (captured !== 0) return captured
    return (b.opportunityScore || 0) - (a.opportunityScore || 0)
  })[0]
}

export function buildProductInsights(products: MarketProduct[]) {
  const groups = new Map<string, MarketProduct[]>()
  for (const product of products) {
    const group = groups.get(product.productId) || []
    group.push(product)
    groups.set(product.productId, group)
  }

  return [...groups.values()].map((observations): ProductInsight => {
    const prices = observations
      .map((product) => product.price)
      .filter((value): value is number => value !== null)
    const runRates = observations
      .map(monthlyDemandRunRateMin)
      .filter((value): value is number => value !== null)
    return {
      product: representativeProduct(observations),
      observationCount: observations.length,
      profileCount: uniqueValues(observations.map((product) => product.profileSlug)).length,
      observedSellerCount: uniqueValues(
        observations.map((product) => product.merchantId || product.sellerName),
      ).length,
      observedSellerNames: uniqueValues(observations.map((product) => product.sellerName)).slice(
        0,
        5,
      ),
      minObservedPrice: prices.length ? Math.min(...prices) : null,
      maxObservedPrice: prices.length ? Math.max(...prices) : null,
      monthlyDemandRunRateMin: runRates.length ? Math.max(...runRates) : null,
    }
  })
}

export function findEntityProducts(
  products: MarketProduct[],
  type: Exclude<EntityAnalysisType, 'category'>,
  query: string,
) {
  const normalizedQuery = normalizeEntityText(query)
  if (!normalizedQuery) return []
  return products.filter((product) => {
    const value = type === 'brand' ? product.brand : product.sellerName
    const normalizedValue = normalizeEntityText(value || '')
    return normalizedValue === normalizedQuery || normalizedValue.includes(normalizedQuery)
  })
}

export function analyzeEntity(
  type: EntityAnalysisType,
  label: string,
  products: MarketProduct[],
): EntityAnalysis {
  const insights = buildProductInsights(products)
  const representatives = insights.map((insight) => insight.product)
  const prices = representatives
    .map((product) => product.price)
    .filter((value): value is number => value !== null)
  const ratings = representatives
    .map((product) => product.rating)
    .filter((value): value is number => value !== null)
  const reviewCounts = representatives
    .map((product) => product.reviewCount)
    .filter((value): value is number => value !== null)
  const demandInsights = insights.filter((insight) => insight.monthlyDemandRunRateMin !== null)
  const monthlyDemand = demandInsights.reduce(
    (total, insight) => total + (insight.monthlyDemandRunRateMin || 0),
    0,
  )
  const monthlyRevenue = demandInsights.reduce(
    (total, insight) =>
      total + (insight.monthlyDemandRunRateMin || 0) * (insight.product.price || 0),
    0,
  )
  const topProducts = [...insights]
    .sort(
      (a, b) =>
        (b.monthlyDemandRunRateMin || 0) - (a.monthlyDemandRunRateMin || 0) ||
        (b.product.opportunityScore || 0) - (a.product.opportunityScore || 0),
    )
    .slice(0, 5)

  return {
    type,
    label,
    productCount: insights.length,
    brandCount: uniqueValues(representatives.map((product) => product.brand)).length,
    categoryCount: uniqueValues(representatives.map((product) => product.category)).length,
    observedSellerCount: uniqueValues(
      products.map((product) => product.merchantId || product.sellerName),
    ).length,
    medianPrice: median(prices),
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    averageRating: ratings.length
      ? Math.round((ratings.reduce((total, value) => total + value, 0) / ratings.length) * 10) / 10
      : null,
    totalReviewCount: reviewCounts.reduce((total, value) => total + value, 0),
    monthlyDemandRunRateMin: demandInsights.length ? monthlyDemand : null,
    monthlyRevenueRunRateMin: demandInsights.length ? Math.round(monthlyRevenue) : null,
    demandSignalProductCount: demandInsights.length,
    topProducts,
  }
}

import { normalizeProductMetrics, type ProductMetrics } from './trendyol-product-metrics'
import { createServiceClient, supabase } from '@/lib/supabase'

const REPOSITORY_RAW_ROOT = 'https://raw.githubusercontent.com/canerrunal/Trendyol/main'

export type MarketProfile = {
  slug: string
  label: string
  path: string
  sourceLabel: string
}

export const DEFAULT_MARKET_PROFILES: MarketProfile[] = [
  { slug: 'cocuk', label: 'Çocuk', path: '', sourceLabel: 'Çocuk / En Çok Satan' },
  { slug: 'erkek', label: 'Erkek', path: 'categories/erkek', sourceLabel: 'Erkek / En Çok Satan' },
  {
    slug: 'ev-yasam',
    label: 'Ev & Yaşam',
    path: 'categories/ev-yasam',
    sourceLabel: 'Ev & Yaşam / En Çok Satan',
  },
  { slug: 'kadin', label: 'Kadın', path: 'categories/kadin', sourceLabel: 'Kadın / En Çok Satan' },
  {
    slug: 'genel-cok-satanlar',
    label: 'Genel',
    path: 'categories/genel-cok-satanlar',
    sourceLabel: 'Genel Çok Satanlar',
  },
  {
    slug: 'supermarket',
    label: 'Süpermarket',
    path: 'categories/supermarket',
    sourceLabel: 'Süpermarket / En Çok Satan',
  },
  {
    slug: 'kozmetik',
    label: 'Kozmetik',
    path: 'categories/kozmetik',
    sourceLabel: 'Kozmetik / En Çok Satan',
  },
  {
    slug: 'elektronik',
    label: 'Elektronik',
    path: 'categories/elektronik',
    sourceLabel: 'Elektronik / En Çok Satan',
  },
  {
    slug: 'mobilya',
    label: 'Mobilya',
    path: 'categories/mobilya',
    sourceLabel: 'Mobilya / En Çok Satan',
  },
  {
    slug: 'otomobil-motosiklet',
    label: 'Otomobil & Motosiklet',
    path: 'categories/otomobil-motosiklet',
    sourceLabel: 'Otomobil & Motosiklet / Çok Satanlar',
  },
  {
    slug: 'hamile',
    label: 'Hamile',
    path: 'categories/hamile',
    sourceLabel: 'Hamile / Çok Satanlar',
  },
  {
    slug: 'hobi',
    label: 'Hobi',
    path: 'categories/hobi',
    sourceLabel: 'Hobi / Çok Satanlar',
  },
]

/** @deprecated Yeni kodda getMarketProfiles kullanın. Bu liste yalnız bağlantısız fallback'tir. */
export const MARKET_PROFILES = DEFAULT_MARKET_PROFILES

export type MarketProfileSlug = string

export function isMarketProfileSlug(value: unknown): value is MarketProfileSlug {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

export const MARKET_VIEWS = [
  { slug: 'cok-satanlar', label: 'Çok Satanlar' },
  { slug: 'yukselenler', label: 'Yükselenler' },
  { slug: 'firsat-radari', label: 'Fırsat Radarı' },
  { slug: 'fiyat-dususleri', label: 'Fiyat Düşüşleri' },
  { slug: 'stok-sinyalleri', label: 'Stok Sinyalleri' },
] as const

export type MarketViewSlug = (typeof MARKET_VIEWS)[number]['slug']

export type MarketProduct = {
  metrics: ProductMetrics
  profileSlug: MarketProfileSlug
  productId: string
  merchantId: string | null
  offerKey: string
  title: string
  brand: string | null
  category: string | null
  url: string
  sellerName: string | null
  sellerScore: number | null
  price: number | null
  originalPrice: number | null
  discountPercent: number | null
  priceDeltaPercent: number | null
  currency: string
  rankScope: string
  rankScopeLabel: string
  rankPosition: number | null
  compositePosition: number | null
  rankDelta: number | null
  trendScore: number | null
  opportunityScore: number | null
  stockStatus: string | null
  stockSignal: string | null
  salesSignal: string | null
  salesSignalDays: number | null
  salesSignalMin: number | null
  salesSignalDailyMin: number | null
  rating: number | null
  ratingCount: number | null
  reviewCount: number | null
  reviewDelta: number | null
  questionCount: number | null
  campaigns: string[]
  deliverySummary: string | null
  capturedAt: string
  observedDate: string
  detailStatus: string | null
}

export type MarketQuality = {
  profileSlug: MarketProfileSlug
  status: 'PASS' | 'FAIL' | 'UNKNOWN'
  productCount: number
  detailSuccessRate: number
  capturedAt: string | null
  observedDate: string | null
  coverage: Record<string, number>
}

export type MarketSnapshot = {
  profile: MarketProfile
  products: MarketProduct[]
  quality: MarketQuality
  source: 'supabase' | 'github' | 'unavailable'
  csvUrl: string
}

export type MarketTaxonomyOverview = {
  observedDate: string
  capturedAt: string
  catalogGeneratedAt: string
  totalCategoryPaths: number
  totalCategories: number
  coveredCategories: number
  coverage: number
  uniqueProducts: number
  rankingMemberships: number
  categoriesWithProducts: number
  emptyCategories: number
  roots: Array<{ categoryId: number; name: string; totalCategories: number }>
}

export type MarketTaxonomyCategory = {
  categoryId: number
  pathKey: string
  path: string
  level: number
  rootId: number
  sourceUrl: string
}

export type MarketTaxonomyProduct = {
  metrics: ProductMetrics
  observedDate: string
  capturedAt: string
  categoryId: number
  rank: number
  previousRank: number | null
  rankDelta: number | null
  productKey: string
  productId: string
  merchantId: string | null
  title: string
  brand: string | null
  url: string
  imageUrl: string | null
  price: number | null
  previousPrice: number | null
  priceDeltaPercent: number | null
  originalPrice: number | null
  currency: string
  inStock: boolean | null
  runningOut: boolean | null
  rating: number | null
  ratingCount: number | null
  promotions: string[]
  fastDelivery: boolean | null
  rushDeliveryHours: number | null
}

export type MarketTaxonomySnapshot = {
  category: MarketTaxonomyCategory | null
  products: MarketTaxonomyProduct[]
  observedDate: string | null
  metricsUnavailable?: boolean
}

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

function asText(value: unknown) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || null
}

function asNumber(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function asStringArray(value: unknown) {
  if (Array.isArray(value))
    return value
      .map(String)
      .map((item) => item.trim())
      .filter(Boolean)
  if (typeof value !== 'string' || !value.trim()) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [value]
  } catch {
    return value
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

function profileRoot(profile: MarketProfile) {
  return profile.path ? `${REPOSITORY_RAW_ROOT}/${profile.path}` : REPOSITORY_RAW_ROOT
}

export function getMarketProfile(
  value: unknown,
  profiles: MarketProfile[] = DEFAULT_MARKET_PROFILES,
) {
  const slug = typeof value === 'string' ? value : ''
  return (
    profiles.find((profile) => profile.slug === slug) ??
    profiles.find((profile) => profile.slug === 'genel-cok-satanlar') ??
    profiles[0] ??
    DEFAULT_MARKET_PROFILES[4]
  )
}

export async function getMarketProfiles(): Promise<MarketProfile[]> {
  const database = createServiceClient() || supabase
  if (!database) return DEFAULT_MARKET_PROFILES

  const { data, error } = await database
    .from('market_profiles')
    .select('slug,label,source_label,created_at')
    .eq('marketplace', 'trendyol')
    .eq('enabled', true)
    .order('created_at', { ascending: true })

  if (error || !data?.length) return DEFAULT_MARKET_PROFILES
  return data
    .filter((profile) => isMarketProfileSlug(profile.slug))
    .map((profile) => ({
      slug: profile.slug,
      label: profile.label,
      sourceLabel: profile.source_label,
      path: profile.slug === 'cocuk' ? '' : `categories/${profile.slug}`,
    }))
}

export function getMarketView(value: unknown): MarketViewSlug {
  const slug = typeof value === 'string' ? value : ''
  return MARKET_VIEWS.some((view) => view.slug === slug) ? (slug as MarketViewSlug) : 'cok-satanlar'
}

export function normalizeMarketProduct(
  input: unknown,
  profileSlug: MarketProfileSlug,
): MarketProduct | null {
  const row = asRecord(input)
  const productId = asText(row.product_id ?? row.productId)
  const title = asText(row.title)
  const url = asText(row.url ?? row.canonical_url)
  if (!productId || !title || !url) return null

  const merchantId = asText(row.merchant_id ?? row.merchantId)
  const sourceSegment = asText(row.source_segment ?? row.rank_scope_label) || 'genel'
  const explicitRankScope = asText(row.rank_scope ?? row.rankScope)
  const explicitRankPosition = asNumber(
    row.rank_scope_position ?? row.rank_position ?? row.rankPosition,
  )
  const hasV2RankContract = Boolean(explicitRankScope && explicitRankPosition !== null)
  const explicitOfferKey = asText(row.offer_key ?? row.offerKey)
  const rankScope = explicitRankScope || `${profileSlug}:${sourceSegment}`
  const salesSignal = asText(row.sales_signal ?? row.salesSignal)
  const parsedDays = salesSignal?.match(/(?:Son\s+)?(\d+)\s+günde/i)
  const salesSignalDays =
    asNumber(row.sales_signal_days ?? row.salesSignalDays) ??
    (parsedDays ? Number(parsedDays[1]) : null)
  const salesSignalMin = asNumber(row.sales_signal_min ?? row.salesSignalMin)
  const salesSignalDailyMin =
    asNumber(row.sales_signal_daily_min ?? row.salesSignalDailyMin) ??
    (salesSignalDays && salesSignalMin !== null
      ? Math.round((salesSignalMin / salesSignalDays) * 10) / 10
      : null)

  return {
    metrics: normalizeProductMetrics(row.metrics ?? row),
    profileSlug,
    productId,
    merchantId,
    offerKey: explicitOfferKey || `${productId}:${merchantId || 'unknown'}`,
    title,
    brand: asText(row.brand),
    category: asText(row.category),
    url,
    sellerName: asText(row.seller_name ?? row.sellerName),
    sellerScore: asNumber(row.seller_score ?? row.sellerScore),
    price: asNumber(row.price),
    originalPrice: asNumber(row.original_price ?? row.originalPrice),
    discountPercent: asNumber(row.discount_percent ?? row.discountPercent),
    priceDeltaPercent: explicitOfferKey
      ? asNumber(row.price_delta_percent ?? row.priceDeltaPercent)
      : null,
    currency: asText(row.currency) || 'TRY',
    rankScope,
    rankScopeLabel: asText(row.source_query ?? row.rankScopeLabel) || sourceSegment,
    rankPosition: explicitRankPosition ?? asNumber(row.segment_position ?? row.bestseller_rank),
    compositePosition: asNumber(
      row.search_position ?? row.composite_position ?? row.compositePosition,
    ),
    rankDelta: hasV2RankContract ? asNumber(row.rank_delta ?? row.rankDelta) : null,
    trendScore: asNumber(row.trend_score ?? row.trendScore),
    opportunityScore: asNumber(row.niche_score ?? row.opportunity_score ?? row.opportunityScore),
    stockStatus: asText(row.stock_status ?? row.stockStatus),
    stockSignal: asText(row.stock_signal ?? row.stockSignal),
    salesSignal,
    salesSignalDays,
    salesSignalMin,
    salesSignalDailyMin,
    rating: asNumber(row.rating),
    ratingCount: asNumber(row.rating_count ?? row.ratingCount),
    reviewCount: asNumber(row.review_count ?? row.reviewCount),
    reviewDelta: asNumber(row.review_delta ?? row.reviewDelta),
    questionCount: asNumber(row.question_count ?? row.questionCount),
    campaigns: asStringArray(row.campaigns),
    deliverySummary: asText(row.delivery_summary ?? row.deliverySummary),
    capturedAt: asText(row.captured_at ?? row.capturedAt) || '',
    observedDate: asText(row.date ?? row.observed_date ?? row.observedDate) || '',
    detailStatus: asText(row.detail_status ?? row.detailStatus),
  }
}

function normalizeQuality(input: unknown, profileSlug: MarketProfileSlug): MarketQuality {
  const row = asRecord(input)
  const rawStatus = asText(row.status)
  const status = rawStatus === 'PASS' || rawStatus === 'FAIL' ? rawStatus : 'UNKNOWN'
  const rawCoverage = asRecord(row.coverage)
  const coverage = Object.fromEntries(
    Object.entries(rawCoverage)
      .map(([key, value]) => [key, asNumber(value)])
      .filter((entry): entry is [string, number] => entry[1] !== null),
  )

  return {
    profileSlug,
    status,
    productCount: asNumber(row.productCount ?? row.product_count) || 0,
    detailSuccessRate: asNumber(row.detailSuccessRate ?? row.detail_success_rate) || 0,
    capturedAt: asText(row.generatedAt ?? row.captured_at),
    observedDate: asText(row.date ?? row.observed_date),
    coverage,
  }
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 1800, tags: ['trendyol-market'] },
  })
  if (!response.ok) throw new Error(`market-source-${response.status}`)
  return response.json() as Promise<unknown>
}

async function getGithubSnapshot(profile: MarketProfile) {
  const root = profileRoot(profile)
  const [rawProducts, rawQuality] = await Promise.all([
    fetchJson(`${root}/data/latest.json`),
    fetchJson(`${root}/quality/latest.json`),
  ])
  const products = Array.isArray(rawProducts)
    ? rawProducts
        .map((product) => normalizeMarketProduct(product, profile.slug))
        .filter((product): product is MarketProduct => Boolean(product))
    : []

  return {
    products,
    quality: normalizeQuality(rawQuality, profile.slug),
  }
}

async function getSupabaseSnapshot(profile: MarketProfile) {
  const database = createServiceClient() || supabase
  if (!database) return null
  const { data, error } = await database
    .from('market_latest_observations')
    .select('*')
    .eq('profile_slug', profile.slug)
    .order('rank_position', { ascending: true })
    .limit(200)
  if (error || !data?.length) return null

  const products = data
    .map((product) => normalizeMarketProduct(product, profile.slug))
    .filter((product): product is MarketProduct => Boolean(product))
  const first = asRecord(data[0])
  const quality = normalizeQuality(
    {
      status: first.run_status,
      product_count: first.run_product_count,
      detail_success_rate: first.run_detail_success_rate,
      captured_at: first.captured_at,
      observed_date: first.observed_date,
      coverage: first.run_coverage,
    },
    profile.slug,
  )
  return { products, quality }
}

async function getSupabaseQuality(profile: MarketProfile) {
  const database = createServiceClient() || supabase
  if (!database) return null
  const { data, error } = await database
    .from('market_pipeline_runs')
    .select('status,product_count,detail_success_rate,coverage,captured_at,observed_date')
    .eq('profile_slug', profile.slug)
    .in('status', ['PASS', 'PARTIAL'])
    .order('captured_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error || !data) return null
  return normalizeQuality(data, profile.slug)
}

export async function getMarketSnapshot(
  profileValue: unknown,
  profiles: MarketProfile[] = DEFAULT_MARKET_PROFILES,
): Promise<MarketSnapshot> {
  const profile = getMarketProfile(profileValue, profiles)
  const csvUrl = `${profileRoot(profile)}/data/latest.csv`
  try {
    const databaseSnapshot = await getSupabaseSnapshot(profile)
    if (databaseSnapshot) {
      return { profile, ...databaseSnapshot, source: 'supabase', csvUrl }
    }
    const githubSnapshot = await getGithubSnapshot(profile)
    return { profile, ...githubSnapshot, source: 'github', csvUrl }
  } catch {
    return {
      profile,
      products: [],
      quality: normalizeQuality({}, profile.slug),
      source: 'unavailable',
      csvUrl,
    }
  }
}

export async function getMarketQualities(profiles: MarketProfile[] = DEFAULT_MARKET_PROFILES) {
  return Promise.all(
    profiles.map(async (profile) => {
      try {
        const databaseQuality = await getSupabaseQuality(profile)
        if (databaseQuality) return databaseQuality
        const rawQuality = await fetchJson(`${profileRoot(profile)}/quality/latest.json`)
        return normalizeQuality(rawQuality, profile.slug)
      } catch {
        return normalizeQuality({}, profile.slug)
      }
    }),
  )
}

export async function getMarketTaxonomyOverview(): Promise<MarketTaxonomyOverview | null> {
  const database = createServiceClient() || supabase
  if (!database) return null
  const { data, error } = await database
    .from('market_taxonomy_runs')
    .select('*')
    .eq('marketplace', 'trendyol')
    .in('status', ['PASS', 'PARTIAL'])
    .order('observed_date', { ascending: false })
    .order('captured_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error || !data) return null
  const roots = Array.isArray(data.roots) ? data.roots : []
  return {
    observedDate: String(data.observed_date),
    capturedAt: String(data.captured_at),
    catalogGeneratedAt: String(data.catalog_generated_at),
    totalCategoryPaths: Number(data.total_category_paths || 0),
    totalCategories: Number(data.total_categories || 0),
    coveredCategories: Number(data.covered_categories || 0),
    coverage: Number(data.coverage || 0),
    uniqueProducts: Number(data.unique_products || 0),
    rankingMemberships: Number(data.ranking_memberships || 0),
    categoriesWithProducts: Number(data.categories_with_products || 0),
    emptyCategories: Number(data.empty_categories || 0),
    roots: roots
      .map((value) => asRecord(value))
      .map((root) => ({
        categoryId: Number(root.categoryId || 0),
        name: String(root.name || ''),
        totalCategories: Number(root.totalCategories || 0),
      }))
      .filter((root) => root.categoryId > 0 && root.name),
  }
}

export async function getMarketTaxonomyDates(limit = 30): Promise<string[]> {
  const database = createServiceClient() || supabase
  if (!database) return []
  const { data, error } = await database
    .from('market_taxonomy_runs')
    .select('observed_date')
    .eq('marketplace', 'trendyol')
    .in('status', ['PASS', 'PARTIAL'])
    .order('observed_date', { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 90))
  if (error || !data) return []
  return data.map((row) => String(row.observed_date)).filter(Boolean)
}

export async function getMarketTaxonomyCategories(
  query = '',
  rootId: number | null = null,
  limit = 40,
): Promise<MarketTaxonomyCategory[]> {
  const database = createServiceClient() || supabase
  if (!database) return []
  let request = database
    .from('market_taxonomy_category_paths')
    .select('category_id,path_key,path,level,root_id,source_url')
    .eq('marketplace', 'trendyol')
    .order('level', { ascending: true })
    .order('path', { ascending: true })
    .limit(Math.min(Math.max(limit, 1), 100))
  if (rootId) request = request.eq('root_id', rootId)
  if (query.trim()) request = request.ilike('path', `%${query.trim().slice(0, 80)}%`)
  const { data, error } = await request
  if (error || !data) return []
  return data.map((row) => ({
    categoryId: Number(row.category_id),
    pathKey: String(row.path_key),
    path: String(row.path),
    level: Number(row.level),
    rootId: Number(row.root_id),
    sourceUrl: String(row.source_url),
  }))
}

async function getMarketTaxonomyCategory(categoryId: number) {
  const database = createServiceClient() || supabase
  if (!database || !Number.isInteger(categoryId) || categoryId < 1) return null
  const { data, error } = await database
    .from('market_taxonomy_category_paths')
    .select('category_id,path_key,path,level,root_id,source_url')
    .eq('marketplace', 'trendyol')
    .eq('category_id', categoryId)
    .order('level', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error || !data) return null
  return {
    categoryId: Number(data.category_id),
    pathKey: String(data.path_key),
    path: String(data.path),
    level: Number(data.level),
    rootId: Number(data.root_id),
    sourceUrl: String(data.source_url),
  } satisfies MarketTaxonomyCategory
}

export async function getMarketTaxonomySnapshot(
  categoryId: number,
  observedDate: string | null = null,
): Promise<MarketTaxonomySnapshot> {
  const database = createServiceClient() || supabase
  if (!database) return { category: null, products: [], observedDate: null }
  const [category, response] = await Promise.all([
    getMarketTaxonomyCategory(categoryId),
    database.rpc('get_market_category_rankings', {
      p_category_id: categoryId,
      p_observed_date: observedDate,
      p_limit: 40,
    }),
  ])
  if (response.error || !response.data) return { category, products: [], observedDate: null }
  const firstRow = asRecord(response.data[0])
  const run = firstRow.observed_date
    ? await database
        .from('market_taxonomy_runs')
        .select('id')
        .eq('marketplace', 'trendyol')
        .in('status', ['PASS', 'PARTIAL'])
        .eq('observed_date', String(firstRow.observed_date))
        .eq('captured_at', String(firstRow.captured_at))
        .limit(1)
        .maybeSingle()
    : null
  const details = run?.data?.id
    ? await database
        .from('market_taxonomy_product_observations')
        .select('product_key,metrics')
        .eq('run_id', run.data.id)
        .in(
          'product_key',
          response.data.map((value: unknown) => String(asRecord(value).product_key)),
        )
    : null
  const metricsByKey = new Map(
    (details?.data || []).map((row) => [row.product_key, normalizeProductMetrics(row.metrics)]),
  )
  const products = response.data.map((value: unknown) => {
    const row = asRecord(value)
    return {
      observedDate: String(row.observed_date || ''),
      capturedAt: String(row.captured_at || ''),
      metrics: metricsByKey.get(String(row.product_key)) || {},
      categoryId: Number(row.category_id),
      rank: Number(row.rank),
      previousRank: asNumber(row.previous_rank),
      rankDelta: asNumber(row.rank_delta),
      productKey: String(row.product_key || ''),
      productId: String(row.product_id || ''),
      merchantId: asText(row.merchant_id),
      title: String(row.title || ''),
      brand: asText(row.brand),
      url: String(row.url || ''),
      imageUrl: asText(row.image_url),
      price: asNumber(row.price),
      previousPrice: asNumber(row.previous_price),
      priceDeltaPercent: asNumber(row.price_delta_percent),
      originalPrice: asNumber(row.original_price),
      currency: String(row.currency || 'TRY'),
      inStock: typeof row.in_stock === 'boolean' ? row.in_stock : null,
      runningOut: typeof row.running_out === 'boolean' ? row.running_out : null,
      rating: asNumber(row.rating),
      ratingCount: asNumber(row.rating_count),
      promotions: asStringArray(row.promotions),
      fastDelivery: typeof row.fast_delivery === 'boolean' ? row.fast_delivery : null,
      rushDeliveryHours: asNumber(row.rush_delivery_hours),
    } satisfies MarketTaxonomyProduct
  })
  return {
    category,
    products,
    observedDate: products[0]?.observedDate || observedDate,
    metricsUnavailable: Boolean(products.length && (!run?.data || !details || details.error)),
  }
}

function includesSearch(product: MarketProduct, query: string) {
  if (!query) return true
  const haystack = [product.title, product.brand, product.category, product.sellerName]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('tr-TR')
  return haystack.includes(query.toLocaleLowerCase('tr-TR'))
}

export function selectMarketProducts(products: MarketProduct[], view: MarketViewSlug, query = '') {
  const searched = products.filter((product) => includesSearch(product, query.trim()))
  if (view === 'yukselenler') {
    return searched
      .filter((product) => (product.rankDelta || 0) > 0 || (product.reviewDelta || 0) > 0)
      .sort((a, b) => (b.rankDelta || 0) - (a.rankDelta || 0))
  }
  if (view === 'firsat-radari') {
    return searched
      .filter((product) => product.opportunityScore !== null)
      .sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0))
  }
  if (view === 'fiyat-dususleri') {
    return searched
      .filter((product) => (product.priceDeltaPercent || 0) < 0)
      .sort((a, b) => (a.priceDeltaPercent || 0) - (b.priceDeltaPercent || 0))
  }
  if (view === 'stok-sinyalleri') {
    return searched.filter(
      (product) =>
        product.stockStatus === 'OutOfStock' ||
        /son \d+ ürün|tüken/i.test(product.stockSignal || ''),
    )
  }
  return searched.sort(
    (a, b) =>
      (a.compositePosition || Number.MAX_SAFE_INTEGER) -
      (b.compositePosition || Number.MAX_SAFE_INTEGER),
  )
}

export function summarizeMarketProducts(products: MarketProduct[]) {
  const prices = products
    .map((product) => product.price)
    .filter((price): price is number => price !== null)
    .sort((a, b) => a - b)
  return {
    medianPrice: prices.length ? prices[Math.floor(prices.length / 2)] : null,
    risingCount: products.filter((product) => (product.rankDelta || 0) > 0).length,
    priceDropCount: products.filter((product) => (product.priceDeltaPercent || 0) < 0).length,
    stockRiskCount: products.filter(
      (product) =>
        product.stockStatus === 'OutOfStock' ||
        /son \d+ ürün|tüken/i.test(product.stockSignal || ''),
    ).length,
  }
}

export function formatMarketMoney(value: number | null) {
  if (value === null) return '—'
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatMarketDate(value: string | null) {
  if (!value) return 'Henüz doğrulanmadı'
  const date = new Date(value.length === 10 ? `${value}T12:00:00+03:00` : value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: value.length > 10 ? '2-digit' : undefined,
    minute: value.length > 10 ? '2-digit' : undefined,
    timeZone: 'Europe/Istanbul',
  }).format(date)
}

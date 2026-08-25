import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextResponse } from 'next/server'
import { buildRagContext, toContextText } from '@/lib/rag'
import {
  extractMarketView,
  extractMarketThresholds,
  extractEntityAnalysisRequest,
  extractPriceBounds,
  extractProductId,
  extractProductQuery,
  extractProfitInputs,
  isComparisonQuestion,
  isEntityAnalysisQuestion,
  isExplanationQuestion,
  looksLikeMarketQuestion,
  looksLikeProfitQuestion,
  missingProfitInputs,
  calculateProfit,
  profitCalculatorHref,
  recommendTool,
  type VeriAssistantMode,
  type VeriAssistantMessage,
  type ProfitInputs,
} from '@/lib/veri-assistant'
import {
  analyzeEntity,
  buildEntityBenchmark,
  buildProductInsights,
  findEntityProducts,
  getEntityPeerProducts,
  monthlyDemandRunRateMin,
  normalizeEntityText,
  type EvidenceFact,
  type ProductInsight,
} from '@/lib/veri-assistant-analytics'
import {
  formatMarketDate,
  getMarketProfiles,
  getMarketSnapshot,
  selectMarketProducts,
  summarizeMarketProducts,
  type MarketProduct,
  type MarketSnapshot,
} from '@/lib/trendyol-market'

export const runtime = 'nodejs'
export const maxDuration = 30

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX = 20
const requests = new Map<string, { count: number; resetAt: number }>()
const ASSISTANT_MODES = new Set<VeriAssistantMode>([
  'product',
  'market',
  'entity',
  'profit',
  'compare',
  'tools',
])

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = requests.get(key)
  if (!current || now > current.resetAt) {
    requests.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (current.count >= RATE_LIMIT_MAX) return false
  current.count += 1
  return true
}

function validateMessages(value: unknown): VeriAssistantMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 16) return null
  const messages = value
    .filter((item): item is VeriAssistantMessage =>
      Boolean(
        item &&
        typeof item === 'object' &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string',
      ),
    )
    .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 2_000) }))
    .filter((item) => item.content)
  return messages.length ? messages : null
}

function validateMode(value: unknown): VeriAssistantMode | null {
  return typeof value === 'string' && ASSISTANT_MODES.has(value as VeriAssistantMode)
    ? (value as VeriAssistantMode)
    : null
}

function money(value: number) {
  return `${value.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL`
}

function number(value: number) {
  return value.toLocaleString('tr-TR', { maximumFractionDigits: 0 })
}

function productPayload(product: MarketProduct, insight?: ProductInsight) {
  return {
    id: product.productId,
    title: product.title,
    brand: product.brand,
    category: product.category,
    price: product.price,
    url: product.url,
    rank: product.rankPosition || product.compositePosition,
    rankDelta: product.rankDelta,
    opportunityScore: product.opportunityScore,
    rating: product.rating,
    salesSignalMin: product.salesSignalMin,
    salesSignal: product.salesSignal,
    monthlyDemandRunRateMin: insight?.monthlyDemandRunRateMin ?? monthlyDemandRunRateMin(product),
    observedSellerCount: insight?.observedSellerCount ?? (product.merchantId ? 1 : 0),
    observedSellerNames:
      insight?.observedSellerNames ?? (product.sellerName ? [product.sellerName] : []),
    minObservedPrice: insight?.minObservedPrice ?? product.price,
    maxObservedPrice: insight?.maxObservedPrice ?? product.price,
    stockSignal: product.stockSignal || product.stockStatus,
    observedDate: product.observedDate,
  }
}

function evidence(...facts: Array<EvidenceFact | null>): EvidenceFact[] {
  return facts.filter((fact): fact is EvidenceFact => fact !== null)
}

function profileMatchesText(profile: { slug: string; label: string }, normalized: string) {
  const slug = profile.slug.toLocaleLowerCase('tr-TR')
  const label = profile.label.toLocaleLowerCase('tr-TR')
  const labelStem = label.replace(/[^a-zçğıöşü0-9]/g, '').slice(0, 7)
  return (
    normalized.includes(slug) ||
    normalized.includes(label) ||
    (labelStem.length >= 5 && normalized.includes(labelStem))
  )
}

function findProfilesInText(
  question: string,
  profiles: Awaited<ReturnType<typeof getMarketProfiles>>,
) {
  const normalized = question.toLocaleLowerCase('tr-TR')
  return profiles.filter((profile) => profileMatchesText(profile, normalized))
}

function marketSource(snapshot: MarketSnapshot) {
  const capturedAt = snapshot.products[0]?.capturedAt || snapshot.quality.capturedAt || null
  return {
    label:
      snapshot.source === 'supabase'
        ? 'Veri Mimarı Pazar Nabzı'
        : snapshot.source === 'github'
          ? 'Veri Mimarı açık gözlem arşivi'
          : 'Pazar verisi kullanılamadı',
    observedAt: formatMarketDate(capturedAt),
    note: 'Herkese açık Trendyol sayfalarında gözlemlenen fiyat, sıralama, stok ve görünür talep sinyalleridir; kesin satış adedi veya tüm pazar değildir.',
  }
}

function combinedMarketSource(snapshots: MarketSnapshot[]) {
  const capturedValues = snapshots
    .flatMap((snapshot) => [snapshot.products[0]?.capturedAt, snapshot.quality.capturedAt])
    .filter((value): value is string => Boolean(value))
    .sort()
  return {
    label: `Veri Mimarı Pazar Nabzı · ${snapshots.length} profil`,
    observedAt: formatMarketDate(capturedValues.at(-1) || null),
    note: 'Sonuçlar profil bazlı günlük gözlemlerin tekilleştirilmiş birleşimidir. Fiyat, sıralama, stok ve görünür talep sinyalleri kesin satış veya tüm pazar anlamına gelmez.',
  }
}

async function loadMarketUniverse(profiles: Awaited<ReturnType<typeof getMarketProfiles>>) {
  const snapshots = await Promise.all(
    profiles.map((profile) => getMarketSnapshot(profile.slug, profiles)),
  )
  const observations = snapshots.flatMap((snapshot) => snapshot.products)
  const insights = buildProductInsights(observations)
  return {
    snapshots,
    observations,
    products: insights.map((insight) => insight.product),
    insights,
    insightByProductId: new Map(insights.map((insight) => [insight.product.productId, insight])),
  }
}

function profitExplanation(result: NonNullable<ReturnType<typeof calculateProfit>>) {
  const input = result.inputs
  return {
    title: 'Sipariş başına kâr formülü',
    formula:
      'Satış − ürün maliyeti − komisyon − kargo − iade − reklam − sabit gider payı = net kâr',
    steps: [
      { label: 'Satış fiyatı', value: input.sale, operation: 'plus' },
      { label: 'Ürün maliyeti', value: input.cost, operation: 'minus' },
      {
        label: `Komisyon · %${input.commission}`,
        value: result.commissionCost,
        operation: 'minus',
      },
      { label: 'Kargo + paketleme', value: input.shipping, operation: 'minus' },
      { label: 'Beklenen iade maliyeti', value: input.returns, operation: 'minus' },
      { label: 'Sipariş başına reklam', value: input.adSpend, operation: 'minus' },
      {
        label: `Sabit gider payı · %${input.overheadPercent}`,
        value: result.overheadCost,
        operation: 'minus',
      },
    ],
    result: result.netProfit,
    breakEvenFormula: 'Başa baş ROAS = satış fiyatı ÷ reklam öncesi katkı payı',
  }
}

async function answerMarketComparison(question: string) {
  const profiles = await getMarketProfiles()
  const matched = findProfilesInText(question, profiles).slice(0, 3)
  if (matched.length < 2) {
    return {
      intent: 'compare',
      reply:
        'Karşılaştırma için iki kategori yazın. Örnek: “Kozmetik ile elektroniği fiyat, yükseliş ve fırsat sinyaliyle karşılaştır.”',
      missingFields: ['karşılaştırılacak ikinci kategori'],
      followUps: [
        'Kozmetik ile elektroniği karşılaştır',
        'Ev & Yaşam ile süpermarketi karşılaştır',
      ],
      source: {
        label: 'Veri Mimarı kategori karşılaştırma motoru',
        note: 'Karşılaştırma yalnız aynı günlük gözlem sözleşmesindeki kategoriler arasında yapılır.',
      },
    }
  }

  const snapshots = await Promise.all(
    matched.map((profile) => getMarketSnapshot(profile.slug, profiles)),
  )
  const comparison = snapshots.map((snapshot) => {
    const summary = summarizeMarketProducts(snapshot.products)
    const entity = analyzeEntity('category', snapshot.profile.label, snapshot.products)
    const topOpportunity = selectMarketProducts(snapshot.products, 'firsat-radari')[0] || null
    return {
      slug: snapshot.profile.slug,
      label: snapshot.profile.label,
      productCount: snapshot.products.length,
      ...summary,
      brandCount: entity.brandCount,
      observedSellerCount: entity.observedSellerCount,
      monthlyDemandRunRateMin: entity.monthlyDemandRunRateMin,
      demandSignalProductCount: entity.demandSignalProductCount,
      topOpportunity: topOpportunity
        ? {
            title: topOpportunity.title,
            score: topOpportunity.opportunityScore,
            price: topOpportunity.price,
            url: topOpportunity.url,
          }
        : null,
    }
  })
  const lowestMedian = [...comparison]
    .filter((item) => item.medianPrice !== null)
    .sort((a, b) => (a.medianPrice || 0) - (b.medianPrice || 0))[0]
  const strongestRise = [...comparison].sort((a, b) => b.risingCount - a.risingCount)[0]

  return {
    intent: 'compare',
    reply: `${comparison.map((item) => item.label).join(' ve ')} için aynı günlük sözleşmedeki sinyalleri karşılaştırdım.${
      lowestMedian ? ` Daha düşük medyan fiyat ${lowestMedian.label} profilinde.` : ''
    }${strongestRise ? ` Daha fazla yükseliş sinyali ${strongestRise.label} profilinde.` : ''}`,
    comparison,
    source: combinedMarketSource(snapshots),
    evidence: evidence(
      {
        label: 'Ürün ve satıcı kapsamı',
        value: `${comparison.reduce((total, item) => total + item.productCount, 0)} gözlem`,
        kind: 'observed',
        note: 'Yalnız karşılaştırılan günlük profillerde görülen kayıtlar.',
      },
      {
        label: 'Medyan ve 30 günlük hız',
        value: 'Açık formülle türetildi',
        kind: 'derived',
        note: 'Görünür kısa dönem talep alt sınırı aynı hızın 30 gün sürmesi varsayımıyla çevrilir.',
      },
    ),
    followUps: [
      `${comparison[0].label} kategorisindeki fırsat ürünlerini göster`,
      `${comparison[1].label} kategorisinde 500 TL altını göster`,
    ],
    action: { href: '/pazar-nabzi/trendyol', label: 'Kategori evrenini aç' },
  }
}

async function answerEntityAnalysis(question: string, explainMode = false) {
  const request = extractEntityAnalysisRequest(question)
  if (!request) return null
  const profiles = await getMarketProfiles()
  const universe = await loadMarketUniverse(profiles)
  let matchingProducts: MarketProduct[] = []
  let label = request.query
  let source = combinedMarketSource(universe.snapshots)
  let profileSlug: string | null = null

  if (request.type === 'category') {
    const profile = findProfilesInText(request.query, profiles)[0]
    if (profile) {
      const snapshot = universe.snapshots.find((item) => item.profile.slug === profile.slug)
      matchingProducts = snapshot?.products || []
      label = profile.label
      profileSlug = profile.slug
      if (snapshot) source = marketSource(snapshot)
    } else {
      const normalizedQuery = normalizeEntityText(request.query)
      matchingProducts = universe.observations.filter((product) =>
        normalizeEntityText(product.category || '').includes(normalizedQuery),
      )
    }
  } else {
    matchingProducts = findEntityProducts(universe.observations, request.type, request.query)
    const exactLabel = matchingProducts.find((product) =>
      request.type === 'brand' ? product.brand : product.sellerName,
    )
    label = (request.type === 'brand' ? exactLabel?.brand : exactLabel?.sellerName) || request.query
  }

  if (!matchingProducts.length) {
    const field =
      request.type === 'brand' ? 'marka' : request.type === 'store' ? 'mağaza' : 'kategori'
    return {
      intent: 'entity',
      reply: `${request.query} için günlük gözlem evrenimde doğrulanmış bir ${field} kaydı bulamadım. Kapsam dışındaki ürün sayısı, satış veya ciro için tahmin üretmiyorum.`,
      source,
      coverage: {
        profileCount: universe.snapshots.length,
        candidateCount: universe.products.length,
        resultCount: 0,
      },
      followUps: ['Kozmetik kategorisini analiz et', 'Kozmetik ile elektroniği karşılaştır'],
      action: { href: '/pazar-nabzi/trendyol', label: 'Gözlem kapsamını aç' },
    }
  }

  const analysis = analyzeEntity(request.type, label, matchingProducts)
  const benchmarkScope =
    request.type === 'category'
      ? 'Tüm Veri Mimarı gözlem evreni'
      : `${number(analysis.categoryCount)} gözlenen alt kategori kümesi`
  const benchmark = buildEntityBenchmark(
    analysis,
    getEntityPeerProducts(request.type, matchingProducts, universe.observations),
    benchmarkScope,
  )
  const entityLabel =
    request.type === 'brand' ? 'marka' : request.type === 'store' ? 'mağaza' : 'kategori'
  const demandText =
    analysis.monthlyDemandRunRateMin === null
      ? 'Görünür talep alt sınırı yeterli değil.'
      : `Görünür sinyaller aynı hızda sürerse 30 günlük toplam alt sınır ${number(analysis.monthlyDemandRunRateMin)} ürün.`

  return {
    intent: 'entity',
    reply: `${explainMode ? 'Analizi aynı gözlem evreni ve formülle yeniden kurdum. ' : ''}${label} ${entityLabel} analizinde ${analysis.productCount} tekil ürün ve ${analysis.observedSellerCount} gözlenen satıcı var. ${demandText}`,
    entityAnalysis: {
      ...analysis,
      benchmark,
      topProducts: analysis.topProducts.map((insight) => productPayload(insight.product, insight)),
    },
    source,
    coverage: {
      profileCount: request.type === 'category' && profileSlug ? 1 : universe.snapshots.length,
      candidateCount: universe.products.length,
      resultCount: analysis.productCount,
    },
    evidence: evidence(
      {
        label: 'Tekil ürün',
        value: number(analysis.productCount),
        kind: 'observed',
        note: 'Son başarılı günlük gözlemde tekilleştirildi.',
      },
      {
        label: 'Gözlenen satıcı',
        value: number(analysis.observedSellerCount),
        kind: 'observed',
        note: 'Toplam Trendyol satıcı sayısı değil; veri evreninde görülen farklı satıcılardır.',
      },
      analysis.monthlyDemandRunRateMin === null
        ? null
        : {
            label: '30 günlük hız alt sınırı',
            value: `${number(analysis.monthlyDemandRunRateMin)}+ ürün`,
            kind: 'derived',
            note: `${analysis.demandSignalProductCount} üründeki görünür kısa dönem satış alt sınırı 30 güne çevrildi; gerçekleşmiş aylık satış değildir.`,
          },
      analysis.monthlyRevenueRunRateMin === null
        ? null
        : {
            label: '30 günlük ciro hız alt sınırı',
            value: `${money(analysis.monthlyRevenueRunRateMin)}+`,
            kind: 'derived',
            note: 'Ürün fiyatı × 30 günlük talep hızı alt sınırı; sipariş veya finansal kayıt değildir.',
          },
      benchmark.entityProductSharePercent === null
        ? null
        : {
            label: 'Gözlem evreni ürün payı',
            value: `%${benchmark.entityProductSharePercent.toLocaleString('tr-TR')}`,
            kind: 'derived',
            note: `${benchmark.peerProductCount} tekil üründen oluşan ${benchmark.scopeLabel.toLocaleLowerCase('tr-TR')} içinde hesaplanır; tüm Trendyol pazar payı değildir.`,
          },
      benchmark.demandRunRateSharePercent === null
        ? null
        : {
            label: 'Hız sinyali payı',
            value: `%${benchmark.demandRunRateSharePercent.toLocaleString('tr-TR')}`,
            kind: 'derived',
            note: 'Aynı karşılaştırma kümesindeki görünür 30 günlük hız alt sınırları üzerinden hesaplanır; gerçekleşmiş satış payı değildir.',
          },
    ),
    explanation: {
      title: 'Analiz nasıl kuruldu?',
      formula:
        'Günlük gözlemler → ürün kimliğine göre tekilleştirme → kapsam metrikleri → görünür talep alt sınırını 30 güne çevirme',
      steps: [
        { label: 'Gözlemdeki ürün', text: number(analysis.productCount) },
        { label: 'Talep sinyali bulunan ürün', text: number(analysis.demandSignalProductCount) },
        { label: 'Kapsam', text: 'Tüm Trendyol değil; Veri Mimarı günlük gözlem evreni' },
      ],
    },
    followUps:
      request.type === 'category'
        ? [`${label} kategorisinde 500 TL altı ürünleri bul`, `${label} fırsat ürünlerini göster`]
        : [`${label} ürünlerini fırsat skoruna göre göster`, 'Bu analizdeki rakamları açıkla'],
    action: {
      href: profileSlug ? `/pazar-nabzi/trendyol?kategori=${profileSlug}` : '/pazar-nabzi/trendyol',
      label: 'Gözlem evrenini aç',
    },
  }
}

async function answerMarketQuestion(
  question: string,
  explainMode = false,
  allowBareProductQuery = false,
) {
  const profiles = await getMarketProfiles()
  const universe = await loadMarketUniverse(profiles)
  const matchedProfile = findProfilesInText(question, profiles)[0]
  let snapshot =
    universe.snapshots.find(
      (item) => item.profile.slug === (matchedProfile?.slug || 'genel-cok-satanlar'),
    ) || universe.snapshots[0]
  const productId = extractProductId(question)

  if (productId) {
    const insight = universe.insightByProductId.get(productId)
    const match = insight?.product

    if (!match) {
      return {
        intent: 'market',
        reply:
          'Bu ürün linki mevcut günlük gözlem kapsamımda görünmüyor. Linkteki ürün için satış veya satıcı sayısı uydurmayacağım; Pazar Nabzı’nda kategori üzerinden arama yapabilirsiniz.',
        products: [],
        source: marketSource(snapshot),
        action: {
          href: '/pazar-nabzi/trendyol',
          label: 'Pazar Nabzı’nı aç',
        },
        followUps: ['Kozmetikte yükselen ürünleri göster', '500 TL altında fırsat ürünlerini bul'],
      }
    }

    snapshot =
      universe.snapshots.find((item) =>
        item.products.some((product) => product.productId === productId),
      ) || snapshot
    const payload = productPayload(match, insight)
    return {
      intent: 'product',
      reply: `${match.title} için tek kartta doğrulanabilen sinyalleri topladım. ${
        match.price === null ? 'Fiyat sinyali yok.' : `Son gözlenen fiyat ${money(match.price)}.`
      } ${insight?.observedSellerCount ? `Gözlem evreninde ${insight.observedSellerCount} farklı satıcı görüldü.` : 'Satıcı sinyali yok.'}`,
      products: [payload],
      productAnalysis: {
        ...payload,
        observationCount: insight?.observationCount || 1,
        profileCount: insight?.profileCount || 1,
      },
      source: marketSource(snapshot),
      action: {
        href: `/pazar-nabzi/trendyol?kategori=${snapshot.profile.slug}`,
        label: 'Kategori görünümünü aç',
      },
      explanation: {
        title: 'Ürün kartı seçim yöntemi',
        formula:
          'Ürün kimliği → tüm günlük profil gözlemleri → fiyat, görülen satıcı, sıra, stok ve talep sinyali',
        steps: [
          { label: 'Ürün kimliği', text: match.productId },
          { label: 'Gözlem profili', text: snapshot.profile.label },
          { label: 'Gözlem tarihi', text: match.observedDate || 'Tarih yok' },
        ],
      },
      evidence: evidence(
        match.price === null
          ? null
          : { label: 'Fiyat', value: money(match.price), kind: 'observed' },
        insight?.observedSellerCount
          ? {
              label: 'Gözlenen satıcı',
              value: number(insight.observedSellerCount),
              kind: 'observed',
              note: 'Toplam teklif sayısı değil; Veri Mimarı gözlem evreninde görülen farklı satıcılardır.',
            }
          : null,
        insight?.monthlyDemandRunRateMin
          ? {
              label: '30 günlük hız alt sınırı',
              value: `${number(insight.monthlyDemandRunRateMin)}+ ürün`,
              kind: 'derived',
              note: 'Görünür kısa dönem alt sınırı aynı hızın sürmesi varsayımıyla 30 güne çevrildi.',
            }
          : null,
      ),
      followUps: [
        'Maliyetim 200, komisyon %15, kargo 90; bu üründe ne kalır?',
        `${snapshot.profile.label} kategorisini analiz et`,
      ],
    }
  }

  const view = extractMarketView(question)
  const query = extractProductQuery(question, Boolean(matchedProfile), allowBareProductQuery)
  const bounds = extractPriceBounds(question)
  const thresholds = extractMarketThresholds(question)
  let source = marketSource(snapshot)
  let profileCount = 1
  let candidateProducts = snapshot.products
  let productInsights = universe.insightByProductId

  if (!matchedProfile) {
    candidateProducts = universe.products
    source = combinedMarketSource(universe.snapshots)
    profileCount = universe.snapshots.length
  }

  let products = selectMarketProducts(candidateProducts, view, query)
  products = products.filter((product) => {
    if (product.price === null && (bounds.min !== undefined || bounds.max !== undefined))
      return false
    if (bounds.max !== undefined && (product.price || 0) > bounds.max) return false
    if (bounds.min !== undefined && (product.price || 0) < bounds.min) return false
    if (thresholds.minRating !== undefined && (product.rating || 0) < thresholds.minRating)
      return false
    if (
      thresholds.minOpportunityScore !== undefined &&
      (product.opportunityScore || 0) < thresholds.minOpportunityScore
    )
      return false
    if (
      thresholds.minObservedSales !== undefined &&
      (product.salesSignalMin || 0) < thresholds.minObservedSales
    )
      return false
    const insight = productInsights.get(product.productId)
    if (
      thresholds.minMonthlyRunRate !== undefined &&
      (insight?.monthlyDemandRunRateMin || 0) < thresholds.minMonthlyRunRate
    )
      return false
    if (
      thresholds.maxObservedSellerCount !== undefined &&
      (!insight?.observedSellerCount ||
        insight.observedSellerCount > thresholds.maxObservedSellerCount)
    )
      return false
    if (
      thresholds.minObservedSellerCount !== undefined &&
      (insight?.observedSellerCount || 0) < thresholds.minObservedSellerCount
    )
      return false
    return true
  })
  const top = products.slice(0, 5)
  const viewLabel = {
    'cok-satanlar': 'çok satan',
    yukselenler: 'yükselen',
    'firsat-radari': 'fırsat',
    'fiyat-dususleri': 'fiyatı düşen',
    'stok-sinyalleri': 'stok sinyalli',
  }[view]
  const scope = matchedProfile?.label || `${profileCount} profil`
  const appliedFilters = [
    bounds.max !== undefined ? `Fiyat ≤ ${money(bounds.max)}` : null,
    bounds.min !== undefined ? `Fiyat ≥ ${money(bounds.min)}` : null,
    thresholds.minRating !== undefined ? `Puan ≥ ${thresholds.minRating}` : null,
    thresholds.minOpportunityScore !== undefined
      ? `Fırsat skoru ≥ ${thresholds.minOpportunityScore}`
      : null,
    thresholds.minObservedSales !== undefined
      ? `Gözlemlenen satış sinyali ≥ ${thresholds.minObservedSales}`
      : null,
    thresholds.minMonthlyRunRate !== undefined
      ? `30 günlük hız alt sınırı ≥ ${thresholds.minMonthlyRunRate}`
      : null,
    thresholds.maxObservedSellerCount !== undefined
      ? `Gözlenen satıcı ≤ ${thresholds.maxObservedSellerCount}`
      : null,
    thresholds.minObservedSellerCount !== undefined
      ? `Gözlenen satıcı ≥ ${thresholds.minObservedSellerCount}`
      : null,
    query ? `Arama: ${query}` : null,
  ].filter((item): item is string => Boolean(item))

  return {
    intent: 'market',
    reply: top.length
      ? `${explainMode ? 'Önceki sonucu aynı ölçütlerle yeniden kurdum. ' : ''}${scope} içinde ölçütünüze uyan ${top.length} ${viewLabel} ürünü öne çıkardım.${thresholds.maxObservedSellerCount !== undefined || thresholds.minObservedSellerCount !== undefined ? ' Satıcı filtresi toplam Trendyol teklifini değil, gözlem evreninde görülen farklı satıcıları kullanır.' : ''}`
      : `${scope} görünümünde bu ölçüte uyan doğrulanmış bir günlük sinyal bulamadım. Kapsam dışındaki ürünler için sayı üretmiyorum.`,
    products: top.map((product) => productPayload(product, productInsights.get(product.productId))),
    source,
    appliedFilters,
    coverage: {
      profileCount,
      candidateCount: candidateProducts.length,
      resultCount: products.length,
    },
    explanation: {
      title: 'Sonuç sıralama yöntemi',
      formula:
        view === 'firsat-radari'
          ? 'Filtreler → fırsat skoru yüksekten düşüğe → ilk 5 gözlem'
          : view === 'yukselenler'
            ? 'Filtreler → sıra değişimi yüksekten düşüğe → ilk 5 gözlem'
            : 'Filtreler → seçilen pazar görünümünün sırası → ilk 5 gözlem',
      steps: [
        { label: 'Taranan profil', text: String(profileCount) },
        { label: 'Tekil aday ürün', text: String(candidateProducts.length) },
        { label: 'Filtre sonrası sonuç', text: String(products.length) },
      ],
    },
    evidence: evidence(
      {
        label: 'Aday evren',
        value: `${number(candidateProducts.length)} ürün`,
        kind: 'observed',
        note: 'Son başarılı profil gözlemlerinin tekilleştirilmiş kapsamı.',
      },
      thresholds.minMonthlyRunRate !== undefined
        ? {
            label: '30 günlük hız filtresi',
            value: `${number(thresholds.minMonthlyRunRate)}+ ürün`,
            kind: 'derived',
            note: 'Görünür kısa dönem satış alt sınırından türetildi; gerçekleşmiş aylık satış değildir.',
          }
        : null,
      thresholds.maxObservedSellerCount !== undefined
        ? {
            label: 'Satıcı yoğunluğu filtresi',
            value: `≤ ${thresholds.maxObservedSellerCount} gözlenen satıcı`,
            kind: 'observed',
            note: 'Toplam pazar satıcı sayısını temsil etmez.',
          }
        : null,
    ),
    followUps: matchedProfile
      ? [
          `${matchedProfile.label} kategorisinde 500 TL altını göster`,
          `${matchedProfile.label} kategorisindeki fırsat ürünlerini göster`,
        ]
      : ['Kozmetikte yükselen ürünleri göster', 'Elektronikte fiyatı düşen ürünleri göster'],
    action: {
      href: `/pazar-nabzi/trendyol?kategori=${matchedProfile?.slug || snapshot.profile.slug}&gorunum=${view}${
        query ? `&arama=${encodeURIComponent(query)}` : ''
      }#radar`,
      label: 'Tüm pazar sinyallerini gör',
    },
  }
}

async function resolveProfitContext(messages: VeriAssistantMessage[]) {
  const inputs = extractProfitInputs(messages)
  if (inputs.sale !== undefined) return { inputs, observedSaleProduct: null }
  const productId = [...messages]
    .reverse()
    .filter((message) => message.role === 'user')
    .map((message) => extractProductId(message.content))
    .find((value): value is string => Boolean(value))
  if (!productId) return { inputs, observedSaleProduct: null }

  const profiles = await getMarketProfiles()
  const universe = await loadMarketUniverse(profiles)
  const product = universe.insightByProductId.get(productId)?.product || null
  if (product?.price === null || product?.price === undefined) {
    return { inputs, observedSaleProduct: null }
  }
  return {
    inputs: { ...inputs, sale: product.price },
    observedSaleProduct: product,
  }
}

function answerProfitQuestion(
  messages: VeriAssistantMessage[],
  resolvedInputs?: ProfitInputs,
  observedSaleProduct?: MarketProduct | null,
) {
  const inputs = resolvedInputs || extractProfitInputs(messages)
  const missing = missingProfitInputs(inputs)
  if (missing.length) {
    return {
      intent: 'profit',
      reply: `Hesabı uydurmadan tamamlamak için ${missing.join(', ')} bilgisini de yazın. Örnek: “Satış 750, maliyet 250, komisyon %15, kargo 90.”`,
      missingFields: missing,
      detectedInputs: inputs,
      source: {
        label: 'Veri Mimarı açık hesaplama yöntemi',
        note: 'Eksik maliyetler için varsayılan oran kullanılmaz.',
      },
      followUps: ['Satış 750, maliyet 250, komisyon %15, kargo 90', 'Kârlılık formülünü göster'],
      evidence: evidence(
        observedSaleProduct?.price
          ? {
              label: 'Satış fiyatı',
              value: money(observedSaleProduct.price),
              kind: 'observed',
              note: `${observedSaleProduct.title} için son gözlenen fiyat kullanıldı.`,
            }
          : null,
      ),
    }
  }

  const result = calculateProfit(inputs)!
  const status = result.netProfit >= 0 ? 'kâr' : 'zarar'
  return {
    intent: 'profit',
    reply: `Bu senaryoda sipariş başına ${money(Math.abs(result.netProfit))} ${status} kalıyor. Net marj %${result.netMargin.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}; reklam öncesi başa baş ROAS ${
      result.breakEvenRoas === null
        ? 'oluşmuyor'
        : `${result.breakEvenRoas.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}x`
    }.`,
    calculation: result,
    explanation: profitExplanation(result),
    evidence: evidence(
      {
        label: 'Maliyet girdileri',
        value: 'Konuşmadan alındı',
        kind: 'user',
      },
      observedSaleProduct?.price
        ? {
            label: 'Satış fiyatı',
            value: money(observedSaleProduct.price),
            kind: 'observed',
            note: 'Ürün linkinin son günlük fiyat gözleminden otomatik dolduruldu.',
          }
        : { label: 'Satış fiyatı', value: money(result.inputs.sale), kind: 'user' },
      {
        label: 'Net kâr ve ROAS',
        value: 'Açık formülle hesaplandı',
        kind: 'derived',
      },
    ),
    source: {
      label: 'Veri Mimarı deterministik kârlılık motoru',
      note: observedSaleProduct
        ? 'Satış fiyatı son ürün gözleminden; diğer maliyetler yalnızca yazdığınız değerlerden gelir. KDV mahsuplaşması ve yazmadığınız sabit giderler ayrıca modellenmez.'
        : 'Hesap yalnızca yazdığınız değerleri kullanır. KDV mahsuplaşması ve yazmadığınız sabit giderler ayrıca modellenmez.',
    },
    action: {
      href: profitCalculatorHref(result),
      label: 'Ayrıntılı ROAS hesabını aç',
    },
    followUps: ['Kargoyu 110 yap', 'Sipariş başına reklam 50 ekle', 'Bu rakam nereden çıktı?'],
  }
}

function answerProfitExplanation(
  messages: VeriAssistantMessage[],
  resolvedInputs?: ProfitInputs,
  observedSaleProduct?: MarketProduct | null,
) {
  const inputs = resolvedInputs || extractProfitInputs(messages)
  const missing = missingProfitInputs(inputs)
  if (missing.length) return answerProfitQuestion(messages, inputs, observedSaleProduct)
  const result = calculateProfit(inputs)!
  return {
    intent: 'explain',
    reply:
      'Sonucu yalnız konuşmada verdiğiniz kalemlerle yeniden kurdum. Her kesinti aşağıda ayrı satırda; başa baş ROAS ise reklam öncesi katkı payından hesaplanıyor.',
    calculation: result,
    explanation: profitExplanation(result),
    evidence: evidence(
      {
        label: 'Kullanıcı girdileri',
        value: 'Maliyet, komisyon ve kargo',
        kind: 'user',
      },
      observedSaleProduct?.price
        ? {
            label: 'Satış fiyatı',
            value: money(observedSaleProduct.price),
            kind: 'observed',
          }
        : null,
      { label: 'Sonuç', value: money(result.netProfit), kind: 'derived' },
    ),
    source: {
      label: 'Veri Mimarı deterministik kârlılık motoru',
      note: observedSaleProduct
        ? 'Satış fiyatı ürün gözleminden; diğer kalemler konuşmadan alındı. Sektör ortalaması veya model tahmini eklenmedi.'
        : 'Sektör ortalaması veya model tahmini eklenmedi; yazmadığınız kalemler sıfır kabul edildi ve dökümde görünür tutuldu.',
    },
    followUps: ['Kargoyu 110 yap', 'İade maliyetini 30 yap', 'Ayrıntılı ROAS aracını aç'],
    action: { href: profitCalculatorHref(result), label: 'Ayrıntılı ROAS hesabını aç' },
  }
}

function answerProfitFormula() {
  return {
    intent: 'explain',
    reply:
      'Sipariş başına net kâr, satıştan siparişle birlikte artan tüm maliyetler çıkarılarak bulunur. Başka bir oran eklemem; eksik girdiyi sizden isterim.',
    explanation: {
      title: 'Açık kârlılık yöntemi',
      formula:
        'Satış − ürün maliyeti − komisyon − kargo − iade − reklam − sabit gider payı = net kâr',
      steps: [
        { label: 'Komisyon maliyeti', text: 'Satış fiyatı × komisyon oranı' },
        { label: 'Reklam öncesi katkı', text: 'Satış − ürün − komisyon − kargo − iade' },
        { label: 'Başa baş ROAS', text: 'Satış ÷ reklam öncesi katkı' },
      ],
    },
    source: {
      label: 'Veri Mimarı açık hesaplama yöntemi',
      note: 'Formül deterministiktir; sonuç üretmek için satış, maliyet, komisyon ve kargo gerekir.',
    },
    followUps: ['Satış 750, maliyet 250, komisyon %15, kargo 90'],
  }
}

async function answerGeneralQuestion(question: string) {
  const tool = recommendTool(question)
  if (tool) {
    return {
      intent: 'tool',
      reply: `${tool.title} bu iş için en doğrudan araç. ${tool.description}`,
      tool,
      action: { href: tool.href, label: tool.label },
      source: {
        label: 'Veri Mimarı araç kütüphanesi',
        note: 'Öneri, sorudaki görev ve mevcut araçların kapsamı eşleştirilerek üretildi.',
      },
      followUps: ['Kârlılığımı konuşarak hesapla', 'Trendyol fırsat ürünlerini göster'],
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      intent: 'guide',
      reply:
        'Bu soruyu mevcut karar araçlarıyla güvenilir biçimde eşleştiremedim. Bir Trendyol kategori/ürün sorusu sorun veya satış fiyatı, maliyet, komisyon ve kargo değerleriyle kâr hesabı isteyin.',
      action: { href: '/araclar', label: 'Tüm araçları gör' },
      source: {
        label: 'Veri Mimarı görev yönlendiricisi',
        note: 'Kaynağı olmayan sayısal sonuç üretilmedi.',
      },
      followUps: ['Kozmetikte yükselen ürünleri göster', 'Kâr hesabı yapmak istiyorum'],
    }
  }

  try {
    const rag = await buildRagContext(question)
    const context = toContextText(rag)
    const result = await generateText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
      system:
        'Sen Veri Mimarı’nın e-ticaret karar asistanısın. Yalnız verilen bağlama dayan. Bilgi yoksa açıkça söyle. En fazla 120 kelime, Türkçe, doğrudan ve tek bir sonraki adımla yanıt ver. Sayısal veri uydurma.',
      prompt: `SORU:\n${question}\n\nVERİ MİMARI BAĞLAMI:\n${context}`,
      temperature: 0.2,
      maxTokens: 260,
    })
    return {
      intent: 'guide',
      reply: result.text,
      action: { href: '/araclar', label: 'İlgili araçları gör' },
      source: {
        label: 'Veri Mimarı rehber ve proje dizini',
        note: 'Yanıt site içeriğinden getirilen bağlama dayanır; bağlam dışı iddia üretilmez.',
      },
      followUps: ['İlgili ücretsiz aracı göster', 'Bu yöntem için rehber öner'],
    }
  } catch {
    return {
      intent: 'guide',
      reply:
        'Genel yanıt servisi şu anda kullanılamıyor. Trendyol ürün araması için “Ürün bul” modunu, hesaplama için “Kâr hesapla” modunu seçerek devam edebilirsiniz.',
      action: { href: '/araclar', label: 'Tüm araçları gör' },
      source: {
        label: 'Veri Mimarı görev yönlendiricisi',
        note: 'Dış yanıt servisi çalışmadığında doğrulanmamış bilgi veya sayı üretilmez.',
      },
      followUps: ['Kozmetikte yükselen ürünleri göster', 'Kâr hesabı yapmak istiyorum'],
    }
  }
}

export async function POST(request: Request) {
  if (!checkRateLimit(clientIp(request))) {
    return NextResponse.json(
      { error: 'Kısa süreli soru sınırına ulaşıldı. Birkaç dakika sonra yeniden deneyin.' },
      { status: 429, headers: { 'Retry-After': '300' } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 })
  }

  const messages = validateMessages((body as { messages?: unknown })?.messages)
  if (!messages) {
    return NextResponse.json({ error: 'Geçerli bir soru yazın.' }, { status: 400 })
  }
  const mode = validateMode((body as { mode?: unknown })?.mode)
  const question = [...messages].reverse().find((message) => message.role === 'user')?.content || ''

  try {
    const explanationRequested = isExplanationQuestion(question)
    const rawProfitInputs = extractProfitInputs(messages)
    const profitContext =
      looksLikeProfitQuestion(question) || explanationRequested
        ? await resolveProfitContext(messages)
        : { inputs: rawProfitInputs, observedSaleProduct: null }
    const profitInputs = profitContext.inputs
    const previousMarketQuestion = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === 'user' &&
          message.content !== question &&
          looksLikeMarketQuestion(message.content),
      )?.content
    const previousEntityQuestion = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === 'user' &&
          message.content !== question &&
          isEntityAnalysisQuestion(message.content),
      )?.content
    const shouldCalculate =
      looksLikeProfitQuestion(question) &&
      (Object.keys(profitInputs).length > 0 || /kaç kazan|hesapla|olsun|yap/i.test(question))
    const answer =
      explanationRequested && missingProfitInputs(profitInputs).length === 0
        ? answerProfitExplanation(messages, profitInputs, profitContext.observedSaleProduct)
        : explanationRequested && previousEntityQuestion
          ? await answerEntityAnalysis(previousEntityQuestion, true)
          : explanationRequested && previousMarketQuestion
            ? await answerMarketQuestion(previousMarketQuestion, true)
            : explanationRequested && looksLikeProfitQuestion(question)
              ? answerProfitFormula()
              : isComparisonQuestion(question)
                ? await answerMarketComparison(question)
                : isEntityAnalysisQuestion(question)
                  ? await answerEntityAnalysis(question)
                  : shouldCalculate
                    ? answerProfitQuestion(
                        messages,
                        profitInputs,
                        profitContext.observedSaleProduct,
                      )
                    : looksLikeMarketQuestion(question) || mode === 'market'
                      ? await answerMarketQuestion(question, false, mode === 'market')
                      : await answerGeneralQuestion(question)

    return NextResponse.json(answer, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch {
    return NextResponse.json(
      {
        error:
          'Asistan bu isteği tamamlayamadı. Soruyu kısaltıp yeniden deneyin veya ilgili aracı doğrudan açın.',
      },
      { status: 500 },
    )
  }
}

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextResponse } from 'next/server'
import { buildRagContext, toContextText } from '@/lib/rag'
import {
  extractMarketView,
  extractMarketThresholds,
  extractPriceBounds,
  extractProductId,
  extractProductQuery,
  extractProfitInputs,
  isComparisonQuestion,
  isExplanationQuestion,
  looksLikeMarketQuestion,
  looksLikeProfitQuestion,
  missingProfitInputs,
  calculateProfit,
  profitCalculatorHref,
  recommendTool,
  type VeriAssistantMessage,
} from '@/lib/veri-assistant'
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

function money(value: number) {
  return `${value.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL`
}

function productPayload(product: MarketProduct) {
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
    stockSignal: product.stockSignal || product.stockStatus,
    observedDate: product.observedDate,
  }
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

function dedupeProducts(products: MarketProduct[]) {
  const unique = new Map<string, MarketProduct>()
  for (const product of products) {
    const current = unique.get(product.productId)
    if (!current || (product.opportunityScore || 0) > (current.opportunityScore || 0)) {
      unique.set(product.productId, product)
    }
  }
  return [...unique.values()]
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

async function findProductAcrossProfiles(
  productId: string,
  profiles: Awaited<ReturnType<typeof getMarketProfiles>>,
) {
  const snapshots = await Promise.all(
    profiles.map((profile) => getMarketSnapshot(profile.slug, profiles)),
  )
  for (const snapshot of snapshots) {
    const product = snapshot.products.find((item) => item.productId === productId)
    if (product) return { snapshot, product }
  }
  return null
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
    const topOpportunity = selectMarketProducts(snapshot.products, 'firsat-radari')[0] || null
    return {
      slug: snapshot.profile.slug,
      label: snapshot.profile.label,
      productCount: snapshot.products.length,
      ...summary,
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
    followUps: [
      `${comparison[0].label} kategorisindeki fırsat ürünlerini göster`,
      `${comparison[1].label} kategorisinde 500 TL altını göster`,
    ],
    action: { href: '/pazar-nabzi/trendyol', label: 'Kategori evrenini aç' },
  }
}

async function answerMarketQuestion(question: string, explainMode = false) {
  const profiles = await getMarketProfiles()
  const matchedProfile = findProfilesInText(question, profiles)[0]
  let snapshot = await getMarketSnapshot(matchedProfile?.slug || 'genel-cok-satanlar', profiles)
  const productId = extractProductId(question)

  if (productId) {
    const localProduct = snapshot.products.find((product) => product.productId === productId)
    const match = localProduct
      ? { snapshot, product: localProduct }
      : await findProductAcrossProfiles(productId, profiles)

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

    snapshot = match.snapshot
    return {
      intent: 'market',
      reply: `${match.product.title} için son gözlemde ${
        match.product.price === null ? 'fiyat sinyali yok' : `${money(match.product.price)} fiyat`
      } ve ${match.product.rankPosition ? `${match.product.rankPosition}. sıra` : 'sıra bilgisi yok'}. Aşağıdaki kart yalnız gözlemlenmiş sinyalleri gösterir.`,
      products: [productPayload(match.product)],
      source: marketSource(snapshot),
      action: {
        href: `/pazar-nabzi/trendyol?kategori=${snapshot.profile.slug}`,
        label: 'Kategori görünümünü aç',
      },
      explanation: {
        title: 'Ürün kartı seçim yöntemi',
        formula: 'Ürün kimliği → günlük profil gözlemi → fiyat, sıra, stok ve talep sinyali',
        steps: [
          { label: 'Ürün kimliği', text: match.product.productId },
          { label: 'Gözlem profili', text: snapshot.profile.label },
          { label: 'Gözlem tarihi', text: match.product.observedDate || 'Tarih yok' },
        ],
      },
      followUps: [
        `${snapshot.profile.label} kategorisindeki yükselen ürünleri göster`,
        'Bu ürün için kârlılık hesabı yap',
      ],
    }
  }

  const view = extractMarketView(question)
  const query = extractProductQuery(question, Boolean(matchedProfile))
  const bounds = extractPriceBounds(question)
  const thresholds = extractMarketThresholds(question)
  let source = marketSource(snapshot)
  let profileCount = 1
  let candidateProducts = snapshot.products

  if (!matchedProfile) {
    const snapshots = await Promise.all(
      profiles.map((profile) => getMarketSnapshot(profile.slug, profiles)),
    )
    candidateProducts = dedupeProducts(snapshots.flatMap((item) => item.products))
    source = combinedMarketSource(snapshots)
    profileCount = snapshots.length
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
    return true
  })
  const top = products.slice(0, 5)
  const unavailableSellerCount = /satıcı|mağaza sayısı/i.test(question)
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
    query ? `Arama: ${query}` : null,
  ].filter((item): item is string => Boolean(item))

  return {
    intent: 'market',
    reply: top.length
      ? `${explainMode ? 'Önceki sonucu aynı ölçütlerle yeniden kurdum. ' : ''}${scope} içinde ölçütünüze uyan ${top.length} ${viewLabel} ürünü öne çıkardım.${
          unavailableSellerCount
            ? ' Satıcı sayısı bu veri setinde doğrulanmadığı için onu sonuç sıralamasına katmadım.'
            : ''
        }`
      : `${scope} görünümünde bu ölçüte uyan doğrulanmış bir günlük sinyal bulamadım. Kapsam dışındaki ürünler için sayı üretmiyorum.`,
    products: top.map(productPayload),
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

function answerProfitQuestion(messages: VeriAssistantMessage[]) {
  const inputs = extractProfitInputs(messages)
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
    source: {
      label: 'Veri Mimarı deterministik kârlılık motoru',
      note: 'Hesap yalnızca yazdığınız değerleri kullanır. KDV mahsuplaşması ve yazmadığınız sabit giderler ayrıca modellenmez.',
    },
    action: {
      href: profitCalculatorHref(result),
      label: 'Ayrıntılı ROAS hesabını aç',
    },
    followUps: ['Kargoyu 110 yap', 'Sipariş başına reklam 50 ekle', 'Bu rakam nereden çıktı?'],
  }
}

function answerProfitExplanation(messages: VeriAssistantMessage[]) {
  const inputs = extractProfitInputs(messages)
  const missing = missingProfitInputs(inputs)
  if (missing.length) return answerProfitQuestion(messages)
  const result = calculateProfit(inputs)!
  return {
    intent: 'explain',
    reply:
      'Sonucu yalnız konuşmada verdiğiniz kalemlerle yeniden kurdum. Her kesinti aşağıda ayrı satırda; başa baş ROAS ise reklam öncesi katkı payından hesaplanıyor.',
    calculation: result,
    explanation: profitExplanation(result),
    source: {
      label: 'Veri Mimarı deterministik kârlılık motoru',
      note: 'Sektör ortalaması veya model tahmini eklenmedi; yazmadığınız kalemler sıfır kabul edildi ve dökümde görünür tutuldu.',
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
  const question = [...messages].reverse().find((message) => message.role === 'user')?.content || ''

  try {
    const profitInputs = extractProfitInputs(messages)
    const explanationRequested = isExplanationQuestion(question)
    const previousMarketQuestion = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === 'user' &&
          message.content !== question &&
          looksLikeMarketQuestion(message.content),
      )?.content
    const shouldCalculate =
      looksLikeProfitQuestion(question) &&
      (Object.keys(profitInputs).length > 0 || /kaç kazan|hesapla|olsun|yap/i.test(question))
    const answer =
      explanationRequested && missingProfitInputs(profitInputs).length === 0
        ? answerProfitExplanation(messages)
        : explanationRequested && previousMarketQuestion
          ? await answerMarketQuestion(previousMarketQuestion, true)
          : explanationRequested && looksLikeProfitQuestion(question)
            ? answerProfitFormula()
            : isComparisonQuestion(question)
              ? await answerMarketComparison(question)
              : shouldCalculate
                ? answerProfitQuestion(messages)
                : looksLikeMarketQuestion(question)
                  ? await answerMarketQuestion(question)
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

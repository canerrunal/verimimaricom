export type VeriAssistantRole = 'user' | 'assistant'

export type VeriAssistantMessage = {
  role: VeriAssistantRole
  content: string
}

export type ProfitInputs = {
  sale?: number
  cost?: number
  commission?: number
  shipping?: number
  returns?: number
  adSpend?: number
  overheadPercent?: number
}

export type ProfitResult = {
  inputs: Required<ProfitInputs>
  commissionCost: number
  overheadCost: number
  contributionBeforeAds: number
  totalCost: number
  netProfit: number
  netMargin: number
  breakEvenRoas: number | null
}

export type AssistantToolRecommendation = {
  title: string
  description: string
  href: string
  label: string
}

export type MarketThresholds = {
  minRating?: number
  minOpportunityScore?: number
  minObservedSales?: number
}

const NUMBER = String.raw`(\d+(?:[.,]\d+)?)`

function parseNumber(value: string | undefined) {
  if (!value) return undefined
  const normalized = value.trim()
  if (!normalized) return undefined

  if (/^\d{1,3}(?:\.\d{3})+$/.test(normalized)) {
    return Number(normalized.replace(/\./g, ''))
  }

  const number = Number(normalized.replace(',', '.'))
  return Number.isFinite(number) ? Math.max(0, number) : undefined
}

function lastNumberMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const matches = [...text.matchAll(pattern)]
    const value = parseNumber(matches.at(-1)?.[1])
    if (value !== undefined) return value
  }
  return undefined
}

export function extractProfitInputs(messages: VeriAssistantMessage[]): ProfitInputs {
  const inputs: ProfitInputs = {}

  for (const message of messages.filter((item) => item.role === 'user')) {
    const text = String(message.content || '').toLocaleLowerCase('tr-TR')
    const sale = lastNumberMatch(text, [
      new RegExp(`${NUMBER}\\s*(?:tl|₺)?\\s*['’]?\\s*(?:ye|ya)?\\s+sat`, 'gi'),
      new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*(?:satış(?:\\s+fiyatı)?|ciro)`, 'gi'),
      new RegExp(`(?:satış\\s+fiyatı|satış|ciro|fiyat)\\s*(?:[:=]|olsun|ise)?\\s*${NUMBER}`, 'gi'),
    ])
    const cost = lastNumberMatch(text, [
      new RegExp(
        `(?<!iade\\s)(?<!kargo\\s)(?:ürün\\s+)?maliyet(?:im|i)?\\s*(?:[:=]|olsun|ise)?\\s*${NUMBER}`,
        'gi',
      ),
      new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*(?:ürün\\s+)?maliyet`, 'gi'),
    ])
    const commission = lastNumberMatch(text, [
      new RegExp(`komisyon(?:\\s+oranı)?\\s*(?:[:=]|olsun|ise|yüzde|%)?\\s*%?\\s*${NUMBER}`, 'gi'),
      new RegExp(`(?:yüzde|%)\\s*${NUMBER}\\s*komisyon`, 'gi'),
      new RegExp(`${NUMBER}\\s*%\\s*komisyon`, 'gi'),
    ])
    const shipping = lastNumberMatch(text, [
      new RegExp(
        `kargo(?:yu|nun)?(?:\\s*\\+\\s*paketleme)?\\s*(?:[:=]|olsun|ise)?\\s*${NUMBER}`,
        'gi',
      ),
      new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*kargo`, 'gi'),
    ])
    const returns = lastNumberMatch(text, [
      new RegExp(`iade(?:\\s+maliyeti)?\\s*(?:[:=]|olsun|ise)?\\s*${NUMBER}`, 'gi'),
      new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*iade(?:\\s+maliyeti)?`, 'gi'),
    ])
    const adSpend = lastNumberMatch(text, [
      new RegExp(
        `(?:sipariş\\s+başına\\s+)?(?:reklam(?:\\s+harcaması)?|cpa)\\s*(?:[:=]|olsun|ise)?\\s*${NUMBER}`,
        'gi',
      ),
      new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*reklam`, 'gi'),
    ])
    const overheadPercent = lastNumberMatch(text, [
      new RegExp(
        `sabit\\s+gider(?:\\s+payı)?\\s*(?:[:=]|olsun|ise|yüzde|%)?\\s*%?\\s*${NUMBER}`,
        'gi',
      ),
    ])

    if (sale !== undefined) inputs.sale = sale
    if (cost !== undefined) inputs.cost = cost
    if (commission !== undefined) inputs.commission = commission
    if (shipping !== undefined) inputs.shipping = shipping
    if (returns !== undefined) inputs.returns = returns
    if (adSpend !== undefined) inputs.adSpend = adSpend
    if (overheadPercent !== undefined) inputs.overheadPercent = overheadPercent
  }

  return inputs
}

export function missingProfitInputs(inputs: ProfitInputs) {
  const fields: Array<[keyof ProfitInputs, string]> = [
    ['sale', 'satış fiyatı'],
    ['cost', 'ürün maliyeti'],
    ['commission', 'komisyon oranı'],
    ['shipping', 'kargo + paketleme'],
  ]
  return fields.filter(([key]) => inputs[key] === undefined).map(([, label]) => label)
}

export function calculateProfit(inputs: ProfitInputs): ProfitResult | null {
  if (missingProfitInputs(inputs).length) return null

  const complete: Required<ProfitInputs> = {
    sale: inputs.sale || 0,
    cost: inputs.cost || 0,
    commission: inputs.commission || 0,
    shipping: inputs.shipping || 0,
    returns: inputs.returns || 0,
    adSpend: inputs.adSpend || 0,
    overheadPercent: inputs.overheadPercent || 0,
  }
  const commissionCost = complete.sale * (complete.commission / 100)
  const overheadCost = complete.sale * (complete.overheadPercent / 100)
  const contributionBeforeAds =
    complete.sale - complete.cost - commissionCost - complete.shipping - complete.returns
  const totalCost =
    complete.cost +
    commissionCost +
    complete.shipping +
    complete.returns +
    complete.adSpend +
    overheadCost
  const netProfit = complete.sale - totalCost

  return {
    inputs: complete,
    commissionCost,
    overheadCost,
    contributionBeforeAds,
    totalCost,
    netProfit,
    netMargin: complete.sale > 0 ? (netProfit / complete.sale) * 100 : 0,
    breakEvenRoas: contributionBeforeAds > 0 ? complete.sale / contributionBeforeAds : null,
  }
}

export function looksLikeProfitQuestion(text: string) {
  return /(kaç kazan|kâr|kar |marj|maliyet|komisyon|kargo|iade maliyeti|satış fiyatı|başa baş|başabaş|roas|reklam sınırı)/i.test(
    text,
  )
}

export function looksLikeMarketQuestion(text: string) {
  return /(trendyol\.com|trendyol|ürün|kategori|çok satan|yükselen|fırsat|fiyat düş|stok|pazar|marka|mağaza)/i.test(
    text,
  )
}

export function extractMarketView(text: string) {
  if (/fırsat|niş|rekabet/i.test(text)) return 'firsat-radari' as const
  if (/yükselen|trend|ivme/i.test(text)) return 'yukselenler' as const
  if (/fiyat düş|indirim/i.test(text)) return 'fiyat-dususleri' as const
  if (/stok|tüken/i.test(text)) return 'stok-sinyalleri' as const
  return 'cok-satanlar' as const
}

export function extractPriceBounds(text: string) {
  const max = lastNumberMatch(text, [
    new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*(?:altında|altı|dan az)`, 'gi'),
    new RegExp(`(?:fiyat|fiyatı)\\s*${NUMBER}\\s*(?:altında|altı|dan az)`, 'gi'),
  ])
  const min = lastNumberMatch(text, [
    new RegExp(`${NUMBER}\\s*(?:tl|₺)\\s*(?:üzerinde|üstü|dan fazla)`, 'gi'),
    new RegExp(`(?:fiyat|fiyatı)\\s*${NUMBER}\\s*(?:üzerinde|üstü|dan fazla)`, 'gi'),
  ])
  return { max, min }
}

export function extractMarketThresholds(text: string): MarketThresholds {
  const minRating = lastNumberMatch(text, [
    new RegExp(`(?:puanı|rating|değerlendirme)\\s*${NUMBER}\\s*(?:üstü|üzerinde|ve üstü)`, 'gi'),
    new RegExp(`${NUMBER}\\s*(?:puan|yıldız)\\s*(?:üstü|üzerinde|ve üstü)`, 'gi'),
  ])
  const minOpportunityScore = lastNumberMatch(text, [
    new RegExp(`fırsat\\s+(?:skoru|puanı)\\s*${NUMBER}\\s*(?:üstü|üzerinde|ve üstü)?`, 'gi'),
  ])
  const minObservedSales = lastNumberMatch(text, [
    new RegExp(`(?:en\\s+az\\s+)?${NUMBER}\\+?\\s*(?:ürün\\s+)?sat(?:an|ılmış|ıldı)`, 'gi'),
  ])

  return { minRating, minOpportunityScore, minObservedSales }
}

export function isExplanationQuestion(text: string) {
  return /(nereden çıktı|nasıl hesapladın|formül|neden böyle|neyi neden|hesabı açıkla|sonucu açıkla)/i.test(
    text,
  )
}

export function isComparisonQuestion(text: string) {
  return /(karşılaştır|kıyasla|hangisi daha|farkı ne)/i.test(text)
}

export function extractProductId(text: string) {
  return text.match(/-p-(\d+)/i)?.[1] || null
}

export function extractProductQuery(text: string, matchedProfile = false) {
  if (matchedProfile || /https?:\/\//i.test(text)) return ''
  const beforeVerb = text.match(/^(.{2,80}?)\s+(?:pazarını\s+)?(?:araştır|bul|göster|incele)/i)?.[1]
  if (!beforeVerb) return ''
  return beforeVerb
    .replace(/\d+(?:[.,]\d+)?\s*(?:tl|₺)\s*(?:altında|altı|dan az|üzerinde|üstü|dan fazla)/gi, ' ')
    .replace(/fırsat\s+(?:skoru|puanı)\s*\d+(?:[.,]\d+)?\s*(?:üstü|üzerinde|ve üstü)?/gi, ' ')
    .replace(/\d+(?:[.,]\d+)?\s*(?:puan|yıldız)\s*(?:üstü|üzerinde|ve üstü)/gi, ' ')
    .replace(/(?:en\s+az\s+)?\d+(?:[.,]\d+)?\+?\s*(?:ürün\s+)?sat(?:an|ılmış|ıldı)/gi, ' ')
    .replace(
      /(?:^|\s)(?:trendyol|ürün|ürünü|ürünler|ürünleri|bana|bir|bu|hafta|en|çok|satan|ve)(?=\s|$)/gi,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim()
}

const TOOL_RECOMMENDATIONS: Array<AssistantToolRecommendation & { keywords: RegExp }> = [
  {
    title: 'Başa Baş ROAS Hesaplayıcı',
    description: 'Katkı payınıza göre zarar ettirmeyen reklam eşiğini görün.',
    href: '/araclar/basabas-roas-hesaplayici',
    label: 'ROAS hesabını aç',
    keywords: /roas|reklam eşi|başa baş|başabaş|cpa/i,
  },
  {
    title: 'Ürün Kâr Marjı Hesaplayıcı',
    description: 'Sipariş başına net kârı ve marjı tüm kesintilerle hesaplayın.',
    href: '/araclar/kar-marji-hesaplayici',
    label: 'Kâr hesabını aç',
    keywords: /kâr|kar |marj|maliyet|komisyon|kargo/i,
  },
  {
    title: 'Pazaryeri Reklam Kârlılık Hesaplayıcı',
    description: 'Panel ROAS’ını iade, maliyet ve artımlı katkıyla düzeltin.',
    href: '/araclar/pazaryeri-reklam-karlilik-hesaplayici',
    label: 'Reklam katkısını hesapla',
    keywords: /pazaryeri reklam|retail media|artımlı|atıf/i,
  },
  {
    title: 'Ürün Feed Sağlık Kontrolü',
    description: 'CSV ürün verisindeki eksik alan, fiyat, stok ve URL sorunlarını tarayın.',
    href: '/araclar/urun-feed-saglik-kontrolu',
    label: 'Feed’i analiz et',
    keywords: /feed|csv|ürün verisi|merchant/i,
  },
  {
    title: 'İade Nedeni ve Yorum Sinyali Analizi',
    description: 'Yorum ve iade kayıtlarını aksiyon sırasına koyun.',
    href: '/araclar/iade-nedeni-yorum-sinyali',
    label: 'Sinyalleri analiz et',
    keywords: /iade|yorum|şikayet|şikâyet/i,
  },
]

export function recommendTool(text: string) {
  return TOOL_RECOMMENDATIONS.find((tool) => tool.keywords.test(text)) || null
}

export function profitCalculatorHref(result: ProfitResult) {
  const params = new URLSearchParams({
    sale: String(result.inputs.sale),
    cost: String(result.inputs.cost),
    commission: String(result.inputs.commission),
    shipping: String(result.inputs.shipping),
    returns: String(result.inputs.returns),
  })
  return `/araclar/basabas-roas-hesaplayici?${params.toString()}`
}

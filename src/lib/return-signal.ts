import { parseProductFeed } from '@/lib/feed-health'

export type ReturnSignalCategory =
  | 'product-fit'
  | 'quality'
  | 'delivery'
  | 'service'
  | 'expectation'
  | 'positive'
  | 'unknown'

export type ReturnSignalRow = {
  row: number
  sku: string
  category: ReturnSignalCategory
  signal: string
  text: string
  rating: number | null
  country: string
}

export type ReturnSignalPriority = {
  category: Exclude<ReturnSignalCategory, 'positive' | 'unknown'>
  label: string
  count: number
  share: number
  action: string
  evidence: string
}

export type ReturnSignalAnalysis = {
  rowCount: number
  classifiedCount: number
  issueCount: number
  positiveCount: number
  unknownCount: number
  actionabilityScore: number
  topCategory: ReturnSignalCategory
  categories: Array<{ category: ReturnSignalCategory; label: string; count: number }>
  priorities: ReturnSignalPriority[]
  rows: ReturnSignalRow[]
}

const categoryLabels: Record<ReturnSignalCategory, string> = {
  'product-fit': 'Ürün uyumu / beden',
  quality: 'Kalite / hasar',
  delivery: 'Teslimat / kargo',
  service: 'Destek / iade süreci',
  expectation: 'Beklenti / içerik',
  positive: 'Olumlu sinyal',
  unknown: 'Sınıflandırılamadı',
}

const categoryKeywords: Array<{
  category: Exclude<ReturnSignalCategory, 'positive' | 'unknown'>
  words: string[]
}> = [
  {
    category: 'product-fit',
    words: ['beden', 'ölçü', 'kalıp', 'dar', 'geniş', 'küçük', 'büyük', 'uyum', 'size', 'fit'],
  },
  {
    category: 'quality',
    words: ['kalite', 'kırık', 'hasar', 'bozuk', 'dikiş', 'sökük', 'malzeme', 'defect', 'damaged'],
  },
  {
    category: 'delivery',
    words: [
      'kargo',
      'teslim',
      'gecik',
      'geç geldi',
      'kurye',
      'paket',
      'taşıma',
      'shipping',
      'delivery',
    ],
  },
  {
    category: 'service',
    words: [
      'destek',
      'müşteri hizmet',
      'iletişim',
      'iade süreci',
      'geri ödeme',
      'refund',
      'support',
    ],
  },
  {
    category: 'expectation',
    words: [
      'beklenti',
      'görsel',
      'fotoğraf',
      'renk',
      'açıklama',
      'farklı',
      'tanıtım',
      'description',
    ],
  },
]

const positiveKeywords = [
  'memnun',
  'harika',
  'mükemmel',
  'beğendim',
  'teşekkür',
  'hızlı',
  'good',
  'great',
  'love',
]

const fieldAliases = {
  sku: ['sku', 'item_id', 'product_id', 'ürün_kodu', 'urun_kodu'],
  text: ['text', 'review', 'yorum', 'comment', 'message', 'metin', 'açıklama'],
  reason: ['reason', 'return_reason', 'iade_nedeni', 'kategori', 'category', 'neden'],
  rating: ['rating', 'stars', 'puan', 'score'],
  country: ['country', 'ülke', 'ulke', 'market', 'pazar'],
} as const

function getField(row: Record<string, string>, aliases: readonly string[]) {
  const key = Object.keys(row).find((candidate) => aliases.includes(candidate as never))
  return key ? row[key].trim() : ''
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
}

function classify(
  reason: string,
  text: string,
): { category: ReturnSignalCategory; signal: string } {
  const normalizedReason = normalize(reason)
  const normalizedText = normalize(`${reason} ${text}`)
  const explicit = categoryKeywords.find(({ words }) =>
    words.some((word) => normalizedReason.includes(normalize(word))),
  )
  if (explicit) return { category: explicit.category, signal: reason || text.slice(0, 80) }
  const match = categoryKeywords.find(({ words }) =>
    words.some((word) => normalizedText.includes(normalize(word))),
  )
  if (match) return { category: match.category, signal: text.slice(0, 80) }
  if (positiveKeywords.some((word) => normalizedText.includes(normalize(word)))) {
    return { category: 'positive', signal: text.slice(0, 80) }
  }
  return { category: 'unknown', signal: text.slice(0, 80) }
}

const priorityMeta: Record<
  Exclude<ReturnSignalCategory, 'positive' | 'unknown'>,
  { action: string }
> = {
  'product-fit': {
    action:
      'Ölçü tablosu, kalıp bilgisi ve ürün uygunluğu alanlarını ürün sayfasında görünür kılın.',
  },
  quality: {
    action:
      'SKU, parti ve tedarikçi kırılımında kalite kök nedenini doğrulayın; sayfada kanıtı güncelleyin.',
  },
  delivery: {
    action:
      'Taşıyıcı ve bölge bazında vaat-gerçekleşen süre farkını kapatın; checkout teklifini güncelleyin.',
  },
  service: {
    action:
      'İade ve destek adımlarını sadeleştirin; geri ödeme SLA’sını sahip ve tarih ile izleyin.',
  },
  expectation: {
    action: 'Başlık, görsel, açıklama ve kullanım sınırlarını gerçek ürünle eşleştirin.',
  },
}

export function analyzeReturnSignals(value: string): ReturnSignalAnalysis {
  const parsed = parseProductFeed(value)
  const rows: ReturnSignalRow[] = parsed.rows.map((row, index) => {
    const reason = getField(row, fieldAliases.reason)
    const text = getField(row, fieldAliases.text) || reason
    const result = classify(reason, text)
    const rawRating = getField(row, fieldAliases.rating)
    const rating = rawRating && Number.isFinite(Number(rawRating)) ? Number(rawRating) : null
    return {
      row: index + 2,
      sku: getField(row, fieldAliases.sku) || 'SKU belirtilmemiş',
      category: result.category,
      signal: result.signal || 'Metin yok',
      text,
      rating,
      country: getField(row, fieldAliases.country) || '—',
    }
  })
  const counts = rows.reduce<Record<ReturnSignalCategory, number>>(
    (acc, row) => ({ ...acc, [row.category]: acc[row.category] + 1 }),
    {
      'product-fit': 0,
      quality: 0,
      delivery: 0,
      service: 0,
      expectation: 0,
      positive: 0,
      unknown: 0,
    },
  )
  const issueCategories = (
    Object.keys(priorityMeta) as Array<Exclude<ReturnSignalCategory, 'positive' | 'unknown'>>
  ).sort((a, b) => counts[b] - counts[a])
  const issueCount = rows.length - counts.positive - counts.unknown
  const classifiedCount = rows.length - counts.unknown
  const priorities = issueCategories
    .filter((category) => counts[category] > 0)
    .map((category) => {
      const evidence = rows.find((row) => row.category === category)?.signal || ''
      return {
        category,
        label: categoryLabels[category],
        count: counts[category],
        share: Math.round((counts[category] / Math.max(1, issueCount)) * 100),
        action: priorityMeta[category].action,
        evidence,
      }
    })
  const topCategory = [...issueCategories, 'positive', 'unknown'].sort(
    (a, b) => counts[b] - counts[a],
  )[0] as ReturnSignalCategory
  return {
    rowCount: rows.length,
    classifiedCount,
    issueCount,
    positiveCount: counts.positive,
    unknownCount: counts.unknown,
    actionabilityScore: Math.round(
      (classifiedCount / Math.max(1, rows.length)) * 70 + (issueCount > 0 ? 30 : 0),
    ),
    topCategory,
    categories: (Object.keys(categoryLabels) as ReturnSignalCategory[]).map((category) => ({
      category,
      label: categoryLabels[category],
      count: counts[category],
    })),
    priorities,
    rows,
  }
}

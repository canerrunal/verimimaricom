export type FeedIssueSeverity = 'critical' | 'warning' | 'improvement'

export type FeedIssue = {
  id: string
  severity: FeedIssueSeverity
  title: string
  detail: string
  count: number
  sampleRows: number[]
  fix: string
}

export type PlatformReadiness = {
  name: string
  score: number
  missingFields: string[]
  note: string
}

export type FeedAnalysis = {
  score: number
  rowCount: number
  columnCount: number
  delimiter: ',' | ';' | '\t'
  requiredCompleteness: number
  issues: FeedIssue[]
  criticalCount: number
  warningCount: number
  improvementCount: number
  platforms: PlatformReadiness[]
  detectedFields: { field: string; header: string | null }[]
}

type ParsedFeed = {
  headers: string[]
  rows: Record<string, string>[]
  delimiter: ',' | ';' | '\t'
}

const fieldAliases = {
  item_id: ['item_id', 'id', 'sku', 'product_id'],
  title: ['title', 'name', 'product_name'],
  description: ['description', 'product_description'],
  url: ['url', 'link', 'product_url'],
  image_url: ['image_url', 'image_link', 'image', 'main_image'],
  price: ['price', 'regular_price'],
  sale_price: ['sale_price', 'discount_price'],
  availability: ['availability', 'stock_status'],
  brand: ['brand', 'manufacturer'],
  gtin: ['gtin', 'barcode', 'ean', 'upc', 'isbn'],
  mpn: ['mpn', 'manufacturer_part_number'],
  group_id: ['group_id', 'item_group_id', 'parent_id'],
  is_eligible_search: ['is_eligible_search'],
  is_eligible_checkout: ['is_eligible_checkout'],
  seller_name: ['seller_name'],
  seller_url: ['seller_url'],
  seller_privacy_policy: ['seller_privacy_policy'],
  seller_tos: ['seller_tos'],
  return_policy: ['return_policy'],
  target_countries: ['target_countries', 'target_country'],
  store_country: ['store_country'],
} as const

type CanonicalField = keyof typeof fieldAliases

const commonRequired: CanonicalField[] = [
  'item_id',
  'title',
  'description',
  'url',
  'image_url',
  'price',
  'availability',
  'brand',
]

const googleRequired: CanonicalField[] = [
  'item_id',
  'title',
  'description',
  'url',
  'image_url',
  'price',
  'availability',
]

const openAiRequired: CanonicalField[] = [
  'is_eligible_search',
  'is_eligible_checkout',
  'item_id',
  'title',
  'description',
  'url',
  'brand',
  'image_url',
  'price',
  'availability',
  'seller_name',
  'seller_url',
  'return_policy',
  'target_countries',
  'store_country',
]

const fieldLabels: Record<CanonicalField, string> = {
  item_id: 'Ürün kimliği',
  title: 'Başlık',
  description: 'Açıklama',
  url: 'Ürün URL’si',
  image_url: 'Görsel URL’si',
  price: 'Fiyat + para birimi',
  sale_price: 'İndirimli fiyat',
  availability: 'Stok durumu',
  brand: 'Marka',
  gtin: 'GTIN',
  mpn: 'MPN',
  group_id: 'Varyant grup kimliği',
  is_eligible_search: 'OpenAI arama uygunluğu',
  is_eligible_checkout: 'OpenAI checkout uygunluğu',
  seller_name: 'Satıcı adı',
  seller_url: 'Satıcı URL’si',
  seller_privacy_policy: 'Satıcı gizlilik politikası',
  seller_tos: 'Satıcı kullanım koşulları',
  return_policy: 'İade politikası',
  target_countries: 'Hedef ülkeler',
  store_country: 'Mağaza ülkesi',
}

function normalizeHeader(value: string) {
  return value
    .replace(/^\uFEFF/, '')
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/[\s-]+/g, '_')
}

function countOutsideQuotes(line: string, delimiter: ',' | ';' | '\t') {
  let count = 0
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] === '"') quoted = !quoted
    if (!quoted && line[index] === delimiter) count += 1
  }
  return count
}

function detectDelimiter(value: string): ',' | ';' | '\t' {
  const firstLine = value.split(/\r?\n/, 1)[0] || ''
  const options: (',' | ';' | '\t')[] = [',', ';', '\t']
  return options.reduce((best, current) =>
    countOutsideQuotes(firstLine, current) > countOutsideQuotes(firstLine, best) ? current : best,
  )
}

export function parseProductFeed(value: string): ParsedFeed {
  const input = value.trim()
  if (!input) throw new Error('Önce başlık satırı ve en az bir ürün içeren CSV verisi ekleyin.')

  const delimiter = detectDelimiter(input)
  const matrix: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index]
    const next = input[index + 1]

    if (char === '"' && quoted && next === '"') {
      field += '"'
      index += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === delimiter && !quoted) {
      row.push(field.trim())
      field = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1
      row.push(field.trim())
      if (row.some((cell) => cell.length > 0)) matrix.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }

  row.push(field.trim())
  if (row.some((cell) => cell.length > 0)) matrix.push(row)

  if (quoted) throw new Error('CSV içinde kapanmamış bir tırnak işareti var.')
  if (matrix.length < 2)
    throw new Error('Başlık satırının altında en az bir ürün satırı bulunmalı.')

  const headers = matrix[0].map(normalizeHeader)
  if (headers.some((header) => !header)) throw new Error('Başlık satırında boş bir sütun adı var.')
  if (new Set(headers).size !== headers.length)
    throw new Error('Aynı isimde birden fazla sütun bulundu.')

  const rows = matrix.slice(1).map((cells) =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = cells[index]?.trim() || ''
      return record
    }, {}),
  )

  return { headers, rows, delimiter }
}

function resolveHeaders(headers: string[]) {
  return (Object.keys(fieldAliases) as CanonicalField[]).reduce<
    Record<CanonicalField, string | null>
  >(
    (resolved, field) => {
      resolved[field] = fieldAliases[field].find((alias) => headers.includes(alias)) || null
      return resolved
    },
    {} as Record<CanonicalField, string | null>,
  )
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function parseMoney(value: string) {
  const match = value.trim().match(/^(\d+(?:[.,]\d{1,2})?)\s+([A-Z]{3})$/)
  if (!match) return null
  const amount = Number(match[1].replace(',', '.'))
  return Number.isFinite(amount) && amount > 0 ? { amount, currency: match[2] } : null
}

function fieldValue(
  row: Record<string, string>,
  resolved: Record<CanonicalField, string | null>,
  field: CanonicalField,
) {
  const header = resolved[field]
  return header ? row[header]?.trim() || '' : ''
}

function ratio(values: boolean[]) {
  if (values.length === 0) return 0
  return values.filter(Boolean).length / values.length
}

function sampleRows(indexes: number[]) {
  return indexes.slice(0, 5).map((index) => index + 2)
}

function platformReadiness(
  name: string,
  fields: CanonicalField[],
  rows: Record<string, string>[],
  resolved: Record<CanonicalField, string | null>,
  note: string,
): PlatformReadiness {
  const missingFields = fields.filter((field) =>
    rows.some((row) => !fieldValue(row, resolved, field)),
  )
  const filled = fields.flatMap((field) =>
    rows.map((row) => Boolean(fieldValue(row, resolved, field))),
  )

  return {
    name,
    score: Math.round(ratio(filled) * 100),
    missingFields: missingFields.map((field) => fieldLabels[field]),
    note,
  }
}

export function analyzeProductFeed(value: string): FeedAnalysis {
  const parsed = parseProductFeed(value)
  const { headers, rows } = parsed
  const resolved = resolveHeaders(headers)
  const issues: FeedIssue[] = []

  const addIssue = (issue: FeedIssue) => {
    if (issue.count > 0) issues.push(issue)
  }

  for (const field of commonRequired) {
    const missing = rows
      .map((row, index) => (!fieldValue(row, resolved, field) ? index : -1))
      .filter((index) => index >= 0)
    addIssue({
      id: `missing-${field}`,
      severity: 'critical',
      title: `${fieldLabels[field]} eksik`,
      detail: `${missing.length} ürün satırında çekirdek alan boş veya sütun bulunamadı.`,
      count: missing.length,
      sampleRows: sampleRows(missing),
      fix: `${fieldAliases[field].slice(0, 2).join(' veya ')} sütununu kalıcı ve güncel değerlerle doldurun.`,
    })
  }

  const ids = rows.map((row) => fieldValue(row, resolved, 'item_id'))
  const seen = new Map<string, number>()
  const duplicates: number[] = []
  ids.forEach((id, index) => {
    if (!id) return
    if (seen.has(id)) duplicates.push(index)
    else seen.set(id, index)
  })
  addIssue({
    id: 'duplicate-id',
    severity: 'critical',
    title: 'Tekrarlanan ürün kimliği',
    detail: `${duplicates.length} satır başka bir ürünle aynı kimliği kullanıyor.`,
    count: duplicates.length,
    sampleRows: sampleRows(duplicates),
    fix: 'Her satın alınabilir varyanta zaman içinde değişmeyen benzersiz bir kimlik verin.',
  })

  const invalidUrls = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'url')
      return current && !isHttpUrl(current) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'invalid-url',
    severity: 'critical',
    title: 'Geçersiz ürün URL’si',
    detail: `${invalidUrls.length} ürün URL’si http/https biçiminde değil.`,
    count: invalidUrls.length,
    sampleRows: sampleRows(invalidUrls),
    fix: 'Kanonik ve herkese açık http/https ürün sayfası URL’si kullanın.',
  })

  const invalidImages = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'image_url')
      return current && !isHttpUrl(current) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'invalid-image',
    severity: 'critical',
    title: 'Geçersiz görsel URL’si',
    detail: `${invalidImages.length} ana görsel URL’si geçerli değil.`,
    count: invalidImages.length,
    sampleRows: sampleRows(invalidImages),
    fix: 'Herkese açık ve taranabilir bir http/https görsel URL’si kullanın.',
  })

  const invalidPrices = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'price')
      return current && !parseMoney(current) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'invalid-price',
    severity: 'critical',
    title: 'Fiyat veya para birimi biçimi hatalı',
    detail: `${invalidPrices.length} fiyat “799.90 TRY” gibi pozitif tutar + ISO 4217 kodu taşımıyor.`,
    count: invalidPrices.length,
    sampleRows: sampleRows(invalidPrices),
    fix: 'Fiyatı pozitif sayı ve üç harfli para birimi koduyla gönderin; sıfır fiyat kullanmayın.',
  })

  const allowedAvailability = new Set([
    'in_stock',
    'out_of_stock',
    'preorder',
    'pre_order',
    'backorder',
    'unknown',
    'discontinued',
  ])
  const invalidAvailability = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'availability')
        .toLocaleLowerCase('en-US')
        .replace(/[\s-]+/g, '_')
      return current && !allowedAvailability.has(current) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'invalid-availability',
    severity: 'critical',
    title: 'Stok durumu standarda uymuyor',
    detail: `${invalidAvailability.length} satır desteklenen bir stok durumu kullanmıyor.`,
    count: invalidAvailability.length,
    sampleRows: sampleRows(invalidAvailability),
    fix: 'in_stock, out_of_stock, preorder/pre_order veya backorder değerlerinden uygun olanı kullanın.',
  })

  const weakTitles = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'title')
      return current && (current.length < 10 || current.length > 150) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'weak-title',
    severity: 'warning',
    title: 'Başlık uzunluğu zayıf',
    detail: `${weakTitles.length} başlık 10–150 karakter aralığının dışında.`,
    count: weakTitles.length,
    sampleRows: sampleRows(weakTitles),
    fix: 'Ürünü, marka/modeli ve ayırt edici varyantı açıkça anlatan doğal bir başlık yazın.',
  })

  const allCapsTitles = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'title')
      const letters = current.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g, '')
      return letters.length >= 8 && letters === letters.toLocaleUpperCase('tr-TR') ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'all-caps-title',
    severity: 'warning',
    title: 'Tamamı büyük harf başlık',
    detail: `${allCapsTitles.length} ürün başlığı bütünüyle büyük harf kullanıyor.`,
    count: allCapsTitles.length,
    sampleRows: sampleRows(allCapsTitles),
    fix: 'Promosyon dilini çıkarın ve normal yazım düzeni kullanın.',
  })

  const weakDescriptions = rows
    .map((row, index) => {
      const current = fieldValue(row, resolved, 'description')
      return current && (current.length < 40 || current.length > 5000) ? index : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'weak-description',
    severity: 'warning',
    title: 'Açıklama karar vermek için yetersiz',
    detail: `${weakDescriptions.length} açıklama 40–5.000 karakter kalite aralığının dışında.`,
    count: weakDescriptions.length,
    sampleRows: sampleRows(weakDescriptions),
    fix: 'Malzeme, kullanım, ölçü ve uyumluluk gibi karar bilgilerini promosyon dilinden arındırın.',
  })

  const missingIdentifiers = rows
    .map((row, index) =>
      !fieldValue(row, resolved, 'gtin') && !fieldValue(row, resolved, 'mpn') ? index : -1,
    )
    .filter((index) => index >= 0)
  addIssue({
    id: 'missing-identifier',
    severity: 'improvement',
    title: 'GTIN veya MPN zenginleştirmesi yok',
    detail: `${missingIdentifiers.length} üründe evrensel veya üretici kimliği bulunmuyor.`,
    count: missingIdentifiers.length,
    sampleRows: sampleRows(missingIdentifiers),
    fix: 'Ürünün gerçekten bir GTIN veya MPN değeri varsa doğru kimliği ekleyin; uydurma değer üretmeyin.',
  })

  const checkoutPolicyRows = rows
    .map((row, index) => {
      const checkout = fieldValue(row, resolved, 'is_eligible_checkout').toLocaleLowerCase('en-US')
      if (checkout !== 'true') return -1
      return !fieldValue(row, resolved, 'seller_privacy_policy') ||
        !fieldValue(row, resolved, 'seller_tos')
        ? index
        : -1
    })
    .filter((index) => index >= 0)
  addIssue({
    id: 'missing-checkout-policy',
    severity: 'warning',
    title: 'Checkout için satıcı politika alanları eksik',
    detail: `${checkoutPolicyRows.length} checkout-uygun satırda gizlilik veya kullanım koşulu URL’si eksik.`,
    count: checkoutPolicyRows.length,
    sampleRows: sampleRows(checkoutPolicyRows),
    fix: 'is_eligible_checkout=true ise seller_privacy_policy ve seller_tos URL’lerini ekleyin.',
  })

  const requiredCells = commonRequired.flatMap((field) =>
    rows.map((row) => Boolean(fieldValue(row, resolved, field))),
  )
  const requiredCompleteness = ratio(requiredCells)
  const validIdRatio = rows.length ? 1 - duplicates.length / rows.length : 0
  const validUrlRatio = ratio(
    rows.map(
      (row) => !fieldValue(row, resolved, 'url') || isHttpUrl(fieldValue(row, resolved, 'url')),
    ),
  )
  const validImageRatio = ratio(
    rows.map(
      (row) =>
        !fieldValue(row, resolved, 'image_url') ||
        isHttpUrl(fieldValue(row, resolved, 'image_url')),
    ),
  )
  const validPriceRatio = ratio(
    rows.map(
      (row) =>
        !fieldValue(row, resolved, 'price') ||
        Boolean(parseMoney(fieldValue(row, resolved, 'price'))),
    ),
  )
  const validAvailabilityRatio = ratio(
    rows.map((row) => {
      const current = fieldValue(row, resolved, 'availability')
        .toLocaleLowerCase('en-US')
        .replace(/[\s-]+/g, '_')
      return !current || allowedAvailability.has(current)
    }),
  )
  const validity =
    (validIdRatio + validUrlRatio + validImageRatio + validPriceRatio + validAvailabilityRatio) / 5
  const titleQuality = 1 - weakTitles.length / rows.length
  const descriptionQuality = 1 - weakDescriptions.length / rows.length
  const identifierQuality = 1 - missingIdentifiers.length / rows.length
  const enrichment = (titleQuality + descriptionQuality + identifierQuality) / 3
  const score = Math.max(0, Math.round(requiredCompleteness * 60 + validity * 30 + enrichment * 10))

  const platforms = [
    platformReadiness(
      'Google Merchant Center',
      googleRequired,
      rows,
      resolved,
      'Temel zorunlu alan hazırlığıdır; hesap politikası ve sayfa eşleşmesi ayrıca doğrulanır.',
    ),
    platformReadiness(
      'OpenAI ürün feed’i',
      openAiRequired,
      rows,
      resolved,
      '1 Ağustos 2026 tarihli non-Ads düz dosya şemasının zorunlu alanlarına göre ön kontroldür.',
    ),
  ]

  const severityOrder: Record<FeedIssueSeverity, number> = {
    critical: 0,
    warning: 1,
    improvement: 2,
  }
  issues.sort(
    (left, right) =>
      severityOrder[left.severity] - severityOrder[right.severity] || right.count - left.count,
  )

  return {
    score,
    rowCount: rows.length,
    columnCount: headers.length,
    delimiter: parsed.delimiter,
    requiredCompleteness: Math.round(requiredCompleteness * 100),
    issues,
    criticalCount: issues
      .filter((issue) => issue.severity === 'critical')
      .reduce((sum, issue) => sum + issue.count, 0),
    warningCount: issues
      .filter((issue) => issue.severity === 'warning')
      .reduce((sum, issue) => sum + issue.count, 0),
    improvementCount: issues
      .filter((issue) => issue.severity === 'improvement')
      .reduce((sum, issue) => sum + issue.count, 0),
    platforms,
    detectedFields: (Object.keys(fieldAliases) as CanonicalField[]).map((field) => ({
      field: fieldLabels[field],
      header: resolved[field],
    })),
  }
}

export function buildIssueReportCsv(analysis: FeedAnalysis) {
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`
  const lines = [
    ['öncelik', 'sorun', 'adet', 'örnek_satırlar', 'açıklama', 'düzeltme'].map(escape).join(','),
    ...analysis.issues.map((issue) =>
      [
        issue.severity,
        issue.title,
        issue.count,
        issue.sampleRows.join(' | '),
        issue.detail,
        issue.fix,
      ]
        .map(escape)
        .join(','),
    ),
  ]
  return lines.join('\n')
}

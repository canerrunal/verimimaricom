import { normalizeProductMetrics } from './trendyol-product-metrics'
export type MarketHistorySource = 'profile' | 'taxonomy'

export type PriceHistoryPoint = {
  date: string
  capturedAt: string
  value: number
}

export type StockHistoryPoint = {
  date: string
  capturedAt: string
  value: 0 | 0.5 | 1
  label: 'Stok dışı' | 'Tükeniyor' | 'Stokta'
}

export type SalesHistoryPoint = {
  date: string
  capturedAt: string
  value: number
  label: string
}

export type MetricPoint = { date: string; capturedAt: string; value: number; label: string }

export type MarketHistoryPayload = {
  quantity: MetricPoint[]
  estimatedSales: MetricPoint[]
  score: MetricPoint[]
  ratings: MetricPoint[]
  reviews: MetricPoint[]
  questions: MetricPoint[]
  sellers: MetricPoint[]
  salesWindows: { daily: number | null; weekly: number | null; monthly: number | null }
  inventoryLabel: string | null
  sellerDetails: Record<string, unknown>[]
  variantDetails: Record<string, unknown>[]
  price: PriceHistoryPoint[]
  stock: StockHistoryPoint[]
  sales: SalesHistoryPoint[]
}

type ProfileHistoryRow = {
  metrics?: unknown
  rating?: unknown
  rating_count?: unknown
  review_count?: unknown
  question_count?: unknown
  observed_date?: unknown
  captured_at?: unknown
  price?: unknown
  stock_status?: unknown
  stock_signal?: unknown
  sales_signal_daily_min?: unknown
  sales_signal?: unknown
}

type TaxonomyHistoryRow = {
  metrics?: unknown
  rating?: unknown
  rating_count?: unknown
  observed_date?: unknown
  captured_at?: unknown
  price?: unknown
  in_stock?: unknown
  running_out?: unknown
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function number(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function pointDate(row: { observed_date?: unknown }) {
  const value = text(row.observed_date)
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''
}

function capturedAt(row: { captured_at?: unknown }, date: string) {
  return text(row.captured_at) || `${date}T12:00:00+03:00`
}

function dedupeByDate<T extends { date: string; capturedAt: string }>(points: T[]) {
  const byDate = new Map<string, T>()
  points
    .sort((a, b) => a.capturedAt.localeCompare(b.capturedAt))
    .forEach((point) => byDate.set(point.date, point))
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
}

function profileStock(
  row: ProfileHistoryRow,
): Omit<StockHistoryPoint, 'date' | 'capturedAt'> | null {
  const status = text(row.stock_status)
  const signal = text(row.stock_signal)
  if (status === 'OutOfStock' || /stok dışı|tükendi/i.test(signal)) {
    return { value: 0, label: 'Stok dışı' }
  }
  if (/son\s+\d+\s+ürün|tükeniyor|az kaldı/i.test(signal)) {
    return { value: 0.5, label: 'Tükeniyor' }
  }
  if (status === 'InStock' || signal) return { value: 1, label: 'Stokta' }
  return null
}

function taxonomyStock(
  row: TaxonomyHistoryRow,
): Omit<StockHistoryPoint, 'date' | 'capturedAt'> | null {
  if (row.in_stock === false) return { value: 0, label: 'Stok dışı' }
  if (row.running_out === true) return { value: 0.5, label: 'Tükeniyor' }
  if (row.in_stock === true) return { value: 1, label: 'Stokta' }
  return null
}

export function buildMarketHistory(
  source: MarketHistorySource,
  profileRows: ProfileHistoryRow[],
  taxonomyRows: TaxonomyHistoryRow[],
): MarketHistoryPayload {
  const primaryRows = source === 'taxonomy' ? taxonomyRows : profileRows
  const price = dedupeByDate(
    primaryRows.flatMap((row) => {
      const date = pointDate(row)
      const value = number(row.price)
      return date && value !== null ? [{ date, capturedAt: capturedAt(row, date), value }] : []
    }),
  )

  const stock = dedupeByDate(
    primaryRows.flatMap((row) => {
      const date = pointDate(row)
      const value = source === 'taxonomy' ? taxonomyStock(row) : profileStock(row)
      return date && value ? [{ date, capturedAt: capturedAt(row, date), ...value }] : []
    }),
  )

  const sales = dedupeByDate(
    profileRows.flatMap((row) => {
      const date = pointDate(row)
      const value = number(row.sales_signal_daily_min)
      return date && value !== null
        ? [
            {
              date,
              capturedAt: capturedAt(row, date),
              value,
              label: text(row.sales_signal) || `Günlük ≥ ${value}`,
            },
          ]
        : []
    }),
  )

  const rows = primaryRows
    .map((row) => ({ ...row, metrics: normalizeProductMetrics(row.metrics) }))
    .sort((a, b) => capturedAt(a, pointDate(a)).localeCompare(capturedAt(b, pointDate(b))))
  const latest = rows.at(-1)?.metrics
  const lastInventory = [...rows].reverse().find((row) => row.metrics.inventory_key)?.metrics
  const inventoryKey = lastInventory?.inventory_key
  const quantitative = rows.filter(
    (row) => inventoryKey && row.metrics.inventory_key === inventoryKey,
  )
  const series = (field: string, label: string, inventoryOnly = false): MetricPoint[] =>
    dedupeByDate(
      (inventoryOnly ? quantitative : rows).flatMap((row) => {
        const date = pointDate(row)
        const value = number(row.metrics[field] ?? (row as Record<string, unknown>)[field])
        const measuredAt = inventoryOnly
          ? text(row.metrics.stock_observed_at)
          : capturedAt(row, date)
        if (
          !date ||
          value === null ||
          !Number.isFinite(Date.parse(measuredAt)) ||
          (field === 'sales_estimate_daily' && row.metrics.sales_estimate_status !== 'estimated')
        )
          return []
        return [{ date, capturedAt: measuredAt, value, label }]
      }),
    )
  return {
    price,
    stock,
    sales,
    quantity: series('stock_quantity', 'Seçili satıcı ve varyantın bildirilen stok adedi', true),
    estimatedSales: series(
      'sales_estimate_daily',
      'Stok azalışından tahmin; kesin sipariş değildir',
      true,
    ),
    score: series('rating', 'Ürün puanı'),
    ratings: series('rating_count', 'Değerlendirme sayısı'),
    reviews: series('review_count', 'Yazılı yorum sayısı'),
    questions: series('question_count', 'Soru-cevap sayısı'),
    sellers: dedupeByDate(
      rows.flatMap((row) => {
        const date = pointDate(row),
          total = number(row.metrics.seller_count),
          observed = number(row.metrics.seller_count_observed)
        const value = total ?? observed
        return date && value !== null
          ? [
              {
                date,
                capturedAt: capturedAt(row, date),
                value,
                label:
                  total !== null
                    ? 'Kaynağın bildirdiği toplam satıcı sayısı'
                    : 'Görülen satıcı sayısı; toplam daha fazla olabilir',
              },
            ]
          : []
      }),
    ),
    sellerDetails: (latest?.sellers || []) as Record<string, unknown>[],
    variantDetails: (latest?.variants || []) as Record<string, unknown>[],
    inventoryLabel: lastInventory?.inventory_key
      ? `Satıcı ${lastInventory.merchant_id || '—'} · Varyant ${lastInventory.variant_label || lastInventory.variant_id || '—'}`
      : null,
    salesWindows: {
      daily: number(latest?.sales_estimate_daily),
      weekly: number(latest?.sales_estimate_weekly),
      monthly: number(latest?.sales_estimate_monthly),
    },
  }
}

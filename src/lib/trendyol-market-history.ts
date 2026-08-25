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

export type MarketHistoryPayload = {
  price: PriceHistoryPoint[]
  stock: StockHistoryPoint[]
  sales: SalesHistoryPoint[]
}

type ProfileHistoryRow = {
  observed_date?: unknown
  captured_at?: unknown
  price?: unknown
  stock_status?: unknown
  stock_signal?: unknown
  sales_signal_daily_min?: unknown
  sales_signal?: unknown
}

type TaxonomyHistoryRow = {
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

  return { price, stock, sales }
}

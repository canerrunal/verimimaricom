import type { MarketTaxonomyProduct } from './trendyol-market'

export type QuickFilter = 'all' | 'rising' | 'drops' | 'risk' | 'rated' | 'inventory'
export type SortKey =
  | 'rank'
  | 'price'
  | 'rankDelta'
  | 'quantity'
  | 'sales'
  | 'rating'
  | 'ratingCount'
export type TableFilters = {
  query: string
  brand: string
  min: string
  max: string
  stock: string
  quick: QuickFilter
  sort: SortKey
  descending: boolean
}
export const defaultTableFilters: TableFilters = {
  query: '',
  brand: '',
  min: '',
  max: '',
  stock: '',
  quick: 'all',
  sort: 'rank',
  descending: false,
}
export function metricNumber(product: MarketTaxonomyProduct, key: string): number | null {
  const value = product.metrics[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}
export function quantity(product: MarketTaxonomyProduct) {
  return product.metrics.inventory_key &&
    typeof product.metrics.stock_observed_at === 'string' &&
    Number.isFinite(Date.parse(product.metrics.stock_observed_at))
    ? metricNumber(product, 'stock_quantity')
    : null
}
export function sales(product: MarketTaxonomyProduct) {
  return quantity(product) !== null && product.metrics.sales_estimate_status === 'estimated'
    ? metricNumber(product, 'sales_estimate_daily')
    : null
}
export function matchesQuick(product: MarketTaxonomyProduct, quick: QuickFilter) {
  if (quick === 'rising') return (product.rankDelta ?? 0) > 0
  if (quick === 'drops') return (product.priceDeltaPercent ?? 0) < 0
  if (quick === 'risk') return product.inStock === false || product.runningOut === true
  if (quick === 'rated') return (product.rating ?? 0) >= 4.5 && (product.ratingCount ?? 0) >= 100
  if (quick === 'inventory') return quantity(product) !== null
  return true
}
export function selectTableProducts(products: MarketTaxonomyProduct[], f: TableFilters) {
  const words = f.query.trim().toLocaleLowerCase('tr-TR').split(/\s+/).filter(Boolean)
  const filtered = products.filter((p) => {
    const text =
      `${p.title} ${p.brand || ''} ${p.productId} ${p.metrics.seller_name || ''}`.toLocaleLowerCase(
        'tr-TR',
      )
    return (
      words.every((word) => text.includes(word)) &&
      (!f.brand || p.brand === f.brand) &&
      (!f.min || (p.price !== null && p.price >= Number(f.min))) &&
      (!f.max || (p.price !== null && p.price <= Number(f.max))) &&
      (!f.stock ||
        (f.stock === 'in'
          ? p.inStock === true
          : f.stock === 'out'
            ? p.inStock === false
            : p.inStock === null)) &&
      matchesQuick(p, f.quick)
    )
  })
  const value = (p: MarketTaxonomyProduct) =>
    f.sort === 'quantity' ? quantity(p) : f.sort === 'sales' ? sales(p) : p[f.sort]
  return filtered.sort((a, b) => {
    const av = value(a),
      bv = value(b)
    if (av === null) return bv === null ? a.rank - b.rank : 1
    if (bv === null) return -1
    return (av - bv) * (f.descending ? -1 : 1) || a.rank - b.rank
  })
}
export function csvCell(value: unknown) {
  const text = value == null ? '' : String(value)
  return `"${(/^[=+\-@\t\r]/.test(text) ? "'" + text : text).replaceAll('"', '""')}"`
}

export type ProductMetrics = Record<string, unknown>
const numbers = [
  'stock_quantity',
  'max_sale_limit',
  'seller_count',
  'seller_count_observed',
  'favorite_count',
  'inventory_decrease',
  'sales_estimate_daily',
  'sales_estimate_weekly',
  'sales_estimate_monthly',
  'sales_estimate_hours',
  'rating',
  'rating_count',
  'review_count',
  'question_count',
  'seller_score',
]
const strings = [
  'merchant_id',
  'seller_name',
  'variant_id',
  'variant_label',
  'listing_id',
  'inventory_key',
  'stock_quantity_source',
  'stock_quantity_kind',
  'stock_observed_at',
  'seller_count_kind',
  'sales_estimate_status',
  'sales_estimate_source',
]
export function normalizeProductMetrics(input: unknown): ProductMetrics {
  const row = input && typeof input === 'object' ? (input as ProductMetrics) : {}
  if (!Object.keys(row).length) return {}
  const result: ProductMetrics = {}
  for (const key of numbers) {
    const value = row[key]
    const n =
      value === null || value === undefined || value === '' || typeof value === 'boolean'
        ? NaN
        : Number(value)
    result[key] = Number.isFinite(n) && n >= 0 ? n : null
  }
  for (const key of strings)
    result[key] = typeof row[key] === 'string' ? row[key].slice(0, 250) : null
  for (const key of ['sellers', 'variants']) {
    const allowed =
      key === 'sellers'
        ? ['merchant_id', 'name', 'score', 'price', 'variant_id', 'listing_id', 'stock_quantity']
        : ['variant_id', 'label', 'in_stock', 'stock_quantity', 'selected']
    result[key] = Array.isArray(row[key])
      ? row[key].slice(0, 200).map((value) => {
          const item = value && typeof value === 'object' ? (value as ProductMetrics) : {}
          return Object.fromEntries(
            allowed.map((k) => [
              k,
              typeof item[k] === 'string'
                ? item[k].slice(0, 250)
                : typeof item[k] === 'number' || typeof item[k] === 'boolean'
                  ? item[k]
                  : null,
            ]),
          )
        })
      : []
  }
  return result
}

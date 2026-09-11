import { describe, expect, it } from 'vitest'
import { csvCell, defaultTableFilters, quantity, sales, selectTableProducts } from './market-table'
import type { MarketTaxonomyProduct } from './trendyol-market'
const product = (patch: Partial<MarketTaxonomyProduct>): MarketTaxonomyProduct =>
  ({
    rank: 1,
    title: 'Siyah Çanta',
    brand: 'İnci',
    productId: '123',
    price: 100,
    rankDelta: null,
    priceDeltaPercent: null,
    rating: null,
    ratingCount: null,
    inStock: null,
    runningOut: null,
    metrics: {},
    ...patch,
  }) as MarketTaxonomyProduct

describe('market table', () => {
  it('combines Turkish words, price, brand, stock and quick filters without changing source order', () => {
    const rows = [
      product({ rank: 2, price: 200 }),
      product({ rank: 1, price: 150, inStock: true, priceDeltaPercent: -5 }),
    ]
    expect(
      selectTableProducts(rows, {
        ...defaultTableFilters,
        query: 'inci siyah',
        brand: 'İnci',
        min: '120',
        max: '180',
        stock: 'in',
        quick: 'drops',
      }),
    ).toEqual([rows[1]])
    expect(rows[0].rank).toBe(2)
  })
  it('keeps missing values last in either sort direction, retaining real zero', () => {
    const rows = [
      product({ rank: 1, price: null }),
      product({ rank: 2, price: 0 }),
      product({ rank: 3, price: 10 }),
    ]
    expect(
      selectTableProducts(rows, { ...defaultTableFilters, sort: 'price' }).map((p) => p.price),
    ).toEqual([0, 10, null])
    expect(
      selectTableProducts(rows, { ...defaultTableFilters, sort: 'price', descending: true }).map(
        (p) => p.price,
      ),
    ).toEqual([10, 0, null])
  })
  it('does not treat unknown stock as in stock or unknown movement as rising', () => {
    expect(selectTableProducts([product({})], { ...defaultTableFilters, stock: 'in' })).toEqual([])
    expect(selectTableProducts([product({})], { ...defaultTableFilters, quick: 'rising' })).toEqual(
      [],
    )
  })
  it('requires observed inventory identity and valid estimate status', () => {
    expect(quantity(product({ metrics: { stock_quantity: 100 } }))).toBeNull()
    const p = product({
      metrics: {
        inventory_key: 'seller:variant',
        stock_observed_at: '2026-09-10T12:00:00Z',
        stock_quantity: 0,
        sales_estimate_daily: 10,
        sales_estimate_status: 'insufficient',
      },
    })
    expect(quantity(p)).toBe(0)
    expect(sales(p)).toBeNull()
    p.metrics.sales_estimate_status = 'estimated'
    expect(sales(p)).toBe(10)
  })
  it('escapes CSV quotes, preserves unknowns and neutralizes formulas', () => {
    expect(csvCell('=SUM(A1)')).toBe('"\'=SUM(A1)"')
    expect(csvCell('a"b')).toBe('"a""b"')
    expect(csvCell(null)).toBe('""')
  })
})

import { describe, expect, it } from 'vitest'
import { buildMarketHistory } from './trendyol-market-history'

describe('Trendyol ürün geçmişi', () => {
  it('aynı günün son gözlemini kullanır ve tarihleri sıralar', () => {
    const result = buildMarketHistory(
      'profile',
      [
        {
          observed_date: '2026-08-24',
          captured_at: '2026-08-24T12:00:00+03:00',
          price: 120,
          stock_status: 'InStock',
          sales_signal_daily_min: 10,
        },
        {
          observed_date: '2026-08-23',
          captured_at: '2026-08-23T12:00:00+03:00',
          price: 150,
          stock_status: 'OutOfStock',
          sales_signal_daily_min: 5,
        },
        {
          observed_date: '2026-08-24',
          captured_at: '2026-08-24T15:00:00+03:00',
          price: 110,
          stock_signal: 'Son 3 ürün',
          sales_signal_daily_min: 12,
        },
      ],
      [],
    )

    expect(result.price.map((point) => [point.date, point.value])).toEqual([
      ['2026-08-23', 150],
      ['2026-08-24', 110],
    ])
    expect(result.stock.map((point) => point.label)).toEqual(['Stok dışı', 'Tükeniyor'])
    expect(result.sales.at(-1)?.value).toBe(12)
  })

  it('taksonomi fiyat ve stok geçmişini profil satış alt sınırıyla birleştirir', () => {
    const result = buildMarketHistory(
      'taxonomy',
      [
        {
          observed_date: '2026-08-24',
          captured_at: '2026-08-24T16:00:00+03:00',
          sales_signal_daily_min: 166.7,
          sales_signal: '3 günde 500+ ürün satıldı!',
        },
      ],
      [
        {
          observed_date: '2026-08-24',
          captured_at: '2026-08-24T18:00:00+03:00',
          price: 999,
          in_stock: true,
          running_out: false,
        },
      ],
    )

    expect(result.price[0]?.value).toBe(999)
    expect(result.stock[0]?.label).toBe('Stokta')
    expect(result.sales[0]).toMatchObject({ value: 166.7, label: '3 günde 500+ ürün satıldı!' })
  })
})

it('numeric stock is isolated to the latest merchant/variant/listing and zero is retained', () => {
  const rows = [
    {
      observed_date: '2026-09-01',
      captured_at: '2026-09-01T09:00:00Z',
      metrics: {
        inventory_key: 'p:m:v1:l',
        stock_quantity: 10,
        stock_observed_at: '2026-09-01T09:00:00Z',
      },
    },
    {
      observed_date: '2026-09-02',
      captured_at: '2026-09-02T09:00:00Z',
      metrics: {
        inventory_key: 'p:m:v2:l',
        stock_quantity: 0,
        stock_observed_at: '2026-09-02T09:00:00Z',
        review_count: 0,
        question_count: 0,
        sales_estimate_daily: 5,
        sales_estimate_status: 'estimated',
      },
    },
  ]
  const result = buildMarketHistory('profile', rows, [])
  expect(result.quantity.map((p) => p.value)).toEqual([0])
  expect(result.reviews.at(-1)?.value).toBe(0)
  expect(result.questions.at(-1)?.value).toBe(0)
  expect(result.estimatedSales.at(-1)?.value).toBe(5)
  expect(result.salesWindows).toEqual({ daily: 5, weekly: null, monthly: null })
})

it('old observations with no numeric fields never become zero sales or inventory', () => {
  const result = buildMarketHistory(
    'taxonomy',
    [],
    [{ observed_date: '2026-09-01', in_stock: true }],
  )
  expect(result.quantity).toEqual([])
  expect(result.estimatedSales).toEqual([])
  expect(result.salesWindows).toEqual({ daily: null, weekly: null, monthly: null })
})

import { it, expect } from 'vitest'
import { normalizeProductMetrics } from './trendyol-product-metrics'
it('retains zero and rejects missing/boolean/negative/non-finite counts without leaking arbitrary seller fields', () => {
  const p = normalizeProductMetrics({
    stock_quantity: 0,
    seller_count: false,
    review_count: -2,
    question_count: 'bad',
    sellers: [{ merchant_id: '1', name: 'Store', taxNumber: 'private' }],
  })
  expect(p.stock_quantity).toBe(0)
  expect(p.seller_count).toBeNull()
  expect(p.review_count).toBeNull()
  expect(p.question_count).toBeNull()
  expect(JSON.stringify(p)).not.toContain('taxNumber')
})

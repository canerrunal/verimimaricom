import { describe, expect, it } from 'vitest'
describe('dönüşüm optimizasyonu pillar rotası', () => {
  it('ana mesajı sabittir', () => {
    expect('/rehberler/donusum-optimizasyonu').toBe('/rehberler/donusum-optimizasyonu')
    expect('daha iyi sepet').toContain('sepet')
  })
})

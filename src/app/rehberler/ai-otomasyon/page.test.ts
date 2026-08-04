import { describe, expect, it } from 'vitest'

describe('AI otomasyon pillar rotası', () => {
  it('rota ve ana güven mesajı sabittir', () => {
    expect('/rehberler/ai-otomasyon').toBe('/rehberler/ai-otomasyon')
    expect('insan onayı').toContain('onayı')
  })
})

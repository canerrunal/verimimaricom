import { describe, expect, it } from 'vitest'
describe('saas teknoloji pillar rotası', () => {
  it('ana mesajı sabittir', () => {
    expect('/rehberler/saas-teknoloji').toBe('/rehberler/saas-teknoloji')
    expect('daha iyi sistem').toContain('sistem')
  })
})

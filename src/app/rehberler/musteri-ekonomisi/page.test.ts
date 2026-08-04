import { describe, expect, it } from 'vitest'
describe('müşteri ekonomisi pillar rotası', () => { it('rota ve kohort mesajı sabittir', () => { expect('/rehberler/musteri-ekonomisi').toBe('/rehberler/musteri-ekonomisi'); expect('90 günlük katkı LTV').toContain('katkı LTV') }) })

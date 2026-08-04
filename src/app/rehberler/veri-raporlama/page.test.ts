import { describe, expect, it } from 'vitest'
describe('veri raporlama pillar rotası', () => { it('ana mesajı sabittir', () => { expect('/rehberler/veri-raporlama').toBe('/rehberler/veri-raporlama'); expect('karar ritmi').toContain('karar') }) })

import { describe, expect, it } from 'vitest'
import { getGlossaryTerm, getRelatedTerms, glossaryTerms } from './glossary'

describe('glossary content graph', () => {
  it('keeps the glossary terms unique as the library grows', () => {
    expect(glossaryTerms).toHaveLength(17)
    expect(new Set(glossaryTerms.map((item) => item.slug)).size).toBe(glossaryTerms.length)
  })

  it('requires source, guide and date metadata for every term', () => {
    for (const item of glossaryTerms) {
      expect(item.source.url).toMatch(/^https:\/\//)
      expect(item.relatedGuide.href).toMatch(/^\/rehberler\//)
      expect(item.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(item.shortDefinition.length).toBeGreaterThan(30)
      expect(item.explanation.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('resolves every explicit cross-term reference', () => {
    for (const item of glossaryTerms) {
      if (!item.confusedWith.slug) continue
      expect(getGlossaryTerm(item.confusedWith.slug)).toBeDefined()
    }
  })

  it('returns related terms without linking a term to itself', () => {
    for (const item of glossaryTerms) {
      const related = getRelatedTerms(item)
      expect(related.length).toBeLessThanOrEqual(3)
      expect(related.some((candidate) => candidate.slug === item.slug)).toBe(false)
    }
  })
})

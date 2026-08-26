import { describe, expect, it } from 'vitest'

import { getAiLocalLabRagDocuments } from './ai-local-lab'

describe('AI Local Lab external corpus', () => {
  it('keeps measured records, source and CC BY attribution together', () => {
    const documents = getAiLocalLabRagDocuments()

    expect(documents.length).toBeGreaterThan(0)
    expect(documents[0].kind).toBe('external-ai-benchmark')
    expect(documents[0].meta.evidence).toBe('measured')
    expect(documents[0].meta.license).toBe('CC BY 4.0')
    expect(documents[0].meta.attribution).toContain('ai-local-lab')
    expect(documents[0].meta.measuredAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

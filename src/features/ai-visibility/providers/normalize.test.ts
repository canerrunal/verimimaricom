import { describe, expect, it } from 'vitest'
import { buildObservation, normalizeSources } from './normalize'

const request = {
  scanId: 'scan-1',
  promptId: 'prompt-1',
  prompt: 'Türkiye için örnek analitik araçları hangileri?',
  locale: 'tr',
  maxOutputTokens: 900,
  repetition: 1,
  metadata: {},
}

describe('provider observation normalization', () => {
  it('detects target, competitors, rank and target citation deterministically', () => {
    const result = buildObservation({
      provider: 'openai',
      model: 'test-model',
      request,
      profile: {
        brandName: 'Veri Mimarı',
        aliases: ['verimimari.com'],
        sector: 'veri analitiği',
        products: [],
        country: 'Türkiye',
        language: 'tr',
        targetAudience: '',
        competitors: ['Rakip Bir', 'Rakip İki'],
        exclusions: [],
      },
      domain: 'https://verimimari.com',
      responseText: 'Rakip Bir ve Veri Mimarı bu alanda değerlendirilebilir.',
      sources: [
        { url: 'https://verimimari.com/rehber', title: 'Veri Mimarı rehberi' },
        { url: 'https://example.com/kaynak' },
      ],
      latencyMs: 120,
    })

    expect(result.mentioned).toBe(true)
    expect(result.position).toBe(2)
    expect(result.citedTarget).toBe(true)
    expect(result.competitorsMentioned).toEqual(['Rakip Bir'])
  })

  it('deduplicates and rejects invalid source URLs', () => {
    expect(
      normalizeSources([
        { url: 'https://example.com/a' },
        { url: 'https://example.com/a' },
        { url: 'javascript:alert(1)' },
      ]),
    ).toHaveLength(1)
  })

  it('marks citation evidence unavailable when a provider returns no sources', () => {
    const result = buildObservation({
      provider: 'perplexity',
      model: 'test-model',
      request,
      profile: {
        brandName: 'Veri Mimarı',
        aliases: [],
        sector: 'veri analitiği',
        products: [],
        country: 'Türkiye',
        language: 'tr',
        targetAudience: '',
        competitors: [],
        exclusions: [],
      },
      domain: 'https://verimimari.com',
      responseText: 'Veri Mimarı değerlendirilebilir.',
      sources: [],
      latencyMs: 120,
    })

    expect(result.citedTarget).toBeNull()
  })
})

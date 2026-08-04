import { describe, expect, it } from 'vitest'
import { buildManualBenchmark, parseManualSources } from './manual-benchmark'
import type { BrandProfile } from './types'

const profile: BrandProfile = {
  brandName: 'Veri Mimarı',
  aliases: ['verimimari.com'],
  sector: 'veri analitiği',
  products: ['kârlılık araçları'],
  country: 'Türkiye',
  language: 'tr',
  targetAudience: 'e-ticaret ekipleri',
  competitors: ['Rakip Bir'],
  exclusions: [],
}

const prompts = [{ id: 'prompt-1', intent: 'kategori_kesfi', text: 'Hangi araçları önerirsin?' }]

describe('manual zero-cost benchmark', () => {
  it('builds a completed report from pasted provider evidence', () => {
    const result = buildManualBenchmark({
      domain: 'https://verimimari.com',
      profile,
      prompts,
      evidence: [
        {
          provider: 'openai',
          promptId: 'prompt-1',
          responseText: 'Veri Mimarı ve Rakip Bir değerlendirilebilir.',
          sourcesText: 'https://verimimari.com/rehber',
        },
        {
          provider: 'perplexity',
          promptId: 'prompt-1',
          responseText: 'Rakip Bir bu alanda bilinen bir seçenektir.',
        },
      ],
    })

    expect(result.status).toBe('completed')
    expect(result.visibility.validRuns).toBe(2)
    expect(result.visibility.mentionCount).toBe(1)
    expect(result.sourceGap[0]?.domain).toBe('verimimari.com')
    expect(result.providerAvailability.every((item) => item.configured)).toBe(true)
  })

  it('keeps missing manual answers out of the score', () => {
    const result = buildManualBenchmark({
      domain: 'https://verimimari.com',
      profile,
      prompts,
      evidence: [
        {
          provider: 'openai',
          promptId: 'prompt-1',
          responseText: 'Veri Mimarı önerilebilir.',
        },
      ],
    })

    expect(result.status).toBe('partial')
    expect(result.visibility.validRuns).toBe(1)
    expect(result.byProvider.find((item) => item.provider === 'perplexity')?.total).toBe(0)
  })

  it('extracts and deduplicates pasted source URLs', () => {
    expect(
      parseManualSources('https://example.com/a, https://example.com/a\nhttps://example.com/b).'),
    ).toEqual([{ url: 'https://example.com/a' }, { url: 'https://example.com/b' }])
  })
})

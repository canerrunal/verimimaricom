import type {
  CompetitorStat,
  ProviderObservation,
  ProviderStat,
  ScanInput,
  SourceGapEntry,
} from '../types'

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))
const mean = (values: number[]) =>
  values.length ? values.reduce((a, v) => a + v, 0) / values.length : 0

export function rankDiscount(position: number | null): number {
  if (position === null || position < 1) return 0
  return 1 / Math.log2(position + 1)
}

export function wilsonInterval(successes: number, trials: number, z = 1.96) {
  if (trials <= 0) return { low: 0, high: 0 }
  const p = successes / trials
  const z2 = z * z
  const denominator = 1 + z2 / trials
  const center = (p + z2 / (2 * trials)) / denominator
  const margin = (z * Math.sqrt((p * (1 - p) + z2 / (4 * trials)) / trials)) / denominator
  return { low: clamp((center - margin) * 100), high: clamp((center + margin) * 100) }
}

export function calculateVisibility(observations: ProviderObservation[]) {
  const valid = observations.filter((o) => o.status === 'success')
  const mentionCount = valid.filter((o) => o.mentioned).length
  const coverage = valid.length ? (mentionCount / valid.length) * 100 : 0
  const rankScore = mean(valid.map((o) => rankDiscount(o.position))) * 100

  const citationEligible = valid.filter((o) => o.citedTarget !== null)
  const citationScore = citationEligible.length
    ? mean(
        citationEligible.map((o) => {
          if (!o.mentioned) return 0
          return o.citedTarget ? 100 : 25
        }),
      )
    : null

  const byPrompt = new Map<string, ProviderObservation[]>()
  for (const o of valid) {
    const group = byPrompt.get(o.promptId) ?? []
    group.push(o)
    byPrompt.set(o.promptId, group)
  }
  const consistency =
    mean(
      [...byPrompt.values()].map((group) => {
        const providers = new Set(group.map((o) => o.provider)).size
        if (!providers) return 0
        const mentionedProviders = new Set(group.filter((o) => o.mentioned).map((o) => o.provider))
          .size
        return (mentionedProviders / providers) * 100
      }),
    ) || 0

  const components = [
    { score: coverage, weight: 0.45 },
    { score: rankScore, weight: 0.25 },
    ...(citationScore === null ? [] : [{ score: citationScore, weight: 0.2 }]),
    { score: consistency, weight: 0.1 },
  ]
  const totalWeight = components.reduce((s, c) => s + c.weight, 0)
  const visibilityIndex = clamp(
    components.reduce((s, c) => s + c.score * c.weight, 0) / totalWeight,
  )

  return {
    index: Math.round(visibilityIndex * 10) / 10,
    coverage: Math.round(coverage * 10) / 10,
    rankScore: Math.round(rankScore * 10) / 10,
    citationScore: citationScore === null ? null : Math.round(citationScore * 10) / 10,
    consistency: Math.round(consistency * 10) / 10,
    validRuns: valid.length,
    mentionCount,
    wilson95: wilsonInterval(mentionCount, valid.length),
  }
}

export function buildProviderStats(
  observations: ProviderObservation[],
  input: ScanInput,
): ProviderStat[] {
  return input.providers.map((provider) => {
    const rows = observations.filter((o) => o.provider === provider && o.status === 'success')
    const mentioned = rows.filter((o) => o.mentioned)
    return {
      provider,
      total: rows.length,
      mentioned: mentioned.length,
      avgPosition: mentioned.length
        ? Math.round(mean(mentioned.map((o) => o.position ?? 0)) * 10) / 10
        : null,
      citationRate: mentioned.length
        ? Math.round((mentioned.filter((o) => o.citedTarget).length / mentioned.length) * 1000) / 10
        : null,
    }
  })
}

export function buildCompetitorStats(
  observations: ProviderObservation[],
  input: ScanInput,
): CompetitorStat[] {
  const totalRuns = Math.max(1, observations.filter((o) => o.status === 'success').length)
  const allNames = new Set<string>()
  for (const obs of observations) {
    for (const c of obs.competitorsMentioned) allNames.add(c)
  }
  for (const c of input.profile.competitors) allNames.add(c)

  return [...allNames]
    .map((name) => {
      const rows = observations.filter(
        (o) => o.status === 'success' && o.competitorsMentioned.includes(name),
      )
      const mentions = rows.length
      const byProvider: Record<string, number> = {}
      for (const row of rows) {
        byProvider[row.provider] = (byProvider[row.provider] ?? 0) + 1
      }
      return {
        name,
        mentions,
        shareOfVoice: Math.round((mentions / totalRuns) * 1000) / 10,
        avgPosition: null,
        byProvider,
      }
    })
    .sort((a, b) => b.shareOfVoice - a.shareOfVoice)
    .slice(0, 10)
}

export function buildSourceGap(
  observations: ProviderObservation[],
  input: ScanInput,
): SourceGapEntry[] {
  const map = new Map<string, { citations: number; supported: Set<string> }>()
  for (const obs of observations) {
    for (const c of obs.citations) {
      const entry = map.get(c.domain) ?? { citations: 0, supported: new Set<string>() }
      entry.citations += 1
      if (obs.mentioned) entry.supported.add(input.profile.brandName)
      for (const comp of obs.competitorsMentioned) entry.supported.add(comp)
      map.set(c.domain, entry)
    }
  }

  const kind = (domain: string): SourceGapEntry['kind'] => {
    if (domain.includes('blog')) return 'blog'
    if (domain.includes('youtube') || domain.includes('video')) return 'review'
    if (domain.includes('wikipedia') || domain.includes('docs')) return 'docs'
    if (domain.includes('forum') || domain.includes('reddit')) return 'blog'
    if (domain.includes('trendyol') || domain.includes('amazon') || domain.includes('hepsi'))
      return 'marketplace'
    return 'other'
  }

  return [...map.entries()]
    .map(([domain, entry]) => {
      const supportedBrands = [...entry.supported]
      const targetPresent = supportedBrands.includes(input.profile.brandName)
      const supportCount = supportedBrands.length
      const opportunity: SourceGapEntry['opportunity'] = targetPresent
        ? 'dusuk'
        : supportCount > 2
          ? 'yuksek'
          : 'orta'
      return {
        domain,
        citations: entry.citations,
        supportedBrands,
        kind: kind(domain),
        targetPresent,
        opportunity,
      }
    })
    .sort((a, b) => b.citations - a.citations)
    .slice(0, 12)
}

export function buildActions(
  _findingsCount: number,
  _competitorCount: number,
  _input: ScanInput,
): Array<{
  id: string
  phase: 'ilk-7' | 'ilk-30' | 'ilk-90'
  title: string
  impact: 'yuksek' | 'orta' | 'dusuk'
  effort: 'yuksek' | 'orta' | 'dusuk'
  successMetric: string
}> {
  const actions: Array<{
    id: string
    phase: 'ilk-7' | 'ilk-30' | 'ilk-90'
    title: string
    impact: 'yuksek' | 'orta' | 'dusuk'
    effort: 'yuksek' | 'orta' | 'dusuk'
    successMetric: string
  }> = [
    {
      id: 'a-1',
      phase: 'ilk-7',
      title: 'Organization ve WebSite schema alanlarını yayına al',
      impact: 'yuksek',
      effort: 'dusuk',
      successMetric: 'Organization JSON-LD zengin sonuç testi geçti.',
    },
    {
      id: 'a-2',
      phase: 'ilk-7',
      title: 'Ana ürün sayfalarında fiyat, stok ve teknik özellikleri senkronize et',
      impact: 'yuksek',
      effort: 'orta',
      successMetric: 'Merchant feed hatası 0 olarak kaldı.',
    },
    {
      id: 'a-3',
      phase: 'ilk-30',
      title: 'Rakiplerin atıf aldığı bağımsız rehberleri üret',
      impact: 'yuksek',
      effort: 'orta',
      successMetric: 'En az 3 rehber yayımlandı ve dizine eklendi.',
    },
    {
      id: 'a-4',
      phase: 'ilk-30',
      title: 'Profilinde tanımlı rakiplerle karşılaştırma sayfaları kur',
      impact: 'orta',
      effort: 'orta',
      successMetric: 'Karşılaştırma sayfaları Google Search Console’da görünür oldu.',
    },
    {
      id: 'a-5',
      phase: 'ilk-90',
      title: 'Bağımsız yayın ve kullanıcı deneyimi sinyalini büyüt',
      impact: 'orta',
      effort: 'yuksek',
      successMetric: 'Hedef marka anılma oranı 30 gün içinde %10 arttı.',
    },
    {
      id: 'a-6',
      phase: 'ilk-90',
      title: 'Görünürlük ölçümünü düzenli benchmark’a bağla',
      impact: 'orta',
      effort: 'dusuk',
      successMetric: 'Aylık ölçüm raporu ve trend takibi kuruldu.',
    },
  ]

  return actions.slice(0, 6)
}

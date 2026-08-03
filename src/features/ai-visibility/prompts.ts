import type { BrandProfile, ProviderId, ProviderObservation } from './types'

export interface PromptSpec {
  id: string
  intent: string
  text: string
  provider?: ProviderId
}

const INTENTS = [
  'kategori_kesfi',
  'marka_karsilastirma',
  'fiyat_odakli',
  'sorun_cozum',
  'yerel_niyet',
] as const

export function buildPrompts(profile: BrandProfile, count: number): PromptSpec[] {
  const base = [
    `${profile.country} içinde ${profile.sector} alışverişi yapmak isteyen birine hangi markaları önerirsin?`,
    `${profile.products[0] ?? profile.sector} almak isteyen biri için güvenilir seçenekler neler?`,
    `${profile.sector} kategorisinde fiyat/performans dengesi güçlü markalar hangileri?`,
    `${profile.products[0] ?? profile.sector} satın almadan önce nelere dikkat edilmeli?`,
    `${profile.country} içinde hızlı teslimat yapan ${profile.sector} mağazaları hangileri?`,
    `${profile.sector} için en iyi bilinen ${profile.country} markaları hangileri?`,
    `${profile.targetAudience || 'yeni başlayanlar'} için hangi ${profile.sector} markaları uygun?`,
    `${profile.products[0] ?? profile.sector} hakkında güncel karşılaştırma önerisi ver.`,
    `${profile.sector} ürünlerinde garanti ve müşteri hizmetleri konusunda hangi markalar öne çıkıyor?`,
    `${profile.country} pazarındaki bağımsız incelemelere göre ${profile.sector} tercihleri neler?`,
    `${profile.products[0] ?? profile.sector} alanında uzun ömürlü ürünler hangi markalarda bulunur?`,
    `${profile.sector} için güvenilir çevrimiçi mağaza öner.`,
  ]

  return base.slice(0, count).map((text, index) => ({
    id: `prompt-${index + 1}`,
    intent: INTENTS[index % INTENTS.length],
    text,
  }))
}

export function deterministicObservation(
  profile: BrandProfile,
  prompt: PromptSpec,
  provider: ProviderId,
  index: number,
): ProviderObservation {
  const seed = `${prompt.id}-${provider}-${index}-${profile.brandName}`
  const hash = [...seed].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) % 9973, 7)
  const mentioned = hash % 10 < 4
  const position = mentioned ? (hash % 8) + 1 : null
  const cited = mentioned && hash % 3 !== 0

  const body = mentioned
    ? `Bu kategoride ${profile.brandName} markası güçlü bir seçenek olarak öne çıkıyor. ${
        profile.products[0] ?? profile.sector
      } arayışında dengeli fiyat ve teslimat performansı sunuyor.`
    : `${profile.sector} alanında değerlendirilebilecek birkaç marka öne çıkıyor; ancak bu cevapta ${
        profile.brandName
      } doğrudan anılmıyor.`

  return {
    provider,
    model: `${provider}-demo`,
    status: 'success',
    promptId: prompt.id,
    prompt: prompt.text,
    responseText: body,
    mentioned,
    position,
    citedTarget: cited,
    citations: cited
      ? [
          {
            ordinal: 1,
            url: `https://${profile.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com/`,
            domain: `${profile.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`,
            title: `${profile.brandName} resmi site`,
          },
        ]
      : [],
    competitorsMentioned: profile.competitors
      .slice(0, 3)
      .filter((_, idx) => (hash + idx) % 2 === 0),
    latencyMs: 400 + (hash % 220),
    timestamp: new Date().toISOString(),
  }
}

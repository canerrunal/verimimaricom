import type { BrandProfile, ProviderId } from './types'

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

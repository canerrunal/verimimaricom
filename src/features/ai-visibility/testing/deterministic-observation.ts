import type { PromptSpec } from '../prompts'
import type { BrandProfile, ProviderId, ProviderObservation } from '../types'

/**
 * Test/demo fixture only. Production provider registries must never import this module.
 */
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
  const slug = profile.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '')

  return {
    provider,
    model: `${provider}-demo`,
    status: 'success',
    promptId: prompt.id,
    prompt: prompt.text,
    responseText: mentioned
      ? `Bu kategoride ${profile.brandName} markası güçlü bir seçenek olarak öne çıkıyor.`
      : `${profile.sector} alanında seçenekler var; ${profile.brandName} bu cevapta anılmıyor.`,
    mentioned,
    position,
    citedTarget: cited,
    citations: cited ? [{ ordinal: 1, url: `https://${slug}.com/`, domain: `${slug}.com` }] : [],
    competitorsMentioned: profile.competitors.filter((_, idx) => (hash + idx) % 2 === 0),
    latencyMs: 400 + (hash % 220),
    timestamp: new Date().toISOString(),
  }
}

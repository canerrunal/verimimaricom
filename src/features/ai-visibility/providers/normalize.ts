import type { BrandProfile, Citation, ProviderId, ProviderObservation } from '../types'
import type { ProviderRequest } from './contract'

export interface ProviderSource {
  url: string
  title?: string
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function includesName(text: string, name: string) {
  const clean = name.trim()
  if (clean.length < 2) return false
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(clean)}([^\\p{L}\\p{N}]|$)`, 'iu').test(text)
}

function firstNameOffset(text: string, names: string[]) {
  const normalized = text.toLocaleLowerCase('tr-TR')
  const offsets = names
    .map((name) => ({ name, offset: normalized.indexOf(name.toLocaleLowerCase('tr-TR')) }))
    .filter((entry) => entry.offset >= 0)
    .sort((a, b) => a.offset - b.offset)
  return offsets
}

function safeDomain(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

export function normalizeSources(sources: ProviderSource[]): Citation[] {
  const seen = new Set<string>()
  return sources
    .filter((source) => /^https?:\/\//i.test(source.url))
    .filter((source) => {
      if (seen.has(source.url)) return false
      seen.add(source.url)
      return true
    })
    .slice(0, 20)
    .map((source, index) => ({
      ordinal: index + 1,
      url: source.url,
      domain: safeDomain(source.url),
      title: source.title,
    }))
}

export function buildObservation(input: {
  provider: ProviderId
  model: string
  request: ProviderRequest
  profile: BrandProfile
  domain: string
  responseText: string
  sources: ProviderSource[]
  latencyMs: number
}): ProviderObservation {
  const aliases = [input.profile.brandName, ...input.profile.aliases].filter(Boolean)
  const mentioned = aliases.some((name) => includesName(input.responseText, name))
  const competitorsMentioned = input.profile.competitors.filter((name) =>
    includesName(input.responseText, name),
  )
  const orderedNames = firstNameOffset(input.responseText, [
    ...aliases,
    ...input.profile.competitors,
  ])
  const targetOrder = orderedNames.findIndex((entry) => aliases.includes(entry.name))
  const citations = normalizeSources(input.sources)
  const targetDomain = safeDomain(input.domain)
  const citedTarget = citations.length
    ? mentioned
      ? citations.some(
          (citation) =>
            citation.domain === targetDomain || citation.domain.endsWith(`.${targetDomain}`),
        )
      : false
    : null

  return {
    provider: input.provider,
    model: input.model,
    status: 'success',
    promptId: input.request.promptId,
    prompt: input.request.prompt,
    responseText: input.responseText,
    mentioned,
    position: mentioned && targetOrder >= 0 ? targetOrder + 1 : null,
    citedTarget,
    citations,
    competitorsMentioned,
    latencyMs: input.latencyMs,
    timestamp: new Date().toISOString(),
  }
}

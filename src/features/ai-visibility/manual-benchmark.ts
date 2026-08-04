import { buildObservation, type ProviderSource } from './providers/normalize'
import type { PromptSpec } from './prompts'
import {
  buildCompetitorStats,
  buildProviderStats,
  buildSourceGap,
  calculateVisibility,
} from './scoring/engine'
import type { BrandProfile, ProviderId, ScanInput, VisibilityBenchmarkOutput } from './types'

export const manualProviders = ['openai', 'perplexity'] as const
export type ManualProvider = (typeof manualProviders)[number]

export interface ManualEvidence {
  provider: ManualProvider
  promptId: string
  responseText: string
  sourcesText?: string
}

const providerLabels: Record<ManualProvider, string> = {
  openai: 'ChatGPT',
  perplexity: 'Perplexity',
}

export function manualEvidenceKey(provider: ManualProvider, promptId: string) {
  return `${provider}:${promptId}`
}

export function parseManualSources(value: string): ProviderSource[] {
  const matches = value.match(/https?:\/\/[^\s<>"']+/gi) ?? []
  return matches
    .map((url) => url.replace(/[),.;\]}]+$/g, ''))
    .filter((url, index, items) => items.indexOf(url) === index)
    .slice(0, 20)
    .map((url) => ({ url }))
}

export function buildManualBenchmark(input: {
  domain: string
  profile: BrandProfile
  prompts: PromptSpec[]
  evidence: ManualEvidence[]
}): VisibilityBenchmarkOutput {
  const completedEvidence = input.evidence.filter((item) => item.responseText.trim().length > 0)
  const promptMap = new Map(input.prompts.map((prompt) => [prompt.id, prompt]))
  const observations = completedEvidence.flatMap((item) => {
    const prompt = promptMap.get(item.promptId)
    if (!prompt) return []
    return [
      buildObservation({
        provider: item.provider,
        model: 'ücretsiz web oturumu / manuel kanıt',
        request: {
          scanId: 'manual',
          promptId: prompt.id,
          prompt: prompt.text,
          locale: input.profile.language,
          country: input.profile.country,
          maxOutputTokens: 0,
          repetition: 1,
          metadata: {},
        },
        profile: input.profile,
        domain: input.domain,
        responseText: item.responseText.trim(),
        sources: parseManualSources(item.sourcesText || ''),
        latencyMs: 0,
      }),
    ]
  })
  const providers = [...manualProviders] as ProviderId[]
  const scanInput: ScanInput = {
    domain: input.domain,
    profile: input.profile,
    providers,
    promptCount: input.prompts.length,
    repetitions: 1,
  }
  const visibility = calculateVisibility(observations)
  const plannedRuns = input.prompts.length * manualProviders.length

  return {
    scanId: `manual-${Date.now()}`,
    status:
      visibility.validRuns === 0
        ? 'failed'
        : visibility.validRuns === plannedRuns
          ? 'completed'
          : 'partial',
    createdAt: new Date().toISOString(),
    domain: input.domain,
    profile: input.profile,
    promptCount: input.prompts.length,
    plannedRuns,
    providerAvailability: manualProviders.map((provider) => ({
      provider,
      label: providerLabels[provider],
      model: 'Manuel web kanıtı',
      configured: completedEvidence.some((item) => item.provider === provider),
    })),
    visibility,
    byProvider: buildProviderStats(observations, scanInput),
    competitors: buildCompetitorStats(observations, scanInput),
    sourceGap: buildSourceGap(observations, scanInput),
    observations,
    methodologyNote:
      'Bu rapor, kullanıcının ücretsiz ChatGPT ve/veya Perplexity web oturumlarından manuel olarak yapıştırdığı yanıtlardan tarayıcı içinde hesaplanır. Veri Mimarı sağlayıcılara API çağrısı yapmaz. Yalnızca doldurulan yanıtlar puana katılır; kaynak bağlantısı eklenmediyse atıf skoru hesaplanmaz.',
    version: 'manual-zero-cost-1.0',
  }
}

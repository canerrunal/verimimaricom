import { createHash, randomUUID } from 'node:crypto'
import { buildPrompts } from '../prompts'
import { liveProviderAdapters, providerLabels } from '../providers'
import { ProviderError, type ProviderRequest } from '../providers/contract'
import {
  buildCompetitorStats,
  buildProviderStats,
  buildSourceGap,
  calculateVisibility,
} from '../scoring/engine'
import type {
  ProviderId,
  ProviderObservation,
  ScanInput,
  VisibilityBenchmarkOutput,
} from '../types'

function failedObservation(
  provider: ProviderId,
  model: string,
  request: ProviderRequest,
  error: unknown,
): ProviderObservation {
  const providerError =
    error instanceof ProviderError
      ? error
      : new ProviderError('Sağlayıcı yanıtı tamamlanamadı.', 'provider_failed', true, provider)
  return {
    provider,
    model,
    status: providerError.code === 'not_configured' ? 'blocked' : 'failed',
    promptId: request.promptId,
    prompt: request.prompt,
    responseText: '',
    mentioned: false,
    position: null,
    citedTarget: null,
    citations: [],
    competitorsMentioned: [],
    latencyMs: 0,
    timestamp: new Date().toISOString(),
    error: {
      code: providerError.code,
      message: providerError.message,
      retryable: providerError.retryable,
    },
  }
}

async function runWithConcurrency<T>(tasks: Array<() => Promise<T>>, limit: number) {
  const results: T[] = new Array(tasks.length)
  let cursor = 0
  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor++
      results[index] = await tasks[index]()
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => worker()))
  return results
}

export async function runVisibilityBenchmark(
  input: ScanInput,
  context: { safetyIdentifier: string },
): Promise<VisibilityBenchmarkOutput> {
  const scanId = randomUUID()
  const prompts = buildPrompts(input.profile, Math.min(input.promptCount, 4))
  const providers = input.providers.filter(
    (provider): provider is 'openai' | 'perplexity' =>
      provider === 'openai' || provider === 'perplexity',
  )
  const availability = providers.map((provider) => {
    const adapter = liveProviderAdapters[provider]!
    return {
      provider,
      label: providerLabels[provider] || provider,
      model: adapter.model,
      configured: adapter.configured(),
    }
  })

  const tasks = providers.flatMap((provider) => {
    const adapter = liveProviderAdapters[provider]!
    return prompts.map((prompt) => async () => {
      const request: ProviderRequest = {
        scanId,
        promptId: prompt.id,
        prompt: prompt.text,
        locale: input.profile.language,
        country: input.profile.country,
        maxOutputTokens: 900,
        repetition: 1,
        metadata: {
          profile: JSON.stringify(input.profile),
          domain: input.domain,
          safetyIdentifier: context.safetyIdentifier,
        },
      }
      if (!adapter.configured()) {
        return failedObservation(
          provider,
          adapter.model,
          request,
          new ProviderError('Sağlayıcı henüz yapılandırılmadı.', 'not_configured', false, provider),
        )
      }
      try {
        return (await adapter.run(request)).payload
      } catch (error) {
        return failedObservation(provider, adapter.model, request, error)
      }
    })
  })

  const observations = await runWithConcurrency(tasks, 2)
  const scanInput: ScanInput = { ...input, providers, promptCount: prompts.length, repetitions: 1 }
  const visibility = calculateVisibility(observations)
  const plannedRuns = prompts.length * providers.length
  const status =
    visibility.validRuns === 0
      ? 'failed'
      : visibility.validRuns < plannedRuns
        ? 'partial'
        : 'completed'

  return {
    scanId,
    status,
    createdAt: new Date().toISOString(),
    domain: input.domain,
    profile: input.profile,
    promptCount: prompts.length,
    plannedRuns,
    providerAvailability: availability,
    visibility,
    byProvider: buildProviderStats(observations, scanInput),
    competitors: buildCompetitorStats(observations, scanInput),
    sourceGap: buildSourceGap(observations, scanInput),
    observations,
    methodologyNote:
      'Sonuçlar 4 markasız soru, tek tekrar ve yalnızca başarıyla tamamlanan sağlayıcı yanıtlarından hesaplanır. Başarısız veya yapılandırılmamış sağlayıcılar puan paydasına alınmaz.',
    version: 'live-beta-1.0',
  }
}

export function safetyIdentifier(value: string) {
  return `vm_${createHash('sha256').update(value).digest('hex').slice(0, 32)}`
}

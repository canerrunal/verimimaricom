import type { BrandProfile, ProviderObservation } from '../types'
import type { ProviderAdapter, ProviderRequest, ProviderResult } from '../providers/contract'
import { deterministicObservation } from './deterministic-observation'

// Test and demo fixtures live outside the production provider registry on purpose.
function makeAdapter(provider: ProviderObservation['provider']): ProviderAdapter {
  return {
    id: provider,
    model: `${provider}-demo`,
    modelFor: () => `${provider}-demo`,
    configured: () => process.env.NODE_ENV !== 'production',
    async run(request: ProviderRequest): Promise<ProviderResult<ProviderObservation>> {
      const profile: BrandProfile = JSON.parse(request.metadata.profile ?? '{}')
      const prompt = { id: request.promptId, intent: 'custom', text: request.prompt }
      const observation = deterministicObservation(profile, prompt, provider, request.repetition)
      return {
        provider,
        model: `${provider}-demo`,
        status: 'success',
        payload: observation,
        latencyMs: observation.latencyMs,
        retryCount: 0,
      }
    },
  }
}

export const providerAdapters = {
  openai: makeAdapter('openai'),
  gemini: makeAdapter('gemini'),
  anthropic: makeAdapter('anthropic'),
  perplexity: makeAdapter('perplexity'),
  xai: makeAdapter('xai'),
} as const

import type { ProviderId } from '../types'
import type { ProviderAdapter } from './contract'
import { openAIAdapter } from './openai'
import { perplexityAdapter } from './perplexity'

export const liveProviderAdapters: Partial<Record<ProviderId, ProviderAdapter>> = {
  openai: openAIAdapter,
  perplexity: perplexityAdapter,
}

export const providerLabels: Partial<Record<ProviderId, string>> = {
  openai: 'OpenAI',
  perplexity: 'Perplexity',
}

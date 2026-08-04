import type { ProviderId, ProviderObservation } from '../types'

export interface ProviderRequest {
  scanId: string
  promptId: string
  prompt: string
  locale: string
  country?: string
  maxOutputTokens: number
  repetition: number
  metadata: Record<string, string>
  gatewayToken?: string
}

export interface ProviderHealth {
  ok: boolean
  provider: ProviderId
  model?: string
  webSearchAvailable: boolean
  checkedAt: string
  message?: string
}

export interface ProviderResult<T = unknown> {
  provider: ProviderId
  model: string
  status: 'success' | 'failed' | 'blocked'
  payload: T
  latencyMs: number
  retryCount: number
  error?: { code: string; message: string; retryable: boolean }
}

export interface ProviderAdapter {
  readonly id: ProviderId
  readonly model: string
  modelFor(gatewayToken?: string): string
  configured(gatewayToken?: string): boolean
  run(request: ProviderRequest): Promise<ProviderResult<ProviderObservation>>
}

export class ProviderError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly retryable: boolean,
    readonly provider: ProviderId,
  ) {
    super(message)
    this.name = 'ProviderError'
  }
}

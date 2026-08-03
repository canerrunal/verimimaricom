import type { BrandProfile, ProviderObservation } from '../types'
import type { ProviderAdapter, ProviderRequest, ProviderResult } from './contract'
import { ProviderError } from './contract'
import { buildObservation, type ProviderSource } from './normalize'

const DEFAULT_MODEL = 'sonar'

function readPerplexityResponse(payload: unknown) {
  const body = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
  const choices = Array.isArray(body.choices) ? body.choices : []
  const firstChoice =
    choices[0] && typeof choices[0] === 'object' ? (choices[0] as Record<string, unknown>) : {}
  const message =
    firstChoice.message && typeof firstChoice.message === 'object'
      ? (firstChoice.message as Record<string, unknown>)
      : {}
  const text = message.content
  const results = Array.isArray(body.search_results) ? body.search_results : []
  const citations = Array.isArray(body.citations) ? body.citations : []
  const sources: ProviderSource[] = [
    ...results
      .filter((item: unknown) => item && typeof item === 'object')
      .map((item: Record<string, unknown>) => ({
        url: typeof item.url === 'string' ? item.url : '',
        title: typeof item.title === 'string' ? item.title : undefined,
      })),
    ...citations
      .filter((url: unknown): url is string => typeof url === 'string')
      .map((url: string) => ({ url })),
  ]
  return { text: typeof text === 'string' ? text.trim() : '', sources }
}

export const perplexityAdapter: ProviderAdapter = {
  id: 'perplexity',
  model: process.env.PERPLEXITY_VISIBILITY_MODEL || DEFAULT_MODEL,
  configured: () => Boolean(process.env.PERPLEXITY_API_KEY),
  async run(request: ProviderRequest): Promise<ProviderResult<ProviderObservation>> {
    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      throw new ProviderError(
        'Perplexity sağlayıcı anahtarı yapılandırılmamış.',
        'not_configured',
        false,
        'perplexity',
      )
    }

    const profile = JSON.parse(request.metadata.profile || '{}') as BrandProfile
    const startedAt = Date.now()
    const response = await fetch('https://api.perplexity.ai/v1/sonar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(45_000),
      body: JSON.stringify({
        model: perplexityAdapter.model,
        max_tokens: request.maxOutputTokens,
        temperature: 0.1,
        messages: [
          {
            role: 'system',
            content:
              'Yalnızca arama sonuçlarına dayan. Ölçülen markayı önceden öne çıkarma. Sonuç yetersizse tahmin yürütmeden bunu söyle. En fazla 5 marka öner.',
          },
          {
            role: 'user',
            content: `${request.prompt}\n\nHedef pazar: ${request.country || 'belirtilmedi'}. Yanıt dili: ${request.locale}.`,
          },
        ],
        web_search_options: { search_mode: 'web' },
        language_preference: request.locale,
      }),
    })

    const payload = (await response.json()) as unknown
    if (!response.ok) {
      const errorBody =
        payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
      const error =
        errorBody.error && typeof errorBody.error === 'object'
          ? (errorBody.error as Record<string, unknown>)
          : {}
      const detail = typeof errorBody.detail === 'string' ? errorBody.detail : ''
      throw new ProviderError(
        (typeof error.message === 'string' && error.message) ||
          detail ||
          'Perplexity yanıtı alınamadı.',
        `http_${response.status}`,
        response.status === 429 || response.status >= 500,
        'perplexity',
      )
    }

    const parsed = readPerplexityResponse(payload)
    if (!parsed.text) {
      throw new ProviderError(
        'Perplexity boş yanıt döndürdü.',
        'empty_response',
        true,
        'perplexity',
      )
    }
    const latencyMs = Date.now() - startedAt
    const observation = buildObservation({
      provider: 'perplexity',
      model: perplexityAdapter.model,
      request,
      profile,
      domain: request.metadata.domain || '',
      responseText: parsed.text,
      sources: parsed.sources,
      latencyMs,
    })

    return {
      provider: 'perplexity',
      model: perplexityAdapter.model,
      status: 'success',
      payload: observation,
      latencyMs,
      retryCount: 0,
    }
  },
}

export { readPerplexityResponse }

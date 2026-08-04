import type { BrandProfile, ProviderObservation } from '../types'
import type { ProviderAdapter, ProviderRequest, ProviderResult } from './contract'
import { ProviderError } from './contract'
import { buildObservation, type ProviderSource } from './normalize'

const DEFAULT_MODEL = 'gpt-5.6-luna'
const GATEWAY_URL = 'https://ai-gateway.vercel.sh/v1/responses'

function gatewayToken() {
  return process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || ''
}

function directModel() {
  return process.env.OPENAI_VISIBILITY_MODEL || DEFAULT_MODEL
}

function resolvedModel() {
  const model = directModel()
  return gatewayToken() ? `openai/${model.replace(/^openai\//, '')}` : model
}

function countryCode(country?: string) {
  const codes: Record<string, string> = {
    Türkiye: 'TR',
    Almanya: 'DE',
    'Birleşik Krallık': 'GB',
    'Amerika Birleşik Devletleri': 'US',
  }
  return country ? codes[country] : undefined
}

function readOpenAIResponse(payload: unknown) {
  const body = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
  const output = Array.isArray(body.output) ? body.output : []
  const textParts: string[] = []
  const sources: ProviderSource[] = []

  for (const item of output) {
    if (!item || typeof item !== 'object') continue
    const row = item as Record<string, unknown>
    if (row.type === 'message' && Array.isArray(row.content)) {
      for (const part of row.content) {
        if (!part || typeof part !== 'object') continue
        const content = part as Record<string, unknown>
        if (typeof content.text === 'string') textParts.push(content.text)
        if (Array.isArray(content.annotations)) {
          for (const annotation of content.annotations) {
            if (!annotation || typeof annotation !== 'object') continue
            const citation = annotation as Record<string, unknown>
            if (citation.type === 'url_citation' && typeof citation.url === 'string') {
              sources.push({
                url: citation.url,
                title: typeof citation.title === 'string' ? citation.title : undefined,
              })
            }
          }
        }
      }
    }
    if (row.type === 'web_search_call' && row.action && typeof row.action === 'object') {
      const action = row.action as Record<string, unknown>
      if (Array.isArray(action.sources)) {
        for (const source of action.sources) {
          if (!source || typeof source !== 'object') continue
          const citation = source as Record<string, unknown>
          if (typeof citation.url === 'string') {
            sources.push({
              url: citation.url,
              title: typeof citation.title === 'string' ? citation.title : undefined,
            })
          }
        }
      }
    }
  }

  return {
    text:
      textParts.join('\n').trim() || (typeof body.output_text === 'string' ? body.output_text : ''),
    sources,
  }
}

export const openAIAdapter: ProviderAdapter = {
  id: 'openai',
  model: resolvedModel(),
  configured: () => Boolean(gatewayToken() || process.env.OPENAI_API_KEY),
  async run(request: ProviderRequest): Promise<ProviderResult<ProviderObservation>> {
    const gatewayApiKey = gatewayToken()
    const apiKey = gatewayApiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new ProviderError(
        'OpenAI sağlayıcı anahtarı yapılandırılmamış.',
        'not_configured',
        false,
        'openai',
      )
    }

    const profile = JSON.parse(request.metadata.profile || '{}') as BrandProfile
    const domain = request.metadata.domain || ''
    const location = countryCode(request.country)
    const startedAt = Date.now()
    const response = await fetch(
      gatewayApiKey ? GATEWAY_URL : 'https://api.openai.com/v1/responses',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(45_000),
        body: JSON.stringify({
          model: resolvedModel(),
          store: false,
          reasoning: { effort: 'low' },
          text: { verbosity: 'low' },
          max_output_tokens: request.maxOutputTokens,
          tools: [
            {
              type: 'web_search',
              ...(location ? { user_location: { type: 'approximate', country: location } } : {}),
            },
          ],
          include: ['web_search_call.action.sources'],
          safety_identifier: request.metadata.safetyIdentifier,
          instructions:
            'Bu bağımsız bir marka görünürlüğü benchmarkıdır. Soruyu web aramasıyla, tarafsız ve kısa yanıtla. En fazla 5 marka öner. Kullanıcının ölçtüğü markayı önceden öne çıkarma. Kaynak yetersizse açıkça söyle.',
          input: `${request.prompt}\n\nHedef pazar: ${request.country || 'belirtilmedi'}. Yanıt dili: ${request.locale}.`,
        }),
      },
    )

    const payload = (await response.json()) as unknown
    if (!response.ok) {
      const errorBody =
        payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
      const error =
        errorBody.error && typeof errorBody.error === 'object'
          ? (errorBody.error as Record<string, unknown>)
          : {}
      const authenticationFailed = response.status === 401 || response.status === 403
      throw new ProviderError(
        authenticationFailed
          ? gatewayApiKey
            ? 'Vercel AI Gateway kimlik doğrulaması başarısız. OIDC veya Gateway ayarlarını kontrol edin.'
            : 'OpenAI bağlantı anahtarı geçersiz veya yetkisiz. Ortam yapılandırmasını güncelleyin.'
          : (typeof error.message === 'string' && error.message) || 'OpenAI yanıtı alınamadı.',
        `http_${response.status}`,
        response.status === 429 || response.status >= 500,
        'openai',
      )
    }

    const parsed = readOpenAIResponse(payload)
    if (!parsed.text) {
      throw new ProviderError('OpenAI boş yanıt döndürdü.', 'empty_response', true, 'openai')
    }
    const latencyMs = Date.now() - startedAt
    const observation = buildObservation({
      provider: 'openai',
      model: resolvedModel(),
      request,
      profile,
      domain,
      responseText: parsed.text,
      sources: parsed.sources,
      latencyMs,
    })

    return {
      provider: 'openai',
      model: resolvedModel(),
      status: 'success',
      payload: observation,
      latencyMs,
      retryCount: 0,
    }
  },
}

export { readOpenAIResponse }

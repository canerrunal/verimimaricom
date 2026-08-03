const domainRegex = /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i

import type { BrandProfile, ProviderId, ScanInput } from '../types'

export interface ValidationResult<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PreflightInput {
  domain: string
  consent: true
}

export interface ScanRequestInput extends ScanInput {
  consent: true
}

function cleanString(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function cleanList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => cleanString(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems)
}

export function normalizeDomain(value: unknown): ValidationResult<string> {
  const raw = cleanString(value, 300)
  if (!raw) return { success: false, error: 'Analiz edilecek alan adını girin.' }

  let url: URL
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  } catch {
    return { success: false, error: 'Geçerli bir alan adı girin (ör. ornekmagaza.com).' }
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    return {
      success: false,
      error: 'Yalnızca herkese açık HTTP/HTTPS adresleri analiz edilebilir.',
    }
  }

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '')
  if (!domainRegex.test(hostname)) {
    return { success: false, error: 'Geçerli bir alan adı girin (ör. ornekmagaza.com).' }
  }

  if (url.port && !['80', '443'].includes(url.port)) {
    return { success: false, error: 'Yalnızca standart web portları analiz edilebilir.' }
  }

  url.hash = ''
  return { success: true, data: url.toString() }
}

export function parsePreflightInput(value: unknown): ValidationResult<PreflightInput> {
  const body = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const domain = normalizeDomain(body.domain)
  if (!domain.success) return { success: false, error: domain.error }
  if (body.consent !== true) {
    return {
      success: false,
      error: 'Bu siteyi analiz etme yetkiniz olduğunu onaylayın.',
    }
  }
  return { success: true, data: { domain: domain.data!, consent: true } }
}

export function parseBrandProfile(value: unknown): ValidationResult<BrandProfile> {
  const body = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const brandName = cleanString(body.brandName, 80)
  const sector = cleanString(body.sector, 120)
  if (brandName.length < 2 || sector.length < 2) {
    return { success: false, error: 'Marka adı ve kategori alanlarını doldurun.' }
  }
  return {
    success: true,
    data: {
      brandName,
      aliases: cleanList(body.aliases, 20, 80),
      sector,
      products: cleanList(body.products, 50, 120),
      country: cleanString(body.country, 60) || 'Türkiye',
      language: cleanString(body.language, 10) || 'tr',
      targetAudience: cleanString(body.targetAudience, 200),
      competitors: cleanList(body.competitors, 20, 80),
      exclusions: cleanList(body.exclusions, 20, 80),
    },
  }
}

const providerIds: ProviderId[] = ['openai', 'gemini', 'anthropic', 'perplexity', 'xai']

export function parseScanRequest(value: unknown): ValidationResult<ScanRequestInput> {
  const body = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const domain = normalizeDomain(body.domain)
  const profile = parseBrandProfile(body.profile)
  if (!domain.success) return { success: false, error: domain.error }
  if (!profile.success) return { success: false, error: profile.error }
  if (body.consent !== true) {
    return { success: false, error: 'Analiz yetkisi onayı gereklidir.' }
  }

  const providers: ProviderId[] = Array.isArray(body.providers)
    ? body.providers
        .filter((item): item is ProviderId => providerIds.includes(item as ProviderId))
        .slice(0, 5)
    : ['openai', 'gemini']
  const promptCount = Math.min(12, Math.max(4, Number(body.promptCount) || 8))
  const repetitions = Math.min(3, Math.max(1, Number(body.repetitions) || 1))

  return {
    success: true,
    data: {
      domain: domain.data!,
      profile: profile.data!,
      providers: providers.length ? providers : ['openai', 'gemini'],
      promptCount,
      repetitions,
      consent: true,
    },
  }
}

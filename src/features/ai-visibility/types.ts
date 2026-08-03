export type ProviderId = 'openai' | 'gemini' | 'anthropic' | 'perplexity' | 'xai'

export type ScanStatus = 'queued' | 'running' | 'completed' | 'partial' | 'failed' | 'cancelled'

export type IntentGroup =
  | 'kategori_kesfi'
  | 'marka_karsilastirma'
  | 'fiyat_odakli'
  | 'sorun_cozum'
  | 'yerel_niyet'

export interface BrandProfile {
  brandName: string
  aliases: string[]
  sector: string
  products: string[]
  country: string
  language: string
  targetAudience: string
  competitors: string[]
  exclusions: string[]
}

export interface ScanInput {
  domain: string
  profile: BrandProfile
  providers: ProviderId[]
  promptCount: number
  repetitions: number
}

export interface Citation {
  ordinal: number
  url: string
  domain: string
  title?: string
}

export interface ProviderObservation {
  provider: ProviderId
  model: string
  status: 'success' | 'failed' | 'blocked'
  promptId: string
  prompt: string
  responseText: string
  mentioned: boolean
  position: number | null
  citedTarget: boolean | null
  citations: Citation[]
  competitorsMentioned: string[]
  latencyMs: number
  timestamp: string
  error?: { code: string; message: string; retryable: boolean }
}

export interface TechnicalFinding {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  url: string
  found: string
  expected: string
  why: string
  fix: string
}

export interface CompetitorStat {
  name: string
  mentions: number
  shareOfVoice: number
  avgPosition: number | null
  byProvider: Partial<Record<ProviderId, number>>
}

export interface SourceGapEntry {
  domain: string
  citations: number
  supportedBrands: string[]
  kind: 'press' | 'blog' | 'marketplace' | 'review' | 'docs' | 'other'
  targetPresent: boolean
  opportunity: 'yuksek' | 'orta' | 'dusuk'
}

export interface ProviderStat {
  provider: ProviderId
  total: number
  mentioned: number
  avgPosition: number | null
  citationRate: number | null
}

export interface ActionItem {
  id: string
  phase: 'ilk-7' | 'ilk-30' | 'ilk-90'
  title: string
  impact: 'yuksek' | 'orta' | 'dusuk'
  effort: 'yuksek' | 'orta' | 'dusuk'
  owner?: string
  due?: string
  evidenceRef?: string
  successMetric: string
}

export interface AiVisibilityReport {
  scanId: string
  status: ScanStatus
  createdAt: string
  domain: string
  profile: BrandProfile
  visibility: {
    index: number
    coverage: number
    rankScore: number
    citationScore: number | null
    consistency: number
    validRuns: number
    mentionCount: number
    wilson95: { low: number; high: number }
  }
  readiness: {
    score: number
    status: 'blocked' | 'early' | 'developing' | 'strong'
    criticalGaps: number
    checksCompleted: number
    checksTotal: number
  }
  byProvider: ProviderStat[]
  competitors: CompetitorStat[]
  sourceGap: SourceGapEntry[]
  technicalFindings: TechnicalFinding[]
  actions: ActionItem[]
  observations: ProviderObservation[]
  methodologyNote: string
  version: string
}

export type PreflightCheckStatus = 'pass' | 'warning' | 'fail' | 'unknown'

export interface PreflightCheck {
  id: string
  label: string
  status: PreflightCheckStatus
  detail: string
  url?: string
}

export interface PreflightOutput {
  ok: boolean
  normalizedUrl: string
  finalUrl: string
  fetchedAt: string
  responseTimeMs: number
  technicalReadinessScore: number
  page: {
    title: string | null
    description: string | null
    h1: string | null
    canonical: string | null
    locale: string | null
    schemaTypes: string[]
  }
  suggestedProfile: {
    brandName: string
    sector: string
    country: string
    language: string
  }
  checks: PreflightCheck[]
  limitations: string[]
}

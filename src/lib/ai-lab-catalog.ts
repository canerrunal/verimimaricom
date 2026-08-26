import catalogData from '../../data/external/ai-local-lab/processed/catalog.json'
import changeReportData from '../../data/external/ai-local-lab/processed/change-report.json'

export type AiLabBenchmark = {
  id: string
  deviceId: string
  deviceName: string
  deviceSpecOnly: boolean
  modelId: string
  modelName: string
  modelLicense: string
  commercialUseAllowed: boolean
  quantization: string
  runtime: string
  decodeTokensPerSecond: number
  timeToFirstTokenMs: number
  totalDurationMs: number
  inputTokens: number
  outputTokens: number
  maxTemperatureC: number | null
  averagePowerW: number | null
  tokensPerSecondPerWatt: number | null
  measuredAt: string
  notes: string
  sourceRecordUrl: string
}

export type AiLabCatalog = {
  metadata: {
    datasetVersion: string
    schemaVersion: string
    releasedAt: string
    syncedAt: string
    source: string
    license: string
    licenseUrl: string
    attribution: string
    requiredDisplayAttribution: string
    methodologyUrl: string
    caveat: string
  }
  summary: {
    benchmarkCount: number
    deviceCount: number
    measuredDeviceCount: number
    modelCount: number
    feasibilityRecordCount: number
    switchSessionCount: number
    earliestMeasurementAt: string
    latestMeasurementAt: string
  }
  benchmarks: AiLabBenchmark[]
}

export type AiLabChangeReport = {
  previousDatasetVersion: string | null
  datasetVersion: string
  generatedAt: string
  addedBenchmarkIds: string[]
  removedBenchmarkIds: string[]
  benchmarkCountBefore: number
  benchmarkCountAfter: number
}

const catalog = catalogData as AiLabCatalog
const changeReport = changeReportData as AiLabChangeReport

export function getAiLabCatalog(): AiLabCatalog {
  return catalog
}

export function getAiLabChangeReport(): AiLabChangeReport {
  return changeReport
}

export function formatTurkishDate(value: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

export function formatTurkishDateTime(value: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(value))
}

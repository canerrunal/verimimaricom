#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE_MANIFEST_URL = 'https://ai-local-lab.com/data/manifest.json'
const SOURCE_DATA_URL = 'https://ai-local-lab.com/data/'
const REQUIRED_LICENSE = 'CC BY 4.0'
const USER_AGENT = 'VeriMimariDataIngest/1.0 (+https://verimimari.com)'
const DEFAULT_OUTPUT_DIR = resolve('data/external/ai-local-lab')
const REQUIRED_DISTRIBUTIONS = [
  'benchmarks.csv',
  'benchmarks.json',
  'devices.json',
  'models.json',
  'schema.json',
  'feasibility.json',
  'switch.json',
  'feasibility.schema.json',
  'switch.schema.json',
]

function invariant(condition, message) {
  if (!condition) throw new Error(message)
}

export function sha256(input) {
  return createHash('sha256').update(input).digest('hex')
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function assertUniqueIds(records, label) {
  const ids = new Set()
  for (const record of records) {
    invariant(typeof record.id === 'string' && record.id.length > 0, `${label}: geçersiz id`)
    invariant(!ids.has(record.id), `${label}: yinelenen id: ${record.id}`)
    ids.add(record.id)
  }
  return ids
}

export function validateManifest(manifest) {
  invariant(isPlainObject(manifest), 'Manifest bir JSON nesnesi olmalı')
  invariant(/^\d+\.\d+\.\d+$/.test(manifest.dataset_version), 'Geçersiz dataset_version')
  invariant(/^\d+\.\d+\.\d+$/.test(manifest.schema_version), 'Geçersiz schema_version')
  invariant(manifest.license === REQUIRED_LICENSE, `Beklenmeyen lisans: ${manifest.license}`)
  invariant(Array.isArray(manifest.distributions), 'Manifest distributions dizisi içermiyor')
  invariant(isPlainObject(manifest.counts), 'Manifest counts nesnesi içermiyor')

  const byName = new Map(manifest.distributions.map((item) => [item.file, item]))
  for (const file of REQUIRED_DISTRIBUTIONS) {
    const distribution = byName.get(file)
    invariant(distribution, `Manifest gerekli dosyayı içermiyor: ${file}`)
    invariant(
      /^https:\/\/ai-local-lab\.com\//.test(distribution.content_url),
      `${file}: güvenilmeyen content_url`,
    )
    invariant(/^[a-f0-9]{64}$/.test(distribution.sha256), `${file}: geçersiz SHA-256`)
    invariant(
      Number.isInteger(distribution.bytes) && distribution.bytes > 0,
      `${file}: geçersiz boyut`,
    )
  }
  return byName
}

function validateWrapper(wrapper, arrayKey, expectedCount, manifest) {
  invariant(isPlainObject(wrapper), `${arrayKey}: kök JSON nesne olmalı`)
  invariant(wrapper.dataset_version === manifest.dataset_version, `${arrayKey}: sürüm uyuşmuyor`)
  invariant(wrapper.license === REQUIRED_LICENSE, `${arrayKey}: lisans uyuşmuyor`)
  invariant(Array.isArray(wrapper[arrayKey]), `${arrayKey}: kayıt dizisi bulunamadı`)
  invariant(wrapper.count === wrapper[arrayKey].length, `${arrayKey}: dosya içi sayı uyuşmuyor`)
  invariant(wrapper[arrayKey].length === expectedCount, `${arrayKey}: manifest sayısı uyuşmuyor`)
}

export function validateDatasets(datasets, manifest) {
  const benchmarks = datasets['benchmarks.json']
  const devices = datasets['devices.json']
  const models = datasets['models.json']
  const feasibility = datasets['feasibility.json']
  const switching = datasets['switch.json']

  validateWrapper(benchmarks, 'benchmarks', manifest.counts.benchmarks, manifest)
  validateWrapper(devices, 'devices', manifest.counts.devices, manifest)
  validateWrapper(models, 'models', manifest.counts.models, manifest)
  validateWrapper(feasibility, 'feasibility', manifest.counts.feasibility_records, manifest)
  validateWrapper(switching, 'switch_sessions', manifest.counts.switch_sessions, manifest)

  const deviceIds = assertUniqueIds(devices.devices, 'devices')
  const modelIds = assertUniqueIds(models.models, 'models')
  assertUniqueIds(benchmarks.benchmarks, 'benchmarks')
  assertUniqueIds(feasibility.feasibility, 'feasibility')
  assertUniqueIds(switching.switch_sessions, 'switch_sessions')

  for (const row of benchmarks.benchmarks) {
    invariant(deviceIds.has(row.device), `${row.id}: bilinmeyen cihaz ${row.device}`)
    invariant(modelIds.has(row.model), `${row.id}: bilinmeyen model ${row.model}`)
    invariant(
      Number.isFinite(row.decode_tok_per_sec) && row.decode_tok_per_sec > 0,
      `${row.id}: geçersiz hız`,
    )
    invariant(/^\d{4}-\d{2}-\d{2}$/.test(row.measured_at), `${row.id}: geçersiz ölçüm tarihi`)
  }

  for (const row of feasibility.feasibility) {
    invariant(deviceIds.has(row.device), `${row.id}: feasibility cihazı bulunamadı`)
    invariant(modelIds.has(row.model), `${row.id}: feasibility modeli bulunamadı`)
  }
}

function round(value, digits = 3) {
  if (!Number.isFinite(value)) return null
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

export function buildCatalog(datasets, manifest, syncedAt) {
  const devices = datasets['devices.json'].devices
  const models = datasets['models.json'].models
  const benchmarks = datasets['benchmarks.json'].benchmarks
  const feasibility = datasets['feasibility.json'].feasibility
  const switchSessions = datasets['switch.json'].switch_sessions
  const devicesById = new Map(devices.map((item) => [item.id, item]))
  const modelsById = new Map(models.map((item) => [item.id, item]))
  const measuredDates = benchmarks.map((item) => item.measured_at).sort()

  return {
    metadata: {
      datasetVersion: manifest.dataset_version,
      schemaVersion: manifest.schema_version,
      releasedAt: manifest.released_at,
      syncedAt,
      source: SOURCE_DATA_URL,
      license: manifest.license,
      licenseUrl: manifest.license_url,
      attribution: manifest.attribution,
      requiredDisplayAttribution:
        'Kaynak: ai-local-lab (https://ai-local-lab.com/data/) — CC BY 4.0',
      methodologyUrl: 'https://ai-local-lab.com/articles/local-ai-measurement-protocol/',
      caveat:
        'Gerçek ölçümler teorik/spec_only değerlerden ayrı gösterilmelidir. Sonuçlar runtime, quantization ve ölçüm koşullarına bağlıdır.',
    },
    summary: {
      benchmarkCount: benchmarks.length,
      deviceCount: devices.length,
      measuredDeviceCount: devices.filter((item) => !item.spec_only).length,
      modelCount: models.length,
      feasibilityRecordCount: feasibility.length,
      switchSessionCount: switchSessions.length,
      earliestMeasurementAt: measuredDates.at(0) ?? null,
      latestMeasurementAt: measuredDates.at(-1) ?? null,
    },
    devices: devices.map((item) => ({
      id: item.id,
      name: item.name,
      vendor: item.vendor ?? null,
      category: item.category ?? null,
      memoryGb: item.memory_gb ?? null,
      powerWMax: item.power_w_max ?? null,
      bandwidthGbps: item.bandwidth_gbps ?? null,
      specOnly: Boolean(item.spec_only),
      notes: item.notes ?? null,
    })),
    models: models.map((item) => ({
      id: item.id,
      name: item.name,
      parametersBillion: item.params_b ?? null,
      license: item.license ?? null,
      commercialUseAllowed: item.commercial_ok ?? null,
      sourceUrl: item.source_url ?? null,
    })),
    benchmarks: benchmarks.map((item) => {
      const device = devicesById.get(item.device)
      const model = modelsById.get(item.model)
      return {
        id: item.id,
        deviceId: item.device,
        deviceName: device.name,
        deviceSpecOnly: Boolean(device.spec_only),
        modelId: item.model,
        modelName: model.name,
        modelLicense: model.license ?? null,
        commercialUseAllowed: model.commercial_ok ?? null,
        quantization: item.quant,
        runtime: item.runtime,
        decodeTokensPerSecond: item.decode_tok_per_sec,
        timeToFirstTokenMs: item.ttft_ms ?? null,
        totalDurationMs: item.total_duration_ms ?? null,
        inputTokens: item.input_tokens ?? null,
        outputTokens: item.output_tokens ?? null,
        maxTemperatureC: item.temp_max_c ?? null,
        averagePowerW: item.power_w_avg ?? null,
        tokensPerSecondPerWatt:
          item.power_w_avg > 0 ? round(item.decode_tok_per_sec / item.power_w_avg) : null,
        measuredAt: item.measured_at,
        notes: item.notes ?? null,
        sourceRecordUrl: `https://ai-local-lab.com/benchmarks/${item.device}/${item.model}/`,
      }
    }),
    feasibility: feasibility.map((item) => ({
      ...item,
      deviceName: devicesById.get(item.device).name,
      modelName: modelsById.get(item.model).name,
    })),
    switchSessions,
  }
}

export function buildRagDocuments(catalog) {
  return catalog.benchmarks.map((item) => ({
    id: `ai-local-lab:${item.id}`,
    kind: 'external-ai-benchmark',
    title: `${item.modelName} — ${item.deviceName}`,
    excerpt: [
      `${item.modelName}, ${item.deviceName} üzerinde ${item.quantization} ile ölçüldü.`,
      `Üretim hızı ${item.decodeTokensPerSecond} token/sn.`,
      item.timeToFirstTokenMs == null ? null : `İlk token süresi ${item.timeToFirstTokenMs} ms.`,
      item.averagePowerW == null ? null : `Ortalama güç ${item.averagePowerW} W.`,
      `Ölçüm tarihi ${item.measuredAt}.`,
      `Runtime: ${item.runtime}.`,
    ]
      .filter(Boolean)
      .join(' '),
    slug: item.sourceRecordUrl,
    meta: {
      source: catalog.metadata.source,
      sourceRecordUrl: item.sourceRecordUrl,
      license: catalog.metadata.license,
      attribution: catalog.metadata.requiredDisplayAttribution,
      methodologyUrl: catalog.metadata.methodologyUrl,
      datasetVersion: catalog.metadata.datasetVersion,
      measuredAt: item.measuredAt,
      deviceId: item.deviceId,
      modelId: item.modelId,
      quantization: item.quantization,
      evidence: 'measured',
    },
  }))
}

export function buildChangeReport(previousCatalog, nextCatalog) {
  const previousIds = new Set(previousCatalog?.benchmarks?.map((item) => item.id) ?? [])
  const nextIds = new Set(nextCatalog.benchmarks.map((item) => item.id))
  return {
    previousDatasetVersion: previousCatalog?.metadata?.datasetVersion ?? null,
    datasetVersion: nextCatalog.metadata.datasetVersion,
    generatedAt: nextCatalog.metadata.syncedAt,
    addedBenchmarkIds: [...nextIds].filter((id) => !previousIds.has(id)).sort(),
    removedBenchmarkIds: [...previousIds].filter((id) => !nextIds.has(id)).sort(),
    benchmarkCountBefore: previousIds.size,
    benchmarkCountAfter: nextIds.size,
  }
}

async function fetchBuffer(url, attempts = 3) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json,text/csv;q=0.9,*/*;q=0.5', 'User-Agent': USER_AGENT },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
      return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      lastError = error
      if (attempt < attempts) {
        await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * 750))
      }
    }
  }
  throw new Error(`${url} indirilemedi: ${lastError?.message ?? 'bilinmeyen hata'}`)
}

async function readJsonIfExists(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function writeAtomic(path, contents) {
  await mkdir(dirname(path), { recursive: true })
  const temporaryPath = `${path}.${process.pid}.tmp`
  await writeFile(temporaryPath, contents)
  await rename(temporaryPath, path)
}

export async function sync({
  outputDir = DEFAULT_OUTPUT_DIR,
  force = false,
  now = new Date(),
} = {}) {
  const manifestBuffer = await fetchBuffer(SOURCE_MANIFEST_URL)
  const manifestHash = sha256(manifestBuffer)
  const manifest = JSON.parse(manifestBuffer.toString('utf8'))
  const distributions = validateManifest(manifest)
  const statePath = join(outputDir, 'state.json')
  const previousState = await readJsonIfExists(statePath)

  if (!force && previousState?.manifestSha256 === manifestHash) {
    return { changed: false, datasetVersion: manifest.dataset_version, outputDir }
  }

  const downloaded = {}
  await Promise.all(
    REQUIRED_DISTRIBUTIONS.map(async (file) => {
      const distribution = distributions.get(file)
      const buffer = await fetchBuffer(distribution.content_url)
      invariant(buffer.byteLength === distribution.bytes, `${file}: boyut uyuşmuyor`)
      invariant(sha256(buffer) === distribution.sha256, `${file}: SHA-256 doğrulaması başarısız`)
      downloaded[file] = buffer
    }),
  )

  const jsonFiles = REQUIRED_DISTRIBUTIONS.filter((file) => file.endsWith('.json'))
  const datasets = Object.fromEntries(
    jsonFiles.map((file) => [file, JSON.parse(downloaded[file].toString('utf8'))]),
  )
  validateDatasets(datasets, manifest)

  const syncedAt = now.toISOString()
  const catalog = buildCatalog(datasets, manifest, syncedAt)
  const ragDocuments = buildRagDocuments(catalog)
  const catalogPath = join(outputDir, 'processed', 'catalog.json')
  const previousCatalog = await readJsonIfExists(catalogPath)
  const changeReport = buildChangeReport(previousCatalog, catalog)

  await Promise.all(
    REQUIRED_DISTRIBUTIONS.map((file) =>
      writeAtomic(join(outputDir, 'raw', file), downloaded[file]),
    ),
  )
  await writeAtomic(join(outputDir, 'manifest.json'), manifestBuffer)
  await writeAtomic(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)
  await writeAtomic(
    join(outputDir, 'processed', 'rag-documents.json'),
    `${JSON.stringify(ragDocuments, null, 2)}\n`,
  )
  await writeAtomic(
    join(outputDir, 'processed', 'change-report.json'),
    `${JSON.stringify(changeReport, null, 2)}\n`,
  )
  await writeAtomic(
    join(outputDir, 'processed', 'ATTRIBUTION.md'),
    [
      '# Kaynak ve lisans',
      '',
      `- Kaynak: ${manifest.attribution}`,
      `- Veri sayfası: ${SOURCE_DATA_URL}`,
      `- Lisans: ${manifest.license} (${manifest.license_url})`,
      `- Veri kümesi sürümü: ${manifest.dataset_version}`,
      `- Yayın tarihi: ${manifest.released_at}`,
      `- Senkronizasyon zamanı: ${syncedAt}`,
      '',
      'Veriler gösterilirken kaynak, lisans ve ölçüm tarihi görünür tutulmalıdır.',
      'Gerçek ölçümler ile teorik/spec_only değerler ayrı sunulmalıdır.',
      '',
    ].join('\n'),
  )

  const state = {
    source: SOURCE_MANIFEST_URL,
    datasetVersion: manifest.dataset_version,
    schemaVersion: manifest.schema_version,
    manifestSha256: manifestHash,
    syncedAt,
    counts: manifest.counts,
  }
  await writeAtomic(statePath, `${JSON.stringify(state, null, 2)}\n`)

  return { changed: true, datasetVersion: manifest.dataset_version, outputDir, changeReport }
}

async function main() {
  const force = process.argv.includes('--force')
  const outputDir = resolve(process.env.AILL_OUTPUT_DIR || DEFAULT_OUTPUT_DIR)
  const result = await sync({ outputDir, force })
  if (!result.changed) {
    console.log(`AI Local Lab ${result.datasetVersion}: değişiklik yok.`)
    return
  }
  console.log(`AI Local Lab ${result.datasetVersion}: senkronizasyon tamamlandı.`)
  console.log(`Çıktı: ${result.outputDir}`)
  console.log(
    `Benchmark: ${result.changeReport.benchmarkCountBefore} -> ${result.changeReport.benchmarkCountAfter}`,
  )
  console.log(
    `Eklenen: ${result.changeReport.addedBenchmarkIds.length}, kaldırılan: ${result.changeReport.removedBenchmarkIds.length}`,
  )
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])
if (isMain) {
  main().catch((error) => {
    console.error(`Senkronizasyon başarısız: ${error.message}`)
    process.exitCode = 1
  })
}

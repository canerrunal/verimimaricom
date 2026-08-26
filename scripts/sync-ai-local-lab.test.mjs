import assert from 'node:assert/strict'
import test from 'node:test'

import { buildChangeReport, sha256, validateManifest } from './sync-ai-local-lab.mjs'

test('sha256 bilinen özeti üretir', () => {
  assert.equal(
    sha256(Buffer.from('veri-mimari')),
    'a7bd96e24bd9245a4cdeb60e098ffc818d3eb4aa1a0ae98908f14642abdd00e4',
  )
})

test('manifest yalnızca güvenilir AI Local Lab dağıtımlarını kabul eder', () => {
  const files = [
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
  const manifest = {
    dataset_version: '1.0.0',
    schema_version: '1.0.0',
    license: 'CC BY 4.0',
    counts: {},
    distributions: files.map((file) => ({
      file,
      bytes: 1,
      sha256: 'a'.repeat(64),
      content_url: `https://ai-local-lab.com/data/releases/v1.0.0/${file}`,
    })),
  }
  assert.equal(validateManifest(manifest).size, files.length)
  manifest.distributions[0].content_url = 'https://example.com/payload'
  assert.throws(() => validateManifest(manifest), /güvenilmeyen/)
})

test('değişiklik raporu eklenen ve kaldırılan kayıtları bulur', () => {
  const previous = {
    metadata: { datasetVersion: '1.0.0' },
    benchmarks: [{ id: 'a' }, { id: 'b' }],
  }
  const next = {
    metadata: { datasetVersion: '1.1.0', syncedAt: '2026-08-25T00:00:00.000Z' },
    benchmarks: [{ id: 'b' }, { id: 'c' }],
  }
  assert.deepEqual(buildChangeReport(previous, next), {
    previousDatasetVersion: '1.0.0',
    datasetVersion: '1.1.0',
    generatedAt: '2026-08-25T00:00:00.000Z',
    addedBenchmarkIds: ['c'],
    removedBenchmarkIds: ['a'],
    benchmarkCountBefore: 2,
    benchmarkCountAfter: 2,
  })
})

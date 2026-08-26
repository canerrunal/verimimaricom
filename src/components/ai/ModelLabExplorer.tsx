'use client'

import { useMemo, useState } from 'react'
import type { AiLabBenchmark } from '@/lib/ai-lab-catalog'

type SortKey = 'speed' | 'latency' | 'efficiency' | 'recent'

function normalize(value: string) {
  return value.toLocaleLowerCase('tr-TR')
}

function formatNumber(value: number | null, digits = 1) {
  if (value === null || !Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: digits }).format(value)
}

export default function ModelLabExplorer({ benchmarks }: { benchmarks: AiLabBenchmark[] }) {
  const [query, setQuery] = useState('')
  const [device, setDevice] = useState('all')
  const [quantization, setQuantization] = useState('all')
  const [sort, setSort] = useState<SortKey>('speed')
  const [visibleCount, setVisibleCount] = useState(12)

  const devices = useMemo(
    () =>
      Array.from(
        new Map(benchmarks.map((item) => [item.deviceId, item.deviceName])).entries(),
      ).sort((a, b) => a[1].localeCompare(b[1])),
    [benchmarks],
  )
  const quantizations = useMemo(
    () => Array.from(new Set(benchmarks.map((item) => item.quantization))).sort(),
    [benchmarks],
  )

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    return benchmarks
      .filter((item) => {
        const matchesQuery =
          !normalizedQuery ||
          normalize(
            `${item.modelName} ${item.deviceName} ${item.runtime} ${item.modelLicense}`,
          ).includes(normalizedQuery)
        return (
          matchesQuery &&
          (device === 'all' || item.deviceId === device) &&
          (quantization === 'all' || item.quantization === quantization)
        )
      })
      .sort((a, b) => {
        if (sort === 'latency') return a.timeToFirstTokenMs - b.timeToFirstTokenMs
        if (sort === 'efficiency')
          return (b.tokensPerSecondPerWatt ?? -1) - (a.tokensPerSecondPerWatt ?? -1)
        if (sort === 'recent') return b.measuredAt.localeCompare(a.measuredAt)
        return b.decodeTokensPerSecond - a.decodeTokensPerSecond
      })
  }, [benchmarks, device, quantization, query, sort])

  function resetFilters() {
    setQuery('')
    setDevice('all')
    setQuantization('all')
    setSort('speed')
    setVisibleCount(12)
  }

  return (
    <div className="model-lab-explorer">
      <div className="model-lab-toolbar" aria-label="Model ölçümlerini filtrele">
        <label className="model-lab-search">
          <span>MODEL VEYA DONANIM ARA</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisibleCount(12)
            }}
            placeholder="Örn. Llama, RTX 4060, Ollama"
          />
        </label>
        <label>
          <span>DONANIM</span>
          <select
            value={device}
            onChange={(event) => {
              setDevice(event.target.value)
              setVisibleCount(12)
            }}
          >
            <option value="all">Tüm ölçülen cihazlar</option>
            {devices.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>KUANTİZASYON</span>
          <select
            value={quantization}
            onChange={(event) => {
              setQuantization(event.target.value)
              setVisibleCount(12)
            }}
          >
            <option value="all">Tümü</option>
            {quantizations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>SIRALA</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="speed">Üretim hızı</option>
            <option value="latency">İlk yanıt süresi</option>
            <option value="efficiency">Enerji verimliliği</option>
            <option value="recent">Ölçüm tarihi</option>
          </select>
        </label>
      </div>

      <div className="model-lab-result-head" aria-live="polite">
        <p>
          <strong>{filtered.length}</strong> ölçüm bulundu
        </p>
        <button type="button" onClick={resetFilters}>
          Filtreleri temizle
        </button>
      </div>

      {filtered.length ? (
        <div className="model-lab-results">
          {filtered.slice(0, visibleCount).map((item, index) => (
            <article className="model-result-card" key={item.id}>
              <div className="model-result-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="model-result-main">
                <div className="model-result-tags">
                  <span>{item.quantization}</span>
                  <span>{item.runtime}</span>
                  <span>{item.modelLicense}</span>
                </div>
                <h3>{item.modelName}</h3>
                <p>{item.deviceName}</p>
                <small>Ölçüm: {item.measuredAt}</small>
              </div>
              <dl className="model-result-metrics">
                <div>
                  <dt>Üretim hızı</dt>
                  <dd>{formatNumber(item.decodeTokensPerSecond, 2)}</dd>
                  <small>token/sn</small>
                </div>
                <div>
                  <dt>İlk yanıt</dt>
                  <dd>{formatNumber(item.timeToFirstTokenMs, 1)}</dd>
                  <small>ms · düşük daha iyi</small>
                </div>
                <div>
                  <dt>Verimlilik</dt>
                  <dd>{formatNumber(item.tokensPerSecondPerWatt, 3)}</dd>
                  <small>token/sn/W</small>
                </div>
              </dl>
              <a href={item.sourceRecordUrl} target="_blank" rel="noreferrer">
                Kaynak kaydı ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="model-lab-empty">
          <strong>Bu filtrelerle eşleşen ölçüm yok.</strong>
          <p>Model adını kısaltın veya cihaz filtresini temizleyin.</p>
          <button type="button" className="btn alt" onClick={resetFilters}>
            Tüm ölçümleri göster
          </button>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <button
          type="button"
          className="btn alt model-lab-more"
          onClick={() => setVisibleCount((current) => current + 12)}
        >
          12 ölçüm daha göster ↓
        </button>
      ) : null}
    </div>
  )
}

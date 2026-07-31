import KpiTrendChart from '@/components/case-study/KpiTrendChart'

function formatValue(value: number | null | undefined, unit?: string) {
  if (value === null || value === undefined) return '-'
  return `${value}${unit ? ` ${unit}` : ''}`
}

function safePercent(baseline: number | null | undefined, result: number | null | undefined) {
  if (baseline === null || baseline === undefined || baseline === 0 || result === null || result === undefined) {
    return 0
  }
  return ((result - baseline) / Math.abs(baseline)) * 100
}

function clampBar(deltaPercent: number) {
  const normalized = Math.min(100, Math.max(5, Math.abs(deltaPercent)))
  return normalized
}

export default function MetricsBoard({ metrics = [] }) {
  return (
    <section aria-label="Metrik görselleştirme">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {metrics.map((metric: any, index: number) => {
          const delta = safePercent(metric.baselineValue, metric.resultValue)
          const barWidth = clampBar(delta)
          const isUp = delta >= 0

          return (
            <div key={`${metric.metricKey || 'metric'}-${index}`} className="metric">
              <small>{metric.metricLabel || metric.metricKey || 'Metric'}</small>
              <b>{formatValue(metric.resultValue, metric.unit)}</b>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#999', marginTop: 4 }}>
                <span>Base: {formatValue(metric.baselineValue, metric.unit)}</span>
                <span style={{ color: isUp ? 'var(--green)' : 'var(--red)' }}>
                  {isUp ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
                </span>
              </div>
              <div style={{ height: 4, background: '#eee', borderRadius: 5, marginTop: 8, overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', background: isUp ? 'var(--green)' : 'var(--red)', width: `${barWidth}%`, borderRadius: 5 }} />
              </div>
              <KpiTrendChart metric={metric} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

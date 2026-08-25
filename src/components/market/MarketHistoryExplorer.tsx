'use client'

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import styles from './MarketHistoryExplorer.module.css'

export type MarketHistoryMetric = 'price' | 'stock' | 'sales'

export type MarketHistoryRequest = {
  source: 'profile' | 'taxonomy'
  metric: MarketHistoryMetric
  productId: string
  title: string
  productKey?: string
  offerKey?: string
  profileSlug?: string
  merchantId?: string | null
}

type NumericPoint = { date: string; capturedAt: string; value: number; label?: string }
type HistoryPayload = {
  source: 'profile' | 'taxonomy'
  productId: string
  history: {
    price: NumericPoint[]
    stock: NumericPoint[]
    sales: NumericPoint[]
  }
  coverage: { priceDays: number; stockDays: number; salesDays: number }
  methodology: Record<MarketHistoryMetric, string>
}

const EVENT_NAME = 'veri-mimari:market-history'
const PERIODS = [
  { days: 7, label: '1 Hafta' },
  { days: 30, label: '1 Ay' },
  { days: 90, label: '3 Ay' },
  { days: 365, label: '1 Yıl' },
]
const METRICS: Array<{ id: MarketHistoryMetric; label: string }> = [
  { id: 'price', label: 'Fiyat' },
  { id: 'stock', label: 'Stok durumu' },
  { id: 'sales', label: 'Günlük satış hızı' },
]

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits }).format(value)
}

function formatMetric(metric: MarketHistoryMetric, value: number) {
  if (metric === 'price') {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
    }).format(value)
  }
  if (metric === 'sales') return `≥ ${formatNumber(value)} / gün`
  if (value <= 0) return 'Stok dışı'
  if (value < 1) return 'Tükeniyor'
  return 'Stokta'
}

function formatDate(value: string, withYear = false) {
  const date = new Date(`${value}T12:00:00+03:00`)
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: withYear ? 'numeric' : undefined,
  }).format(date)
}

function filterPeriod(points: NumericPoint[], days: number) {
  const latest = points.at(-1)?.date
  if (!latest) return []
  const threshold = new Date(`${latest}T12:00:00+03:00`)
  threshold.setDate(threshold.getDate() - (days - 1))
  return points.filter((point) => new Date(`${point.date}T12:00:00+03:00`) >= threshold)
}

export function MarketHistoryTrigger({
  request,
  primary,
  secondary,
}: {
  request: MarketHistoryRequest
  primary: string
  secondary?: string
}) {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: request }))}
      aria-label={`${request.title} için ${METRICS.find((item) => item.id === request.metric)?.label} grafiğini aç`}
    >
      <strong>{primary}</strong>
      {secondary ? <span>{secondary}</span> : null}
      <small>Grafiği aç ↗</small>
    </button>
  )
}

function HistoryChart({ metric, points }: { metric: MarketHistoryMetric; points: NumericPoint[] }) {
  const [activeIndex, setActiveIndex] = useState(Math.max(points.length - 1, 0))
  const width = 760
  const height = 286
  const left = 76
  const right = 24
  const top = 24
  const bottom = 48
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom
  const values = points.map((point) => point.value)
  const rawMin = metric === 'stock' ? 0 : Math.min(...values)
  const rawMax = metric === 'stock' ? 1 : Math.max(...values)
  const spread = rawMax - rawMin || Math.max(Math.abs(rawMax) * 0.1, 1)
  const min = metric === 'stock' ? 0 : Math.max(0, rawMin - spread * 0.12)
  const max = metric === 'stock' ? 1 : rawMax + spread * 0.12
  const x = (index: number) =>
    points.length === 1 ? left + plotWidth / 2 : left + (index / (points.length - 1)) * plotWidth
  const y = (value: number) => top + ((max - value) / (max - min || 1)) * plotHeight
  const linePath = points
    .map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.value)}`)
    .join(' ')
  const stepPath = points
    .map((point, index) => {
      if (!index) return `M ${x(index)} ${y(point.value)}`
      return `H ${x(index)} V ${y(point.value)}`
    })
    .join(' ')
  const active = points[Math.min(activeIndex, points.length - 1)]
  const yTicks =
    metric === 'stock'
      ? [1, 0.5, 0]
      : Array.from({ length: 4 }, (_, index) => max - ((max - min) * index) / 3)
  const xTickIndexes = [...new Set([0, Math.floor((points.length - 1) / 2), points.length - 1])]

  useEffect(() => setActiveIndex(Math.max(points.length - 1, 0)), [points.length, metric])

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (points.length < 2) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const cursor = ((event.clientX - bounds.left) / bounds.width) * width
    const index = Math.round(((cursor - left) / plotWidth) * (points.length - 1))
    setActiveIndex(Math.max(0, Math.min(points.length - 1, index)))
  }

  return (
    <div className={styles.chartWrap}>
      <div className={styles.activePoint} aria-live="polite">
        <span>{active ? formatDate(active.date, true) : '—'}</span>
        <strong>{active ? formatMetric(metric, active.value) : '—'}</strong>
        {active?.label ? <small>{active.label}</small> : null}
      </div>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${METRICS.find((item) => item.id === metric)?.label} geçmişi; ${points.length} günlük gözlem`}
        onPointerMove={onPointerMove}
      >
        {yTicks.map((tick, index) => (
          <g key={`${tick}-${index}`}>
            <line
              x1={left}
              x2={width - right}
              y1={y(tick)}
              y2={y(tick)}
              className={styles.gridLine}
            />
            <text x={left - 12} y={y(tick) + 4} textAnchor="end" className={styles.axisLabel}>
              {metric === 'stock' ? formatMetric(metric, tick) : formatNumber(tick)}
            </text>
          </g>
        ))}
        {xTickIndexes.map((index) => (
          <text
            key={`${points[index]?.date}-${index}`}
            x={x(index)}
            y={height - 16}
            textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
            className={styles.axisLabel}
          >
            {points[index] ? formatDate(points[index].date) : ''}
          </text>
        ))}
        <path d={metric === 'stock' ? stepPath : linePath} className={styles.dataLine} />
        {points.map((point, index) => (
          <circle
            key={`${point.date}-${index}`}
            cx={x(index)}
            cy={y(point.value)}
            r={index === activeIndex ? 6 : 3}
            className={index === activeIndex ? styles.activeDot : styles.dataDot}
          />
        ))}
        {active ? (
          <line
            x1={x(activeIndex)}
            x2={x(activeIndex)}
            y1={top}
            y2={top + plotHeight}
            className={styles.cursorLine}
          />
        ) : null}
      </svg>
    </div>
  )
}

function Summary({ metric, points }: { metric: MarketHistoryMetric; points: NumericPoint[] }) {
  if (!points.length) return null
  const values = points.map((point) => point.value)
  const current = values.at(-1) || 0
  const first = values[0] || 0
  const change = first ? ((current - first) / first) * 100 : null
  const stockChanges = values.slice(1).filter((value, index) => value !== values[index]).length
  const inStockDays = values.filter((value) => value > 0).length
  const cards =
    metric === 'price'
      ? [
          ['GÜNCEL', formatMetric(metric, current)],
          ['DÖNEM EN DÜŞÜK', formatMetric(metric, Math.min(...values))],
          ['DÖNEM EN YÜKSEK', formatMetric(metric, Math.max(...values))],
          [
            'DÖNEM DEĞİŞİMİ',
            change === null ? '—' : `${change > 0 ? '+' : ''}${formatNumber(change)}%`,
          ],
        ]
      : metric === 'stock'
        ? [
            ['GÜNCEL', formatMetric(metric, current)],
            ['STOKTA GÖRÜLEN', `${inStockDays}/${values.length} gün`],
            ['DURUM DEĞİŞİMİ', `${stockChanges} kez`],
            ['KAPSAM', `${values.length} başarılı gün`],
          ]
        : [
            ['GÜNCEL ALT SINIR', formatMetric(metric, current)],
            ['DÖNEM EN YÜKSEK', formatMetric(metric, Math.max(...values))],
            [
              'DÖNEM ORTALAMASI',
              formatMetric(
                metric,
                values.reduce((total, value) => total + value, 0) / values.length,
              ),
            ],
            ['KAPSAM', `${values.length} etiketli gün`],
          ]

  return (
    <div className={styles.summary}>
      {cards.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  )
}

export function MarketHistoryModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [request, setRequest] = useState<MarketHistoryRequest | null>(null)
  const [metric, setMetric] = useState<MarketHistoryMetric>('price')
  const [period, setPeriod] = useState(30)
  const [payload, setPayload] = useState<HistoryPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<MarketHistoryRequest>).detail
      setRequest(detail)
      setMetric(detail.metric)
      setPeriod(30)
      setPayload(null)
      setError('')
      if (!dialogRef.current?.open) dialogRef.current?.showModal()
    }
    window.addEventListener(EVENT_NAME, open)
    return () => window.removeEventListener(EVENT_NAME, open)
  }, [])

  useEffect(() => {
    if (!request) return
    const controller = new AbortController()
    const params = new URLSearchParams({
      source: request.source,
      productId: request.productId,
    })
    if (request.productKey) params.set('productKey', request.productKey)
    if (request.offerKey) params.set('offerKey', request.offerKey)
    if (request.profileSlug) params.set('profileSlug', request.profileSlug)
    if (request.merchantId) params.set('merchantId', request.merchantId)
    setLoading(true)
    fetch(`/api/pazar-nabzi/urun-gecmisi?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data?.error || 'Ürün geçmişi alınamadı.')
        setPayload(data as HistoryPayload)
      })
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return
        setError(reason instanceof Error ? reason.message : 'Ürün geçmişi alınamadı.')
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [request])

  const points = useMemo(
    () => filterPeriod(payload?.history[metric] || [], period),
    [metric, payload, period],
  )

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={() => {
        setRequest(null)
        setPayload(null)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      aria-labelledby="market-history-title"
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <span>ÜRÜN GEÇMİŞİ / GÜNLÜK GÖZLEM</span>
            <h2 id="market-history-title">{request?.title || 'Ürün geçmişi'}</h2>
          </div>
          <button type="button" onClick={close} aria-label="Grafik panelini kapat">
            Kapat ×
          </button>
        </header>

        <div className={styles.toolbar}>
          <div role="tablist" aria-label="Grafik metriği">
            {METRICS.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={metric === item.id}
                key={item.id}
                onClick={() => setMetric(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div aria-label="Grafik dönemi">
            {PERIODS.map((item) => (
              <button
                type="button"
                aria-pressed={period === item.days}
                key={item.days}
                onClick={() => setPeriod(item.days)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.body}>
          {loading ? <div className={styles.state}>Geçmiş gözlemler hazırlanıyor…</div> : null}
          {error ? <div className={`${styles.state} ${styles.error}`}>{error}</div> : null}
          {!loading && !error && payload ? (
            points.length ? (
              <>
                <Summary metric={metric} points={points} />
                <HistoryChart metric={metric} points={points} />
                {points.length < 2 ? (
                  <p className={styles.notice}>
                    Trend çizgisi için en az iki başarılı gün gerekir. Mevcut tek gözlem noktası
                    gösteriliyor.
                  </p>
                ) : null}
              </>
            ) : (
              <div className={styles.state}>
                <strong>Bu metrik için henüz geçmiş gözlem yok.</strong>
                <p>Yeni başarılı günlük koşular geldikçe grafik kendiliğinden oluşacak.</p>
              </div>
            )
          ) : null}
        </div>

        <footer className={styles.footer}>
          <span>ÖLÇÜM NOTU</span>
          <p>
            {payload?.methodology[metric] || 'Yalnız kalite kapısından geçen günlük gözlemler.'}
          </p>
          <small>
            Kaynak: Veri Mimarı Pazar Nabzı · Ürün #{request?.productId || '—'} · Dönem {period} gün
          </small>
        </footer>
      </div>
    </dialog>
  )
}

'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { trackEvent } from '@/lib/analytics'

type AssistantProduct = {
  id: string
  title: string
  brand: string | null
  category: string | null
  price: number | null
  url: string
  rank: number | null
  rankDelta: number | null
  opportunityScore: number | null
  rating: number | null
  salesSignalMin: number | null
  salesSignal: string | null
  monthlyDemandRunRateMin: number | null
  observedSellerCount: number
  observedSellerNames: string[]
  minObservedPrice: number | null
  maxObservedPrice: number | null
  stockSignal: string | null
  observedDate: string
}

type AssistantPayload = {
  intent: 'market' | 'product' | 'entity' | 'profit' | 'tool' | 'guide' | 'compare' | 'explain'
  reply: string
  products?: AssistantProduct[]
  calculation?: {
    inputs: {
      sale: number
      cost: number
      commission: number
      shipping: number
      returns: number
      adSpend: number
      overheadPercent: number
    }
    commissionCost: number
    overheadCost: number
    contributionBeforeAds: number
    totalCost: number
    netProfit: number
    netMargin: number
    breakEvenRoas: number | null
  }
  detectedInputs?: Record<string, number>
  missingFields?: string[]
  appliedFilters?: string[]
  coverage?: { profileCount: number; candidateCount: number; resultCount: number }
  comparison?: Array<{
    slug: string
    label: string
    productCount: number
    medianPrice: number | null
    risingCount: number
    priceDropCount: number
    stockRiskCount: number
    brandCount: number
    observedSellerCount: number
    monthlyDemandRunRateMin: number | null
    demandSignalProductCount: number
    topOpportunity: {
      title: string
      score: number | null
      price: number | null
      url: string
    } | null
  }>
  productAnalysis?: AssistantProduct & {
    observationCount: number
    profileCount: number
  }
  entityAnalysis?: {
    type: 'category' | 'brand' | 'store'
    label: string
    productCount: number
    brandCount: number
    categoryCount: number
    observedSellerCount: number
    medianPrice: number | null
    minPrice: number | null
    maxPrice: number | null
    averageRating: number | null
    totalReviewCount: number
    monthlyDemandRunRateMin: number | null
    monthlyRevenueRunRateMin: number | null
    demandSignalProductCount: number
    benchmark: {
      scopeLabel: string
      peerProductCount: number
      entityProductSharePercent: number | null
      peerMedianPrice: number | null
      medianPriceDeltaPercent: number | null
      peerMonthlyDemandRunRateMin: number | null
      demandRunRateSharePercent: number | null
    }
    topProducts: AssistantProduct[]
  }
  evidence?: Array<{
    label: string
    value: string
    kind: 'observed' | 'derived' | 'user' | 'estimate'
    note?: string
  }>
  explanation?: {
    title: string
    formula: string
    steps: Array<{
      label: string
      value?: number
      text?: string
      operation?: 'plus' | 'minus'
    }>
    result?: number
    breakEvenFormula?: string
  }
  followUps?: string[]
  tool?: { title: string; description: string; href: string; label: string }
  source?: { label: string; observedAt?: string; note: string }
  action?: { href: string; label: string }
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  payload?: AssistantPayload
}

type AssistantMode = 'product' | 'market' | 'entity' | 'profit' | 'compare' | 'tools'

const modeOptions: Array<{ id: AssistantMode; label: string }> = [
  { id: 'product', label: 'Ürün linki' },
  { id: 'market', label: 'Ürün bul' },
  { id: 'entity', label: 'Marka / kategori' },
  { id: 'profit', label: 'Kâr hesapla' },
  { id: 'compare', label: 'Kıyasla' },
  { id: 'tools', label: 'Araç seç' },
]

const modePrompts: Record<AssistantMode, string[]> = {
  product: [
    'https://www.trendyol.com/urun-p-1130829074 ürününü analiz et',
    'Kozmetik kategorisini analiz et',
    "750 TL'ye satarsam kaç kazanırım? Maliyet 250, komisyon %15, kargo 90",
  ],
  market: [
    '500 TL altı, en fazla 3 gözlenen satıcılı, ayda 100 üstü hız sinyalli ürün bul',
    'Kozmetikte yükselen ürünleri göster',
    '4,5 puan üstü ve en az 100+ satan ürünleri bul',
    'Elektronikte fiyatı düşen ürünleri göster',
  ],
  entity: [
    'Kozmetik kategorisini analiz et',
    'Elektronik kategorisini analiz et',
    'Embeauty markasını pazar bağlamıyla analiz et',
  ],
  profit: [
    "750 TL'ye satarsam kaç kazanırım? Maliyet 250, komisyon %15, kargo 90",
    'Satış 1200, maliyet 420, komisyon %18, kargo 110, iade 35; başa baş ROAS kaç?',
    'Kâr hesabı için hangi bilgileri vermeliyim?',
    'Ürün marjı formülünü açıkla',
  ],
  compare: [
    'Kozmetik ile elektroniği karşılaştır',
    'Ev & Yaşam ile süpermarketi karşılaştır',
    'Kadın ile erkek kategorisini kıyasla',
  ],
  tools: [
    'Başa baş ROAS için hangi aracı kullanmalıyım?',
    'Ürün feed CSV dosyamı nasıl kontrol ederim?',
    'İade yorumlarını sınıflandırmak için hangi araç uygun?',
  ],
}

const initialMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Ürün linkini analiz edin, ölçütünüze uygun ürün bulun, marka veya kategoriyi okuyun; ardından kârı konuşarak hesaplayın. Her rakamın ölçüm türünü ve kaynağını ayrı gösteririm.',
}

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`
}

function money(value: number) {
  return `${value.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL`
}

function compactNumber(value: number) {
  return new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

function copySummary(payload: AssistantPayload) {
  const lines = [payload.reply]
  if (payload.calculation) {
    lines.push(
      `Net sonuç: ${money(payload.calculation.netProfit)}`,
      `Net marj: %${payload.calculation.netMargin.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}`,
      `Başa baş ROAS: ${payload.calculation.breakEvenRoas === null ? '—' : `${payload.calculation.breakEvenRoas.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}x`}`,
    )
  }
  if (payload.products?.length) {
    lines.push(
      ...payload.products.map(
        (product, index) =>
          `${index + 1}. ${product.title} — ${product.price === null ? 'Fiyat yok' : money(product.price)}`,
      ),
    )
  }
  if (payload.entityAnalysis) {
    const entity = payload.entityAnalysis
    lines.push(
      `${entity.label}: ${entity.productCount} gözlenen ürün, ${entity.observedSellerCount} gözlenen satıcı`,
      `Medyan fiyat: ${entity.medianPrice === null ? '—' : money(entity.medianPrice)}`,
      `30 günlük hız alt sınırı: ${entity.monthlyDemandRunRateMin === null ? '—' : `${compactNumber(entity.monthlyDemandRunRateMin)}+ ürün`}`,
      `Gözlem evreni ürün payı: ${entity.benchmark.entityProductSharePercent === null ? '—' : `%${entity.benchmark.entityProductSharePercent.toLocaleString('tr-TR')}`}`,
    )
  }
  if (payload.comparison?.length) {
    lines.push(
      ...payload.comparison.map(
        (item) =>
          `${item.label}: ${item.productCount} ürün, medyan ${item.medianPrice === null ? '—' : money(item.medianPrice)}, ${item.risingCount} yükseliş sinyali`,
      ),
    )
  }
  if (payload.source) lines.push(`Kaynak: ${payload.source.label}`)
  return lines.join('\n')
}

function ProductResults({ products }: { products: AssistantProduct[] }) {
  if (!products.length) return null

  return (
    <div className="assistant-product-list" aria-label="Öne çıkan pazar sinyalleri">
      {products.map((product, index) => (
        <a
          className="assistant-product-card"
          href={product.url}
          key={`${product.id}-${index}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="assistant-product-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="assistant-product-copy">
            <small>{[product.brand, product.category].filter(Boolean).join(' / ') || 'ÜRÜN'}</small>
            <strong>{product.title}</strong>
            <span>
              {product.price === null ? 'Fiyat yok' : money(product.price)}
              {product.rank ? ` · #${product.rank}` : ''}
              {product.rankDelta ? ` · sıra değişimi +${product.rankDelta}` : ''}
            </span>
            <span>
              {product.rating ? `Puan ${product.rating.toLocaleString('tr-TR')}` : 'Puan yok'}
              {product.opportunityScore !== null
                ? ` · fırsat ${product.opportunityScore.toLocaleString('tr-TR')}`
                : ''}
            </span>
            <span>
              {product.observedSellerCount
                ? `${product.observedSellerCount} gözlenen satıcı`
                : 'Satıcı sinyali yok'}
              {product.monthlyDemandRunRateMin
                ? ` · 30 günlük hız ≥ ${compactNumber(product.monthlyDemandRunRateMin)}`
                : ''}
            </span>
            {product.salesSignal ? <em>{product.salesSignal}</em> : null}
          </span>
          <b aria-hidden="true">↗</b>
        </a>
      ))}
    </div>
  )
}

function ProductIntelligenceCard({
  product,
}: {
  product: NonNullable<AssistantPayload['productAnalysis']>
}) {
  const priceRange =
    product.minObservedPrice !== null && product.maxObservedPrice !== null
      ? product.minObservedPrice === product.maxObservedPrice
        ? money(product.minObservedPrice)
        : `${money(product.minObservedPrice)}–${money(product.maxObservedPrice)}`
      : '—'
  return (
    <section className="assistant-intelligence" aria-label="Ürün analiz kartı">
      <header>
        <span>ÜRÜN ANALİZİ / GÖZLEM EVRENİ</span>
        <strong>{product.title}</strong>
        <small>
          {[product.brand, product.category].filter(Boolean).join(' / ') || 'Kategori yok'}
        </small>
      </header>
      <div className="assistant-intelligence-metrics">
        <div>
          <small>SON FİYAT</small>
          <strong>{product.price === null ? '—' : money(product.price)}</strong>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <small>GÖZLENEN SATICI</small>
          <strong>{product.observedSellerCount || '—'}</strong>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <small>30 GÜNLÜK HIZ ALT SINIRI</small>
          <strong>
            {product.monthlyDemandRunRateMin === null
              ? '—'
              : `${compactNumber(product.monthlyDemandRunRateMin)}+`}
          </strong>
          <span className="assistant-data-kind derived">TÜRETİLEN</span>
        </div>
        <div>
          <small>FİYAT ARALIĞI</small>
          <strong>{priceRange}</strong>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <small>PUAN / FIRSAT</small>
          <strong>
            {product.rating ?? '—'} / {product.opportunityScore ?? '—'}
          </strong>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <small>KAPSAM</small>
          <strong>
            {product.profileCount} profil · {product.observationCount} gözlem
          </strong>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
      </div>
      {product.observedSellerNames.length ? (
        <p>Görülen satıcılar: {product.observedSellerNames.join(' · ')}</p>
      ) : null}
      <a href={product.url} target="_blank" rel="noreferrer">
        Ürünü aç <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function EntityAnalysisCard({
  entity,
}: {
  entity: NonNullable<AssistantPayload['entityAnalysis']>
}) {
  const typeLabel =
    entity.type === 'brand' ? 'MARKA' : entity.type === 'store' ? 'MAĞAZA' : 'KATEGORİ'
  const priceDelta = entity.benchmark.medianPriceDeltaPercent
  const priceDeltaLabel =
    priceDelta === null ? '—' : `${priceDelta > 0 ? '+' : ''}%${priceDelta.toLocaleString('tr-TR')}`
  return (
    <section
      className="assistant-entity"
      aria-label={`${entity.label} ${typeLabel.toLocaleLowerCase('tr-TR')} analizi`}
    >
      <header>
        <span>{typeLabel} ANALİZİ / GÖZLEM EVRENİ</span>
        <strong>{entity.label}</strong>
        <small>
          {entity.productCount} tekil ürün · {entity.demandSignalProductCount} üründe görünür talep
          sinyali
        </small>
      </header>
      <dl className="assistant-entity-metrics">
        <div>
          <dt>Gözlenen ürün</dt>
          <dd>{entity.productCount}</dd>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <dt>Gözlenen satıcı</dt>
          <dd>{entity.observedSellerCount}</dd>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <dt>Marka / alt kategori</dt>
          <dd>
            {entity.brandCount} / {entity.categoryCount}
          </dd>
          <span className="assistant-data-kind observed">ÖLÇÜLEN</span>
        </div>
        <div>
          <dt>Medyan fiyat</dt>
          <dd>{entity.medianPrice === null ? '—' : money(entity.medianPrice)}</dd>
          <span className="assistant-data-kind derived">TÜRETİLEN</span>
        </div>
        <div>
          <dt>30 günlük hız alt sınırı</dt>
          <dd>
            {entity.monthlyDemandRunRateMin === null
              ? '—'
              : `${compactNumber(entity.monthlyDemandRunRateMin)}+`}
          </dd>
          <span className="assistant-data-kind derived">TÜRETİLEN</span>
        </div>
        <div>
          <dt>Ciro hız alt sınırı</dt>
          <dd>
            {entity.monthlyRevenueRunRateMin === null
              ? '—'
              : `${compactNumber(entity.monthlyRevenueRunRateMin)} TL+`}
          </dd>
          <span className="assistant-data-kind derived">TÜRETİLEN</span>
        </div>
      </dl>
      <p>
        Bu metrikler tüm Trendyol’u temsil etmez; son başarılı Veri Mimarı gözlem evrenini özetler.
      </p>
      <section className="assistant-entity-benchmark" aria-label="Pazar bağlamı karşılaştırması">
        <header>
          <span>PAZAR BAĞLAMI / TÜRETİLEN</span>
          <strong>{entity.benchmark.scopeLabel}</strong>
        </header>
        <dl>
          <div>
            <dt>Gözlem evreni ürün payı</dt>
            <dd>
              {entity.benchmark.entityProductSharePercent === null
                ? '—'
                : `%${entity.benchmark.entityProductSharePercent.toLocaleString('tr-TR')}`}
            </dd>
            <small>{entity.benchmark.peerProductCount} tekil karşılaştırma ürünü</small>
          </div>
          <div>
            <dt>Hız sinyali payı</dt>
            <dd>
              {entity.benchmark.demandRunRateSharePercent === null
                ? '—'
                : `%${entity.benchmark.demandRunRateSharePercent.toLocaleString('tr-TR')}`}
            </dd>
            <small>30 günlük görünür hız alt sınırları</small>
          </div>
          <div>
            <dt>Medyan fiyat farkı</dt>
            <dd>{priceDeltaLabel}</dd>
            <small>
              Eş küme medyanı:{' '}
              {entity.benchmark.peerMedianPrice === null
                ? '—'
                : money(entity.benchmark.peerMedianPrice)}
            </small>
          </div>
        </dl>
        <p>
          Bu oranlar yalnız aynı gözlem kümesindeki ürünler ve görünür talep alt sınırlarıyla
          hesaplanır; toplam pazar payı veya gerçekleşmiş satış payı değildir.
        </p>
      </section>
      <ProductResults products={entity.topProducts} />
    </section>
  )
}

const evidenceLabels = {
  observed: 'ÖLÇÜLEN',
  derived: 'TÜRETİLEN',
  user: 'SİZİN GİRDİNİZ',
  estimate: 'TAHMİN',
} as const

function EvidenceLedger({ facts }: { facts: NonNullable<AssistantPayload['evidence']> }) {
  if (!facts.length) return null
  return (
    <section className="assistant-evidence" aria-label="Rakamların kaynak türleri">
      <header>
        <strong>RAKAM HARİTASI</strong>
        <span>Her değer nereden geldi?</span>
      </header>
      <dl>
        {facts.map((fact, index) => (
          <div key={`${fact.label}-${index}`}>
            <dt>
              <span className={`assistant-data-kind ${fact.kind}`}>
                {evidenceLabels[fact.kind]}
              </span>
              {fact.label}
            </dt>
            <dd>{fact.value}</dd>
            {fact.note ? <small>{fact.note}</small> : null}
          </div>
        ))}
      </dl>
    </section>
  )
}

function ComparisonResults({
  comparison,
}: {
  comparison: NonNullable<AssistantPayload['comparison']>
}) {
  return (
    <div className="assistant-comparison" aria-label="Kategori karşılaştırması">
      {comparison.map((item) => (
        <section key={item.slug}>
          <span className="assistant-comparison-label">{item.label}</span>
          <strong>{item.medianPrice === null ? '—' : money(item.medianPrice)}</strong>
          <small>MEDYAN GÖZLEM FİYATI</small>
          <dl>
            <div>
              <dt>Gözlenen ürün</dt>
              <dd>{item.productCount}</dd>
            </div>
            <div>
              <dt>Yükseliş sinyali</dt>
              <dd>{item.risingCount}</dd>
            </div>
            <div>
              <dt>Fiyat düşüşü</dt>
              <dd>{item.priceDropCount}</dd>
            </div>
            <div>
              <dt>Stok riski</dt>
              <dd>{item.stockRiskCount}</dd>
            </div>
            <div>
              <dt>Marka / gözlenen satıcı</dt>
              <dd>
                {item.brandCount} / {item.observedSellerCount}
              </dd>
            </div>
            <div>
              <dt>30 günlük hız alt sınırı</dt>
              <dd>
                {item.monthlyDemandRunRateMin === null
                  ? '—'
                  : `${compactNumber(item.monthlyDemandRunRateMin)}+`}
              </dd>
            </div>
          </dl>
          {item.topOpportunity ? (
            <a href={item.topOpportunity.url} target="_blank" rel="noreferrer">
              <span>Öne çıkan fırsat · {item.topOpportunity.score ?? '—'}</span>
              {item.topOpportunity.title} ↗
            </a>
          ) : null}
        </section>
      ))}
    </div>
  )
}

function ExplanationPanel({
  explanation,
}: {
  explanation: NonNullable<AssistantPayload['explanation']>
}) {
  return (
    <details className="assistant-explanation" open>
      <summary>{explanation.title}</summary>
      <p>{explanation.formula}</p>
      <dl>
        {explanation.steps.map((step, index) => (
          <div key={`${step.label}-${index}`}>
            <dt>{step.label}</dt>
            <dd>
              {step.value !== undefined
                ? `${step.operation === 'minus' ? '−' : '+'} ${money(step.value)}`
                : step.text || '—'}
            </dd>
          </div>
        ))}
        {explanation.result !== undefined ? (
          <div className="assistant-explanation-result">
            <dt>Net sonuç</dt>
            <dd>{money(explanation.result)}</dd>
          </div>
        ) : null}
      </dl>
      {explanation.breakEvenFormula ? <small>{explanation.breakEvenFormula}</small> : null}
    </details>
  )
}

function MarketCoverage({ payload }: { payload: AssistantPayload }) {
  if (!payload.coverage && !payload.appliedFilters?.length) return null
  return (
    <div className="assistant-coverage">
      {payload.appliedFilters?.length ? (
        <div aria-label="Uygulanan filtreler">
          {payload.appliedFilters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
      ) : null}
      {payload.coverage ? (
        <small>
          {payload.coverage.profileCount} profil · {payload.coverage.candidateCount} tekil aday ·{' '}
          {payload.coverage.resultCount} eşleşme
        </small>
      ) : null}
    </div>
  )
}

function CalculationResult({
  calculation,
}: {
  calculation: NonNullable<AssistantPayload['calculation']>
}) {
  const isPositive = calculation.netProfit >= 0
  return (
    <div className="assistant-calculation" aria-label="Kârlılık hesabı">
      <div className="assistant-calculation-main">
        <small>SİPARİŞ BAŞINA NET {isPositive ? 'KÂR' : 'ZARAR'}</small>
        <strong>{money(Math.abs(calculation.netProfit))}</strong>
        <span>
          %{calculation.netMargin.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} net marj
        </span>
      </div>
      <dl>
        <div>
          <dt>Toplam maliyet</dt>
          <dd>{money(calculation.totalCost)}</dd>
        </div>
        <div>
          <dt>Reklam öncesi katkı</dt>
          <dd>{money(calculation.contributionBeforeAds)}</dd>
        </div>
        <div>
          <dt>Başa baş ROAS</dt>
          <dd>
            {calculation.breakEvenRoas === null
              ? '—'
              : `${calculation.breakEvenRoas.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}x`}
          </dd>
        </div>
      </dl>
    </div>
  )
}

function AssistantReply({
  payload,
  copied,
  onCopy,
}: {
  payload: AssistantPayload
  copied: boolean
  onCopy: () => void
}) {
  return (
    <>
      <p>{payload.reply}</p>
      <MarketCoverage payload={payload} />
      {payload.calculation ? <CalculationResult calculation={payload.calculation} /> : null}
      {payload.comparison ? <ComparisonResults comparison={payload.comparison} /> : null}
      {payload.productAnalysis ? (
        <ProductIntelligenceCard product={payload.productAnalysis} />
      ) : null}
      {payload.entityAnalysis ? <EntityAnalysisCard entity={payload.entityAnalysis} /> : null}
      {payload.products && !payload.productAnalysis && !payload.entityAnalysis ? (
        <ProductResults products={payload.products} />
      ) : null}
      {payload.evidence ? <EvidenceLedger facts={payload.evidence} /> : null}
      {payload.explanation ? <ExplanationPanel explanation={payload.explanation} /> : null}
      {payload.missingFields?.length ? (
        <div className="assistant-missing-fields">
          <small>EKSİK GİRDİLER</small>
          <span>{payload.missingFields.join(' · ')}</span>
        </div>
      ) : null}
      {payload.source ? (
        <div className="assistant-source">
          <strong>
            KAYNAK / {payload.source.label}
            {payload.source.observedAt ? ` · ${payload.source.observedAt}` : ''}
          </strong>
          <span>{payload.source.note}</span>
        </div>
      ) : null}
      {payload.action ? (
        <a className="assistant-action" href={payload.action.href}>
          {payload.action.label} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      <button className="assistant-copy" type="button" onClick={onCopy}>
        {copied ? '✓ Sonuç kopyalandı' : 'Sonucu kopyala'}
      </button>
    </>
  )
}

export default function VeriAssistantChat({ variant = 'page' }: { variant?: 'page' | 'widget' }) {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeMode, setActiveMode] = useState<AssistantMode>('product')
  const [copiedMessageId, setCopiedMessageId] = useState('')
  const streamRef = useRef<HTMLDivElement>(null)

  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'assistant' && message.payload)

  useEffect(() => {
    const stream = streamRef.current
    if (!stream || messages.length === 1) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.requestAnimationFrame(() => {
      stream.scrollTo({ top: stream.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
    })
  }, [messages, isLoading])

  const resetConversation = () => {
    setMessages([initialMessage])
    setInput('')
    setError('')
    setCopiedMessageId('')
    trackEvent('veri_assistant_reset', { source: variant })
  }

  const copyResult = async (message: ChatMessage) => {
    if (!message.payload) return
    try {
      await navigator.clipboard.writeText(copySummary(message.payload))
      setCopiedMessageId(message.id)
      window.setTimeout(() => setCopiedMessageId(''), 2_000)
      trackEvent('veri_assistant_copy', { source: variant, intent: message.payload.intent })
    } catch {
      setError('Sonuç kopyalanamadı. Tarayıcı pano iznini kontrol edin.')
    }
  }

  const submitQuestion = async (question: string) => {
    const cleanQuestion = question.trim()
    if (!cleanQuestion || isLoading) return

    const userMessage: ChatMessage = { id: createId(), role: 'user', content: cleanQuestion }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsLoading(true)
    trackEvent('veri_assistant_submit', {
      source: variant,
      prompt_length: cleanQuestion.length,
    })

    try {
      const response = await fetch('/api/veri-asistani', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeMode,
          messages: nextMessages.slice(-12).map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error || 'Yanıt alınamadı.')
      const payload = data as AssistantPayload
      setMessages((current) => [
        ...current,
        { id: createId(), role: 'assistant', content: payload.reply, payload },
      ])
      trackEvent('veri_assistant_result', {
        source: variant,
        intent: payload.intent,
        result_count: payload.products?.length || 0,
      })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Yanıt alınamadı.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitQuestion(input)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submitQuestion(input)
    }
  }

  return (
    <section className={`assistant-chat assistant-chat-${variant}`} aria-label="Veri Asistanı">
      <header className="assistant-chat-head">
        <div className="assistant-orb" aria-hidden="true">
          VM
        </div>
        <div>
          <strong>Veri Asistanı</strong>
          <span>ÜRÜN + PAZAR + KÂRLILIK + KAYNAK HARİTASI</span>
        </div>
        <small>
          <i aria-hidden="true" /> V2 BETA
        </small>
      </header>

      <div className="assistant-chat-toolbar" aria-label="Asistan çalışma modu">
        <div>
          {modeOptions.map((mode) => (
            <button
              type="button"
              key={mode.id}
              aria-pressed={activeMode === mode.id}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={resetConversation} disabled={messages.length === 1}>
          Yeni konuşma
        </button>
      </div>

      <div className="assistant-stream" role="log" aria-live="polite" ref={streamRef}>
        {messages.map((message) => (
          <article key={message.id} className={`assistant-message ${message.role}`}>
            <span className="assistant-message-label">
              {message.role === 'assistant' ? 'VM / ASİSTAN' : 'SİZ'}
            </span>
            {message.payload ? (
              <AssistantReply
                payload={message.payload}
                copied={copiedMessageId === message.id}
                onCopy={() => void copyResult(message)}
              />
            ) : (
              <p>{message.content}</p>
            )}
          </article>
        ))}
        {isLoading ? (
          <div className="assistant-thinking">
            <i aria-hidden="true" /> Veri ve yöntem kontrol ediliyor…
          </div>
        ) : null}
        {error ? <div className="assistant-error">{error}</div> : null}
        {!isLoading && lastAssistantMessage?.payload?.followUps?.length ? (
          <div className="assistant-followups" aria-label="Önerilen takip soruları">
            <small>SONRAKİ DOĞRU SORU</small>
            <div>
              {lastAssistantMessage.payload.followUps.map((prompt) => (
                <button type="button" key={prompt} onClick={() => void submitQuestion(prompt)}>
                  {prompt} <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {messages.length === 1 ? (
        <div className="assistant-suggestions" aria-label="Örnek sorular">
          {modePrompts[activeMode].slice(0, variant === 'widget' ? 3 : 4).map((prompt) => (
            <button type="button" key={prompt} onClick={() => void submitQuestion(prompt)}>
              {prompt} <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      ) : null}

      <form className="assistant-form" onSubmit={onSubmit}>
        <label htmlFor={`assistant-prompt-${variant}`}>Veri Asistanı’na sorun</label>
        <div>
          <textarea
            id={`assistant-prompt-${variant}`}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            maxLength={2_000}
            placeholder="Ürün linki yapıştırın veya ‘Kozmetik kategorisini analiz et’ yazın"
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Kontrol ediliyor' : 'Sor'} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <small>
          Ölçülen, türetilen ve sizin girdiğiniz değerler ayrı etiketlenir. Konuşma kullanıcı
          hesabına bağlı saklanmaz.
        </small>
      </form>
    </section>
  )
}

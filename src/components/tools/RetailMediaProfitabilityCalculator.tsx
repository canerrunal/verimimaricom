'use client'

import { Suspense, useEffect, useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import {
  calculateRetailMediaEconomics,
  type RetailMediaEconomicsInput,
  type RetailMediaEconomicsStatus,
} from '@/lib/retail-media-economics'

const sampleInput: RetailMediaEconomicsInput = {
  attributedSales: 600_000,
  attributedOrders: 500,
  adSpend: 120_000,
  returnLossRate: 8,
  productCostRate: 42,
  marketplaceFeeRate: 15,
  fulfillmentCostPerOrder: 80,
  estimatedIncrementalShare: 45,
  targetIncrementalContribution: 20_000,
}

const queryKeys: Record<keyof RetailMediaEconomicsInput, string> = {
  attributedSales: 'sales',
  attributedOrders: 'orders',
  adSpend: 'spend',
  returnLossRate: 'returns',
  productCostRate: 'cogs',
  marketplaceFeeRate: 'fee',
  fulfillmentCostPerOrder: 'fulfillment',
  estimatedIncrementalShare: 'incremental',
  targetIncrementalContribution: 'target',
}

const statusCopy: Record<
  RetailMediaEconomicsStatus,
  { label: string; explanation: string; tone: 'positive' | 'negative' | 'warning' }
> = {
  invalid: {
    label: 'Kampanya verisi eksik',
    explanation: 'Satış, sipariş ve reklam harcamasını sıfırdan büyük girin.',
    tone: 'warning',
  },
  'negative-unit-economics': {
    label: 'Ürün ekonomisi reklamdan önce negatif',
    explanation: 'Net satış, ürün ve pazaryeri maliyetlerini karşılamıyor.',
    tone: 'negative',
  },
  'incremental-loss': {
    label: 'Panel güçlü, artımlı katkı negatif',
    explanation: 'Tahmini ek talebin katkısı reklam harcamasını karşılamıyor.',
    tone: 'negative',
  },
  'below-target': {
    label: 'Pozitif, hedef katkının altında',
    explanation: 'Reklam geri ödeniyor; belirlediğiniz katkı tamponu korunmuyor.',
    tone: 'warning',
  },
  'target-protected': {
    label: 'Artımlı katkı hedefi korunuyor',
    explanation: 'Tahmini ek katkı reklamı ve hedef tamponu karşılıyor.',
    tone: 'positive',
  },
}

type FieldProps = {
  label: string
  hint: string
  value: number
  onChange: (value: number) => void
  suffix: string
  step?: number
  max?: number
}

function Field({ label, hint, value, onChange, suffix, step = 1, max }: FieldProps) {
  const inputId = useId()

  return (
    <div className="field retail-media-field">
      <label htmlFor={inputId}>
        {label}
        <small>{hint}</small>
      </label>
      <div className="retail-media-input-wrap">
        <input
          id={inputId}
          type="number"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const next = Math.max(0, Number(event.target.value) || 0)
            onChange(max === undefined ? next : Math.min(max, next))
          }}
        />
        <span aria-hidden="true">{suffix}</span>
      </div>
    </div>
  )
}

function CalculatorContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()
  const [input, setInput] = useState<RetailMediaEconomicsInput>(sampleInput)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const next = { ...sampleInput }
    let hasQueryValue = false

    for (const [inputKey, queryKey] of Object.entries(queryKeys) as [
      keyof RetailMediaEconomicsInput,
      string,
    ][]) {
      const value = searchParams.get(queryKey)
      if (value !== null && Number.isFinite(Number(value))) {
        next[inputKey] = Math.max(0, Number(value))
        hasQueryValue = true
      }
    }

    if (hasQueryValue) setInput(next)
  }, [searchParams])

  const result = calculateRetailMediaEconomics(input)
  const status = statusCopy[result.status]

  const update = (key: keyof RetailMediaEconomicsInput, value: number) => {
    setInput((current) => ({ ...current, [key]: value }))
  }

  const money = (value: number) =>
    value.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  const ratio = (value: number | null) =>
    value === null ? '—' : `${value.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}x`
  const percent = (value: number | null) =>
    value === null ? '—' : `%${(value * 100).toLocaleString('tr-TR', { maximumFractionDigits: 1 })}`

  const copyShareUrl = async () => {
    const params = new URLSearchParams()
    for (const [inputKey, queryKey] of Object.entries(queryKeys) as [
      keyof RetailMediaEconomicsInput,
      string,
    ][]) {
      params.set(queryKey, String(input[inputKey]))
    }
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}?${params.toString()}`,
    )
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single retail-media-hero">
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / PAZARYERİ &amp; RETAIL MEDIA / 07</div>
        <h1>Pazaryeri Reklam Kârlılık Hesaplayıcı</h1>
        <p className="intro">
          Sponsorlu satış ROAS’ını iade, ürün maliyeti, komisyon ve tahmini artımsallıkla düzeltin;
          reklamın gerçekten bıraktığı ek katkıyı görün.
        </p>
        <div className="signals retail-media-signals">
          <span className="tag live">CANLI · TARAYICIDA · ÜCRETSİZ</span>
          <span className="tag">ATIF ≠ ARTIMSALLIK</span>
          <span className="tag">VERİNİZ SAKLANMAZ</span>
          <button className="btn alt retail-media-share" type="button" onClick={copyShareUrl}>
            {copied ? '✓ Bağlantı kopyalandı' : 'Sonuç bağlantısını kopyala'}
          </button>
        </div>
      </section>

      <section
        className="wrap retail-media-workspace"
        aria-label="Pazaryeri reklam kârlılık hesabı"
      >
        <div className="retail-media-inputs">
          <div className="panel retail-media-panel">
            <div className="retail-media-panel-head">
              <div>
                <span className="eyebrow">01 / KAMPANYA RAPORU</span>
                <h2>Panel sonucunu aynı kapsamda girin.</h2>
              </div>
              <button
                className="retail-media-sample"
                type="button"
                onClick={() => setInput(sampleInput)}
              >
                Örnek senaryo
              </button>
            </div>
            <Field
              label="Atfedilen brüt satış"
              hint="Pazaryeri reklam panelinin kampanyaya yazdığı satış"
              value={input.attributedSales}
              onChange={(value) => update('attributedSales', value)}
              suffix="TL"
            />
            <Field
              label="Atfedilen sipariş"
              hint="Aynı pencere ve kampanyadaki sipariş adedi"
              value={input.attributedOrders}
              onChange={(value) => update('attributedOrders', value)}
              suffix="adet"
            />
            <Field
              label="Reklam harcaması"
              hint="Sponsorlu ürün, marka ve kapsama aldığınız medya gideri"
              value={input.adSpend}
              onChange={(value) => update('adSpend', value)}
              suffix="TL"
            />
            <Field
              label="Tahmini artımlı satış payı"
              hint="Deney sonucu veya açıkça etiketlenmiş senaryo; atfedilen satış içindeki gerçek ek pay"
              value={input.estimatedIncrementalShare}
              onChange={(value) => update('estimatedIncrementalShare', value)}
              suffix="%"
              max={100}
              step={0.1}
            />
          </div>

          <div className="panel retail-media-panel">
            <div className="retail-media-panel-head">
              <div>
                <span className="eyebrow">02 / NET SATIŞ VE KATKI</span>
                <h2>Pazaryeri ekonomisini ekleyin.</h2>
              </div>
            </div>
            <Field
              label="Beklenen iade / iptal kaybı"
              hint="Atfedilen brüt satıştan düşecek olgunlaşmış oran"
              value={input.returnLossRate}
              onChange={(value) => update('returnLossRate', value)}
              suffix="%"
              max={100}
              step={0.1}
            />
            <Field
              label="Ürün maliyeti oranı"
              hint="Net satışa göre COGS / ürün maliyeti"
              value={input.productCostRate}
              onChange={(value) => update('productCostRate', value)}
              suffix="%"
              max={100}
              step={0.1}
            />
            <Field
              label="Pazaryeri kesinti oranı"
              hint="Komisyon, hizmet ve ödeme kesintilerinin net satışa oranı"
              value={input.marketplaceFeeRate}
              onChange={(value) => update('marketplaceFeeRate', value)}
              suffix="%"
              max={100}
              step={0.1}
            />
            <Field
              label="Sipariş başına operasyon"
              hint="Kargo, paketleme ve siparişle artan diğer gider"
              value={input.fulfillmentCostPerOrder}
              onChange={(value) => update('fulfillmentCostPerOrder', value)}
              suffix="TL"
            />
            <Field
              label="Hedef net artımlı katkı"
              hint="Reklam sonrası kampanyada korunmasını istediğiniz katkı tamponu"
              value={input.targetIncrementalContribution}
              onChange={(value) => update('targetIncrementalContribution', value)}
              suffix="TL"
            />
          </div>
        </div>

        <aside className="results retail-media-results" aria-live="polite">
          <small>NET ARTIMLI KATKI</small>
          <span
            className={`big ${result.netIncrementalContribution >= 0 ? 'positive' : 'negative'}`}
          >
            {money(result.netIncrementalContribution)} TL
          </span>
          <span className={`retail-media-status status-${status.tone}`}>{status.label}</span>
          <p className="lead">{status.explanation}</p>
          <div className="metric-row">
            <span>Panel ROAS</span>
            <b>{ratio(result.panelRoas)}</b>
          </div>
          <div className="metric-row">
            <span>Artımlı katkı ROAS</span>
            <b>{ratio(result.contributionRoas)}</b>
          </div>
          <div className="metric-row">
            <span>İade sonrası atfedilen satış</span>
            <b>{money(result.netAttributedSales)} TL</b>
          </div>
          <div className="metric-row">
            <span>Atıf bazlı reklam sonrası katkı</span>
            <b className={result.attributedContributionAfterAds >= 0 ? 'positive' : 'negative'}>
              {money(result.attributedContributionAfterAds)} TL
            </b>
          </div>
          <div className="metric-row">
            <span>Artımlı katkı · reklam öncesi</span>
            <b>{money(result.incrementalContributionBeforeAds)} TL</b>
          </div>
          <div className="metric-row">
            <span>Tahmini artımlı olmayan satış</span>
            <b>{money(result.estimatedNonIncrementalSales)} TL</b>
          </div>
          <div className="metric-row">
            <span>Başabaş artımlı pay</span>
            <b>{percent(result.breakEvenIncrementalShare)}</b>
          </div>
          <div className="metric-row">
            <span>Hedefi koruyan artımlı pay</span>
            <b>{percent(result.targetIncrementalShare)}</b>
          </div>
          <p className="fine">
            Artımlı pay bir deney sonucu değilse bu çıktı nedensel ölçüm değil senaryodur. Satış ve
            maliyet kapsamını aynı atıf penceresinde tutun.
          </p>
        </aside>
      </section>

      <section className="section-band band-paper retail-media-decision-band">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">03 / BÜTÇE KAPISI</span>
              <h2>ROAS’ı değil, artımlı katkı payını ölçekleyin.</h2>
            </div>
            <p>
              Organik sıralama, marka araması ve zaten gelecek satışlar panel sonucunu büyütebilir.
              Sonucu SKU, sorgu ve yeni müşteri kırılımında doğrulayın.
            </p>
          </div>
          <div className="metrics-grid retail-media-metrics">
            <div className="metric">
              <small>MEVCUT ARTIMLI PAY</small>
              <b>%{money(input.estimatedIncrementalShare)}</b>
            </div>
            <div className="metric">
              <small>BAŞABAŞ İÇİN GEREKEN</small>
              <b>{percent(result.breakEvenIncrementalShare)}</b>
            </div>
            <div className="metric">
              <small>HEDEFTE AZAMİ HARCAMA</small>
              <b>{money(result.maxAdSpendAtTarget)} TL</b>
            </div>
            <div className="metric">
              <small>ÖLÇÜM TÜRÜ</small>
              <b>Deney / senaryo</b>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-dark">
        <div className="wrap section retail-media-next-step">
          <div>
            <span className="eyebrow">04 / YÖNTEM</span>
            <h2>Atfedilen satıştan artımlı katkıya geçin.</h2>
            <p>
              Net satış tanımı, deney tasarımı, sponsorlu-organik ayrımı ve haftalık karar
              kapılarını uygulama rehberiyle kurun.
            </p>
          </div>
          <a className="btn hero-primary" href="/rehberler/retail-media-karliligi-nasil-olculur">
            Retail media rehberini aç →
          </a>
        </div>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="Pazaryeri Reklam Kârlılık Hesaplayıcı" />
    </main>
  )
}

export default function RetailMediaProfitabilityCalculator() {
  return (
    <Suspense fallback={<div className="wrap section">Hesaplayıcı yükleniyor…</div>}>
      <CalculatorContent />
    </Suspense>
  )
}

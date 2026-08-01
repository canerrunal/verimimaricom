'use client'

import { Suspense, useEffect, useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import {
  calculateCustomerEconomics,
  type CustomerEconomicsInput,
  type CustomerEconomicsStatus,
} from '@/lib/customer-economics'
import { getDictionary } from '@/lib/i18n'

const sampleInput: CustomerEconomicsInput = {
  acquisitionSpend: 240_000,
  verifiedNewCustomers: 800,
  firstOrderNetRevenue: 900,
  firstOrderVariableCosts: 650,
  repeatOrders90d: 0.45,
  repeatOrderNetRevenue: 720,
  repeatOrderVariableCosts: 470,
  expectedReturnLoss90d: 25,
  targetContributionAfterAcquisition: 50,
}

const queryKeys: Record<keyof CustomerEconomicsInput, string> = {
  acquisitionSpend: 'spend',
  verifiedNewCustomers: 'customers',
  firstOrderNetRevenue: 'firstRevenue',
  firstOrderVariableCosts: 'firstCosts',
  repeatOrders90d: 'repeatOrders',
  repeatOrderNetRevenue: 'repeatRevenue',
  repeatOrderVariableCosts: 'repeatCosts',
  expectedReturnLoss90d: 'returnLoss',
  targetContributionAfterAcquisition: 'target',
}

const statusCopy: Record<
  CustomerEconomicsStatus,
  { label: string; explanation: string; tone: 'positive' | 'negative' | 'warning' }
> = {
  invalid: {
    label: 'CAC için veri eksik',
    explanation: 'Harcama ve doğrulanmış yeni müşteri sayısını sıfırdan büyük girin.',
    tone: 'warning',
  },
  'negative-economics': {
    label: 'Müşteri ekonomisi negatif',
    explanation: '90 günlük katkı, ürün ve operasyon kayıplarını karşılamıyor.',
    tone: 'negative',
  },
  'not-paid-back': {
    label: '90 günde geri ödenmiyor',
    explanation: 'Katkı pozitif; ancak edinme maliyetini henüz karşılamıyor.',
    tone: 'negative',
  },
  'below-target': {
    label: 'Pozitif, hedefin altında',
    explanation: 'CAC geri ödeniyor; hedef katkı tamponu korunmuyor.',
    tone: 'warning',
  },
  'target-protected': {
    label: 'Hedef katkı korunuyor',
    explanation: '90 günlük katkı, CAC ve belirlediğiniz hedef tamponu karşılıyor.',
    tone: 'positive',
  },
}

type FieldProps = {
  label: string
  hint: string
  value: number
  onChange: (value: number) => void
  step?: number
  suffix?: string
}

function Field({ label, hint, value, onChange, step = 1, suffix = 'TL' }: FieldProps) {
  const inputId = useId()

  return (
    <div className="field customer-economics-field">
      <label htmlFor={inputId}>
        {label}
        <small>{hint}</small>
      </label>
      <div className="customer-economics-input-wrap">
        <input
          id={inputId}
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
        />
        <span aria-hidden="true">{suffix}</span>
      </div>
    </div>
  )
}

function CalculatorContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()
  const [input, setInput] = useState<CustomerEconomicsInput>(sampleInput)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const next = { ...sampleInput }
    let hasQueryValue = false

    for (const [inputKey, queryKey] of Object.entries(queryKeys) as [
      keyof CustomerEconomicsInput,
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

  const result = calculateCustomerEconomics(input)
  const status = statusCopy[result.status]

  const update = (key: keyof CustomerEconomicsInput, value: number) => {
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
      keyof CustomerEconomicsInput,
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

      <section className="wrap hero single customer-economics-hero">
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / REKLAM ANALİTİĞİ / 06</div>
        <h1>Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı</h1>
        <p className="intro">
          Reklam harcamasını doğrulanmış yeni müşteri ve 90 günlük kohort katkısıyla birleştirin;
          müşteri edinmenin ne kadar değer ürettiğini görün.
        </p>
        <div className="signals customer-economics-signals">
          <span className="tag live">CANLI · TARAYICIDA · ÜCRETSİZ</span>
          <span className="tag">GELİR DEĞİL KATKI LTV</span>
          <span className="tag">VERİNİZ SAKLANMAZ</span>
          <button className="btn alt customer-economics-share" type="button" onClick={copyShareUrl}>
            {copied ? '✓ Bağlantı kopyalandı' : 'Sonuç bağlantısını kopyala'}
          </button>
        </div>
      </section>

      <section className="wrap customer-economics-workspace" aria-label="Müşteri ekonomisi hesabı">
        <div className="customer-economics-inputs">
          <div className="panel customer-economics-panel">
            <div className="customer-economics-panel-head">
              <div>
                <span className="eyebrow">01 / EDİNME VE İLK SİPARİŞ</span>
                <h2>Gerçek yeni müşteri CAC’ini kurun.</h2>
              </div>
              <button
                className="customer-economics-sample"
                type="button"
                onClick={() => setInput(sampleInput)}
              >
                Örnek senaryo
              </button>
            </div>
            <Field
              label="Toplam edinme harcaması"
              hint="Aynı dönemin medya ve kapsama aldığınız edinme gideri"
              value={input.acquisitionSpend}
              onChange={(value) => update('acquisitionSpend', value)}
            />
            <Field
              label="Doğrulanmış yeni müşteri"
              hint="CRM/sipariş sistemiyle ilk kez alışveriş yaptığı doğrulanan kişi"
              value={input.verifiedNewCustomers}
              onChange={(value) => update('verifiedNewCustomers', value)}
              suffix="kişi"
            />
            <Field
              label="İlk sipariş net geliri"
              hint="İndirim ve iptal kapsamı sabit, müşteri başına ortalama"
              value={input.firstOrderNetRevenue}
              onChange={(value) => update('firstOrderNetRevenue', value)}
            />
            <Field
              label="İlk sipariş değişken gideri"
              hint="Ürün, komisyon, ödeme, kargo ve paketleme; reklam hariç"
              value={input.firstOrderVariableCosts}
              onChange={(value) => update('firstOrderVariableCosts', value)}
            />
          </div>

          <div className="panel customer-economics-panel">
            <div className="customer-economics-panel-head">
              <div>
                <span className="eyebrow">02 / 90 GÜNLÜK KOHORT</span>
                <h2>Tekrar sipariş katkısını ekleyin.</h2>
              </div>
            </div>
            <Field
              label="90 günde tekrar sipariş"
              hint="Yeni müşteri başına ortalama; örneğin 0,45"
              value={input.repeatOrders90d}
              onChange={(value) => update('repeatOrders90d', value)}
              step={0.01}
              suffix="adet"
            />
            <Field
              label="Tekrar sipariş net geliri"
              hint="90 günlük tekrar siparişlerin sipariş başına ortalaması"
              value={input.repeatOrderNetRevenue}
              onChange={(value) => update('repeatOrderNetRevenue', value)}
            />
            <Field
              label="Tekrar sipariş değişken gideri"
              hint="Sipariş başına ürün ve operasyon gideri; reklam hariç"
              value={input.repeatOrderVariableCosts}
              onChange={(value) => update('repeatOrderVariableCosts', value)}
            />
            <Field
              label="90 günlük beklenen kayıp"
              hint="Müşteri başına olgunlaşmış iade, servis ve geri kazanılamayan maliyet"
              value={input.expectedReturnLoss90d}
              onChange={(value) => update('expectedReturnLoss90d', value)}
            />
            <Field
              label="CAC sonrası hedef katkı"
              hint="Müşteri başına korunmasını istediğiniz 90 günlük tampon"
              value={input.targetContributionAfterAcquisition}
              onChange={(value) => update('targetContributionAfterAcquisition', value)}
            />
          </div>
        </div>

        <aside className="results customer-economics-results" aria-live="polite">
          <small>90 GÜNLÜK KATKI LTV : CAC</small>
          <span className="big">{ratio(result.contributionLtvToCac)}</span>
          <span className={`customer-economics-status status-${status.tone}`}>{status.label}</span>
          <p className="lead">{status.explanation}</p>
          <div className="metric-row">
            <span>Doğrulanmış yeni müşteri CAC</span>
            <b>{money(result.cac)} TL</b>
          </div>
          <div className="metric-row">
            <span>İlk sipariş katkısı</span>
            <b className={result.firstOrderContribution >= 0 ? 'positive' : 'negative'}>
              {money(result.firstOrderContribution)} TL
            </b>
          </div>
          <div className="metric-row">
            <span>90 günlük tekrar katkısı</span>
            <b>{money(result.repeatContribution90d)} TL</b>
          </div>
          <div className="metric-row">
            <span>90 günlük katkı LTV</span>
            <b>{money(result.contributionLtv90d)} TL</b>
          </div>
          <div className="metric-row">
            <span>CAC sonrası 90 günlük katkı</span>
            <b className={result.contributionAfterAcquisition >= 0 ? 'positive' : 'negative'}>
              {money(result.contributionAfterAcquisition)} TL
            </b>
          </div>
          <div className="metric-row">
            <span>İlk siparişte CAC geri kazanımı</span>
            <b>{percent(result.firstOrderRecoveryRate)}</b>
          </div>
          <div className="metric-row">
            <span>Hedefi koruyan azami CAC</span>
            <b>{money(result.maxCacAtTarget)} TL</b>
          </div>
          <p className="fine">
            “İyi” LTV:CAC için evrensel oran yoktur. Nakit döngüsü, veri olgunluğu ve katkı kapsamı
            şirketinize göre doğrulanmalıdır.
          </p>
        </aside>
      </section>

      <section className="section-band band-paper customer-economics-decision-band">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">03 / KARAR MERCEĞİ</span>
              <h2>Oranı değil, ekonomik boşluğu yönetin.</h2>
            </div>
            <p>
              Aynı hesabı kanal, kampanya ve ilk ürün kohortunda ayrı çalıştırın. Eski müşteriyi
              yeni sayan platform sinyali CAC’i yapay olarak iyileştirebilir.
            </p>
          </div>
          <div className="metrics-grid customer-economics-metrics">
            <div className="metric">
              <small>90 GÜNLÜK TOPLAM KATKI</small>
              <b>{money(result.totalContributionAfterAcquisition90d)} TL</b>
            </div>
            <div className="metric">
              <small>HEDEFE EK GEREKEN KATKI</small>
              <b>{money(result.requiredAdditionalContribution)} TL</b>
            </div>
            <div className="metric">
              <small>DOĞRULAMA BİRİMİ</small>
              <b>Müşteri</b>
            </div>
            <div className="metric">
              <small>OLGUNLAŞMA PENCERESİ</small>
              <b>90 gün</b>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-dark">
        <div className="wrap section customer-economics-next-step">
          <div>
            <span className="eyebrow">04 / YÖNTEM</span>
            <h2>CAC ve katkı LTV’yi aynı kohortta doğrulayın.</h2>
            <p>
              Gelir LTV, katkı LTV, müşteri kimliği ve 90 günlük olgunlaşma farkını örnek hesap ve
              veri kontrol listesiyle uygulayın.
            </p>
          </div>
          <a
            className="btn hero-primary"
            href="/rehberler/yeni-musteri-cac-katki-ltv-nasil-hesaplanir"
          >
            Yöntem rehberini aç →
          </a>
        </div>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı" />
    </main>
  )
}

export default function CustomerEconomicsCalculator() {
  return (
    <Suspense fallback={<div className="wrap section">Hesaplayıcı yükleniyor…</div>}>
      <CalculatorContent />
    </Suspense>
  )
}

'use client'

import { useState, useEffect, useId, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { getDictionary } from '@/lib/i18n'

function Field({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (v: number) => void }) {
  const inputId = useId()

  return (
    <div className="field">
      <label htmlFor={inputId}>
        {label}
        <small>{hint}</small>
      </label>
      <input
        id={inputId}
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      />
    </div>
  )
}

function CalculatorContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [sale, setSale] = useState(1000)
  const [cost, setCost] = useState(300)
  const [commission, setCommission] = useState(15)
  const [shipping, setShipping] = useState(100)
  const [returns, setReturns] = useState(40)
  const [targetMargin, setTargetMargin] = useState(10)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchParams.has('sale')) setSale(Number(searchParams.get('sale')) || 1000)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 300)
    if (searchParams.has('commission')) setCommission(Number(searchParams.get('commission')) || 15)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 100)
    if (searchParams.has('returns')) setReturns(Number(searchParams.get('returns')) || 40)
    if (searchParams.has('margin')) setTargetMargin(Number(searchParams.get('margin')) || 10)
  }, [searchParams])

  const comAmount = (sale * commission) / 100
  const totalVariableCost = cost + comAmount + shipping + returns
  const contribution = sale - totalVariableCost
  const breakEvenRoas = contribution > 0 ? sale / contribution : 0
  const breakEvenCpa = contribution > 0 ? contribution : 0
  const targetNetProfit = (sale * targetMargin) / 100
  const targetCpa = contribution - targetNetProfit
  const targetRoas = targetCpa > 0 ? sale / targetCpa : 0

  const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      sale: String(sale),
      cost: String(cost),
      commission: String(commission),
      shipping: String(shipping),
      returns: String(returns),
      margin: String(targetMargin),
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single" style={{ paddingBottom: 20 }}>
        <a href="/araclar" className="back-link">← Tüm Araçlar</a>
        <div className="crumb">ARAÇLAR / KÂRLILIK / 01</div>
        <h1>Başa Baş ROAS Hesaplayıcı</h1>
        <p className="intro">Reklam harcamanızın hangi seviyeden sonra zarar ettirmeye başladığını görmek için ürün ve operasyon maliyetlerinizi girin.</p>
        <div className="signals" style={{ marginTop: 18 }}>
          <span className="tag live">CANLI · 2 DK · ÜCRETSİZ</span>
          <span className="tag">AÇIK HESAPLAMA YÖNTEMİ</span>
          <span className="tag">VERİLERİNİZ SAKLANMAZ</span>
          <button onClick={copyShareUrl} className="btn alt" style={{ padding: '6px 10px', fontSize: 9 }}>
            {copied ? '✓ Bağlantı kopyalandı' : '🔗 Sonuç bağlantısını kopyala'}
          </button>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="form-layout">
          <div className="panel" style={{ padding: '6px 22px' }}>
            <Field label="Satış fiyatı" hint="Ürünün müşteriye satış bedeli" value={sale} onChange={setSale} />
            <Field label="Ürün maliyeti" hint="Ürünün size geliş maliyeti" value={cost} onChange={setCost} />
            <Field label="Komisyon oranı (%)" hint="Pazaryeri veya ödeme kesintisi" value={commission} onChange={setCommission} />
            <Field label="Kargo + paketleme" hint="Gidiş kargo ve paketleme maliyeti" value={shipping} onChange={setShipping} />
            <Field label="Beklenen iade maliyeti" hint="Ortalama iadeden kaynaklı kayıp" value={returns} onChange={setReturns} />
            <Field label="Hedef kâr oranı (%)" hint="Reklam sonrası hedef net marj" value={targetMargin} onChange={setTargetMargin} />
          </div>

          <aside className="results">
            <small>Başa Baş ROAS</small>
            <span className="big" style={{ color: breakEvenRoas > 0 ? '#fff' : '#f2a29a' }}>
              {breakEvenRoas > 0 ? `${fmt(breakEvenRoas)}x` : '—'}
            </span>
            <p className="lead">
              {contribution > 0
                ? `Her sipariş için reklama en fazla ${fmt(contribution)} TL ayırabilirsiniz.`
                : 'Katkı payı oluşmuyor. Maliyetleri kontrol edin.'}
            </p>
            <div className="metric-row"><span>Toplam değişken maliyet</span><b>{fmt(totalVariableCost)} TL</b></div>
            <div className="metric-row"><span>Reklam öncesi katkı payı</span><b className={contribution > 0 ? 'positive' : 'negative'}>{fmt(contribution)} TL</b></div>
            <div className="metric-row"><span>Başa baş CPA</span><b>{fmt(breakEvenCpa)} TL</b></div>
            <div className="metric-row"><span>Hedef ROAS (%{targetMargin})</span><b>{targetRoas > 0 ? `${fmt(targetRoas)}x` : '—'}</b></div>
            <p className="fine">Bu hesap sabit giderleri ve KDV mahsuplamasını ayrı modellemez. Tüm tutarları aynı KDV yaklaşımıyla girin.</p>
          </aside>
        </div>
      </section>
      <Footer t={t} />
      <FeedbackWidget toolName="Başa Baş ROAS Hesaplayıcı" />
    </main>
  )
}

export default function RoasCalculatorPage() {
  return (
    <Suspense fallback={<div className="wrap section">Yükleniyor…</div>}>
      <CalculatorContent />
    </Suspense>
  )
}

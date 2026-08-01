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

function MarginContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [sale, setSale] = useState(1200)
  const [cost, setCost] = useState(400)
  const [commission, setCommission] = useState(18)
  const [shipping, setShipping] = useState(80)
  const [adSpend, setAdSpend] = useState(200)
  const [overheadPercent, setOverheadPercent] = useState(5)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchParams.has('sale')) setSale(Number(searchParams.get('sale')) || 1200)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 400)
    if (searchParams.has('commission')) setCommission(Number(searchParams.get('commission')) || 18)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 80)
    if (searchParams.has('adSpend')) setAdSpend(Number(searchParams.get('adSpend')) || 200)
    if (searchParams.has('overhead')) setOverheadPercent(Number(searchParams.get('overhead')) || 5)
  }, [searchParams])

  const comAmount = (sale * commission) / 100
  const grossProfit = sale - cost
  const grossMargin = sale > 0 ? (grossProfit / sale) * 100 : 0
  const contribution = sale - cost - comAmount - shipping
  const contributionMargin = sale > 0 ? (contribution / sale) * 100 : 0
  const overheadAmount = (sale * overheadPercent) / 100
  const totalCuts = comAmount + shipping + adSpend + overheadAmount
  const netProfit = contribution - adSpend - overheadAmount
  const netMargin = sale > 0 ? (netProfit / sale) * 100 : 0

  const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      sale: String(sale),
      cost: String(cost),
      commission: String(commission),
      shipping: String(shipping),
      adSpend: String(adSpend),
      overhead: String(overheadPercent),
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
        <div className="crumb">ARAÇLAR / KÂRLILIK / 02</div>
        <h1>Ürün Kâr Marjı Hesaplayıcı</h1>
        <p className="intro">Satış fiyatı, ürün maliyeti, komisyon, kargo ve reklam kesintileriyle sipariş başına net kârınızı ve marjınızı hesaplayın.</p>
        <div className="signals" style={{ marginTop: 18 }}>
          <span className="tag live">CANLI · 2 DK · ÜCRETSİZ</span>
          <span className="tag">AÇIK HESAPLAMA YÖNTEMİ</span>
          <button onClick={copyShareUrl} className="btn alt" style={{ padding: '6px 10px', fontSize: 9 }}>
            {copied ? '✓ Bağlantı kopyalandı' : '🔗 Sonuç bağlantısını kopyala'}
          </button>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="form-layout">
          <div className="panel" style={{ padding: '6px 22px' }}>
            <Field label="Satış fiyatı" hint="Nihai satış bedeli" value={sale} onChange={setSale} />
            <Field label="Ürün maliyeti (COGS)" hint="Geliş / alış maliyeti" value={cost} onChange={setCost} />
            <Field label="Komisyon oranı (%)" hint="Pazaryeri / ödeme kesintisi" value={commission} onChange={setCommission} />
            <Field label="Kargo + paketleme" hint="Sipariş başına teslimat gideri" value={shipping} onChange={setShipping} />
            <Field label="Sipariş başına reklam" hint="Kazandıran reklam harcaması" value={adSpend} onChange={setAdSpend} />
            <Field label="Sabit gider payı (%)" hint="Kira / genel gider katkısı" value={overheadPercent} onChange={setOverheadPercent} />
          </div>

          <aside className="results">
            <small>Net Kâr Marjı</small>
            <span className="big" style={{ color: netProfit >= 0 ? '#7fd6ad' : '#f2a29a' }}>
              %{fmt(netMargin)}
            </span>
            <p className="lead">
              {netProfit >= 0
                ? `Sipariş başına net kârınız ${fmt(netProfit)} TL.`
                : `Her satışta ${fmt(Math.abs(netProfit))} TL zarar ediyorsunuz.`}
            </p>
            <div className="metric-row"><span>Brüt kâr</span><b>{fmt(grossProfit)} TL (%{fmt(grossMargin)})</b></div>
            <div className="metric-row"><span>Reklam öncesi katkı payı</span><b>{fmt(contribution)} TL (%{fmt(contributionMargin)})</b></div>
            <div className="metric-row"><span>Toplam kesinti</span><b>{fmt(totalCuts)} TL</b></div>
            <div className="metric-row"><span>Net kâr</span><b className={netProfit >= 0 ? 'positive' : 'negative'}>{fmt(netProfit)} TL</b></div>
            <p className="fine">Katkı payı marjı reklam bütçenizin teorik üst sınırını verir; net marj reklam ve sabit gider mahsubu sonrasıdır.</p>
          </aside>
        </div>
      </section>
      <Footer t={t} />
      <FeedbackWidget toolName="Ürün Kâr Marjı Hesaplayıcı" />
    </main>
  )
}

export default function MarginPage() {
  return (
    <Suspense fallback={<div className="wrap section">Yükleniyor…</div>}>
      <MarginContent />
    </Suspense>
  )
}

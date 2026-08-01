'use client'

import { useState, useEffect, useId, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { getDictionary } from '@/lib/i18n'

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint: string
  value: number
  onChange: (v: number) => void
}) {
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

function IndirimContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [origPrice, setOrigPrice] = useState(1000)
  const [cost, setCost] = useState(400)
  const [commission, setCommission] = useState(15)
  const [shipping, setShipping] = useState(60)
  const [discountPercent, setDiscountPercent] = useState(20)
  const [currentVolume, setCurrentVolume] = useState(100)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchParams.has('price')) setOrigPrice(Number(searchParams.get('price')) || 1000)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 400)
    if (searchParams.has('commission')) setCommission(Number(searchParams.get('commission')) || 15)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 60)
    if (searchParams.has('discount')) setDiscountPercent(Number(searchParams.get('discount')) || 20)
    if (searchParams.has('volume')) setCurrentVolume(Number(searchParams.get('volume')) || 100)
  }, [searchParams])

  const discountedPrice = origPrice * (1 - discountPercent / 100)
  const normalComAmount = (origPrice * commission) / 100
  const normalUnitProfit = origPrice - cost - normalComAmount - shipping
  const normalTotalProfit = normalUnitProfit * currentVolume
  const discComAmount = (discountedPrice * commission) / 100
  const discUnitProfit = discountedPrice - cost - discComAmount - shipping
  const requiredVolume =
    normalTotalProfit > 0 && discUnitProfit > 0 ? Math.ceil(normalTotalProfit / discUnitProfit) : 0
  const requiredIncreasePercent =
    currentVolume > 0 && requiredVolume > 0
      ? ((requiredVolume - currentVolume) / currentVolume) * 100
      : 0

  const fmt = (n: number) =>
    n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      price: String(origPrice),
      cost: String(cost),
      commission: String(commission),
      shipping: String(shipping),
      discount: String(discountPercent),
      volume: String(currentVolume),
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
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / KÂRLILIK / 03</div>
        <h1>İndirim Kârlılık Simülatörü</h1>
        <p className="intro">
          Planladığınız indirim kampanyasının birim kârlılığa etkisini ve toplam kârı korumak için
          gereken ek satış adedini hesaplayın.
        </p>
        <div className="signals" style={{ marginTop: 18 }}>
          <span className="tag live">CANLI · 2 DK · ÜCRETSİZ</span>
          <span className="tag">AÇIK HESAPLAMA YÖNTEMİ</span>
          <button
            onClick={copyShareUrl}
            className="btn alt"
            style={{ padding: '6px 10px', fontSize: 9 }}
          >
            {copied ? '✓ Bağlantı kopyalandı' : '🔗 Sonuç bağlantısını kopyala'}
          </button>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="form-layout">
          <div className="panel" style={{ padding: '6px 22px' }}>
            <Field
              label="Normal satış fiyatı"
              hint="İndirimsiz liste fiyatı"
              value={origPrice}
              onChange={setOrigPrice}
            />
            <Field
              label="Ürün maliyeti (COGS)"
              hint="Geliş / alış maliyeti"
              value={cost}
              onChange={setCost}
            />
            <Field
              label="Komisyon oranı (%)"
              hint="Pazaryeri / ödeme kesintisi"
              value={commission}
              onChange={setCommission}
            />
            <Field
              label="Kargo + paketleme"
              hint="Sipariş başına teslimat gideri"
              value={shipping}
              onChange={setShipping}
            />
            <Field
              label="Uygulanan indirim (%)"
              hint="Kampanya indirim oranı"
              value={discountPercent}
              onChange={setDiscountPercent}
            />
            <Field
              label="Mevcut satış adedi"
              hint="İndirimsiz aylık hacim"
              value={currentVolume}
              onChange={setCurrentVolume}
            />
          </div>

          <aside className="results">
            <small>Gereken Hacim Artışı</small>
            <span className="big" style={{ color: discUnitProfit > 0 ? '#7fd6ad' : '#f2a29a' }}>
              {discUnitProfit > 0 ? `+%${fmt(requiredIncreasePercent)}` : '—'}
            </span>
            <p className="lead">
              {discUnitProfit > 0
                ? `Kârınızı korumak için satış adedini ${currentVolume} → ${requiredVolume} adede çıkarmanız gerekir.`
                : 'İndirimli fiyatta birim kâr yok; hacim artışı tek başına kârı kurtarmaz.'}
            </p>
            <div className="metric-row">
              <span>Normal birim kâr</span>
              <b>{fmt(normalUnitProfit)} TL</b>
            </div>
            <div className="metric-row">
              <span>İndirimli fiyat</span>
              <b>{fmt(discountedPrice)} TL</b>
            </div>
            <div className="metric-row">
              <span>İndirimli birim kâr</span>
              <b className={discUnitProfit >= 0 ? 'positive' : 'negative'}>
                {fmt(discUnitProfit)} TL
              </b>
            </div>
            <div className="metric-row">
              <span>Mevcut toplam kâr</span>
              <b>{fmt(normalTotalProfit)} TL</b>
            </div>
            <div className="metric-row">
              <span>İndirimde gereken adet</span>
              <b>{requiredVolume}</b>
            </div>
            <p className="fine">
              Hedef, mevcut toplam kârı indirimli fiyat üzerinden de yakalayabilmek.
            </p>
          </aside>
        </div>
      </section>
      <Footer t={t} />
      <FeedbackWidget toolName="İndirim Kârlılık Simülatörü" />
    </main>
  )
}

export default function IndirimPage() {
  return (
    <Suspense fallback={<div className="wrap section">Yükleniyor…</div>}>
      <IndirimContent />
    </Suspense>
  )
}

'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { getDictionary } from '@/lib/i18n'

function Field({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div>
        <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block' }}>{label}</label>
        <small style={{ color: 'var(--text-1)', fontSize: '0.78rem' }}>{hint}</small>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        style={{
          padding: '0.55rem 0.65rem',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '0.5rem',
          textAlign: 'right',
          fontSize: '0.9rem',
          fontWeight: 600,
          background: 'rgba(255,255,255,0.06)',
          color: 'var(--text-0)',
          outline: 'none',
        }}
      />
    </div>
  )
}

function PazaryeriContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [sale, setSale] = useState(1500)
  const [cost, setCost] = useState(500)
  const [shipping, setShipping] = useState(75)
  const [copied, setCopied] = useState(false)

  // Custom commission rates (%)
  const [trendyolComm, setTrendyolComm] = useState(18)
  const [hepsiburadaComm, setHepsiburadaComm] = useState(17)
  const [amazonComm, setAmazonComm] = useState(13)
  const [n11Comm, setN11Comm] = useState(16)
  const [ownSitePay, setOwnSitePay] = useState(2.8)

  useEffect(() => {
    if (searchParams.has('sale')) setSale(Number(searchParams.get('sale')) || 1500)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 500)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 75)
    if (searchParams.has('ty')) setTrendyolComm(Number(searchParams.get('ty')) || 18)
    if (searchParams.has('hb')) setHepsiburadaComm(Number(searchParams.get('hb')) || 17)
    if (searchParams.has('amz')) setAmazonComm(Number(searchParams.get('amz')) || 13)
    if (searchParams.has('n11')) setN11Comm(Number(searchParams.get('n11')) || 16)
    if (searchParams.has('own')) setOwnSitePay(Number(searchParams.get('own')) || 2.8)
  }, [searchParams])

  const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const channels = [
    { name: 'Trendyol', rate: trendyolComm, badge: 'Pazaryeri' },
    { name: 'Hepsiburada', rate: hepsiburadaComm, badge: 'Pazaryeri' },
    { name: 'Amazon TR', rate: amazonComm, badge: 'Pazaryeri' },
    { name: 'N11', rate: n11Comm, badge: 'Pazaryeri' },
    { name: 'Kendi Siteniz', rate: ownSitePay, badge: 'Ödeme Altyapısı' },
  ]

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      sale: String(sale),
      cost: String(cost),
      shipping: String(shipping),
      ty: String(trendyolComm),
      hb: String(hepsiburadaComm),
      amz: String(amazonComm),
      n11: String(n11Comm),
      own: String(ownSitePay),
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">ARAÇLAR / PAZARYERİ / 04</span>
        <h1>Pazaryeri Komisyon Karşılaştırma Hesaplayıcı</h1>
        <p>Trendyol, Hepsiburada, Amazon TR, N11 ve Kendi E-Ticaret Sitenizdeki net hakedişinizi, komisyon tutarlarını ve birim kârlılığınızı yan yana karşılaştırın.</p>
        <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="maturity-chip growing">AÇIK HESAPLAMA YÖNTEMİ · VERİLERİNİZ SAKLANMAZ</span>
          <button
            onClick={copyShareUrl}
            className="card-cta"
            style={{ border: '1px solid rgba(105,212,255,0.4)', color: 'var(--accent-0)', cursor: 'pointer' }}
          >
            {copied ? '✓ Bağlantı Kopyalandı!' : '🔗 Sonuç Bağlantısını Kopyala'}
          </button>
        </div>
      </section>

      {/* Input Parameters */}
      <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-1)' }}>ORTAK ÜRÜN VE MALİYET GİRDİLERİ (TL)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Field label="Satış Fiyatı (TL)" hint="Ürünün pazaryerindeki satış bedeli" value={sale} onChange={setSale} />
          <Field label="Ürün Maliyeti (COGS)" hint="Ürünün geliş / alış maliyeti" value={cost} onChange={setCost} />
          <Field label="Kargo + Paketleme (TL)" hint="Teslimat ve paketleme masrafı" value={shipping} onChange={setShipping} />
        </div>
      </section>

      {/* Category Commission Controls */}
      <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-1)' }}>KANAL KOMİSYON ORANLARI (%)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Field label="Trendyol Komisyonu" hint="Kategoriye özel oran" value={trendyolComm} onChange={setTrendyolComm} />
          <Field label="Hepsiburada Komisyonu" hint="Kategoriye özel oran" value={hepsiburadaComm} onChange={setHepsiburadaComm} />
          <Field label="Amazon TR Komisyonu" hint="Kategoriye özel oran" value={amazonComm} onChange={setAmazonComm} />
          <Field label="N11 Komisyonu" hint="Kategoriye özel oran" value={n11Comm} onChange={setN11Comm} />
          <Field label="Kendi Siteniz Ödeme Payı" hint="Sanal POS / İyzi / İyzipay kesintisi" value={ownSitePay} onChange={setOwnSitePay} />
        </div>
      </section>

      {/* Channel Comparison Cards */}
      <h2 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>Kanal Bazlı Net Hakediş Karşılaştırması</h2>
      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {channels.map((ch, idx) => {
          const commAmount = (sale * ch.rate) / 100
          const netPayout = sale - commAmount - shipping
          const netProfit = netPayout - cost
          const netMargin = sale > 0 ? (netProfit / sale) * 100 : 0

          return (
            <div key={idx} className="card glass" style={{ padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="maturity-chip growing" style={{ fontSize: '0.65rem' }}>{ch.badge}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-1)' }}>%{ch.rate}</span>
              </div>
              <h3 style={{ margin: '0.6rem 0 0.4rem', fontSize: '1.1rem' }}>{ch.name}</h3>

              <div style={{ display: 'grid', gap: '0.4rem', marginTop: '0.8rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem' }}>
                  <span style={{ color: 'var(--text-1)' }}>Komisyon Kesintisi</span>
                  <span>{fmt(commAmount)} TL</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem' }}>
                  <span style={{ color: 'var(--text-1)' }}>Hesaba Yatan Hakediş</span>
                  <strong style={{ color: 'var(--accent-0)' }}>{fmt(netPayout)} TL</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem' }}>
                  <span style={{ color: 'var(--text-1)' }}>Birim Net Kâr</span>
                  <strong style={{ color: netProfit >= 0 ? '#4ade80' : '#ff6b6b' }}>{fmt(netProfit)} TL (%{fmt(netMargin)})</strong>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <FeedbackWidget toolName="Pazaryeri Komisyon Hesaplayıcı" />
    </main>
  )
}

export default function PazaryeriPage() {
  return (
    <Suspense fallback={<div className="page" style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
      <PazaryeriContent />
    </Suspense>
  )
}

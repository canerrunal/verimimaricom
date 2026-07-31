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

function KarMarjiContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [sale, setSale] = useState(1200)
  const [cost, setCost] = useState(400)
  const [commission, setCommission] = useState(18)
  const [shipping, setShipping] = useState(80)
  const [adSpend, setAdSpend] = useState(200)
  const [fixedOverhead, setFixedOverhead] = useState(5)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchParams.has('sale')) setSale(Number(searchParams.get('sale')) || 1200)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 400)
    if (searchParams.has('commission')) setCommission(Number(searchParams.get('commission')) || 18)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 80)
    if (searchParams.has('adSpend')) setAdSpend(Number(searchParams.get('adSpend')) || 200)
    if (searchParams.has('overhead')) setFixedOverhead(Number(searchParams.get('overhead')) || 5)
  }, [searchParams])

  const comAmount = (sale * commission) / 100
  const grossProfit = sale - cost
  const grossMargin = sale > 0 ? (grossProfit / sale) * 100 : 0

  const contribution = sale - cost - comAmount - shipping
  const contributionMargin = sale > 0 ? (contribution / sale) * 100 : 0

  const overheadAmount = (sale * fixedOverhead) / 100
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
      overhead: String(fixedOverhead),
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
        <span className="eyebrow">ARAÇLAR / KÂRLILIK / 02</span>
        <h1>Ürün Kâr Marjı Hesaplayıcı</h1>
        <p>Satış fiyatı, ürün maliyeti, pazaryeri komisyonu, kargo ve reklam giderlerinizle net kâr marjınızı ve sipariş başına katkı payınızı anında hesaplayın.</p>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1rem', alignItems: 'start' }}>
        {/* Form */}
        <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-1)' }}>GİRDİLER (TL)</h2>
          <Field label="Satış Fiyatı" hint="Ürünün müşteriye nihai satış bedeli" value={sale} onChange={setSale} />
          <Field label="Ürün Maliyeti (COGS)" hint="Ürünün ham tedarik veya imalat bedeli" value={cost} onChange={setCost} />
          <Field label="Komisyon Oranı (%)" hint="Pazaryeri / ödeme kuruluşu kesintisi" value={commission} onChange={setCommission} />
          <Field label="Kargo + Paketleme" hint="Sipariş başına teslimat gideri" value={shipping} onChange={setShipping} />
          <Field label="Sipariş Başına Reklam (CPA)" hint="Sipariş kazandıran reklam harcaması" value={adSpend} onChange={setAdSpend} />
          <Field label="Sabit Gider Payı (%)" hint="Kira, fatura ve genel gider katkısı" value={fixedOverhead} onChange={setFixedOverhead} />
        </section>

        {/* Results */}
        <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', position: 'sticky', top: '1rem' }}>
          <small style={{ color: 'var(--text-1)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SONUÇ / NET KÂR MARJI</small>
          <div style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            margin: '0.4rem 0 0.8rem',
            letterSpacing: '-0.02em',
            color: netProfit >= 0 ? '#4ade80' : '#ff6b6b',
          }}>
            %{fmt(netMargin)}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
            {netProfit >= 0
              ? `Sipariş başına net kârınız ${fmt(netProfit)} TL.`
              : `Her satışta sipariş başına ${fmt(Math.abs(netProfit))} TL zarar ediyorsunuz.`}
          </p>

          <div style={{ display: 'grid', gap: '0.6rem', fontSize: '0.85rem' }}>
            {[
              ['Brüt Kâr (COGS Sonrası)', `${fmt(grossProfit)} TL (%${fmt(grossMargin)})`, 'var(--text-0)'],
              ['Reklam Öncesi Katkı Payı', `${fmt(contribution)} TL (%${fmt(contributionMargin)})`, contribution >= 0 ? 'var(--text-0)' : '#ff6b6b'],
              ['Toplam Kesinti & Komisyon', `${fmt(comAmount)} TL`, 'var(--text-1)'],
              ['Sipariş Başına Net Kâr', `${fmt(netProfit)} TL`, netProfit >= 0 ? '#4ade80' : '#ff6b6b'],
            ].map(([label, val, color], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.55rem' }}>
                <span style={{ color: 'var(--text-1)' }}>{label}</span>
                <strong style={{ color: color as string }}>{val}</strong>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '1.2rem', fontSize: '0.72rem', color: 'var(--text-1)', lineHeight: '1.4' }}>
            Katkı payı marjı reklam bütçenizin üst sınırını belirler. Net kâr marjı reklam ve sabit gider mahsubu sonrası kalandır.
          </p>
        </section>
      </div>
      <FeedbackWidget toolName="Ürün Kâr Marjı Hesaplayıcı" />
    </main>
  )
}

export default function KarMarjiPage() {
  return (
    <Suspense fallback={<div className="page" style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
      <KarMarjiContent />
    </Suspense>
  )
}

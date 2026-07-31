'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
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
  const contribution = sale - cost - comAmount - shipping - returns
  const breakEvenRoas = contribution > 0 ? sale / contribution : 0
  const breakEvenCpa = contribution > 0 ? contribution : 0
  const totalVariableCost = cost + comAmount + shipping + returns
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

      <section className="hero glass">
        <span className="eyebrow">ARAÇLAR / KÂRLILIK / 01</span>
        <h1>Başa Baş ROAS Hesaplayıcı</h1>
        <p>Reklam harcamanızın hangi seviyeden sonra zarar ettirmeye başladığını görmek için ürün ve operasyon maliyetlerinizi girin.</p>
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
          <Field label="Satış Fiyatı" hint="Ürünün müşteriye satış bedeli" value={sale} onChange={setSale} />
          <Field label="Ürün Maliyeti" hint="Ürünün size geliş maliyeti" value={cost} onChange={setCost} />
          <Field label="Komisyon Oranı (%)" hint="Pazaryeri veya ödeme kesintisi" value={commission} onChange={setCommission} />
          <Field label="Kargo + Paketleme" hint="Gidiş kargo ve paketleme maliyeti" value={shipping} onChange={setShipping} />
          <Field label="Beklenen İade Maliyeti" hint="Ortalama iadeden kaynaklı kayıp" value={returns} onChange={setReturns} />
          <Field label="Hedef Kâr Oranı (%)" hint="Reklam sonrası hedef net marj" value={targetMargin} onChange={setTargetMargin} />
        </section>

        {/* Results */}
        <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', position: 'sticky', top: '1rem' }}>
          <small style={{ color: 'var(--text-1)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SONUÇ / BAŞA BAŞ ROAS</small>
          <div style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            margin: '0.4rem 0 0.8rem',
            letterSpacing: '-0.02em',
            color: breakEvenRoas > 0 ? 'var(--accent-0)' : '#ff6b6b',
          }}>
            {breakEvenRoas > 0 ? `${fmt(breakEvenRoas)}x` : '—'}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
            {contribution > 0
              ? `Her sipariş için reklama en fazla ${fmt(contribution)} TL ayırabilirsiniz.`
              : 'Reklam vermeden önce katkı payı oluşmuyor. Maliyetlerinizi kontrol edin.'}
          </p>

          <div style={{ display: 'grid', gap: '0.6rem', fontSize: '0.85rem' }}>
            {[
              ['Toplam değişken maliyet', `${fmt(totalVariableCost)} TL`, 'var(--text-0)'],
              ['Reklam öncesi katkı payı', `${fmt(contribution)} TL`, contribution > 0 ? '#4ade80' : '#ff6b6b'],
              ['Başa baş CPA', `${fmt(breakEvenCpa)} TL`, 'var(--text-0)'],
              [`Hedef ROAS (${targetMargin}%)`, targetRoas > 0 ? `${fmt(targetRoas)}x` : '—', 'var(--accent-0)'],
            ].map(([label, val, color], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.55rem' }}>
                <span style={{ color: 'var(--text-1)' }}>{label}</span>
                <strong style={{ color: color as string }}>{val}</strong>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '1.2rem', fontSize: '0.72rem', color: 'var(--text-1)', lineHeight: '1.4' }}>
            Bu hesap sabit giderleri ve KDV mahsuplamasını ayrı modellemez. Tüm tutarları aynı KDV yaklaşımıyla girin.
          </p>
        </section>
      </div>
    </main>
  )
}

export default function RoasCalculatorPage() {
  return (
    <Suspense fallback={<div className="page" style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
      <CalculatorContent />
    </Suspense>
  )
}

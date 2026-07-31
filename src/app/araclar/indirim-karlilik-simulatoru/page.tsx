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

function IndirimSimulatorContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [origSale, setOrigSale] = useState(1000)
  const [cost, setCost] = useState(400)
  const [commission, setCommission] = useState(15)
  const [shipping, setShipping] = useState(60)
  const [discountPercent, setDiscountPercent] = useState(20)
  const [baseVolume, setBaseVolume] = useState(100)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchParams.has('sale')) setOrigSale(Number(searchParams.get('sale')) || 1000)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 400)
    if (searchParams.has('commission')) setCommission(Number(searchParams.get('commission')) || 15)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 60)
    if (searchParams.has('discount')) setDiscountPercent(Number(searchParams.get('discount')) || 20)
    if (searchParams.has('volume')) setBaseVolume(Number(searchParams.get('volume')) || 100)
  }, [searchParams])

  // Normal scenario
  const origCom = (origSale * commission) / 100
  const origUnitProfit = origSale - cost - origCom - shipping
  const origTotalProfit = origUnitProfit * baseVolume

  // Discounted scenario
  const discountedSale = origSale * (1 - discountPercent / 100)
  const discCom = (discountedSale * commission) / 100
  const discUnitProfit = discountedSale - cost - discCom - shipping

  // Required volume multiplier to reach origTotalProfit
  const requiredVolume = discUnitProfit > 0 ? Math.ceil(origTotalProfit / discUnitProfit) : 0
  const requiredIncreasePercent = baseVolume > 0 && requiredVolume > 0 ? ((requiredVolume - baseVolume) / baseVolume) * 100 : 0
  const volumeMultiplier = baseVolume > 0 && requiredVolume > 0 ? requiredVolume / baseVolume : 0

  const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      sale: String(origSale),
      cost: String(cost),
      commission: String(commission),
      shipping: String(shipping),
      discount: String(discountPercent),
      volume: String(baseVolume),
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
        <span className="eyebrow">ARAÇLAR / KÂRLILIK / 03</span>
        <h1>İndirim Kârlılık Simülatörü</h1>
        <p>İndirim kampanyalarının birim kârlılığa etkisini görün. İndirim sonrası toplam kârınızı korumak için satış adedinizi yüzde kaç artırmanız gerektiğini simüle edin.</p>
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
          <h2 style={{ margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-1)' }}>GİRDİLER</h2>
          <Field label="Normal Satış Fiyatı (TL)" hint="İndirim öncesi liste fiyatı" value={origSale} onChange={setOrigSale} />
          <Field label="Ürün Maliyeti (TL)" hint="Ürün geliş / birim maliyeti" value={cost} onChange={setCost} />
          <Field label="Komisyon Oranı (%)" hint="Pazaryeri komisyon oranı" value={commission} onChange={setCommission} />
          <Field label="Kargo Maliyeti (TL)" hint="Gidiş kargo ve paketleme" value={shipping} onChange={setShipping} />
          <Field label="Planlanan İndirim (%)" hint="Uygulanacak indirim yüzdesi" value={discountPercent} onChange={setDiscountPercent} />
          <Field label="Aylık Satış Adedi (Adet)" hint="Mevcut aylık ortalama satış adedi" value={baseVolume} onChange={setBaseVolume} />
        </section>

        {/* Results */}
        <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', position: 'sticky', top: '1rem' }}>
          <small style={{ color: 'var(--text-1)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>GEREKEN SATIŞ ARTIŞI</small>
          <div style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            margin: '0.4rem 0 0.8rem',
            letterSpacing: '-0.02em',
            color: discUnitProfit > 0 ? 'var(--accent-0)' : '#ff6b6b',
          }}>
            {discUnitProfit > 0 ? `+%${fmt(requiredIncreasePercent)}` : '—'}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
            {discUnitProfit > 0
              ? `Kârınızı korumak için satış adedini ${baseVolume} adetten ${requiredVolume} adede (${fmt(volumeMultiplier)}x) çıkarmanız gerekir.`
              : 'Bu indirim oranında birim kâr sıfırlanıyor. Satış adedini artırsanız da kâr elde edilemez.'}
          </p>

          <div style={{ display: 'grid', gap: '0.6rem', fontSize: '0.85rem' }}>
            {[
              ['Normal Birim Kâr', `${fmt(origUnitProfit)} TL`, 'var(--text-0)'],
              ['İndirimli Fiyat', `${fmt(discountedSale)} TL`, 'var(--text-0)'],
              ['İndirimli Birim Kâr', `${fmt(discUnitProfit)} TL`, discUnitProfit > 0 ? '#4ade80' : '#ff6b6b'],
              ['Mevcut Toplam Kâr', `${fmt(origTotalProfit)} TL`, 'var(--text-0)'],
              ['Hedeflenen Sipariş Adedi', `${requiredVolume} Adet`, 'var(--accent-0)'],
            ].map(([label, val, color], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.55rem' }}>
                <span style={{ color: 'var(--text-1)' }}>{label}</span>
                <strong style={{ color: color as string }}>{val}</strong>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '1.2rem', fontSize: '0.72rem', color: 'var(--text-1)', lineHeight: '1.4' }}>
            Fiyat indirildiğinde birim marj daraldığı için toplam kârı sabit tutabilmek adına hacmin katlanarak artması gerekir.
          </p>
        </section>
      </div>
    </main>
  )
}

export default function IndirimSimulatorPage() {
  return (
    <Suspense fallback={<div className="page" style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
      <IndirimSimulatorContent />
    </Suspense>
  )
}

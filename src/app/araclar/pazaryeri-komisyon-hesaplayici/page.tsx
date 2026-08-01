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

type Channel = { name: string; comRate: number; desc: string }

function PazaryeriContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()

  const [sale, setSale] = useState(1200)
  const [cost, setCost] = useState(400)
  const [shipping, setShipping] = useState(80)
  const [copied, setCopied] = useState(false)

  const [trendyolCom, setTrendyolCom] = useState(15)
  const [hepsiCom, setHepsiCom] = useState(18)
  const [amazonCom, setAmazonCom] = useState(12)
  const [n11Com, setN11Com] = useState(19)
  const [ownCom, setOwnCom] = useState(2.9)

  useEffect(() => {
    if (searchParams.has('sale')) setSale(Number(searchParams.get('sale')) || 1200)
    if (searchParams.has('cost')) setCost(Number(searchParams.get('cost')) || 400)
    if (searchParams.has('shipping')) setShipping(Number(searchParams.get('shipping')) || 80)
  }, [searchParams])

  const channels: Channel[] = [
    { name: 'Trendyol', comRate: trendyolCom, desc: 'Pazaryeri komisyonu + hizmet bedeli' },
    { name: 'Hepsiburada', comRate: hepsiCom, desc: 'Pazaryeri komisyonu + hizmet bedeli' },
    { name: 'Amazon TR', comRate: amazonCom, desc: 'Referral fee + sabit kesinti' },
    { name: 'N11', comRate: n11Com, desc: 'Pazaryeri komisyonu + hizmet bedeli' },
    { name: 'Kendi Siten', comRate: ownCom, desc: 'Sadece sanal POS / ödeme altyapısı' },
  ]

  const fmt = (n: number) =>
    n.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  type Row = {
    name: string
    comRate: number
    comAmount: number
    netPayout: number
    netProfit: number
    margin: number
  }
  const rows: Row[] = channels.map((ch) => {
    const comAmount = (sale * ch.comRate) / 100
    const netPayout = sale - comAmount - shipping
    const netProfit = netPayout - cost
    const margin = sale > 0 ? (netProfit / sale) * 100 : 0
    return { name: ch.name, comRate: ch.comRate, comAmount, netPayout, netProfit, margin }
  })

  const best = rows.reduce((a, b) => (b.netProfit > a.netProfit ? b : a), rows[0])

  const copyShareUrl = () => {
    const params = new URLSearchParams({
      sale: String(sale),
      cost: String(cost),
      shipping: String(shipping),
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
        <div className="crumb">ARAÇLAR / PAZARYERİ / 04</div>
        <h1>Pazaryeri Komisyon Hesaplayıcı</h1>
        <p className="intro">
          Trendyol, Hepsiburada, Amazon TR, N11 ve kendi sitenizdeki komisyon, kargo ve ödeme
          altyapısı kesintilerini karşılaştırın.
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
        <div className="form-layout" style={{ marginBottom: 24 }}>
          <div className="panel" style={{ padding: '6px 22px' }}>
            <Field label="Satış fiyatı" hint="Nihai satış bedeli" value={sale} onChange={setSale} />
            <Field
              label="Ürün maliyeti (COGS)"
              hint="Geliş / alış maliyeti"
              value={cost}
              onChange={setCost}
            />
            <Field
              label="Kargo + paketleme"
              hint="Sipariş başına teslimat gideri"
              value={shipping}
              onChange={setShipping}
            />
          </div>
          <div className="panel" style={{ padding: '6px 22px' }}>
            <Field
              label="Trendyol komisyonu (%)"
              hint="Kategoriye özel oran"
              value={trendyolCom}
              onChange={setTrendyolCom}
            />
            <Field
              label="Hepsiburada komisyonu (%)"
              hint="Kategoriye özel oran"
              value={hepsiCom}
              onChange={setHepsiCom}
            />
            <Field
              label="Amazon TR komisyonu (%)"
              hint="Kategoriye özel oran"
              value={amazonCom}
              onChange={setAmazonCom}
            />
            <Field
              label="N11 komisyonu (%)"
              hint="Kategoriye özel oran"
              value={n11Com}
              onChange={setN11Com}
            />
            <Field
              label="Kendi siteniz kesintisi (%)"
              hint="Sanal POS / iyzico"
              value={ownCom}
              onChange={setOwnCom}
            />
          </div>
        </div>

        {best && (
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            En yüksek net kâr: <b style={{ color: 'var(--green)' }}>{best.name}</b> —{' '}
            {fmt(best.netProfit)} TL / sipariş
          </p>
        )}

        <div className="grid">
          {rows.map((r, i) => (
            <div
              key={r.name}
              className="card"
              style={{
                minHeight: 0,
                border: r.name === best?.name ? '1px solid var(--green)' : undefined,
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
              >
                <span className="eyebrow" style={{ fontSize: 8 }}>
                  {channels[i].desc}
                </span>
                {r.name === best?.name && <span className="tag live">EN İYİ</span>}
              </div>
              <h3 style={{ marginTop: 12 }}>{r.name}</h3>
              <table className="table" style={{ margin: 0 }}>
                <tbody>
                  <tr>
                    <td>Komisyon ({r.comRate}%)</td>
                    <td style={{ textAlign: 'right' }}>{fmt(r.comAmount)} TL</td>
                  </tr>
                  <tr>
                    <td>Net payout</td>
                    <td style={{ textAlign: 'right' }}>{fmt(r.netPayout)} TL</td>
                  </tr>
                  <tr>
                    <td>Birim net kâr</td>
                    <td
                      style={{
                        textAlign: 'right',
                        color: r.netProfit >= 0 ? 'var(--green)' : '#c0392b',
                        fontWeight: 700,
                      }}
                    >
                      {fmt(r.netProfit)} TL
                    </td>
                  </tr>
                  <tr>
                    <td>Marj</td>
                    <td style={{ textAlign: 'right' }}>%{fmt(r.margin)}</td>
                  </tr>
                </tbody>
              </table>
              <span className="tag" style={{ marginTop: 12 }}>
                HESAPLAMAYA DAHİL
              </span>
            </div>
          ))}
        </div>
      </section>
      <Footer t={t} />
      <FeedbackWidget toolName="Pazaryeri Komisyon Hesaplayıcı" />
    </main>
  )
}

export default function PazaryeriPage() {
  return (
    <Suspense fallback={<div className="wrap section">Yükleniyor…</div>}>
      <PazaryeriContent />
    </Suspense>
  )
}

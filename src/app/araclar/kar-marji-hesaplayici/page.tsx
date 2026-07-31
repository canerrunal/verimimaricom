'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function KarMarjiPage() {
  const [sale, setSale] = useState(1000)
  const [cost, setCost] = useState(300)
  const [comm, setComm] = useState(15)
  const [ship, setShip] = useState(100)
  const [ret, setRet] = useState(40)
  const [ops, setOps] = useState(50)

  const calc = useCallback(() => {
    const commissionCost = sale * (comm / 100)
    const totalCost = cost + commissionCost + ship + ret + ops
    const profit = sale - totalCost
    const margin = sale > 0 ? (profit / sale) * 100 : 0
    return { profit, margin, totalCost }
  }, [sale, cost, comm, ship, ret, ops])

  const { profit, margin, totalCost } = calc()

  return (
    <main className="page" aria-label="Kâr Marjı Hesaplayıcı">
      <section className="section">
        <Link href="/araclar" className="back-link">← Araçlara Dön</Link>
        <span className="eyebrow">Araçlar / Ücretsiz</span>
        <h1>Kâr Marjı Hesaplayıcı</h1>
        <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
          Satış fiyatından tüm maliyetleri çıkarın; ürün başına katkı payınızı ve net marjınızı görün.
        </p>

        <div className="tool-layout">
          <div className="tool-form">
            <div className="form-group">
              <label htmlFor="sale">Satış Fiyatı (₺)</label>
              <input id="sale" type="number" value={sale} onChange={(e) => setSale(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="cost">Ürün Maliyeti (₺)</label>
              <input id="cost" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="comm">Komisyon Oranı (%)</label>
              <input id="comm" type="number" value={comm} onChange={(e) => setComm(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="ship">Kargo + Paketleme (₺)</label>
              <input id="ship" type="number" value={ship} onChange={(e) => setShip(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="ret">Beklenen İade Maliyeti (₺)</label>
              <input id="ret" type="number" value={ret} onChange={(e) => setRet(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="ops">Operasyon Gideri (₺)</label>
              <input id="ops" type="number" value={ops} onChange={(e) => setOps(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="tool-result">
            <div className="result-card">
              <small>Net Kâr</small>
              <strong className="result-value" style={{ color: profit >= 0 ? 'var(--green)' : '#e53935' }}>
                ₺{profit.toLocaleString('tr-TR')}
              </strong>
              <small>Kâr Marjı</small>
              <strong className="result-value">
                %{margin.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </strong>
            </div>

            <div className="breakdown">
              <h3>Maliyet Dağılımı</h3>
              <div className="breakdown-row">
                <span>Satış fiyatı</span>
                <strong>₺{sale.toLocaleString('tr-TR')}</strong>
              </div>
              <div className="breakdown-row">
                <span>Ürün maliyeti</span>
                <span>-₺{cost.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>Komisyon ({comm}%)</span>
                <span>-₺{(sale * comm / 100).toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>Kargo + paketleme</span>
                <span>-₺{ship.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>İade maliyeti</span>
                <span>-₺{ret.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>Operasyon gideri</span>
                <span>-₺{ops.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row total">
                <span>Toplam Maliyet</span>
                <strong>₺{totalCost.toLocaleString('tr-TR')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

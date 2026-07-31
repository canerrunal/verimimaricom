'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function BreakEvenRasPage() {
  const [sale, setSale] = useState(1000)
  const [cost, setCost] = useState(300)
  const [comm, setComm] = useState(15)
  const [ship, setShip] = useState(100)
  const [ret, setRet] = useState(40)

  const calc = useCallback(() => {
    const commissionCost = sale * (comm / 100)
    const contribution = sale - cost - commissionCost - ship - ret
    const roas = contribution > 0 ? sale / contribution : 0
    return { contribution, roas }
  }, [sale, cost, comm, ship, ret])

  const { contribution, roas } = calc()

  return (
    <main className="page" aria-label="Başabaş ROAS Hesaplayıcı">
      <section className="section">
        <Link href="/araclar" className="back-link">← Araçlara Dön</Link>
        <span className="eyebrow">Araçlar / Ücretsiz</span>
        <h1>Başabaş ROAS Hesaplayıcı</h1>
        <p className="section-description">
          Ürün maliyeti, kargo, komisyon ve iade oranınıza göre zarar etmeye başladığınız ROAS seviyesini bulun.
          Kayıt olmadan kullanın; tüm hesaplamalar tarayıcınızda yapılır.
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
          </div>

          <div className="tool-result">
            <div className="result-card">
              <small>Başabaş ROAS</small>
              <strong className="result-value">
                {roas > 0
                  ? roas.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 'x'
                  : '—'}
              </strong>
              <p className="result-note">
                {contribution > 0
                  ? `Reklam için sipariş başına en fazla ₺${contribution.toLocaleString('tr-TR')} ayırabilirsiniz.`
                  : 'Reklam vermeden önce katkı payı oluşmuyor. Maliyetleri kontrol edin.'}
              </p>
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
              <div className="breakdown-row total">
                <span>Katkı Payı</span>
                <strong>₺{contribution.toLocaleString('tr-TR')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

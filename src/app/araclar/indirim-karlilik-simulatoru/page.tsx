'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function IndirimSimulatorPage() {
  const [sale, setSale] = useState(1000)
  const [cost, setCost] = useState(300)
  const [discount, setDiscount] = useState(20)
  const [monthlyOrders, setMonthlyOrders] = useState(500)
  const [currentRoas, setCurrentRoas] = useState(3)

  const calc = useCallback(() => {
    const discountedPrice = sale * (1 - discount / 100)
    const fullRevenue = sale * monthlyOrders
    const discountedRevenue = discountedPrice * monthlyOrders
    const revenueLoss = fullRevenue - discountedRevenue
    const adBudget = fullRevenue / currentRoas
    const discountedAdBudget = discountedRevenue / currentRoas
    const requiredOrdersForSameRevenue = Math.ceil(fullRevenue / discountedPrice)

    return {
      discountedPrice,
      fullRevenue,
      discountedRevenue,
      revenueLoss,
      adBudget,
      discountedAdBudget,
      requiredOrdersForSameRevenue,
    }
  }, [sale, cost, discount, monthlyOrders, currentRoas])

  const r = calc()

  return (
    <main className="page" aria-label="İndirim Kârlılık Simülatörü">
      <section className="section">
        <Link href="/araclar" className="back-link">← Araçlara Dön</Link>
        <span className="eyebrow">Araçlar / Yakında</span>
        <h1>İndirim Kârlılık Simülatörü</h1>
        <p className="section-description">
          İndirim oranının satış başına kârınıza ve gerekli satış hacmine etkisini karşılaştırın.
        </p>

        <div className="tool-layout">
          <div className="tool-form">
            <div className="form-group">
              <label htmlFor="sale">Orijinal Satış Fiyatı (₺)</label>
              <input id="sale" type="number" value={sale} onChange={(e) => setSale(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="cost">Ürün Maliyeti (₺)</label>
              <input id="cost" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="discount">İndirim Oranı (%)</label>
              <input id="discount" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="orders">Aylık Sipariş Sayısı</label>
              <input id="orders" type="number" value={monthlyOrders} onChange={(e) => setMonthlyOrders(Number(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label htmlFor="roas">Mevcut ROAS</label>
              <input id="roas" type="number" step="0.1" value={currentRoas} onChange={(e) => setCurrentRoas(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="tool-result">
            <div className="result-card">
              <small>İndirimli Fiyat</small>
              <strong className="result-value">₺{r.discountedPrice.toLocaleString('tr-TR')}</strong>
            </div>

            <div className="breakdown">
              <h3>Etki Analizi</h3>
              <div className="breakdown-row">
                <span>Orijinal aylık gelir</span>
                <strong>₺{r.fullRevenue.toLocaleString('tr-TR')}</strong>
              </div>
              <div className="breakdown-row">
                <span>İndirimli aylık gelir</span>
                <span>₺{r.discountedRevenue.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>Gelir kaybı</span>
                <span style={{ color: '#e53935' }}>-₺{r.revenueLoss.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>Mevcut reklam bütçesi</span>
                <span>₺{r.adBudget.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row">
                <span>İndirimli reklam bütçesi</span>
                <span>₺{r.discountedAdBudget.toLocaleString('tr-TR')}</span>
              </div>
              <div className="breakdown-row total">
                <span>Aynı gelir için gerekli sipariş</span>
                <strong>{r.requiredOrdersForSameRevenue.toLocaleString('tr-TR')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

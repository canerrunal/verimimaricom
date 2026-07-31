'use client'

import { useState, useCallback } from 'react'

export default function HeroPanel({ t }: { t: any }) {
  return (
    <section className="wrap hero">
      <div>
        <div className="crumb">VERİ MİMARI · E-TİCARET KARLILIĞI · AÇIK YÖNTEMLER</div>
        <h1>
          E-ticaret verisini <span className="accent">ölçülebilir</span> kâr kararlarına
          dönüştüren araçlar.
        </h1>
        <p className="intro">
          Reklam maliyetiniz, ürün marjınız ve operasyon giderleriniz üzerinden hangi kararın
          mantıklı olduğunu görün. Tahmine değil, hesaplamaya dayanın.
        </p>
        <div className="actions-row">
          <a className="btn" href="#araclar">
            Başa Baş ROAS Hesapla →
          </a>
          <a className="btn light" href="#rehberler">
            Yöntemi İncele
          </a>
        </div>
        <div className="signals">
          <span className="tag">
            <i></i>Kayıt olmadan kullanın
          </span>
          <span className="tag">Açık hesaplama yöntemi</span>
          <span className="tag">Verileriniz saklanmaz</span>
        </div>
      </div>
      <aside className="console">
        <ConsoleWidget />
      </aside>
    </section>
  )
}

function ConsoleWidget() {
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
    <div className="console-body">
      <div className="console-top">
        <span>VM / PROFIT INTELLIGENCE CONSOLE</span>
        <span className="dots">
          <b></b>
          <b></b>
          <b></b>
        </span>
      </div>
      <div className="console-body">
        <div className="console-title">
          <b>Başa Baş ROAS</b>
          <span className="status">● HESAPLAMAYA HAZIR</span>
        </div>
        <div className="row">
          <span>Satış fiyatı</span>
          <input value={sale} onChange={(e) => setSale(Number(e.target.value) || 0)} />
        </div>
        <div className="row">
          <span>Ürün maliyeti</span>
          <input value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} />
        </div>
        <div className="row">
          <span>Komisyon oranı (%)</span>
          <input value={comm} onChange={(e) => setComm(Number(e.target.value) || 0)} />
        </div>
        <div className="row">
          <span>Kargo + paketleme</span>
          <input value={ship} onChange={(e) => setShip(Number(e.target.value) || 0)} />
        </div>
        <div className="row">
          <span>Beklenen iade maliyeti</span>
          <input value={ret} onChange={(e) => setRet(Number(e.target.value) || 0)} />
        </div>
        <div className="result">
          <div>
            <small>BAŞA BAŞ ROAS</small>
            <strong id="roas">
              {roas > 0 ? roas.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 'x' : '—'}
            </strong>
          </div>
          <div className="note" id="note">
            {contribution > 0
              ? `Reklam için sipariş başına en fazla ${contribution.toLocaleString('tr-TR')} TL ayırabilirsiniz.`
              : 'Reklam vermeden önce katkı payı oluşmuyor. Maliyetleri kontrol edin.'}
          </div>
        </div>
        <div className="mini-chart">
          <svg viewBox="0 0 350 45" preserveAspectRatio="none">
            <polyline
              points="0,38 40,33 70,35 110,23 145,28 180,15 220,20 260,8 300,15 350,4"
              fill="none"
              stroke="#2e72ed"
              strokeWidth="2"
            />
            <circle cx="260" cy="8" r="3" fill="#fff" stroke="#2e72ed" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

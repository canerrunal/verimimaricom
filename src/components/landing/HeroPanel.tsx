'use client'

import { useState, useCallback } from 'react'

export default function HeroPanel({ t }: { t: any }) {
  const isEnglish = t?.locale === 'en'
  const copy = isEnglish
    ? {
        crumb: 'FOR E-COMMERCE TEAMS BUILDING WITH DATA',
        titleTop: 'See the data.',
        titleAccent: 'Grow profit.',
        titleBottom: 'Without guesswork.',
        intro:
          'See which decision makes sense across ad spend, product margin, and operating costs.',
        introStrong: 'Build on calculation, not assumptions.',
        primary: 'See the result in 2 minutes',
        secondary: 'Explore the methods',
        signals: ['Use without signing up', 'Transparent methodology', 'Your data is never stored'],
        visualKicker: 'THE JOURNEY OF A DECISION',
        consoleLabel: 'Break-even ROAS mini console',
        notes: [
          ['PROFIT / ROAS', 'on one screen'],
          ['No estimates', 'real calculation'],
        ],
      }
    : {
        crumb: 'TÜRKİYE’DEKİ E-TİCARET EKİPLERİ İÇİN',
        titleTop: 'Veriyi gör.',
        titleAccent: 'Kârı büyüt.',
        titleBottom: 'Kaybolmadan.',
        intro:
          'Reklam maliyetiniz, ürün marjınız ve operasyon giderleriniz üzerinden hangi kararın mantıklı olduğunu görün.',
        introStrong: 'Tahmine değil, hesaplamaya dayanın.',
        primary: '2 dakikada hesabı gör',
        secondary: 'Yöntemleri incele',
        signals: ['Kayıt olmadan kullanın', 'Açık hesaplama yöntemi', 'Verileriniz saklanmaz'],
        visualKicker: 'BİR KARARIN YOLCULUĞU',
        consoleLabel: 'Başa Baş ROAS mini konsol',
        notes: [
          ['KÂR / ROAS', 'tek ekranda'],
          ['Tahmin değil', 'gerçek hesap'],
        ],
      }

  return (
    <section className="hero-shell">
      <div className="wrap hero">
        <div className="hero-copy">
          <div className="crumb">
            <i aria-hidden="true" /> {copy.crumb}
          </div>
          <h1>
            {copy.titleTop}
            <br />
            <span className="accent">{copy.titleAccent}</span>
            <br />
            {copy.titleBottom}
          </h1>
          <p className="intro">
            {copy.intro} <strong>{copy.introStrong}</strong>
          </p>
          <div className="actions-row">
            <a className="btn hero-primary" href="/araclar/basabas-roas-hesaplayici">
              {copy.primary} <span>↓</span>
            </a>
            <a className="hero-link" href="/rehberler">
              {copy.secondary} ↗
            </a>
          </div>
          <div className="signals">
            <span className="tag">
              <i></i>
              {copy.signals[0]}
            </span>
            <span className="tag">
              <i></i>
              {copy.signals[1]}
            </span>
            <span className="tag">
              <i></i>
              {copy.signals[2]}
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="console-wrap">
            <span className="visual-kicker">{copy.visualKicker}</span>
            <aside className="console" aria-label={copy.consoleLabel}>
              <div className="console-top">
                <span>VM / PROFIT INTELLIGENCE</span>
                <span className="dots">
                  <b></b>
                  <b></b>
                  <b></b>
                </span>
              </div>
              <ConsoleWidget isEnglish={isEnglish} />
            </aside>
          </div>
          <span className="hero-note note-lime">
            {copy.notes[0][0]}
            <br />
            <b>{copy.notes[0][1]}</b>
          </span>
          <span className="hero-note note-orange">
            {copy.notes[1][0]}
            <br />
            <b>{copy.notes[1][1]}</b>
          </span>
        </div>
      </div>
    </section>
  )
}

function ConsoleWidget({ isEnglish }: { isEnglish: boolean }) {
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
  const labels = isEnglish
    ? [
        'Sale price',
        'Product cost',
        'Commission (%)',
        'Shipping + packaging',
        'Expected return cost',
      ]
    : ['Satış fiyatı', 'Ürün maliyeti', 'Komisyon (%)', 'Kargo + paketleme', 'İade maliyeti']

  return (
    <div className="console-body">
      <div className="console-title">
        <b>{isEnglish ? 'Break-even ROAS' : 'Başa Baş ROAS'}</b>
        <span className="status">● {isEnglish ? 'READY TO CALCULATE' : 'HESAPLAMAYA HAZIR'}</span>
      </div>
      <div className="row">
        <span>{labels[0]}</span>
        <input
          type="number"
          aria-label={labels[0]}
          value={sale}
          onChange={(e) => setSale(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
      <div className="row">
        <span>{labels[1]}</span>
        <input
          type="number"
          aria-label={labels[1]}
          value={cost}
          onChange={(e) => setCost(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
      <div className="row">
        <span>{labels[2]}</span>
        <input
          type="number"
          aria-label={labels[2]}
          value={comm}
          onChange={(e) => setComm(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
      <div className="row">
        <span>{labels[3]}</span>
        <input
          type="number"
          aria-label={labels[3]}
          value={ship}
          onChange={(e) => setShip(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
      <div className="row">
        <span>{labels[4]}</span>
        <input
          type="number"
          aria-label={labels[4]}
          value={ret}
          onChange={(e) => setRet(Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
      <div className="result">
        <div>
          <small>{isEnglish ? 'Break-even ROAS' : 'Başa Baş ROAS'}</small>
          <strong>
            {roas > 0
              ? roas.toLocaleString(isEnglish ? 'en-US' : 'tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + 'x'
              : '—'}
          </strong>
        </div>
        <div className="note">
          {contribution > 0
            ? isEnglish
              ? `You can allocate up to ${contribution.toLocaleString('en-US')} TL per order to advertising.`
              : `Reklam için sipariş başına en fazla ${contribution.toLocaleString('tr-TR')} TL ayırabilirsiniz.`
            : isEnglish
              ? 'No contribution margin. Review the costs.'
              : 'Katkı payı oluşmuyor. Maliyetleri kontrol edin.'}
        </div>
      </div>
      <div className="mini-chart">
        <svg viewBox="0 0 350 45" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points="0,38 40,33 70,35 110,23 145,28 180,15 220,20 260,8 300,15 350,4"
            fill="none"
            stroke="#5267ff"
            strokeWidth="2"
          />
          <circle cx="260" cy="8" r="3" fill="#fff" stroke="#5267ff" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function CollaborationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('E-Ticaret Kârlılık Modellemesi')
  const [budget, setBudget] = useState('50.000 TL - 100.000 TL')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setSubmitted(true)
  }

  const projectTypes = [
    'E-Ticaret Kârlılık Modellemesi',
    'Özel Hesaplama Aracı',
    'AI Entegrasyonu & Otomasyon',
    'Genel Danışmanlık',
  ]

  const budgetRanges = ['50.000 TL - 100.000 TL', '100.000 TL - 250.000 TL', '250.000 TL +']

  if (submitted) {
    return (
      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="panel" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <span className="tag live">TALEBİNİZ ALINDI</span>
          <h2
            style={{
              font: "700 26px 'Space Mono'",
              letterSpacing: '-0.02em',
              margin: '16px 0 8px',
            }}
          >
            Teşekkürler, {name}!
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 10,
              maxWidth: 460,
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            {projectType} konusundaki iş birliği talebiniz iletildi. En kısa sürede {email} adresi
            üzerinden sizinle iletişime geçeceğim.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="wrap" style={{ paddingBottom: 72 }}>
      <div className="panel" style={{ maxWidth: 680 }}>
        <span className="eyebrow">PROJE BAŞVURUSU</span>
        <h2
          style={{ font: "700 26px 'Space Mono'", letterSpacing: '-0.02em', margin: '8px 0 6px' }}
        >
          İş Birliği Talep Formu
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 10, margin: '0 0 22px' }}>
          Projeniz, hedefleriniz ve bütçe beklentiniz hakkında kısa bilgi verin; 24 saat içinde
          dönüş yapayım.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              PROJE KAPSAMI
            </div>
            <div className="filters">
              {projectTypes.map((pt) => (
                <button
                  type="button"
                  key={pt}
                  onClick={() => setProjectType(pt)}
                  className={`filter ${projectType === pt ? 'active' : ''}`}
                >
                  {pt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              TAHMİNİ BÜTÇE
            </div>
            <div className="filters">
              {budgetRanges.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`filter ${budget === b ? 'active' : ''}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label htmlFor="collaboration-name">Ad Soyad *</label>
              <input
                id="collaboration-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Caner Yılmaz"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="collaboration-email">E-Posta *</label>
              <input
                id="collaboration-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="caner@marka.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="collaboration-message">Proje Notları ve Detaylar</label>
            <textarea
              id="collaboration-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mevcut durumunuz, hedefleriniz ve zaman planınız…"
              rows={4}
            />
          </div>

          <button type="submit" className="btn" style={{ justifySelf: 'start' }}>
            Talebi Gönder →
          </button>
        </form>
      </div>
    </section>
  )
}

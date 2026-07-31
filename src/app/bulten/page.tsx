'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page" aria-label="Bülten">
      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">BÜLTEN</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Haftada bir, daha iyi bir e-ticaret kararı.
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Yeni araçlar, önemli sektör değişiklikleri ve uygulanabilir veri notları. Gereksiz gündem yok.
          </p>

          {submitted ? (
            <div className="result-card" style={{ maxWidth: 460 }}>
              <p style={{ fontSize: 12, color: '#1aa36d', margin: 0 }}>
                Teşekkürler! Veri Mimarı Notları&apos;na katıldınız.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mail" style={{ maxWidth: 460 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                />
                <button type="submit" className="btn">Abone Ol</button>
              </div>
            </form>
          )}

          <p style={{ fontSize: 9, color: '#999', marginTop: 10 }}>
            İstediğiniz zaman ayrılabilirsiniz. E-posta adresiniz üçüncü taraflarla paylaşılmaz.
          </p>

          <div className="tool-sm" style={{ maxWidth: 400, marginTop: 40 }}>
            <div className="indicator blue"></div>
            <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
              Haftalık Format
            </h3>
            <ol style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 2 }}>
              <li>Haftanın önemli e-ticaret gelişmesi</li>
              <li>Bu gelişmenin pratik etkisi</li>
              <li>Bir metrik veya analiz notu</li>
              <li>Haftanın aracı</li>
              <li>Caner&apos;in geliştirme notu</li>
              <li>Tek CTA</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}

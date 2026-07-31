'use client'

import { useState } from 'react'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to newsletter API
    setSubmitted(true)
  }

  return (
    <main className="page" aria-label="Bülten">
      <section className="section">
        <span className="eyebrow">Veri Mimarı Notları</span>
        <h1>Haftada bir, daha iyi bir e-ticaret kararı.</h1>
        <p className="section-description">
          Yeni araçlar, önemli sektör değişiklikleri ve uygulanabilir veri notları. Gereksiz gündem yok.
        </p>

        {submitted ? (
          <p className="newsletter-success">Teşekkürler! Veri Mimarı Notları'na katıldınız.</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
            />
            <button type="submit">Veri Mimarı Notlarına Katıl</button>
          </form>
        )}

        <p className="section-note">
          İstediğiniz zaman ayrılabilirsiniz. E-posta adresiniz üçüncü taraflarla paylaşılmaz.
        </p>

        <div className="card">
          <h3>Haftalık Format</h3>
          <ol className="feature-list">
            <li>Haftanın önemli e-ticaret gelişmesi</li>
            <li>Bu gelişmenin pratik etkisi</li>
            <li>Bir metrik veya analiz notu</li>
            <li>Haftanın aracı</li>
            <li>Caner'in geliştirme notu</li>
            <li>Tek CTA</li>
          </ol>
        </div>
      </section>
    </main>
  )
}

'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

const sampleIssues = [
  {
    issue: 'Sayı #24',
    title: 'Başa Baş ROAS Neden Tek Başına Yeterli Değildir?',
    topics: ['Katkı Payı', 'Meta Ads', 'Operasyon'],
  },
  {
    issue: 'Sayı #23',
    title: 'Trendyol & Hepsiburada Komisyon Değişikliklerinin Net Marja Etkisi',
    topics: ['Pazaryerleri', 'Fiyatlandırma'],
  },
  {
    issue: 'Sayı #22',
    title: 'Claude 3.7 & Vercel AI Gateway İle E-Ticaret Otomasyonları',
    topics: ['Yapay Zeka', 'Prompt Mühendisliği'],
  },
]

export default function BultenPage() {
  const t = getDictionary('tr')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap" style={{ paddingTop: 72 }}>
        <div className="newsletter" style={{ margin: 0 }}>
          <span className="eyebrow">VERİ MİMARİ NOTLARI / HAFTALIK</span>
          <h1>Her hafta, daha iyi bir e-ticaret kararı.</h1>
          <p>Yeni araçlar, önemli gelişmeler ve uygulanabilir veri notları. Gereksiz gündem yok.</p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="mail">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                aria-label="Bülten e-posta"
              />
              <button type="submit" className="btn">Abone Ol</button>
            </form>
          ) : (
            <div className="callout" style={{ margin: '22px auto 0', maxWidth: 470, textAlign: 'left', fontSize: 10 }}>
              ✓ <strong>{email}</strong> adresiniz Veri Mimarı Notları bültenine eklendi. İlk sayı bu hafta içinde geliyor.
            </div>
          )}

          <span style={{ fontSize: 9, color: 'var(--muted)', marginTop: 14, display: 'block' }}>
            Spam yok. İstediğiniz zaman tek tıkla ayrılabilirsiniz.
          </span>
        </div>
      </section>

      <section className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">/ ARŞİV</span>
            <h2>Geçmiş Sayılardan Örnek Konular</h2>
          </div>
        </div>
        <div className="grid">
          {sampleIssues.map((issue) => (
            <div key={issue.issue} className="card">
              <span className="tag">{issue.issue}</span>
              <h2>{issue.title}</h2>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', paddingTop: 14, flexWrap: 'wrap' }}>
                {issue.topics.map((tp) => (
                  <span key={tp} className="tag" style={{ fontSize: 8 }}>
                    #{tp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

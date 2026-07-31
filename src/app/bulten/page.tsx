'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

const sampleIssues = [
  {
    issue: 'Sayı #24',
    title: 'Başa Baş ROAS Neden Tek Başına Yeterli Değildir?',
    date: 'İlerlemiş Not',
    topics: ['Katkı Payı', 'Meta Ads', 'Operasyon'],
  },
  {
    issue: 'Sayı #23',
    title: 'Trendyol & Hepsiburada Komisyon Değişikliklerinin Net Marja Etkisi',
    date: 'İlerlemiş Not',
    topics: ['Pazaryerleri', 'Fiyatlandırma'],
  },
  {
    issue: 'Sayı #22',
    title: 'Claude 3.7 & Vercel AI Gateway İle E-Ticaret Otomasyonları',
    date: 'İlerlemiş Not',
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

      <section className="wrap hero single">
        <div>
          <div className="crumb">VERİ MİMARİ NOTLARI / HAFTALIK</div>
          <h1>Her hafta, daha iyi bir e-ticaret kararı.</h1>
          <p className="intro">Yeni araçlar, önemli gelişmeler ve uygulanabilir veri notları. Gereksiz gündem yok.</p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                style={{
                  padding: '0.65rem 1rem',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '0.65rem',
                  fontSize: '0.9rem',
                  width: '280px',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-0)',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="cta-link cta-primary"
                style={{
                  padding: '0.65rem 1.2rem',
                  borderRadius: '0.65rem',
                  border: '1px solid rgba(185,221,255,0.55)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: 'var(--text-0)',
                }}
              >
                Abone Ol →
              </button>
            </form>
          ) : (
            <div style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid #4ade80', padding: '1rem', borderRadius: '0.75rem', color: '#4ade80', fontWeight: 600, marginTop: '1.2rem' }}>
              ✓ <strong>{email}</strong> adresinizle Veri Mimarı Notları bültenine başarıyla katıldınız!
            </div>
          )}

          <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-1)' }}>
            Spam yok. İstediğiniz zaman tek tıkla ayrılabilirsiniz.
          </p>
        </div>
      </section>

      {/* Past Editions Preview */}
      <h2 style={{ margin: '2rem 0 1rem', fontSize: '1.2rem' }}>Geçmiş Bülten Sayılarından Örnek Konular</h2>
      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {sampleIssues.map((issue, idx) => (
          <div key={idx} className="card glass">
            <span className="maturity-chip seed">{issue.issue}</span>
            <h3 style={{ marginTop: '0.6rem' }}>{issue.title}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
              {issue.topics.map((tp, i) => (
                <span key={i} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', color: 'var(--text-1)' }}>
                  #{tp}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

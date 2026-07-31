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

  const budgetRanges = [
    '50.000 TL - 100.000 TL',
    '100.000 TL - 250.000 TL',
    '250.000 TL +',
  ]

  return (
    <section className="glass" style={{ padding: '2rem', borderRadius: '1.25rem', marginTop: '1.5rem' }}>
      {!submitted ? (
        <div>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.3rem' }}>İş Birliği Talep Formu</h2>
          <p style={{ color: 'var(--text-1)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Projeniz, hedefleriniz ve bütçe beklentiniz hakkında kısa bilgi verin; 24 saat içinde dönüş yapayım.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
            {/* Project Type */}
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-1)', display: 'block', marginBottom: '0.5rem' }}>
                Proje Kapsamı / İhtiyaç Alanı
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {projectTypes.map((pt) => (
                  <button
                    type="button"
                    key={pt}
                    onClick={() => setProjectType(pt)}
                    className="card-cta"
                    style={{
                      background: projectType === pt ? 'linear-gradient(120deg, rgba(105,212,255,0.35), rgba(157,123,255,0.35))' : 'rgba(255,255,255,0.06)',
                      borderColor: projectType === pt ? 'rgba(185,221,255,0.5)' : 'rgba(255,255,255,0.18)',
                      color: projectType === pt ? 'var(--text-0)' : 'var(--text-1)',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-1)', display: 'block', marginBottom: '0.5rem' }}>
                Tahmini Bütçe Aralığı
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {budgetRanges.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className="card-cta"
                    style={{
                      background: budget === b ? 'linear-gradient(120deg, rgba(105,212,255,0.35), rgba(157,123,255,0.35))' : 'rgba(255,255,255,0.06)',
                      borderColor: budget === b ? 'rgba(185,221,255,0.5)' : 'rgba(255,255,255,0.18)',
                      color: budget === b ? 'var(--text-0)' : 'var(--text-1)',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-1)', display: 'block', marginBottom: '0.4rem' }}>Ad Soyad *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Caner Yılmaz"
                  required
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '0.6rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--text-0)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-1)', display: 'block', marginBottom: '0.4rem' }}>E-Posta *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="caner@marka.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '0.6rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--text-0)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-1)', display: 'block', marginBottom: '0.4rem' }}>Proje Notları ve Detaylar</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mevcut durumunuz, hedefleriniz ve zaman planınız hakkında ek notlar..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '0.6rem',
                  fontSize: '0.9rem',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-0)',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              className="cta-link cta-primary"
              style={{ padding: '0.7rem 1.4rem', borderRadius: '0.65rem', border: '1px solid rgba(185,221,255,0.55)', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', justifySelf: 'start' }}
            >
              Talebi Gönder →
            </button>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <span className="maturity-chip growing" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>TALEBİNİZ ALINDI</span>
          <h2 style={{ margin: '1rem 0 0.4rem', fontSize: '1.5rem', color: 'var(--accent-0)' }}>Teşekkürler, {name}!</h2>
          <p style={{ color: 'var(--text-1)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
            <strong>{projectType}</strong> konusundaki iş birliği talebiniz iletildi. En kısa sürede <strong>{email}</strong> adresi üzerinden sizinle iletişime geçeceğim.
          </p>
        </div>
      )}
    </section>
  )
}

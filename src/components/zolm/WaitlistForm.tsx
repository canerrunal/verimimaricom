'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('E-Ticaret Markası')
  const [submitted, setSubmitted] = useState(false)
  const [queueNumber, setQueueNumber] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const randomQueue = Math.floor(100 + Math.random() * 850)
    setQueueNumber(randomQueue)
    setSubmitted(true)
  }

  return (
    <section className="glass" style={{ padding: '2.5rem 2rem', borderRadius: '1.25rem', textAlign: 'center', marginTop: '1.5rem' }}>
      {!submitted ? (
        <div>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.4rem' }}>Zolm Erken Erişime Katılın</h2>
          <p style={{ color: 'var(--text-1)', marginBottom: '1.5rem', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
            İlk sürüme katılmak, kapalı betada ücretsiz denemek ve lansman ayrıcalıklarından yararlanmak için kaydolun.
          </p>

          <form onSubmit={handleSubmit} style={{ maxWidth: '460px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['E-Ticaret Markası', 'Pazarlama Ajansı', 'Bağımsız Girişimci'].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className="card-cta"
                  style={{
                    background: role === r ? 'linear-gradient(120deg, rgba(157,123,255,0.4), rgba(105,212,255,0.3))' : 'rgba(255,255,255,0.06)',
                    borderColor: role === r ? 'rgba(185,180,255,0.6)' : 'rgba(255,255,255,0.18)',
                    color: role === r ? 'var(--text-0)' : 'var(--text-1)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '0.65rem 1rem',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '0.65rem',
                  fontSize: '0.9rem',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-0)',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.65rem 1.2rem',
                  background: 'linear-gradient(120deg, rgba(157,123,255,0.5), rgba(105,212,255,0.4))',
                  color: 'var(--text-0)',
                  border: '1px solid rgba(185,180,255,0.5)',
                  borderRadius: '0.65rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Bekleme Listesine Katıl →
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <span className="maturity-chip growing" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
            BEKLEME LİSTESİ KAYDI BAŞARILI
          </span>
          <h2 style={{ margin: '1rem 0 0.4rem', fontSize: '1.6rem', color: 'var(--accent-0)' }}>
            Sıra Numaranız: #{queueNumber}
          </h2>
          <p style={{ color: 'var(--text-1)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1rem' }}>
            <strong>{email}</strong> adresinizle <em>{role}</em> kategorisinde Zolm kapalı beta sırasına alındınız. İlk davetiye gönderildiğinde bilgilendirileceksiniz.
          </p>
        </div>
      )}
    </section>
  )
}

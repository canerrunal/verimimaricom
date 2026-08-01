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
    setQueueNumber(Math.floor(100 + Math.random() * 850))
    setSubmitted(true)
  }

  return (
    <section className="wrap" style={{ paddingBottom: 72 }}>
      <div className="project-hero" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 640 }}>
        {!submitted ? (
          <div>
            <span className="eyebrow">ERKEN ERİŞİM</span>
            <h2 style={{ font: "700 clamp(28px, 4vw, 40px)/1.05 'Space Mono'", letterSpacing: '-0.03em', margin: '12px 0 10px' }}>
              Zolm Erken Erişime Katılın
            </h2>
            <p style={{ fontSize: 11, maxWidth: 480, margin: '0 auto 24px', color: '#625e70' }}>
              İlk sürüme katılmak, kapalı betada ücretsiz denemek ve lansman ayrıcalıklarından yararlanmak için kaydolun.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: 460, margin: '0 auto' }}>
              <div className="filters" style={{ justifyContent: 'center' }}>
                {['E-Ticaret Markası', 'Pazarlama Ajansı', 'Bağımsız Girişimci'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`filter ${role === r ? 'active' : ''}`}
                    style={{ background: role === r ? 'var(--ink)' : 'rgba(255,255,255,0.5)' }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="mail" style={{ width: '100%', margin: 0 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  aria-label="Bekleme listesi e-posta adresi"
                  required
                />
                <button type="submit" className="btn" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
                  Bekleme Listesine Katıl →
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <span className="tag purple" style={{ background: '#fff' }}>KAYIT BAŞARILI</span>
            <h2 style={{ font: "700 clamp(28px, 4vw, 40px)/1.05 'Space Mono'", letterSpacing: '-0.03em', margin: '16px 0 10px', color: 'var(--purple)' }}>
              Sıra Numaranız: #{queueNumber}
            </h2>
            <p style={{ fontSize: 11, maxWidth: 460, margin: '0 auto', color: '#625e70' }}>
              <strong>{email}</strong> adresinizle <em>{role}</em> kategorisinde Zolm kapalı beta sırasına alındınız. İlk davetiye gönderildiğinde bilgilendirileceksiniz.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'

export default function FeedbackWidget({ toolName }: { toolName: string }) {
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="glass" style={{ padding: '1.5rem', borderRadius: '1.25rem', marginTop: '2rem' }}>
      {!submitted ? (
        <div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Bu araç faydalı oldu mu?</h3>
          <p style={{ color: 'var(--text-1)', fontSize: '0.84rem', margin: '0 0 1rem' }}>
            {toolName} hakkındaki görüşleriniz veya yeni araç önerileriniz platformu geliştirmemize yardımcı olur.
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setVote('yes')}
              className="card-cta"
              style={{
                background: vote === 'yes' ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.06)',
                borderColor: vote === 'yes' ? '#4ade80' : 'rgba(255,255,255,0.2)',
                color: vote === 'yes' ? '#4ade80' : 'var(--text-0)',
                cursor: 'pointer',
              }}
            >
              👍 Evet, faydalı
            </button>
            <button
              onClick={() => setVote('no')}
              className="card-cta"
              style={{
                background: vote === 'no' ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.06)',
                borderColor: vote === 'no' ? '#ff6b6b' : 'rgba(255,255,255,0.2)',
                color: vote === 'no' ? '#ff6b6b' : 'var(--text-0)',
                cursor: 'pointer',
              }}
            >
              👎 Geliştirilmeli
            </button>
          </div>

          {vote && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Öneri veya notunuzu yazın..."
                style={{
                  flex: 1,
                  minWidth: '220px',
                  padding: '0.55rem 0.75rem',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-0)',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="cta-link cta-primary"
                style={{ padding: '0.55rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(185,221,255,0.5)', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Gönder
              </button>
            </form>
          )}
        </div>
      ) : (
        <div style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.9rem' }}>
          ✓ Geri bildiriminiz için teşekkür ederiz!
        </div>
      )}
    </section>
  )
}

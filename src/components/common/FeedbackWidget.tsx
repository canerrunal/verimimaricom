'use client'

import { useState } from 'react'
import { getDictionary } from '@/lib/i18n'

export default function FeedbackWidget({ toolName }: { toolName: string }) {
  const t = getDictionary('tr')
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="wrap" style={{ paddingBottom: 72 }}>
      <div className="panel" style={{ maxWidth: 720, margin: '0 auto' }}>
        {!submitted ? (
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              Geri bildirim
            </div>
            <h3
              style={{
                margin: '0 0 6px',
                font: "700 17px/1.18 'Space Mono'",
                letterSpacing: '-0.02em',
              }}
            >
              Bu araç faydalı oldu mu?
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 10, margin: '0 0 16px' }}>
              Görüşleriniz veya yeni araç önerileriniz platformu geliştirmemize yardımcı olur.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
              <button
                onClick={() => setVote('yes')}
                className={`btn alt ${vote === 'yes' ? 'active' : ''}`}
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                👍 Evet, faydalı
              </button>
              <button
                onClick={() => setVote('no')}
                className={`btn alt ${vote === 'no' ? 'active' : ''}`}
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                👎 Geliştirilmeli
              </button>
            </div>

            {vote && (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
              >
                <input
                  type="text"
                  className="search"
                  style={{ flex: 1, minWidth: 220 }}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Öneri veya notunuzu yazın…"
                  aria-label="Geri bildirim notu"
                />
                <button type="submit" className="btn">
                  Gönder
                </button>
              </form>
            )}
          </div>
        ) : (
          <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: 10 }}>
            ✓ Geri bildiriminiz için teşekkür ederiz!
          </div>
        )}
      </div>
    </section>
  )
}

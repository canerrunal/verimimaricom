'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { trackFeedbackSubmit } from '@/lib/analytics'

export default function FeedbackWidget({ toolName }: { toolName: string }) {
  const [open, setOpen] = useState(false)
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const panelId = useId()
  const widgetRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!vote || submitting) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName,
          vote,
          comment: feedback,
          pagePath: window.location.pathname,
        }),
      })

      if (!response.ok) throw new Error('feedback-submit-failed')

      trackFeedbackSubmit(toolName, vote, feedback)
      setSubmitted(true)
    } catch {
      setSubmitError('Geri bildiriminiz şu anda kaydedilemedi. Lütfen biraz sonra yeniden deneyin.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div ref={widgetRef} className={`feedback-widget ${open ? 'is-open' : ''}`}>
      <button
        ref={triggerRef}
        type="button"
        className="feedback-trigger"
        aria-label={open ? 'Geri bildirim penceresini kapat' : 'Geri bildirim ver'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6.5 6.5 11 11m0-11-11 11" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 4.5h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3v-3H5.5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
            <path d="M8 9h8M8 12h5" />
          </svg>
        )}
      </button>

      {open && (
        <aside
          id={panelId}
          className="feedback-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
        >
          {!submitted ? (
            <>
              <div className="feedback-panel-head">
                <div>
                  <span className="eyebrow">Geri bildirim</span>
                  <h2 id={`${panelId}-title`}>Bu araç faydalı oldu mu?</h2>
                </div>
                <button
                  type="button"
                  className="feedback-close"
                  aria-label="Geri bildirim penceresini kapat"
                  onClick={() => {
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                >
                  ×
                </button>
              </div>
              <p className="feedback-description">
                Görüşleriniz veya yeni araç önerileriniz platformu geliştirmemize yardımcı olur.
              </p>

              <div className="feedback-votes" aria-label="Aracın faydasını değerlendirin">
                <button
                  type="button"
                  onClick={() => setVote('yes')}
                  className={`btn alt ${vote === 'yes' ? 'is-active' : ''}`}
                  aria-pressed={vote === 'yes'}
                >
                  <span aria-hidden="true">👍</span> Evet, faydalı
                </button>
                <button
                  type="button"
                  onClick={() => setVote('no')}
                  className={`btn alt ${vote === 'no' ? 'is-active' : ''}`}
                  aria-pressed={vote === 'no'}
                >
                  <span aria-hidden="true">👎</span> Geliştirilmeli
                </button>
              </div>

              {vote && (
                <form onSubmit={handleSubmit} className="feedback-form">
                  <label htmlFor={`${panelId}-note`}>Öneri veya notunuz</label>
                  <input
                    id={`${panelId}-note`}
                    type="text"
                    className="search"
                    value={feedback}
                    onChange={(event) => setFeedback(event.target.value)}
                    placeholder="Kısaca yazın…"
                  />
                  <button type="submit" className="btn" disabled={submitting}>
                    {submitting ? 'Kaydediliyor…' : 'Geri bildirimi gönder'}
                  </button>
                  {submitError && (
                    <p className="submission-error feedback-submit-status" role="alert">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </>
          ) : (
            <div className="feedback-success" role="status">
              <span aria-hidden="true">✓</span>
              <div>
                <h2 id={`${panelId}-title`}>Teşekkür ederiz!</h2>
                <p>Geri bildiriminiz bize ulaştı.</p>
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  )
}

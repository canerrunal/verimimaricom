// @ts-nocheck
'use client'

import { useState } from 'react'

export default function NewsletterSection({ t }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to newsletter API
    setSubmitted(true)
  }

  return (
    <section className="section" aria-label="Bülten">
      <h2>{t.newsletter.title}</h2>
      <p className="section-description">{t.newsletter.description}</p>

      {submitted ? (
        <p className="newsletter-success">Teşekkürler! Veri Mimarı Notları'na katıldınız.</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder}
            required
          />
          <button type="submit">{t.newsletter.button}</button>
        </form>
      )}

      <p className="section-note">{t.newsletter.privacy}</p>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export default function MembershipPageEN() {
  const t = getDictionary('en')

  return (
    <main className="page" aria-label="Membership">
      <NavBar t={t} />
      <section className="wrap hero single">
        <Link href="/en" className="back-link">← Back to Home</Link>
        <span className="eyebrow">MEMBERSHIP</span>
        <h1>
          Premium Membership and Digital Asset Sales
        </h1>
        <p className="intro">
          With this infrastructure, you can lock selected content, accept payments via Lemon Squeezy checkout, and unlock content after membership verification.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="notice" style={{ maxWidth: 560 }}>
          <b>DEMO</b> — This flow is prepared for sample integration; no real payment is charged.
        </div>

        <div className="two-col" style={{ marginTop: 36 }}>
          <div className="tool-sm">
            <div className="indicator blue"></div>
            <h3>1) Start with Payment</h3>
            <p style={{ fontSize: 10, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.65 }}>
              Enter your email and continue to checkout flow.
            </p>
            <form
              action="/api/commerce/checkout"
              method="GET"
              onSubmit={() => trackEvent('membership_checkout_start', { placement: 'membership_page_en' })}
            >
              <div className="form-group" style={{ marginBottom: 12 }}>
                <input type="email" name="email" required placeholder="example@domain.com" aria-label="Membership email" />
              </div>
              <button type="submit" className="btn">Lemon Checkout ↗</button>
            </form>
          </div>

          <div className="tool-sm">
            <div className="indicator green"></div>
            <h3>2) Activate Membership (Demo)</h3>
            <p style={{ fontSize: 10, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.65 }}>
              After webhook is received, activate membership with the same email.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const email = (new FormData(form).get('email') || '').toString()
                const res = await fetch('/api/membership/unlock', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                })
                if (res.ok) {
                  trackEvent('membership_unlock_success', { placement: 'membership_page_en' })
                  window.location.href = '/projeler/ornek-vaka'
                } else {
                  trackEvent('membership_unlock_failed', { placement: 'membership_page_en' })
                  alert('Membership could not be verified.')
                }
              }}
            >
              <div className="form-group" style={{ marginBottom: 12 }}>
                <input type="email" name="email" required placeholder="example@domain.com" aria-label="Membership activation email" />
              </div>
              <button type="submit" className="btn">Unlock Membership ↗</button>
            </form>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

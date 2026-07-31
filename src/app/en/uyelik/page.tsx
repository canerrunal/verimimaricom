'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export default function MembershipPageEN() {
  return (
    <main className="page" aria-label="Membership">
      <section className="section">
        <div className="wrap">
          <Link href="/en" className="back-link">← Back to Home</Link>
          <span className="eyebrow">MEMBERSHIP</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Premium Membership and Digital Asset Sales
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            With this infrastructure, you can lock selected content, accept payments via Lemon
            Squeezy checkout, and unlock content after membership verification.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                1) Start Membership with Payment
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>
                Enter your email and continue to checkout flow.
              </p>
              <form
                action="/api/commerce/checkout"
                method="GET"
                onSubmit={() => {
                  trackEvent('membership_checkout_start', { placement: 'membership_page_en' })
                }}
              >
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <input type="email" name="email" required placeholder="example@domain.com" aria-label="Membership email" />
                </div>
                <button type="submit" className="btn">Lemon Checkout ↗</button>
              </form>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                2) Activate Membership (Demo)
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>
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
                  <input type="email" name="email" required placeholder="example@domain.com" />
                </div>
                <button type="submit" className="btn">Unlock Membership ↗</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

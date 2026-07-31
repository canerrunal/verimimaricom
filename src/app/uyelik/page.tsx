"use client"

// @ts-nocheck
import { trackEvent } from '@/lib/analytics'

export default function MembershipPage() {
  return (
    <main className="page membership-page" aria-label="Uyelik ve dijital varlik satisi sayfasi">
      <section className="membership-card">
        <span className="eyebrow">Phase 2 . Digital Assets + Membership</span>
        <h1>Premium Uyelik ve Dijital Varlik Satisi</h1>
        <p>
          Bu altyapi ile belirli icerikleri kilitleyebilir, Lemon Squeezy checkout uzerinden odeme
          alabilir ve uyelik dogrulamasi sonra icerigi acabilirsiniz.
        </p>

        <ul className="feature-list">
          <li>Kilitli icerik (PremiumGate) destegi</li>
          <li>Lemon Squeezy checkout yonlendirmesi</li>
          <li>Webhook ile uyelik hakedisi isleme</li>
          <li>E-posta ile uyelik aktifleme (unlock)</li>
        </ul>
      </section>

      <section className="membership-card">
        <h2>1) Odeme ile Uyelik Baslat</h2>
        <p>E-posta girin ve checkout akisina yonlenin.</p>

        <form
          className="checkout-form"
          action="/api/commerce/checkout"
          method="GET"
          onSubmit={(e) => {
            const form = e.currentTarget as HTMLFormElement
            const email = (new FormData(form).get('email') || '').toString()

            trackEvent('membership_checkout_start', {
              placement: 'membership_page',
              has_email: Boolean(email),
              email_domain: email.includes('@') ? email.split('@')[1] : undefined,
            })
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="ornek@domain.com"
            aria-label="Uyelik e-posta"
          />
          <button type="submit">Lemon Checkout</button>
        </form>
      </section>

      <section className="membership-card">
        <h2>2) Uyelik Aktiflesir (Demo)</h2>
        <p>
          Webhook geldikten sonra ayni e-posta ile uyeligi aktiflesirin. Bu asama demo amaclidir ve
          production'da gercek kullanici oturumu + DB dogrulamasina tasimilmalidir.
        </p>

        <form
          className="unlock-form"
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
              trackEvent('membership_unlock_success', {
                placement: 'membership_page',
                email_domain: email.includes('@') ? email.split('@')[1] : undefined,
              })
              window.location.href = '/projeler/ornek-vaka'
            } else {
              trackEvent('membership_unlock_failed', {
                placement: 'membership_page',
                email_domain: email.includes('@') ? email.split('@')[1] : undefined,
              })
              alert('Uyelik dogrulanamadi. Odeme webhook kaydini kontrol edin.')
            }
          }}
        >
          <input type="email" name="email" required placeholder="ornek@domain.com" />
          <button type="submit">Uyeligi Ac</button>
        </form>
      </section>
    </main>
  )
}

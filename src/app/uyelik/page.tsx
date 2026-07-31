'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export default function MembershipPage() {
  return (
    <main className="page" aria-label="Üyelik">
      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">ÜYELİK</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Premium Üyelik ve Dijital Varlık Satışı
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Bu altyapı ile belirli içerikleri kilitleyebilir, Lemon Squeezy checkout üzerinden ödeme
            alabilir ve üyelik doğrulaması sonra içeriği açabilirsiniz.
          </p>

          <ul style={{ fontSize: 10, color: '#777', margin: '0 0 40px', paddingLeft: 16, lineHeight: 2 }}>
            <li>Kilitli içerik (PremiumGate) desteği</li>
            <li>Lemon Squeezy checkout yönlendirmesi</li>
            <li>Webhook ile üyelik hakediş işleme</li>
            <li>E-posta ile üyelik aktifleme (unlock)</li>
          </ul>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                1) Ödeme ile Üyelik Başlat
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>
                E-posta girin ve checkout akışına yönlenin.
              </p>
              <form
                action="/api/commerce/checkout"
                method="GET"
                onSubmit={() => {
                  trackEvent('membership_checkout_start', { placement: 'membership_page' })
                }}
              >
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ornek@domain.com"
                    aria-label="Üyelik e-posta"
                  />
                </div>
                <button type="submit" className="btn">Lemon Checkout ↗</button>
              </form>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                2) Üyelik Aktifleştir (Demo)
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>
                Webhook geldikten sonra aynı e-posta ile üyeliği aktifleştirin.
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
                    trackEvent('membership_unlock_success', { placement: 'membership_page' })
                    window.location.href = '/projeler/ornek-vaka'
                  } else {
                    trackEvent('membership_unlock_failed', { placement: 'membership_page' })
                    alert('Üyelik doğrulanamadı. Ödeme webhook kaydını kontrol edin.')
                  }
                }}
              >
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <input type="email" name="email" required placeholder="ornek@domain.com" />
                </div>
                <button type="submit" className="btn">Üyeliği Aç ↗</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

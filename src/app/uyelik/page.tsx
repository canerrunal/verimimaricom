'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export default function MembershipPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Üyelik">
      <NavBar t={t} />
      <section className="wrap hero single">
        <Link href="/" className="back-link">
          ← Ana Sayfaya Dön
        </Link>
        <span className="eyebrow">ÜYELİK</span>
        <h1>Premium Üyelik ve Dijital Varlık Satışı</h1>
        <p className="intro">
          Bu altyapı ile belirli içerikleri kilitleyebilir, Lemon Squeezy checkout üzerinden ödeme
          alabilir ve üyelik doğrulaması sonrası içeriği açabilirsiniz.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="notice" style={{ maxWidth: 560 }}>
          <b>DEMO</b> — Bu akış örnek entegrasyon için hazırlanmıştır; gerçek ödeme alınmaz.
        </div>

        <ul className="prose" style={{ listStyle: 'none', paddingLeft: 0, marginTop: 24 }}>
          {[
            'Kilitli içerik (PremiumGate) desteği',
            'Lemon Squeezy checkout yönlendirmesi',
            'Webhook ile üyelik hakediş işleme',
            'E-posta ile üyelik aktifleme (unlock)',
          ].map((item) => (
            <li
              key={item}
              style={{
                padding: '8px 0',
                borderBottom: '1px solid #eee',
                fontSize: 11,
                color: 'var(--ink)',
              }}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="two-col" style={{ marginTop: 36 }}>
          <div className="tool-sm">
            <div className="indicator blue"></div>
            <h3>1) Ödemeyle Başlat</h3>
            <p
              style={{ fontSize: 10, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.65 }}
            >
              E-posta girin ve checkout akışına yönlenin.
            </p>
            <form
              action="/api/commerce/checkout"
              method="GET"
              onSubmit={() =>
                trackEvent('membership_checkout_start', { placement: 'membership_page' })
              }
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
              <button type="submit" className="btn">
                Lemon Checkout ↗
              </button>
            </form>
          </div>

          <div className="tool-sm">
            <div className="indicator green"></div>
            <h3>2) Üyeliği Aktifleştir (Demo)</h3>
            <p
              style={{ fontSize: 10, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.65 }}
            >
              Webhook geldikten sonra aynı e-posta ile üyeliği açın.
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
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ornek@domain.com"
                  aria-label="Üyelik aktivasyon e-postası"
                />
              </div>
              <button type="submit" className="btn">
                Üyeliği Aç ↗
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

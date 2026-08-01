export default function NewsletterSection({ t }: { t: any }) {
  return (
    <section className="newsletter section-band">
      <div className="wrap">
        <span className="eyebrow">BÜLTEN</span>
        <h2>{t?.newsletter?.title || 'Veri Mimarı Notları'}</h2>
        <p>
          {t?.newsletter?.description ||
            'Her hafta e-ticaret kârlılığı ve reklam analitiği üzerine 1 uygulamalı not.'}
        </p>
        <div className="mail">
          <input
            type="email"
            placeholder={t?.newsletter?.placeholder || 'E-posta adresiniz'}
            aria-label={t?.locale === 'en' ? 'Newsletter email' : 'Bülten e-posta adresi'}
          />
          <button type="button" className="btn">
            Abone Ol
          </button>
        </div>
        <span style={{ fontSize: 9, color: '#999', marginTop: 10, display: 'block' }}>
          {t?.newsletter?.privacy || 'Spam yok. İstediğiniz zaman ayrılabilirsiniz.'}
        </span>
      </div>
    </section>
  )
}

export default function NewsletterSection({ t }: { t: any }) {
  return (
    <section className="newsletter">
      <div className="wrap">
        <span className="eyebrow">BÜLTEN</span>
        <h2>{t.newsletter.title}</h2>
        <p>{t.newsletter.description}</p>
        <div className="mail">
          <input type="email" placeholder={t.newsletter.placeholder} />
          <button type="button" className="btn">Abone Ol</button>
        </div>
        <span style={{ fontSize: 9, color: '#999', marginTop: 10, display: 'block' }}>
          {t.newsletter.privacy}
        </span>
      </div>
    </section>
  )
}

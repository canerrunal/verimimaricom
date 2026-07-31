export default function NewsletterSection({ t }: { t: any }) {
  return (
    <section className="wrap newsletter">
      <div className="newsletter-box">
        <h3>{t.newsletter.title}</h3>
        <p>{t.newsletter.description}</p>
        <div className="newsletter-form">
          <input type="email" placeholder={t.newsletter.placeholder} />
          <button type="button" className="btn">
            Abone Ol
          </button>
        </div>
        <span className="newsletter-privacy">{t.newsletter.privacy}</span>
      </div>
    </section>
  )
}

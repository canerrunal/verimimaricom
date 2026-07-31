export default function ProofSection({ t }: { t: any }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="proof-title">KANIT / VAKA + KURUCU</div>
        <div className="proof">
          <div className="case">
            <span className="eyebrow">{t.caseStudies.eyebrow}</span>
            <h3>{t.caseStudies.title}</h3>
            <p>{t.caseStudies.description}</p>
            <a className="link" href={t.caseStudies.ctaHref}>{t.caseStudies.cta}</a>
          </div>
          <div className="founder">
            <div className="founder-id">
              <div className="face">CÜ</div>
              <div>
                <span className="eyebrow">{t.founder.eyebrow}</span>
                <b style={{ display: 'block', font: '700 13px "Space Mono"', marginTop: 2 }}>Caner Ünal</b>
              </div>
            </div>
            <h3>{t.founder.title}</h3>
            <p>{t.founder.description}</p>
            <a className="link" href={t.founder.primaryCtaHref}>{t.founder.primaryCta}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

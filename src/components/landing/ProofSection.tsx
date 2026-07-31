export default function ProofSection({ t }: { t: any }) {
  return (
    <section className="wrap proof">
      <div className="proof-title">KANIT / VAKA + KURUCU</div>
      <div className="proof-grid">
        <div className="proof-card case">
          <h3>{t.caseStudies.title}</h3>
          <p>{t.caseStudies.description}</p>
          <a href={t.caseStudies.ctaHref}>{t.caseStudies.cta} ↗</a>
        </div>
        <div className="proof-card founder">
          <h3>{t.founder.title}</h3>
          <p>{t.founder.description}</p>
          <a href={t.founder.primaryCtaHref}>{t.founder.primaryCta} ↗</a>
        </div>
      </div>
    </section>
  )
}

import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function FounderSection({ t }) {
  return (
    <section className="section" aria-label="Kurucu">
      <span className="eyebrow">{t.founder.eyebrow}</span>
      <h2>{t.founder.title}</h2>
      <p className="section-description">{t.founder.description}</p>

      <div className="hero-cta-group">
        <TrackLink
          href={resolveHref(t.founder.primaryCtaHref || '/hakkinda', t.basePath)}
          className="cta-link cta-primary"
          eventName="cta_founder_about_click"
          payload={{ placement: 'founder_section' }}
        >
          {t.founder.primaryCta}
        </TrackLink>
        <TrackLink
          href={resolveHref(t.founder.secondaryCtaHref || '/blog', t.basePath)}
          className="cta-link cta-secondary"
          eventName="cta_founder_notes_click"
          payload={{ placement: 'founder_section' }}
        >
          {t.founder.secondaryCta}
        </TrackLink>
      </div>
    </section>
  )
}

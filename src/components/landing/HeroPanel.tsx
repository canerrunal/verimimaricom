// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function HeroPanel({ t }) {
  return (
    <section className="hero" aria-label="Hero panel">
      <span className="eyebrow">{t.hero.eyebrow}</span>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>

      <div className="hero-cta-group" aria-label={t.hero.ctaAriaLabel}>
        <TrackLink
          href={resolveHref(t.hero.primaryCtaHref || '/araclar', t.basePath)}
          className="cta-link cta-primary"
          eventName="cta_home_tools_click"
          payload={{ placement: 'hero', cta: 'tools' }}
        >
          {t.hero.primaryCta}
        </TrackLink>
        <TrackLink
          href={resolveHref(t.hero.secondaryCtaHref || '/rehberler', t.basePath)}
          className="cta-link cta-secondary"
          eventName="cta_home_guides_click"
          payload={{ placement: 'hero', cta: 'guides' }}
        >
          {t.hero.secondaryCta}
        </TrackLink>
      </div>

      <div className="hero-trust">{t.hero.trustLine}</div>

      <div className="hero-badges" role="list" aria-label="Uzmanlık etiketleri">
        {t.hero.badges.map((badge: string, index: number) => (
          <span key={index} className="badge">{badge}</span>
        ))}
      </div>
    </section>
  )
}

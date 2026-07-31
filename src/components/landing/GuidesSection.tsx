// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function GuidesSection({ t }) {
  return (
    <section className="section" aria-label="Rehberler">
      <span className="eyebrow">{t.guides.eyebrow}</span>
      <h2>{t.guides.title}</h2>
      <p className="section-description">{t.guides.description}</p>

      <ul className="card-list">
        {t.guides.items.map((guide: any, index: number) => (
          <li key={index}>
            <a href={resolveHref(guide.href, t.basePath)}>{guide.title}</a>
          </li>
        ))}
      </ul>

      <TrackLink
        href={resolveHref(t.guides.ctaHref || '/rehberler', t.basePath)}
        className="card-cta section-cta"
        eventName="cta_all_guides_click"
        payload={{ placement: 'guides_section' }}
      >
        {t.guides.cta} →
      </TrackLink>
    </section>
  )
}

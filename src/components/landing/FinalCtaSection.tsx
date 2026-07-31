import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function FinalCtaSection({ t }) {
  return (
    <section className="section final-cta" aria-label="Son çağrı">
      <h2>{t.finalCta.title}</h2>
      <p className="section-description">{t.finalCta.description}</p>

      <TrackLink
        href={resolveHref(t.finalCta.ctaHref || '/araclar', t.basePath)}
        className="cta-link cta-primary"
        eventName="cta_final_tools_click"
        payload={{ placement: 'final_cta' }}
      >
        {t.finalCta.cta}
      </TrackLink>
    </section>
  )
}

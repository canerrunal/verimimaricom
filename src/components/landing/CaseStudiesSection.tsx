// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function CaseStudiesSection({ t }) {
  return (
    <section className="section" aria-label="Vaka Analizleri">
      <span className="eyebrow">{t.caseStudies.eyebrow}</span>
      <h2>{t.caseStudies.title}</h2>
      <p className="section-description">{t.caseStudies.description}</p>

      <div className="case-study-labels">
        <span className="case-label real">{t.caseStudies.realLabel}</span>
        <span className="case-label demo">{t.caseStudies.demoLabel}</span>
      </div>

      <TrackLink
        href={resolveHref(t.caseStudies.ctaHref || '/vaka-analizleri', t.basePath)}
        className="card-cta section-cta"
        eventName="cta_all_cases_click"
        payload={{ placement: 'case_studies_section' }}
      >
        {t.caseStudies.cta} →
      </TrackLink>
    </section>
  )
}

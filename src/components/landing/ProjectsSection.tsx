// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function ProjectsSection({ t }) {
  return (
    <section className="section" aria-label="Projeler">
      <span className="eyebrow">{t.projects.eyebrow}</span>
      <h2>{t.projects.title}</h2>
      <p className="section-description">{t.projects.description}</p>

      <div className="card-grid-3">
        {t.projects.items.map((project: any, index: number) => (
          <article key={index} className="card tool-card">
            <span className="tool-status">{project.status}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <TrackLink
              href={resolveHref(project.href, t.basePath)}
              className="card-cta"
              eventName="cta_project_click"
              payload={{ project: project.name, placement: 'projects_section' }}
            >
              {project.cta}
            </TrackLink>
          </article>
        ))}
      </div>

      <p className="section-note">{t.projects.note}</p>
    </section>
  )
}

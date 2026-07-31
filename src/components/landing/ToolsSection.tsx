// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function ToolsSection({ t }) {
  return (
    <section className="section" aria-label="Ücretsiz Araçlar">
      <span className="eyebrow">{t.tools.eyebrow}</span>
      <h2>{t.tools.title}</h2>
      <p className="section-description">{t.tools.description}</p>

      <div className="card-grid-3">
        {t.tools.items.map((tool: any, index: number) => (
          <article key={index} className="card tool-card">
            <span className="tool-status">{tool.status}</span>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <TrackLink
              href={resolveHref(tool.href, t.basePath)}
              className="card-cta"
              eventName="cta_tool_click"
              payload={{ tool: tool.name, placement: 'tools_section' }}
            >
              {tool.cta}
            </TrackLink>
          </article>
        ))}
      </div>

      <TrackLink
        href={resolveHref(t.tools.allToolsHref || '/araclar', t.basePath)}
        className="card-cta section-cta"
        eventName="cta_all_tools_click"
        payload={{ placement: 'tools_section' }}
      >
        {t.tools.allToolsCta} →
      </TrackLink>
    </section>
  )
}

import type { Metadata } from 'next'
import TrackLink from '@/components/analytics/TrackLink'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Ücretsiz E-ticaret Araçları',
  description:
    'Kârlılık, reklam ve operasyon kararlarınızı kolaylaştıran ücretsiz hesaplayıcılar ve analiz araçları.',
  alternates: {
    canonical: '/araclar',
  },
}

export default function ToolsPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Ücretsiz E-ticaret Araçları">
      <section className="section">
        <span className="eyebrow">{t.tools.eyebrow}</span>
        <h1>Ücretsiz E-ticaret Araçları</h1>
        <p className="section-description">
          Kârlılık, reklam ve operasyon kararlarınızı kolaylaştıran ücretsiz hesaplayıcılar ve analiz araçları.
          Kayıt olmadan başlayın; yöntemi ve kullanılan formülleri açıkça görün.
        </p>

        <div className="card-grid-3">
          {t.tools.items.map((tool: any, index: number) => (
            <article key={index} className="card tool-card">
              <span className="tool-status">{tool.status}</span>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <TrackLink
                href={tool.href}
                className="card-cta"
                eventName="cta_tool_click"
                payload={{ tool: tool.name, placement: 'tools_page' }}
              >
                {tool.cta}
              </TrackLink>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

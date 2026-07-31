// @ts-nocheck
import type { Metadata } from 'next'
import TrackLink from '@/components/analytics/TrackLink'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Rehberler',
  description:
    'E-ticaret kârlılığı, dijital reklam, pazaryerleri ve yapay zekâ konularında uygulanabilir rehberler.',
  alternates: {
    canonical: '/rehberler',
  },
}

export default function GuidesPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Rehberler">
      <section className="section">
        <span className="eyebrow">{t.guides.eyebrow}</span>
        <h1>Rehberler</h1>
        <p className="section-description">
          Karmaşık metrikleri sade, uygulanabilir rehberlerle öğrenin.
          Teorik bilgi değil; hesaplama yöntemi, örnek senaryo ve atılacak sonraki adım.
        </p>

        <ul className="card-list">
          {t.guides.items.map((guide: any, index: number) => (
            <li key={index}>
              <a href={guide.href}>{guide.title}</a>
            </li>
          ))}
        </ul>

        <TrackLink
          href={t.guides.ctaHref}
          className="card-cta section-cta"
          eventName="cta_all_guides_click"
          payload={{ placement: 'guides_page' }}
        >
          {t.guides.cta} →
        </TrackLink>
      </section>
    </main>
  )
}

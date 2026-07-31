import type { Metadata } from 'next'
import Link from 'next/link'
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
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">{t.guides.eyebrow}</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Rehberler
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Karmaşık metrikleri sade, uygulanabilir rehberlerle öğrenin.
            Teorik bilgi değil; hesaplama yöntemi, örnek senaryo ve atılacak sonraki adım.
          </p>

          <div className="guides" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {t.guides.items.map((guide: any, idx: number) => (
              <div key={idx} className={`guide ${idx === 0 ? 'featured' : ''}`}>
                <div className="guide-top">
                  <span className="eyebrow">0{idx + 1}</span>
                  <span>rehber</span>
                </div>
                <h3>{guide.title}</h3>
                <a className="link" href={guide.href}>Oku</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

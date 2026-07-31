import type { Metadata } from 'next'
import Link from 'next/link'
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
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">{t.tools.eyebrow}</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Ücretsiz E-ticaret Araçları
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Kârlılık, reklam ve operasyon kararlarınızı kolaylaştıran ücretsiz hesaplayıcılar ve analiz araçları.
            Kayıt olmadan başlayın; yöntemi ve kullanılan formülleri açıkça görün.
          </p>

          <div className="tool-layout">
            <div className="tool-main">
              <span className="number">01 / ÜCRETSİZ</span>
              <h3>{t.tools.items[0].name}</h3>
              <p>{t.tools.items[0].description}</p>
              <a className="btn" href={t.tools.items[0].href}>{t.tools.items[0].cta} ↗</a>
            </div>
            <div className="tool-side">
              <div className="tool-sm">
                <div className="indicator blue"></div>
                <span className="icon-box">📊</span>
                <h3>{t.tools.items[1].name}</h3>
                <p>{t.tools.items[1].description}</p>
                <a className="link" href={t.tools.items[1].href}>{t.tools.items[1].cta}</a>
              </div>
              <div className="tool-sm">
                <div className="indicator yellow"></div>
                <span className="icon-box">🎯</span>
                <h3>{t.tools.items[2].name}</h3>
                <p>{t.tools.items[2].description}</p>
                <a className="link" href={t.tools.items[2].href}>{t.tools.items[2].cta}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

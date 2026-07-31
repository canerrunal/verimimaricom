import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import { getHomeCmsData } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Vaka Analizleri',
  description: 'E-ticaret dönüşümü, reklam analitiği ve veri hikayeciliği odaklı vaka analizleri.',
}

export default async function VakaAnalizleriPage() {
  const t = getDictionary('tr')
  const cmsData = await getHomeCmsData()
  const cases = cmsData.projects || []

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">VAKA ANALİZLERİ / GERÇEK VE SENTETİK SENARYOLAR</span>
        <h1>Ölçülebilir Vaka Analizleri</h1>
        <p>Problemin tanımı, uygulanan veri metotları ve elde edilen sonuçları içeren şeffaf vaka analizleri.</p>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {cases.map((c: any, idx: number) => (
          <a
            key={idx}
            href={c.slug && c.slug !== '#' ? `/projeler/${c.slug}` : '#'}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
            <span className="maturity-chip growing">VAKA ANALİZİ</span>
            <h3 style={{ marginTop: '0.8rem' }}>{c.title}</h3>
            <p>{c.excerpt}</p>
            <span className="card-cta" style={{ marginTop: 'auto' }}>Analizi İncele →</span>
          </a>
        ))}
      </section>
    </main>
  )
}

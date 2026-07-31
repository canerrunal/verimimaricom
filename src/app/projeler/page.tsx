import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import { getHomeCmsData } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Projeler ve Ürünler',
  description: 'Caner Ünal tarafından geliştirilen veri, e-ticaret ve yapay zeka projeleri.',
}

export default async function ProjelerPage() {
  const t = getDictionary('tr')
  const cmsData = await getHomeCmsData()
  const projects = cmsData.projects || []

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">PROJELER & ÜRÜNLER</span>
        <h1>Geliştirilen Sistemler ve Ürünler</h1>
        <p>E-ticaret, veri analitiği, yapay zeka entegrasyonu ve otomasyon alanında inşa edilen yazılım projeleri.</p>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {projects.map((project: any, idx: number) => (
          <a
            key={idx}
            href={project.slug && project.slug !== '#' ? `/projeler/${project.slug}` : '#'}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
            <span className={`maturity-chip ${project.maturity || 'growing'}`}>
              {String(project.maturity || 'AKTİF PROJE').toUpperCase()}
            </span>
            <h3 style={{ marginTop: '0.8rem' }}>{project.title}</h3>
            <p>{project.excerpt}</p>
            <span className="card-cta" style={{ marginTop: 'auto' }}>Detayları İncele →</span>
          </a>
        ))}
      </section>
    </main>
  )
}

import Link from 'next/link'
import { getCaseStudyBySlug } from '@/lib/cms'
import MetricsBoard from '@/components/case-study/MetricsBoard'
import { getCaseStudyJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import PremiumGate from '@/components/membership/PremiumGate'
import MermaidDiagram from '@/components/case-study/MermaidDiagram'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getCaseStudyBySlug(slug)

  return {
    title: data?.title || 'Case Study',
    description: data?.excerpt || 'Veri hikayeciliği odaklı vaka analizi',
    alternates: {
      canonical: `/projeler/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: data?.title || 'Case Study',
      description: data?.excerpt || 'Veri hikayeciliği odaklı vaka analizi',
      url: `/projeler/${slug}`,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCaseStudyBySlug(slug)
  const jsonLd = getCaseStudyJsonLd(data, slug)
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Vaka Analizi Detay Sayfası">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />

      <section className="wrap hero single">
          <Link href="/projeler" className="back-link">← Tüm Projeler</Link>
          <span className="eyebrow">VERİ HİKAYECİLİĞİ · VAKA ANALİZİ</span>
          <h1>
            {data.title}
          </h1>
          <p className="intro">
            {data.excerpt}
          </p>

          <div style={{ display: 'flex', gap: 16, fontSize: 10, color: 'var(--muted)', margin: '0 0 36px' }}>
            <span>Müşteri: {data.clientName || 'İsim belirtilmedi'}</span>
            <span>Sektör: {data.industry || '—'}</span>
            <span>Etki: {data.impactScore ?? '—'}</span>
            {data.repoUrl && <a href={data.repoUrl} className="link">Repo ↗</a>}
            {data.demoUrl && <a href={data.demoUrl} className="link">Demo ↗</a>}
          </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
          <div className="two-col" style={{ marginBottom: 12 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3>Problem / Hipotez</h3>
              <p style={{ fontSize: 10, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>
                {data.problemStatement || 'Problem tanımı henüz eklenmedi.'}
              </p>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3>Metodoloji</h3>
              <p style={{ fontSize: 10, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>
                {data.methodology || 'Metodoloji henüz eklenmedi.'}
              </p>
            </div>
          </div>

          <div className="tool-sm">
            <div className="indicator yellow"></div>
            <h3>Sonuçlar / Analiz</h3>
            <p style={{ fontSize: 10, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.65 }}>
              {data.outcomeSummary || 'Sonuç özeti henüz eklenmedi.'}
            </p>
            <MetricsBoard metrics={data.metrics || []} />
          </div>

          {data.architectureDiagramMermaid && (
            <div className="tool-sm">
              <div className="indicator purple"></div>
              <h3>Sistem Mimarisi</h3>
              <MermaidDiagram chart={data.architectureDiagramMermaid} />
            </div>
          )}

          <div className="tool-sm">
            <h3>Vaka Hikayesi Akışı</h3>
            <ol style={{ fontSize: 10, color: 'var(--muted)', margin: 0, paddingLeft: 16, lineHeight: 2.1 }}>
              <li><strong>Problem:</strong> {data.problemStatement || '—'}</li>
              <li><strong>Metodoloji:</strong> {data.methodology || '—'}</li>
              <li><strong>Sonuç:</strong> {data.outcomeSummary || '—'}</li>
            </ol>
          </div>

          <PremiumGate
            title="Premium Analitik Katmanı"
            preview="ROI formülleri, ileri segment analizleri ve ham veri indirme bağlantıları üyelik gerektirir."
          >
            <div className="tool-sm">
              <h3>Üyelere Özel İçerik</h3>
              <p style={{ fontSize: 10, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>
                Burada gelişmiş dönüşüm kohortu, kanal bazlı maliyet kırılımı ve premium dashboard bağlantıları gösterilir.
              </p>
            </div>
          </PremiumGate>
      </section>
      <Footer t={t} />
    </main>
  )
}

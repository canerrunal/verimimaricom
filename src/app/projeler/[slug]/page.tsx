import Link from 'next/link'
import { getCaseStudyBySlug } from '@/lib/cms'
import MetricsBoard from '@/components/case-study/MetricsBoard'
import { getCaseStudyJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import PremiumGate from '@/components/membership/PremiumGate'
import MermaidDiagram from '@/components/case-study/MermaidDiagram'

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

  return (
    <main className="page" aria-label="Vaka Analizi Detay Sayfası">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section">
        <div className="wrap">
          <Link href="/projeler" className="back-link">← Projelere Dön</Link>
          <span className="eyebrow">VERİ HİKAYECİLİĞİ · VAKA ANALİZİ</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            {data.title}
          </h1>
          <p style={{ color: '#666', maxWidth: 600, fontSize: 12, margin: '0 0 16px' }}>
            {data.excerpt}
          </p>

          <div style={{ display: 'flex', gap: 16, fontSize: 10, color: '#999', marginBottom: 40 }}>
            <span>Müşteri: {data.clientName || 'N/A'}</span>
            <span>Sektör: {data.industry || 'N/A'}</span>
            <span>Impact Score: {data.impactScore ?? '-'}</span>
            {data.repoUrl && <a href={data.repoUrl} className="link">Repo</a>}
            {data.demoUrl && <a href={data.demoUrl} className="link">Demo</a>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Problem / Hipotez
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>
                {data.problemStatement || 'Problem tanımı henüz eklenmedi.'}
              </p>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Metodoloji
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>
                {data.methodology || 'Metodoloji henüz eklenmedi.'}
              </p>
            </div>
          </div>

          <div className="tool-sm" style={{ marginBottom: 24 }}>
            <div className="indicator yellow"></div>
            <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
              Sonuçlar / Analiz
            </h3>
            <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>
              {data.outcomeSummary || 'Sonuç özeti henüz eklenmedi.'}
            </p>
            <MetricsBoard metrics={data.metrics || []} />
          </div>

          {data.architectureDiagramMermaid && (
            <div className="tool-sm" style={{ marginBottom: 24 }}>
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Sistem Mimarisi Şeması
              </h3>
              <MermaidDiagram chart={data.architectureDiagramMermaid} />
            </div>
          )}

          <div className="tool-sm" style={{ marginBottom: 24 }}>
            <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '0 0 12px' }}>
              Vaka Hikayesi Akışı
            </h3>
            <ol style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 2.2 }}>
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
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '0 0 8px' }}>
                Üyelere Özel İçerik
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>
                Burada gelişmiş dönüşüm kohortu, kanal bazlı maliyet kırılımı ve premium dashboard
                bağlantıları gösterilir.
              </p>
            </div>
          </PremiumGate>
        </div>
      </section>
    </main>
  )
}

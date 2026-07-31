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
    description: data?.excerpt || 'Veri hikayeciligi odakli vaka analizi',
    alternates: {
      canonical: `/projeler/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: data?.title || 'Case Study',
      description: data?.excerpt || 'Veri hikayeciligi odakli vaka analizi',
      url: `/projeler/${slug}`,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCaseStudyBySlug(slug)
  const jsonLd = getCaseStudyJsonLd(data, slug)

  return (
    <main className="page case-study-page" aria-label="Case Study Detay Sayfasi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="case-header">
        <span className="eyebrow">Veri Hikayeciligi . Case Study</span>
        <h1>{data.title}</h1>
        <p>{data.excerpt}</p>

        <div className="case-meta">
          <span>Musteri: {data.clientName || 'N/A'}</span>
          <span>Sektor: {data.industry || 'N/A'}</span>
          <span>Impact Score: {data.impactScore ?? '-'}</span>
        </div>

        <div className="case-links">
          {data.repoUrl && <a href={data.repoUrl}>Repo</a>}
          {data.demoUrl && <a href={data.demoUrl}>Demo</a>}
          <a href="/">Ana Sayfa</a>
        </div>
      </header>

      <section className="case-grid" aria-label="Vaka analizi icerik bolumleri">
        <article className="case-block case-col-6">
          <h2>Problem / Hipotez</h2>
          <p>{data.problemStatement || 'Problem tanimi henuz eklenmedi.'}</p>
        </article>

        <article className="case-block case-col-6">
          <h2>Metodoloji</h2>
          <p>{data.methodology || 'Metodoloji henuz eklenmedi.'}</p>
        </article>

        <article className="case-block case-col-12">
          <h2>Sonuclar / Analiz</h2>
          <p>{data.outcomeSummary || 'Sonuc ozeti henuz eklenmedi.'}</p>
          <MetricsBoard metrics={data.metrics || []} />
        </article>

        <article className="case-block case-col-4">
          <h2>Sistem Mimarisi Semi (Mermaid)</h2>
          <p>Bu blok Sanity uzerinde tanimlanan Mermaid diyagramini dinamik olarak render eder.</p>
          <MermaidDiagram chart={data.architectureDiagramMermaid} />
        </article>

        <article className="case-col-12">
          <section className="case-block narrative-flow" aria-label="Vaka hikaye akisi">
            <h2>Vaka Hikayesi Akisi</h2>
            <ol>
              <li>
                <strong>Problem:</strong> {data.problemStatement || 'Problem tanimi henuz eklenmedi.'}
              </li>
              <li>
                <strong>Metodoloji:</strong> {data.methodology || 'Metodoloji henuz eklenmedi.'}
              </li>
              <li>
                <strong>Sonuc:</strong> {data.outcomeSummary || 'Sonuc ozeti henuz eklenmedi.'}
              </li>
            </ol>
          </section>
        </article>

        <article className="case-col-12">
          <PremiumGate
            title="Premium Analitik Katmani"
            preview="ROI formulleri, ileri segment analizleri ve ham veri indirme baglantilari uyelik gerektirir."
          >
            <section className="case-block">
              <h2>Uyelere Ozel Icerik</h2>
              <div className="premium-content">
                <p>
                  Burada gelismis donusum kohortu, kanal bazli maliyet kirilimi ve premium dashboard
                  baglantilari gosterilir.
                </p>
              </div>
            </section>
          </PremiumGate>
        </article>
      </section>
    </main>
  )
}

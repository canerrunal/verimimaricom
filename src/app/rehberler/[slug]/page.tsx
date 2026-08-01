import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import TrackLink from '@/components/analytics/TrackLink'
import { getDictionary } from '@/lib/i18n'
import { getGuideBySlug, getRelatedGuides, guides } from '@/lib/guides'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T12:00:00+03:00`))
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return { title: 'Rehber Bulunamadı' }

  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/rehberler/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  }
}

export default async function RehberDetailPage({ params }: PageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const articleUrl = `${siteUrl}/rehberler/${guide.slug}`
  const relatedGuides = getRelatedGuides(guide)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.excerpt,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      dateCreated: guide.publishedAt,
      author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
      publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl },
      mainEntityOfPage: articleUrl,
      inLanguage: 'tr-TR',
      articleSection: guide.category,
      about: [guide.category, guide.intent],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Rehberler', item: `${siteUrl}/rehberler` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: articleUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  const toc = [
    ['kisa-cevap', '60 saniyelik kısa cevap'],
    ['neden-onemli', 'Neden önemli?'],
    ['tanim-formul', 'Tanım ve formül'],
    ['gerekli-veriler', 'Gerekli veriler'],
    ['ornek-hesap', guide.example.title],
    ['karar-tablosu', 'Sonucu yorumlama'],
    ['sik-hatalar', 'Sık yapılan hatalar'],
    ['kontrol-listesi', 'Kontrol listesi'],
    ['sss', 'Sık sorulan sorular'],
    ['kaynaklar', 'Kaynaklar ve yöntem'],
  ]

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />

      <section className="wrap hero single guide-hero">
        <a href="/rehberler" className="back-link">
          ← Tüm Rehberler
        </a>
        <div className="guide-hero-meta">
          <span className="tag">
            {guide.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'GELİŞEN REHBER'}
          </span>
          <span>{guide.category}</span>
          <span>{guide.readingTime} DK</span>
          <span>DOĞRULAMA: {formatDate(guide.reviewedAt)}</span>
        </div>
        <h1>{guide.title}</h1>
        <p className="intro">{guide.excerpt}</p>
        <div className="guide-audience">
          <span>
            <b>Kimler için?</b> {guide.audience}
          </span>
          <span>
            <b>Arama niyeti</b> {guide.intent}
          </span>
        </div>
      </section>

      <div className="wrap article guide-article">
        <aside className="toc" aria-label="İçindekiler">
          <b>İçindekiler</b>
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </aside>

        <article className="prose">
          <section id="kisa-cevap" className="guide-short-answer">
            <span className="eyebrow">60 SANİYELİK KISA CEVAP</span>
            <h2>Sorunun doğrudan cevabı</h2>
            <p>{guide.shortAnswer}</p>
            {guide.tool && (
              <TrackLink
                className="btn hero-primary"
                href={guide.tool.href}
                eventName="guide_tool_click"
                payload={{ guide_slug: guide.slug, placement: 'short_answer' }}
              >
                {guide.tool.cta} ↗
              </TrackLink>
            )}
          </section>

          <section id="neden-onemli" className="guide-section">
            <h2>Neden önemli?</h2>
            <ul className="guide-checklist guide-benefits">
              {guide.whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="tanim-formul" className="guide-section">
            <h2>Tanım ve yöntem</h2>
            <p>{guide.definition}</p>
            <div className="guide-formula" aria-label="Hesaplama formülü">
              <span>FORMÜL</span>
              <strong>{guide.formula}</strong>
              <p>{guide.formulaNote}</p>
            </div>
          </section>

          <section id="gerekli-veriler" className="guide-section">
            <h2>Gerekli veriler</h2>
            <div className="guide-input-grid">
              {guide.inputs.map((input, index) => (
                <div key={input.label}>
                  <span>0{index + 1}</span>
                  <h3>{input.label}</h3>
                  <p>{input.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="ornek-hesap" className="guide-section">
            <h2>{guide.example.title}</h2>
            <p>{guide.example.intro}</p>
            <div
              className="guide-table-wrap"
              tabIndex={0}
              role="region"
              aria-label={`${guide.example.title} örnek tablosu`}
            >
              <table className="table">
                <caption>{guide.example.title} için örnek değerler</caption>
                <thead>
                  <tr>
                    <th scope="col">Kalem</th>
                    <th scope="col">Değer</th>
                    <th scope="col">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.example.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="callout">
              <strong>Sonuç:</strong> {guide.example.result}
            </p>
          </section>

          <section id="karar-tablosu" className="guide-section">
            <h2>Sonucu nasıl yorumlamalısınız?</h2>
            <div className="guide-table-wrap" tabIndex={0} role="region" aria-label="Karar tablosu">
              <table className="table">
                <caption>Sinyal, anlam ve önerilen sonraki adım</caption>
                <thead>
                  <tr>
                    <th scope="col">Gördüğünüz sinyal</th>
                    <th scope="col">Ne anlama gelir?</th>
                    <th scope="col">Ne yapmalı?</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.decisions.map((row) => (
                    <tr key={row.signal}>
                      <th scope="row">{row.signal}</th>
                      <td>{row.meaning}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="sik-hatalar" className="guide-section">
            <h2>Sık yapılan hatalar</h2>
            <ol className="guide-mistakes">
              {guide.mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="kontrol-listesi" className="guide-section guide-check-panel">
            <span className="eyebrow">UYGULAMADAN ÖNCE</span>
            <h2>Kontrol listesi</h2>
            <ul className="guide-checklist">
              {guide.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {guide.tool && (
            <aside className="guide-cta" aria-label="İlgili ücretsiz araç">
              <span className="eyebrow">İLGİLİ ÜCRETSİZ ARAÇ</span>
              <h2>{guide.tool.title}</h2>
              <p>{guide.tool.description}</p>
              <TrackLink
                className="btn hero-primary"
                href={guide.tool.href}
                eventName="guide_tool_click"
                payload={{ guide_slug: guide.slug, placement: 'primary_cta' }}
              >
                {guide.tool.cta} ↗
              </TrackLink>
            </aside>
          )}

          <section id="sss" className="guide-section">
            <h2>Sık sorulan sorular</h2>
            <div className="guide-faqs">
              {guide.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="kaynaklar" className="guide-sources">
            <h2>Kaynaklar ve yöntem notu</h2>
            <p>
              Kaynaklar {formatDate(guide.reviewedAt)} tarihinde kontrol edildi. Sonraki editoryal
              kontrol: {formatDate(guide.reviewDueAt)}.
            </p>
            <ol>
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.name} ↗
                  </a>
                  <span>{source.note}</span>
                </li>
              ))}
            </ol>
            <p className="guide-disclaimer">{guide.disclaimer}</p>
          </section>

          {relatedGuides.length > 0 && (
            <section className="guide-related" aria-labelledby="related-guides-title">
              <span className="eyebrow">BİLGİ AĞINDA SIRADAKİLER</span>
              <h2 id="related-guides-title">İlgili rehberler</h2>
              <div>
                {relatedGuides.map((related) => (
                  <TrackLink
                    key={related.slug}
                    href={`/rehberler/${related.slug}`}
                    eventName="guide_related_click"
                    payload={{ guide_slug: guide.slug, related_slug: related.slug }}
                  >
                    <span>{related.category}</span>
                    <strong>{related.title}</strong>
                    <i>Rehberi incele →</i>
                  </TrackLink>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      <Footer t={t} />
    </main>
  )
}

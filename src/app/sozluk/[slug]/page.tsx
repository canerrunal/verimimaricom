import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import TrackLink from '@/components/analytics/TrackLink'
import { getDictionary } from '@/lib/i18n'
import { getGlossaryTerm, getRelatedTerms, glossaryTerms } from '@/lib/glossary'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function generateStaticParams() {
  return glossaryTerms.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getGlossaryTerm(slug)
  if (!item) return { title: 'Kavram Bulunamadı' }
  return {
    title: `${item.term} Nedir?`,
    description: `${item.shortDefinition} Formülü, örneği ve sık karıştırılan kavramlarla açıklaması.`,
    alternates: { canonical: `/sozluk/${item.slug}` },
    openGraph: { title: `${item.term} Nedir?`, description: item.shortDefinition, type: 'article' },
  }
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = getGlossaryTerm(slug)
  if (!item) notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const itemUrl = `${siteUrl}/sozluk/${item.slug}`
  const relatedTerms = getRelatedTerms(item)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: item.term,
      alternateName: item.english,
      description: item.shortDefinition,
      url: itemUrl,
      inDefinedTermSet: `${siteUrl}/sozluk`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${item.term} Nedir?`,
      description: item.shortDefinition,
      dateModified: item.reviewedAt,
      author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
      publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl },
      mainEntityOfPage: itemUrl,
      inLanguage: 'tr-TR',
      articleSection: item.category,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Sözlük', item: `${siteUrl}/sozluk` },
        { '@type': 'ListItem', position: 3, name: item.term, item: itemUrl },
      ],
    },
  ]

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />

      <section className="wrap hero single glossary-detail-hero">
        <a className="back-link" href="/sozluk">
          ← Tüm kavramlar
        </a>
        <div className="guide-hero-meta">
          <span className="tag">{item.category}</span>
          <span>{item.english}</span>
          <span>
            DOĞRULAMA: {dateFormatter.format(new Date(`${item.reviewedAt}T12:00:00+03:00`))}
          </span>
        </div>
        <h1>{item.term} nedir?</h1>
        <p className="intro">{item.shortDefinition}</p>
      </section>

      <div className="wrap article glossary-article">
        <aside className="toc" aria-label="İçindekiler">
          <b>Bu sayfada</b>
          <a href="#kisa-tanim">Kısa tanım</a>
          {item.formula && <a href="#formul">Formül</a>}
          <a href="#ornek">Basit örnek</a>
          <a href="#fark">Karıştırılan kavram</a>
          <a href="#sonraki-adim">Sonraki adım</a>
          <a href="#kaynak">Kaynak ve yöntem</a>
        </aside>

        <article className="prose">
          <section id="kisa-tanim" className="glossary-answer">
            <span className="eyebrow">30 SANİYELİK TANIM</span>
            <h2>{item.term}</h2>
            <strong>{item.shortDefinition}</strong>
            {item.explanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          {item.formula && (
            <section id="formul" className="guide-section">
              <h2>{item.term} formülü</h2>
              <div className="guide-formula">
                <span>FORMÜL</span>
                <strong>{item.formula}</strong>
                {item.formulaNote && <p>{item.formulaNote}</p>}
              </div>
            </section>
          )}

          <section id="ornek" className="guide-section">
            <h2>Basit örnek</h2>
            <p className="callout">{item.example}</p>
          </section>

          <section id="fark" className="guide-section glossary-confusion">
            <span className="eyebrow">SIK KARIŞTIRILAN KAVRAM</span>
            <h2>
              {item.term} ≠ {item.confusedWith.term}
            </h2>
            <p>{item.confusedWith.explanation}</p>
            {item.confusedWith.slug && (
              <a className="link" href={`/sozluk/${item.confusedWith.slug}`}>
                {item.confusedWith.term} tanımını aç
              </a>
            )}
          </section>

          <section id="sonraki-adim" className="guide-cta">
            <span className="eyebrow">TANIMDAN UYGULAMAYA</span>
            <h2>{item.relatedGuide.label}</h2>
            <p>Kavramı gerçek bir karar ve hesaplama akışı içinde uygulayın.</p>
            <TrackLink
              className="btn hero-primary"
              href={item.relatedGuide.href}
              eventName="glossary_guide_click"
              payload={{ term_slug: item.slug }}
            >
              Rehberi incele ↗
            </TrackLink>
            {item.relatedTool && (
              <TrackLink
                className="glossary-secondary-cta"
                href={item.relatedTool.href}
                eventName="glossary_tool_click"
                payload={{ term_slug: item.slug }}
              >
                {item.relatedTool.label} →
              </TrackLink>
            )}
          </section>

          <section id="kaynak" className="guide-sources">
            <h2>Kaynak ve yöntem notu</h2>
            <p>
              Tanım {dateFormatter.format(new Date(`${item.reviewedAt}T12:00:00+03:00`))} tarihinde
              kontrol edildi.
            </p>
            <ol>
              <li>
                <a href={item.source.url} target="_blank" rel="noopener noreferrer">
                  {item.source.name} ↗
                </a>
                <span>{item.source.note}</span>
              </li>
            </ol>
            <p className="guide-disclaimer">
              Bu sözlük maddesi operasyonel eğitim amacı taşır. Finansal ve muhasebesel
              sınıflandırmaları şirketinizin uzmanıyla doğrulayın.
            </p>
          </section>

          <section className="guide-related" aria-labelledby="related-terms-title">
            <span className="eyebrow">KAVRAM AĞINDA SIRADAKİLER</span>
            <h2 id="related-terms-title">İlgili kavramlar</h2>
            <div>
              {relatedTerms.map((related) => (
                <a key={related.slug} href={`/sozluk/${related.slug}`}>
                  <span>{related.category}</span>
                  <strong>{related.term}</strong>
                  <i>{related.english} →</i>
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>

      <Footer t={t} />
    </main>
  )
}

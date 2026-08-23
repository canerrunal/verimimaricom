import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { announcements, getAnnouncement } from '@/lib/announcements'
import { brandProfile, getSiteUrl } from '@/lib/seo'
import { getDictionary } from '@/lib/i18n'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return announcements.map((announcement) => ({ slug: announcement.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const announcement = getAnnouncement(slug)
  if (!announcement) return {}

  return {
    title: announcement.title,
    description: announcement.excerpt,
    alternates: { canonical: `/duyurular/${announcement.slug}` },
    openGraph: {
      title: announcement.title,
      description: announcement.excerpt,
      type: 'article',
      images: [announcement.image],
    },
  }
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { slug } = await params
  const announcement = getAnnouncement(slug)
  if (!announcement) notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: announcement.title,
    description: announcement.excerpt,
    image: [`${siteUrl}${announcement.image}`],
    datePublished: announcement.publishedAt,
    dateModified: announcement.updatedAt,
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/duyurular/${announcement.slug}`,
  }

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />

      <article>
        <header className="hero-shell announcement-detail-hero">
          <div className="wrap announcement-detail-head">
            <a className="crumb" href="/duyurular">
              <i aria-hidden="true" /> DUYURULAR / GERİ DÖN
            </a>
            <span className="eyebrow">{announcement.eyebrow}</span>
            <h1>{announcement.title}</h1>
            <p className="intro">{announcement.excerpt}</p>
            <div className="announcement-detail-meta">
              <span>
                <small>YAYIN</small>
                {announcement.publishedAt}
              </span>
              <span>
                <small>KATEGORİ</small>
                {announcement.category}
              </span>
              <span>
                <small>OKUMA</small>
                {announcement.readingTime}
              </span>
            </div>
          </div>
        </header>

        <section className="section-band band-paper">
          <div className="wrap section announcement-reading-grid">
            <div className="announcement-article-main">
              <figure className="announcement-hero-image">
                <img
                  className={
                    announcement.image.endsWith('.png') ? 'announcement-hero-image-tall' : ''
                  }
                  src={announcement.image}
                  alt={announcement.imageAlt}
                />
                <figcaption>{announcement.source}</figcaption>
              </figure>

              <div className="announcement-stat-grid" aria-label="Duyurunun özet metrikleri">
                {announcement.stats.map((stat) => (
                  <div key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <p>{stat.detail}</p>
                  </div>
                ))}
              </div>

              <div className="announcement-prose">
                {announcement.sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <span className="eyebrow">{section.id.replaceAll('-', ' ').toUpperCase()}</span>
                    <h2>{section.heading}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="announcement-conclusion">
                <span className="eyebrow">{announcement.nextStep?.eyebrow ?? 'SONRAKİ ADIM'}</span>
                <strong>
                  {announcement.nextStep?.title ??
                    'Tahmin etme. Maliyeti modele ekle. Kârı yeniden hesapla.'}
                </strong>
                <p>
                  {announcement.nextStep?.body ??
                    'Yeni tarifenin ürün, kampanya ve reklam kararlarınızdaki etkisini kendi sipariş karmınızla ölçün.'}
                </p>
                <a
                  className="btn"
                  href={announcement.nextStep?.ctaHref ?? '/araclar/kar-marji-hesaplayici'}
                >
                  {announcement.nextStep?.ctaLabel ?? 'Kârı yeniden hesapla →'}
                </a>
              </div>
            </div>

            <aside className="announcement-reading-aside">
              <div className="panel">
                <span className="eyebrow">KAYNAK NOTU</span>
                <p>{announcement.sourceNote}</p>
              </div>
              <div className="announcement-toc">
                <span className="eyebrow">İÇİNDEKİLER</span>
                {announcement.sections.map((section, index) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {String(index + 1).padStart(2, '0')} / {section.heading}
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </article>

      <Footer t={t} />
    </main>
  )
}

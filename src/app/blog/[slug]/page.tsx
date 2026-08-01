import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { fallbackJournalPosts, getFallbackBlogPost } from '@/lib/blog'
import { brandProfile, getSiteUrl } from '@/lib/seo'
import { getDictionary } from '@/lib/i18n'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return fallbackJournalPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getFallbackBlogPost(slug)
  if (!post || post.contentType === 'guide') return { title: 'Blog' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = getFallbackBlogPost(slug)
  if (!post || post.contentType === 'guide') notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: brandProfile.name },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />

      <section className="wrap hero single" style={{ paddingBottom: 20 }}>
        <Link href="/blog" className="back-link">
          ← Tüm Yazılar
        </Link>
        <span className="eyebrow">{post.sourceName}</span>
        <h1>{post.title}</h1>
        <p className="intro">{post.excerpt}</p>
        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 9,
            color: '#999',
            marginTop: 20,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span>Yayın: {post.publishedAt}</span>
          <span>Güncelleme: {post.updatedAt}</span>
          <span className="tag yellow">
            {post.maturity === 'evergreen'
              ? 'EVERGREEN'
              : post.maturity === 'growing'
                ? 'GELİŞMEKTE'
                : 'TASLAK'}
          </span>
          <a href={post.sourceUrl} className="link" target="_blank" rel="noopener noreferrer">
            Kaynağa Git
          </a>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 72 }}>
        <div className="two-col" style={{ marginBottom: 12 }}>
          <div className="tool-sm">
            <h3>Öne Çıkan Noktalar</h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: 16,
                fontSize: 10,
                color: 'var(--muted)',
                lineHeight: 2,
              }}
            >
              {post.highlights.map((h: string) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="tool-sm">
            <h3>Etiketler</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {post.sections.map((section: any) => (
            <div key={section.title} className="panel">
              <h3>{section.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 11, lineHeight: 1.65 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer t={t} />
    </main>
  )
}

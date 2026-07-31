import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fallbackBlogPosts, getFallbackBlogPost } from '@/lib/blog'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return fallbackBlogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getFallbackBlogPost(slug)

  if (!post) {
    return { title: 'Blog', description: 'Veri Mimarı blog yazıları' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getFallbackBlogPost(slug)

  if (!post) notFound()

  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', '@id': `${siteUrl}#person`, name: brandProfile.name },
    publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    citation: post.sourceUrl,
    about: post.tags,
  }

  return (
    <main className="page" aria-label="Blog detay sayfası">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section">
        <div className="wrap">
          <Link href="/blog" className="back-link">← Bloga Dön</Link>
          <span className="eyebrow" style={{ textTransform: 'capitalize' }}>{post.sourceName}</span>
          <h1 style={{ font: '700 clamp(24px,3vw,36px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 12px' }}>
            {post.title}
          </h1>
          <p style={{ color: '#666', maxWidth: 600, fontSize: 12, margin: '0 0 16px' }}>
            {post.excerpt}
          </p>

          <div style={{ display: 'flex', gap: 16, fontSize: 10, color: '#999', marginBottom: 40, alignItems: 'center' }}>
            <span>Yayın: {post.publishedAt}</span>
            <span>Güncelleme: {post.updatedAt}</span>
            <span style={{ background: '#fff3d2', color: '#8b6500', border: '1px solid #f3dfa1', borderRadius: 4, padding: '2px 6px', fontSize: 8 }}>
              {post.maturity}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 24 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Öne Çıkanlar
              </h3>
              <ul style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 2.2 }}>
                {post.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Etiketler
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{ padding: '3px 7px', border: '1px solid var(--line)', borderRadius: 5, fontSize: 9, color: '#797976' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {post.sections.map((section) => (
            <div key={section.title} className="tool-sm" style={{ marginBottom: 12 }}>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '0 0 8px' }}>
                {section.title}
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>{section.body}</p>
            </div>
          ))}

          <div style={{ marginTop: 24 }}>
            <a className="btn" href={post.sourceUrl}>Kaynağa Git ↗</a>
          </div>
        </div>
      </section>
    </main>
  )
}

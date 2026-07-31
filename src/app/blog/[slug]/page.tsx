// @ts-nocheck
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
    return {
      title: 'Blog',
      description: 'Veri Mimarı blog yazıları',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
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
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: brandProfile.name,
    },
    publisher: {
      '@type': 'Organization',
      name: brandProfile.brand,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    citation: post.sourceUrl,
    about: post.tags,
  }

  return (
    <main className="page case-study-page" aria-label="Blog detay sayfası">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="case-header">
        <span className="eyebrow">AI Haberleri · {post.sourceName}</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>

        <div className="case-meta">
          <span>Yayın: {post.publishedAt}</span>
          <span>Güncelleme: {post.updatedAt}</span>
          <span className={`maturity-chip ${post.maturity || 'seed'}`}>{post.maturity}</span>
        </div>

        <div className="case-links">
          <a href={post.sourceUrl}>Kaynak</a>
          <a href="/blog">Blog</a>
          <a href="/">Ana Sayfa</a>
        </div>
      </header>

      <section className="case-grid" aria-label="Blog içerik bölümleri">
        <article className="case-block case-col-8">
          <h2>Öne Çıkanlar</h2>
          <ul className="article-list">
            {post.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="case-block case-col-4">
          <h2>Etiketler</h2>
          <div className="skill-cloud">
            {post.tags.map((tag) => (
              <span key={tag} className="skill-chip">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {post.sections.map((section) => (
          <article key={section.title} className="case-block case-col-6">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

// @ts-nocheck
import type { Metadata } from 'next'
import { fallbackBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Veri Mimari digital garden yazilari, AI haberleri ve teknik notlar.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndexPage() {
  return (
    <main className="page blog-list-page" aria-label="Blog yazilari">
      <header className="blog-hero">
        <span className="eyebrow">Digital Garden</span>
        <h1>Blog</h1>
        <p>AI, veri, web ve urunlesme notlarinin gelisen arsivi.</p>
        <div className="case-links">
          <a href="/">Ana Sayfa</a>
        </div>
      </header>

      <section className="blog-grid" aria-label="Blog yazi listesi">
        {fallbackBlogPosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <span className={`maturity-chip ${post.maturity || 'seed'}`}>{post.maturity}</span>
            <h2>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p>{post.excerpt}</p>
            <div className="blog-card-meta">
              <span>Yayin: {post.publishedAt}</span>
              <span>Guncelleme: {post.updatedAt}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

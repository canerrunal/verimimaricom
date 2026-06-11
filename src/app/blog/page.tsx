// @ts-nocheck
import type { Metadata } from 'next'
import { fallbackBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Veri Mimarı digital garden yazıları, AI haberleri ve teknik notlar.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndexPage() {
  return (
    <main className="page case-study-page" aria-label="Blog yazıları">
      <header className="case-header glass">
        <span className="eyebrow">Digital Garden</span>
        <h1>Blog</h1>
        <p>AI, veri, web ve ürünleşme notlarının gelişen arşivi.</p>
        <div className="case-links">
          <a href="/">Ana Sayfa</a>
        </div>
      </header>

      <section className="case-grid" aria-label="Blog yazı listesi">
        {fallbackBlogPosts.map((post) => (
          <article key={post.slug} className="case-block glass case-col-6">
            <span className={`maturity-chip ${post.maturity || 'seed'}`}>{post.maturity}</span>
            <h2>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p>{post.excerpt}</p>
            <div className="case-meta">
              <span>Yayın: {post.publishedAt}</span>
              <span>Güncelleme: {post.updatedAt}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

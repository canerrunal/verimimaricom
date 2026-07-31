import type { Metadata } from 'next'
import Link from 'next/link'
import { fallbackBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Veri Mimari dijital bahçe yazıları, AI haberleri ve teknik notlar.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndexPage() {
  return (
    <main className="page" aria-label="Blog yazıları">
      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">DİJİTAL BAHÇE</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Blog
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            AI, veri, web ve ürünleşme notlarının gelişen arşivi.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {fallbackBlogPosts.map((post) => (
              <div key={post.slug} className="guide">
                <div className="guide-top">
                  <span className={`eyebrow`} style={{ textTransform: 'capitalize' }}>{post.maturity || 'seed'}</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h3 style={{ font: '700 16px/1.14 "Space Mono"', letterSpacing: '-.08em', margin: '43px 0 10px' }}>
                  <a href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </a>
                </h3>
                <p style={{ fontSize: 10, color: '#777', margin: 0 }}>{post.excerpt}</p>
                <a className="link" href={`/blog/${post.slug}`}>Oku</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

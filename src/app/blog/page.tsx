import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { fallbackJournalPosts } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Veri Mimari dijital bahçe yazıları, AI haberleri ve teknik notlar.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndexPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Blog yazıları">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <Link href="/" className="back-link">
            ← Ana Sayfaya Dön
          </Link>
          <div className="crumb">VERİ MİMARI / DİJİTAL BAHÇE</div>
          <h1>Blog</h1>
          <p className="intro">AI, veri, web ve ürünleşme notlarının gelişen arşivi.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="grid">
          {fallbackJournalPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card"
              style={{ textDecoration: 'none' }}
            >
              <span className="tag">
                {post.maturity === 'evergreen'
                  ? 'EVERGREEN'
                  : post.maturity === 'growing'
                    ? 'GELİŞMEKTE'
                    : 'TASLAK'}
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  paddingTop: 14,
                }}
              >
                <span style={{ fontSize: 9, color: 'var(--muted)' }}>{post.publishedAt}</span>
                <span className="link" style={{ marginTop: 0, paddingTop: 0 }}>
                  Oku
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

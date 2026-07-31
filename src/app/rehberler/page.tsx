'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import { fallbackBlogPosts } from '@/lib/blog'

export default function RehberlerPage() {
  const t = getDictionary('tr')
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['Tümü', 'E-Ticaret Kârlılığı', 'Dijital Reklam', 'AI & Otomasyon']

  const filteredPosts = fallbackBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">REHBERLER / E-TİCARET ZEKÂSI VE BÜYÜME</span>
        <h1>Uygulanabilir E-Ticaret ve Veri Rehberleri</h1>
        <p>Karmaşık pazarlama metriklerini, kârlılık dinamiklerini ve veri sistemlerini sadeleştiren rehberler.</p>
      </section>

      {/* Search and Category Filter */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="card-cta"
              style={{
                background: activeCategory === cat ? 'linear-gradient(120deg, rgba(105,212,255,0.35), rgba(157,123,255,0.35))' : 'rgba(255,255,255,0.06)',
                borderColor: activeCategory === cat ? 'rgba(185,221,255,0.5)' : 'rgba(255,255,255,0.18)',
                color: activeCategory === cat ? 'var(--text-0)' : 'var(--text-1)',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rehber ara (ör. roas, ai, gateway)..."
          style={{
            padding: '0.55rem 0.85rem',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '0.65rem',
            fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.06)',
            color: 'var(--text-0)',
            outline: 'none',
            minWidth: '240px',
          }}
        />
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {filteredPosts.map((post) => (
          <a key={post.slug} href={`/rehberler/${post.slug}`} className="card glass" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <span className={`maturity-chip ${post.maturity || 'seed'}`}>
              {post.maturity === 'growing' ? 'GELİŞEN' : post.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'TASLAK'}
            </span>
            <h3 style={{ marginTop: '0.8rem' }}>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="card-cta" style={{ marginTop: 'auto' }}>Rehberi Oku →</span>
          </a>
        ))}
      </section>
    </main>
  )
}

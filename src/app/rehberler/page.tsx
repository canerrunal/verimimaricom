'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { guideCategories, guides } from '@/lib/guides'

export default function RehberlerPage() {
  const t = getDictionary('tr')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('tr-TR')
  const filteredPosts = guides.filter((post) => {
    const searchableText = [post.title, post.excerpt, post.category, post.intent]
      .join(' ')
      .toLocaleLowerCase('tr-TR')
    const matchesCategory = activeCategory === 'Tümü' || post.category === activeCategory
    const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })

  function resetFilters() {
    setActiveCategory('Tümü')
    setSearchQuery('')
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">REHBERLER / {guides.length} UYGULANABİLİR REHBER</div>
          <h1>Metriği öğrenin. Kararı uygulayın.</h1>
          <p className="intro">
            Kısa cevap, formül, örnek hesap, karar tablosu ve çalışan araç aynı bilgi sisteminde.
          </p>
        </div>
      </section>

      <section className="wrap guide-index">
        <div className="guide-entry-points" aria-label="Öğrenme yolları">
          <a href="/rehberler/e-ticaret-karliligi">
            <span className="eyebrow">ANA ÖĞRENME YOLU</span>
            <strong>E-Ticaret Kârlılığı</strong>
            <i>8 rehber + 4 araç →</i>
          </a>
          <a href="/rehberler/reklam-performansi">
            <span className="eyebrow">YENİ ÖĞRENME YOLU</span>
            <strong>Reklam Performansı</strong>
            <i>6 rehber + karşılaştırma →</i>
          </a>
          <a href="/sozluk">
            <span className="eyebrow">KAVRAM SÖZLÜĞÜ</span>
            <strong>Metriği 3 dakikada öğren</strong>
            <i>15 temel kavram →</i>
          </a>
        </div>
        <div className="guide-toolbar">
          <div className="filters" aria-label="Rehber kategorileri">
            {guideCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`filter ${activeCategory === category ? 'active' : ''}`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="guide-search">
            <span>Rehber ara</span>
            <input
              type="search"
              className="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Örn. ROAS, iade, dashboard"
            />
          </label>
        </div>

        <p className="guide-result-count" aria-live="polite">
          {filteredPosts.length} rehber gösteriliyor
        </p>

        {filteredPosts.length > 0 ? (
          <div className="grid guide-grid">
            {filteredPosts.map((post) => (
              <a key={post.slug} href={`/rehberler/${post.slug}`} className="card guide-card">
                <div className="guide-card-meta">
                  <span className="tag">
                    {post.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'GELİŞEN REHBER'}
                  </span>
                  <span>{post.readingTime} DK</span>
                </div>
                <span className="eyebrow">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="link">Rehberi incele</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="panel guide-empty-state">
            <h2>Bu aramada sonuç yok.</h2>
            <p>Farklı bir kelime deneyin veya tüm kategorilere dönün.</p>
            <button className="btn alt" type="button" onClick={resetFilters}>
              Filtreleri temizle
            </button>
          </div>
        )}
      </section>

      <Footer t={t} />
    </main>
  )
}

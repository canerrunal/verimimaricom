'use client'

import { useState } from 'react'
import { glossaryCategories, glossaryTerms } from '@/lib/glossary'

export default function GlossaryLibrary() {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('tr-TR')

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory
    const searchable = `${item.term} ${item.english} ${item.shortDefinition}`.toLocaleLowerCase('tr-TR')
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
  })

  function resetFilters() {
    setActiveCategory('Tümü')
    setSearchQuery('')
  }

  return (
    <section className="wrap glossary-library" aria-labelledby="glossary-library-title">
      <div className="glossary-library-head">
        <div>
          <span className="eyebrow">İLK KAVRAM KÜMESİ / KÂRLILIK VE REKLAM</span>
          <h2 id="glossary-library-title">Tanımdan karara ilerleyin.</h2>
        </div>
        <p>Her kavram formül, basit örnek, karıştırılan terim ve ilgili rehberle açıklanır.</p>
      </div>

      <div className="guide-toolbar">
        <div className="filters" aria-label="Sözlük kategorileri">
          {glossaryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="guide-search">
          <span>Kavram ara</span>
          <input
            type="search"
            className="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Örn. ROAS, marj, dönüşüm"
          />
        </label>
      </div>

      <p className="guide-result-count" aria-live="polite">{filteredTerms.length} kavram gösteriliyor</p>

      {filteredTerms.length ? (
        <div className="glossary-grid">
          {filteredTerms.map((item, index) => (
            <a key={item.slug} href={`/sozluk/${item.slug}`} className="glossary-card">
              <div>
                <span className="tag">{item.category}</span>
                <span className="glossary-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <span className="eyebrow">{item.english}</span>
              <h3>{item.term}</h3>
              <p>{item.shortDefinition}</p>
              <span className="link">Kavramı öğren</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="panel guide-empty-state" role="status">
          <h2>Bu aramada kavram bulunamadı.</h2>
          <p>Farklı bir kelime deneyin veya bütün kategorilere dönün.</p>
          <button className="btn alt" type="button" onClick={resetFilters}>Filtreleri temizle</button>
        </div>
      )}
    </section>
  )
}

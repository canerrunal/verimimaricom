'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

const allTools = [
  {
    title: 'Başa Baş ROAS Hesaplayıcı',
    description: 'Reklam harcamanızın zarar ettirmeye başladığı kritik ROAS eşiğini maliyetlerinize göre bulun.',
    status: 'CANLI',
    category: 'Reklam',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/basabas-roas-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'Ürün Kâr Marjı Hesaplayıcı',
    description: 'Satış fiyatı, ürün maliyeti, pazaryeri komisyonu, kargo ve reklam kesintileriyle sipariş başına net kârınızı hesaplayın.',
    status: 'CANLI',
    category: 'Kârlılık',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/kar-marji-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'İndirim Kârlılık Simülatörü',
    description: 'Yapılacak kampanyanın kârlılığınıza etkisini ve kârı korumak için gereken ek satış adedini simüle edin.',
    status: 'CANLI',
    category: 'Kârlılık',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/indirim-karlilik-simulatoru',
    cta: 'Simülasyonu Başlat →',
  },
  {
    title: 'Pazaryeri Komisyon Hesaplayıcı',
    description: 'Trendyol, Hepsiburada, Amazon TR, N11 ve kendi sitenizdeki komisyon, kargo ve ödeme altyapısı kesintilerini karşılaştırın.',
    status: 'CANLI',
    category: 'Pazaryeri',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/pazaryeri-komisyon-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
]

export default function AraclarPage() {
  const t = getDictionary('tr')
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['Tümü', 'Kârlılık', 'Reklam', 'Pazaryeri']

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = activeCategory === 'Tümü' || tool.category === activeCategory
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">ARAÇLAR / ÜCRETSİZ HESAPLAMA VE ANALİZ</span>
        <h1>Kararlarınızı Kolaylaştıran Ücretsiz E-Ticaret Araçları</h1>
        <p>Kârlılık, reklam ve operasyon verilerinizi görünür sonuçlara dönüştürün. Kayıt olmadan başlayın; yöntemleri açıkça inceleyin.</p>
      </section>

      {/* Filter and Search Bar */}
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
          placeholder="Araç ara (ör. roas, komisyon, marj)..."
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

      {/* Grid */}
      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {filteredTools.map((tool, idx) => (
          <a
            key={idx}
            href={tool.href}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <span className={`maturity-chip ${tool.status === 'CANLI' ? 'growing' : 'seed'}`}>
                {tool.badge}
              </span>
              <h3 style={{ marginTop: '0.8rem' }}>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
            <span className="card-cta" style={{ marginTop: 'auto' }}>
              {tool.cta}
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

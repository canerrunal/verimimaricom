'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

const allProjects = [
  {
    title: 'Zolm — E-Ticaret Reklam Zekâsı',
    category: 'E-Ticaret Zekâsı',
    description: 'Reklam harcamalarını ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren akıllı karar platformu.',
    maturity: 'growing',
    badge: 'AKTİF PROJE / BEKLEME LİSTESİ',
    href: '/zolm',
    cta: 'Projeyi İncele →',
  },
  {
    title: 'E-Ticaret Kârlılık ve ROAS Altyapısı',
    category: 'E-Ticaret Zekâsı',
    description: 'Sipariş başı maliyetleri, pazaryeri komisyonlarını ve kargo bedellerini kârlılık kokpitinde birleştiren sistem.',
    maturity: 'evergreen',
    badge: 'CANLI SİSTEM',
    href: '/araclar/basabas-roas-hesaplayici',
    cta: 'Aracı Dene →',
  },
  {
    title: 'Claude & Vercel AI Gateway Entegrasyonu',
    category: 'AI Otomasyon',
    description: 'Ürün açıklamaları, pazarlama metinleri ve veri özetleri üreten yapay zeka otomasyon boru hattı.',
    maturity: 'growing',
    badge: 'GELİŞEN PROJE',
    href: '/rehberler/claude-fable-5-vercel-ai-gateway',
    cta: 'Mimarini Oku →',
  },
  {
    title: 'Digital Garden Bilgi Grafiği',
    category: 'Veri Analitiği',
    description: 'Bloglar ve teknik notlar arası bağlantıları gösteren organik bilgi ağı ve etkileşimli grafik.',
    maturity: 'evergreen',
    badge: 'CANLI SİSTEM',
    href: '/labs',
    cta: 'Grafiği İncele →',
  },
]

export default function ProjelerPage() {
  const t = getDictionary('tr')
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['Tümü', 'E-Ticaret Zekâsı', 'AI Otomasyon', 'Veri Analitiği']

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = activeCategory === 'Tümü' || p.category === activeCategory
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">PROJELER & ÜRÜNLER / VERİ MİMARI PORTEFÖYÜ</div>
          <h1>E-Ticaret ve Veri Ekosistemi İçin Geliştirilen Ürünler</h1>
          <p className="intro">Ölçülebilir kârlılık, yapay zeka entegrasyonu ve otomasyon alanında inşa edilen yazılım projeleri.</p>
        </div>
      </section>

      {/* Filter and Search */}
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
          placeholder="Proje ara (ör. zolm, ai, roas)..."
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
        {filteredProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.href}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <span className={`maturity-chip ${project.maturity}`}>
                {project.badge}
              </span>
              <h3 style={{ marginTop: '0.8rem' }}>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <span className="card-cta" style={{ marginTop: 'auto' }}>
              {project.cta}
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

const allProjects = [
  {
    title: 'Zolm — E-Ticaret Reklam Zekâsı',
    category: 'E-Ticaret Zekâsı',
    description: 'Reklam harcamalarını ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren akıllı karar platformu.',
    badge: 'AKTİF PROJE / BEKLEME LİSTESİ',
    href: '/zolm',
    cta: 'Projeyi İncele →',
    featured: true,
  },
  {
    title: 'E-Ticaret Kârlılık ve ROAS Altyapısı',
    category: 'E-Ticaret Zekâsı',
    description: 'Sipariş başı maliyetleri, pazaryeri komisyonlarını ve kargo bedellerini kârlılık kokpitinde birleştiren sistem.',
    badge: 'CANLI SİSTEM',
    href: '/araclar/basabas-roas-hesaplayici',
    cta: 'Aracı Dene →',
  },
  {
    title: 'Claude & Vercel AI Gateway Entegrasyonu',
    category: 'AI Otomasyon',
    description: 'Ürün açıklamaları, pazarlama metinleri ve veri özetleri üreten yapay zeka otomasyon boru hattı.',
    badge: 'GELİŞEN PROJE',
    href: '/blog/claude-fable-5-vercel-ai-gateway',
    cta: 'Mimariyi Oku →',
  },
  {
    title: 'Digital Garden Bilgi Grafiği',
    category: 'Veri Analitiği',
    description: 'Bloglar ve teknik notlar arası bağlantıları gösteren organik bilgi ağı ve etkileşimli grafik.',
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

  const featured = filteredProjects.find((p) => p.featured)
  const others = filteredProjects.filter((p) => !p.featured)

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">PROJELER &amp; ÜRÜNLER / VERİ MİMARI PORTEFÖYÜ</div>
          <h1>E-Ticaret ve Veri Ekosistemi İçin Geliştirilen Ürünler</h1>
          <p className="intro">Ölçülebilir kârlılık, yapay zeka entegrasyonu ve otomasyon alanında inşa edilen yazılım projeleri.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div className="filters" style={{ marginBottom: 0 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Proje ara (ör. zolm, ai, roas)…"
            aria-label="Projelerde ara"
          />
        </div>

        {featured && (
          <div className="project-hero" style={{ marginBottom: 12 }}>
            <span className="eyebrow">{featured.badge}</span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <a href={featured.href} className="btn" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
              {featured.cta}
            </a>
          </div>
        )}

        <div className="grid">
          {others.map((project) => (
            <a key={project.href} href={project.href} className="card" style={{ textDecoration: 'none' }}>
              <span className="tag">{project.badge}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="link">{project.cta}</span>
            </a>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

'use client'

import { useState } from 'react'

function resolveHref(href: string, basePath: string) {
  if (String(href || '').startsWith('#')) {
    return basePath === '/' ? href : `${basePath}${href}`
  }
  return href
}

export default function NavBar({ t }: { t: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="wrap header">
        <a href={t.basePath} className="logo" aria-label={t.nav.brandAriaLabel}>
          <span className="logo-mark" aria-hidden="true">
            V
          </span>
          <span className="logo-word">veri/mimarı</span>
          <small>BAĞIMSIZ VERİ REHBERİ</small>
        </a>
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          {t.nav.links.map((item: any, idx: number) => (
            <a
              key={`${item.href}-${idx}`}
              href={resolveHref(item.href, t.basePath)}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="actions">
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕ Kapat' : '☰ Menü'}
          </button>
          <a className="nav-secondary" href="/is-birligi">
            {t.locale === 'en' ? 'Collaborate' : 'İş birliği'} ↗
          </a>
          <a href="/araclar" className="btn nav-primary">
            {t.locale === 'en' ? 'Open tools' : 'Araçları aç'} ↗
          </a>
        </div>
      </div>
    </header>
  )
}

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
    <header className="wrap header">
      <a href={t.basePath} className="logo" aria-label={t.nav.brandAriaLabel}>
        VERİ MİMARI <small>CANER ÜNAL</small>
      </a>
      <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
        {t.nav.links.map((item: any, idx: number) => (
          <a key={`${item.href}-${idx}`} href={resolveHref(item.href, t.basePath)} onClick={() => setMobileMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="actions">
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü"
        >
          {mobileMenuOpen ? '✕ Kapat' : '☰ Menü'}
        </button>
        <span className="lang">TR / EN</span>
        <a href={t.basePath === '/' ? '/araclar' : '/en/araclar'} className="btn">
          Ücretsiz Araçlar ↗
        </a>
      </div>
    </header>
  )
}

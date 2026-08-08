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
            <svg viewBox="0 0 48 48" focusable="false">
              <path className="logo-mark-letter" d="M5 15h7l10 18V12l4-4v34l-4 4z" />
              <path className="logo-mark-letter" d="m28 8 3 3v35l-3-4z" />
              <path
                className="logo-mark-letter"
                d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"
              />
              <path className="logo-mark-tail" d="m42 35 4-4v5l-4 4z" />
            </svg>
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

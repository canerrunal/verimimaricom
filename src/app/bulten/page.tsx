import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Veri Mimarı Notları — Haftalık Bülten',
  description: 'E-ticaret kârlılığı, reklam metrikleri ve yapay zeka araçları üzerine pratik haftalık notlar.',
}

export default function BultenPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <span className="maturity-chip growing" style={{ marginBottom: '0.8rem' }}>HAFTALIK E-TİCARET ZEKÂSI</span>
        <h1 style={{ maxWidth: '100%' }}>Veri Mimarı Notları</h1>
        <p style={{ maxWidth: '520px', margin: '0.8rem auto 1.5rem' }}>
          Her hafta e-ticaret kârlılığı, reklam performans analizi ve çalışan yapay zeka sistemleri üzerine uygulamalı 1 not.
        </p>

        <form style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="E-posta adresiniz"
            required
            style={{
              padding: '0.65rem 1rem',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '0.65rem',
              fontSize: '0.9rem',
              width: '280px',
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--text-0)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="cta-link cta-primary"
            style={{
              padding: '0.65rem 1.2rem',
              borderRadius: '0.65rem',
              border: '1px solid rgba(185,221,255,0.55)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: 'var(--text-0)',
            }}
          >
            Abone Ol →
          </button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-1)' }}>
          Spam yok. İstediğiniz zaman tek tıkla ayrılabilirsiniz.
        </p>
      </section>
    </main>
  )
}

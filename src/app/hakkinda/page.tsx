import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Caner Ünal Hakkında',
  description: 'Veri Mimarı kurucusu Caner Ünal: E-ticaret büyümesi, veri analitiği ve yapay zeka.',
}

export default function HakkindaPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">VERİ MİMARI / KURUCU VE UZMANLIK</span>
        <h1>Caner Ünal Hakkında</h1>
        <p style={{ fontSize: '1.1rem' }}>Veriyi teori olmaktan çıkarıp günlük e-ticaret kararlarına dönüştüren sistemler inşa ediyorum.</p>
      </section>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.8rem', fontSize: '1.2rem' }}>Veri Mimarı Nedir?</h2>
          <p style={{ color: 'var(--text-1)', lineHeight: '1.7', margin: 0 }}>
            Veri Mimarı; e-ticaret yapan markaların, dijital pazarlama ekiplerinin ve bağımsız girişimcilerin veriyi daha kârlı kararlara dönüştürmesine yardımcı olan ücretsiz araçlar, uygulanabilir rehberler ve ürünlerden oluşan bir platformdur.
          </p>
        </section>

        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.8rem', fontSize: '1.2rem' }}>Yaklaşımım</h2>
          <p style={{ color: 'var(--text-1)', lineHeight: '1.7', margin: 0 }}>
            Veri analitiği yalnızca rapor yazmak değildir. Doğru metrikleri kârlılık kararlarına bağlamak, reklam harcamalarını başa baş ROAS seviyesine göre yönetmek ve rutin süreçleri yapay zeka ve otomasyonla hızlandırmaktır.
          </p>
        </section>

        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.8rem', fontSize: '1.2rem' }}>Uzmanlık Alanları</h2>
          <ul style={{ color: 'var(--text-1)', lineHeight: '1.8', paddingLeft: '1.2rem', margin: 0 }}>
            <li>E-ticaret Kârlılık ve Reklam Analitiği</li>
            <li>Başa Baş ROAS ve Katkı Payı Modellemesi</li>
            <li>Next.js, TypeScript ve Modern Web Mühendisliği</li>
            <li>Yapay Zeka (LLM/RAG) İş Akışı Entegrasyonları</li>
            <li>Veri Hikayeciliği ve Dönüşüm Tasarımı</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <a href="/is-birligi" className="cta-link cta-primary" style={{ display: 'inline-flex', padding: '0.65rem 1.2rem', borderRadius: '0.75rem', border: '1px solid rgba(185,221,255,0.55)', fontWeight: 600, textDecoration: 'none' }}>
            İş Birliği İletişimi →
          </a>
        </div>
      </div>
    </main>
  )
}

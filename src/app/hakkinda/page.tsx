import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Caner Ünal Hakkında | Veri Mimarı',
  description: 'Veri Mimarı kurucusu Caner Ünal: E-ticaret büyümesi, reklam analitiği ve yapay zeka.',
}

const stats = [
  { value: '35', label: 'Canlı Statik Rota', desc: 'Sürekli güncellenen araç ve rehber kataloğu' },
  { value: '%100', label: 'İstemci Gizliliği', desc: 'Tüm hesaplamalar sadece tarayıcınızda çalışır' },
  { value: '0 TL', label: 'Ücretsiz Erişim', desc: 'Kayıt ve üyelik şartı olmadan açık yöntemler' },
]

const timeline = [
  { year: '2026', title: 'Veri Mimarı & Zolm Platformu', desc: 'E-ticaret reklamlarında başa baş ROAS ve kârlılık zekâsı altyapısı.' },
  { year: '2024-2025', title: 'Yapay Zeka & LLM Entegrasyonları', desc: 'Vercel AI SDK, RAG mimarileri ve otomatik içerik boru hatları.' },
  { year: '2021-2023', title: 'Dönüşüm & Reklam Analitiği', desc: 'Performans pazarlaması, katkı payı modülleme ve bütçe optimizasyonu.' },
]

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

      {/* Stats Cockpit */}
      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '1rem' }}>
        {stats.map((st, i) => (
          <div key={i} className="card glass" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-0)', letterSpacing: '-0.03em' }}>{st.value}</div>
            <strong style={{ display: 'block', margin: '0.4rem 0 0.2rem', fontSize: '1rem' }}>{st.label}</strong>
            <small style={{ color: 'var(--text-1)', fontSize: '0.8rem' }}>{st.desc}</small>
          </div>
        ))}
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

        {/* Timeline */}
        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem' }}>Gelişim Zaman Çizelgesi</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--accent-0)', paddingLeft: '1rem' }}>
                <span className="maturity-chip seed" style={{ fontSize: '0.7rem' }}>{item.year}</span>
                <h3 style={{ margin: '0.3rem 0 0.2rem', fontSize: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-1)', fontSize: '0.86rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
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

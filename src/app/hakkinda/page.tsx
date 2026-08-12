import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import JsonLd from '@/components/common/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: 'Caner Ünal | E-Ticaret, Yapay Zekâ ve Yazılım Uzmanı' },
  description:
    'Veri Mimarı kurucusu Caner Ünal; e-ticaret, dijital pazarlama, yapay zekâ, ERP, CRM, SaaS, WordPress ve özel yazılım sistemleri geliştirir.',
  alternates: { canonical: '/hakkinda' },
  openGraph: {
    title: 'Caner Ünal Hakkında | Veri Mimarı',
    description:
      'E-ticaret, dijital pazarlama, yapay zekâ, ERP, CRM, SaaS, WordPress ve yazılım geliştirmeyi birleştiren Veri Mimarı yaklaşımı.',
    type: 'profile',
    url: '/hakkinda',
  },
}

const stats = [
  { value: '35', label: 'Canlı Statik Rota', desc: 'Sürekli güncellenen araç ve rehber kataloğu' },
  {
    value: '%100',
    label: 'İstemci Gizliliği',
    desc: 'Tüm hesaplamalar sadece tarayıcınızda çalışır',
  },
  { value: '0 TL', label: 'Ücretsiz Erişim', desc: 'Kayıt ve üyelik şartı olmadan açık yöntemler' },
]

const timeline = [
  {
    year: '2026',
    title: 'Veri Mimarı & Zolm Platformu',
    desc: 'E-ticaret reklamlarında başa baş ROAS ve kârlılık zekâsı altyapısı.',
  },
  {
    year: '2024–2025',
    title: 'Yapay Zeka & LLM Entegrasyonları',
    desc: 'Vercel AI SDK, RAG mimarileri ve otomatik içerik boru hatları.',
  },
  {
    year: '2021–2023',
    title: 'Dönüşüm & Reklam Analitiği',
    desc: 'Performans pazarlaması, katkı payı modülleme ve bütçe optimizasyonu.',
  },
]

export default function HakkindaPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/hakkinda#profilepage`,
    url: `${siteUrl}/hakkinda`,
    name: 'Caner Ünal | E-Ticaret, Yapay Zekâ ve Yazılım Uzmanı',
    inLanguage: 'tr-TR',
    mainEntity: { '@id': `${siteUrl}#person` },
    isPartOf: { '@id': `${siteUrl}#website` },
  }

  return (
    <main className="page">
      <JsonLd id="profile-page-schema" data={profileJsonLd} />
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">CANER ÜNAL / E-TİCARET · YAPAY ZEKÂ · YAZILIM SİSTEMLERİ</div>
          <h1>Veriyi araçlara ve kârlı kararlara dönüştürüyorum.</h1>
          <p className="intro">
            E-ticaret, dijital pazarlama, AI, ERP, CRM, SaaS, WordPress ve yazılım geliştirmeyi
            birleştirerek günlük işlerde kullanılabilir sistemler tasarlıyorum.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="metrics-grid" style={{ marginBottom: 24 }}>
          {stats.map((st) => (
            <div key={st.label} className="metric" style={{ textAlign: 'left' }}>
              <b
                style={{
                  display: 'block',
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  marginBottom: 4,
                  color: 'var(--ink)',
                }}
              >
                {st.value}
              </b>
              <small>{st.label}</small>
              <span style={{ display: 'block', fontSize: 9, color: 'var(--muted)', marginTop: 6 }}>
                {st.desc}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div className="panel">
            <h2
              style={{
                font: "700 22px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}
            >
              Veri Mimarı Nedir?
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              Veri Mimarı; e-ticaret yapan markaların, dijital pazarlama ekiplerinin ve bağımsız
              girişimcilerin veriyi daha kârlı kararlara dönüştürmesine yardımcı olan ücretsiz
              araçlar, uygulanabilir rehberler ve ürünlerden oluşan bir platformdur.
            </p>
          </div>

          <div className="panel">
            <h2
              style={{
                font: "700 22px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}
            >
              Yaklaşımım
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              Veri analitiği yalnızca rapor yazmak değildir. Doğru metrikleri kârlılık kararlarına
              bağlamak, reklam harcamalarını başa baş ROAS seviyesine göre yönetmek ve rutin
              süreçleri yapay zeka ve otomasyonla hızlandırmaktır.
            </p>
          </div>

          <div className="panel">
            <h2
              style={{
                font: "700 22px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '0 0 16px',
              }}
            >
              Gelişim Zaman Çizelgesi
            </h2>
            <div style={{ display: 'grid', gap: '1.1rem' }}>
              {timeline.map((item) => (
                <div
                  key={item.year}
                  style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '1rem' }}
                >
                  <span className="tag" style={{ marginBottom: 6 }}>
                    {item.year}
                  </span>
                  <h3
                    style={{
                      font: "700 17px/1.18 'Space Mono'",
                      letterSpacing: '-0.02em',
                      margin: '4px 0 2px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: 10, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2
              style={{
                font: "700 22px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}
            >
              Uzmanlık Alanları
            </h2>
            <ul className="prose" style={{ listStyle: 'none', paddingLeft: 0 }}>
              {[
                'E-ticaret Kârlılık ve Reklam Analitiği',
                'Başa Baş ROAS ve Katkı Payı Modellemesi',
                'WordPress Güvenlik, Hız, Taşıma ve Teknik Operasyonlar',
                'ERP, CRM ve SaaS Sistem Tasarımı',
                'Next.js, TypeScript ve Modern Web Mühendisliği',
                'Yapay Zeka (LLM/RAG) İş Akışı Entegrasyonları',
                'Veri Hikayeciliği ve Dönüşüm Tasarımı',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    padding: '6px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: 11,
                    color: 'var(--ink)',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <a href="/e-ticaret-danismani" className="btn">
              Danışmanlık Kapsamını İncele →
            </a>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

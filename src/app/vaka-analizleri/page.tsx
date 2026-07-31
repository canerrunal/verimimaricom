import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Vaka Analizleri | Veri Mimarı',
  description: 'E-ticaret dönüşümü, reklam analitiği ve veri hikayeciliği odaklı vaka analizleri.',
}

const cases = [
  {
    title: 'ROAS %320 İken Kâr Erimesini Engelleme Vakası',
    eyebrow: 'E-TİCARET KÂRLILIĞI',
    problem: 'ROAS yüksek görünmesine rağmen pazaryeri komisyonu ve kargo giderleri net kârı eritiyordu.',
    solution: 'Başa baş ROAS ve ürün bazlı katkı payı haritası çıkarılarak reklam setleri yeniden yapılandırıldı.',
    metric: '+%34 Net Kâr Artışı',
    metricColor: '#4ade80',
    href: '/rehberler/claude-fable-5-vercel-ai-gateway',
  },
  {
    title: 'Zarar Ettiren Reklam Setlerini Otomatik Tespit Etme',
    eyebrow: 'REKLAM ANALİTİĞİ',
    problem: 'Farklı kampanyalarda bütçenin %25\'i katkı payı negatif ürünlere harcanıyordu.',
    solution: 'Otomatik harcama eşik kuralı ve bütçe kaçak alarm altyapısı kuruldu.',
    metric: '-%22 Reklam İsrafı Azalması',
    metricColor: 'var(--accent-0)',
    href: '/araclar/basabas-roas-hesaplayici',
  },
  {
    title: 'Pazaryeri Komisyon Değişikliklerinin Marja Etkisi',
    eyebrow: 'PAZARYERİ STRATEJİSİ',
    problem: 'Komisyon artışları sonrası ürün fiyatlandırması güncellenmediği için birim kâr düştü.',
    solution: 'Trendyol, Hepsiburada ve Amazon komisyon ve kargo duyarlılık modeli uygulandı.',
    metric: '1.4x Birim Katkı Payı İyileşmesi',
    metricColor: '#4ade80',
    href: '/araclar/pazaryeri-komisyon-hesaplayici',
  },
]

export default function VakaAnalizleriPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">VAKA ANALİZLERİ / DOĞRULAMA VE ŞEFFAFLIK</div>
          <h1>Sonucu değil, yöntemi de görün.</h1>
          <p className="intro">Gerçek vaka, anonim vaka ve simülasyonlar açıkça etiketlenir. Her analiz yöntem ve hipoteziyle sunulur.</p>
        </div>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {cases.map((c, idx) => (
          <a
            key={idx}
            href={c.href}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span className="maturity-chip seed" style={{ fontSize: '0.68rem' }}>{c.eyebrow}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: c.metricColor }}>{c.metric}</span>
              </div>
              <h3 style={{ margin: '0.4rem 0 0.8rem', fontSize: '1.1rem' }}>{c.title}</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-1)', lineHeight: '1.5', display: 'grid', gap: '0.5rem' }}>
                <p style={{ margin: 0 }}><strong>Problem:</strong> {c.problem}</p>
                <p style={{ margin: 0 }}><strong>Çözüm:</strong> {c.solution}</p>
              </div>
            </div>
            <span className="card-cta" style={{ marginTop: '1.2rem' }}>Metodu ve Detayları İncele →</span>
          </a>
        ))}
      </section>
    </main>
  )
}

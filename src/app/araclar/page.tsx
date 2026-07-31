import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Ücretsiz E-ticaret Araçları | Veri Mimarı',
  description:
    'E-ticaret kârlılığınızı ve reklam performansınızı ölçen ücretsiz hesaplama araçları. Başa baş ROAS, kâr marjı ve indirim simülasyonları.',
}

const tools = [
  {
    title: 'Başa Baş ROAS Hesaplayıcı',
    description: 'Reklam harcamanızın zarar ettirmeye başladığı kritik ROAS eşiğini maliyetlerinize göre bulun.',
    status: 'CANLI',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/basabas-roas-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'Ürün Kâr Marjı Hesaplayıcı',
    description: 'Satış fiyatı, ürün maliyeti, pazaryeri komisyonu, kargo ve reklam kesintileriyle sipariş başına net kârınızı hesaplayın.',
    status: 'CANLI',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/kar-marji-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'İndirim Kârlılık Simülatörü',
    description: 'Yapılacak kampanyanın kârlılığınıza etkisini ve kârı korumak için gereken ek satış adedini simüle edin.',
    status: 'CANLI',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/indirim-karlilik-simulatoru',
    cta: 'Simülasyonu Başlat →',
  },
  {
    title: 'Pazaryeri Komisyon Hesaplayıcı',
    description: 'Trendyol, Hepsiburada ve Amazon komisyon, kargo ve ceza maliyetlerinin net kâra etkisini karşılaştırın.',
    status: 'YAKINDA',
    badge: 'PLANLANIYOR',
    href: '#',
    cta: 'Bekleme Listesine Katıl',
  },
]

export default function AraclarPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">ARAÇLAR / ÜCRETSİZ HESAPLAMA VE ANALİZ</span>
        <h1>Kararlarınızı Kolaylaştıran Ücretsiz E-Ticaret Araçları</h1>
        <p>Kârlılık, reklam ve operasyon verilerinizi görünür sonuçlara dönüştürün. Kayıt olmadan başlayın; yöntemleri açıkça inceleyin.</p>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {tools.map((tool, idx) => (
          <a
            key={idx}
            href={tool.href}
            className="card glass"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <span className={`maturity-chip ${tool.status === 'CANLI' ? 'growing' : 'seed'}`}>
                {tool.badge}
              </span>
              <h3 style={{ marginTop: '0.8rem' }}>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
            <span className="card-cta" style={{ marginTop: 'auto' }}>
              {tool.cta}
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

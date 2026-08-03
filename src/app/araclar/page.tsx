'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

const allTools = [
  {
    title: 'E-Ticaret Strateji ve Pazarlama Analizi',
    description:
      'Çoklu ürün kârlılığını, reklam sınırlarını, fiyat kararlarını ve 30 günlük uygulama planını tek ekranda analiz edin.',
    status: 'CANLI',
    category: 'Strateji',
    badge: 'CANLI · ÇOKLU ÜRÜN · ÜCRETSİZ',
    href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
    cta: 'Portföyü Analiz Et →',
  },
  {
    title: 'Başa Baş ROAS Hesaplayıcı',
    description:
      'Reklam harcamanızın zarar ettirmeye başladığı kritik ROAS eşiğini maliyetlerinize göre bulun.',
    status: 'CANLI',
    category: 'Reklam',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/basabas-roas-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV',
    description:
      'Doğrulanmış yeni müşteri CAC, ilk sipariş katkısı, 90 günlük katkı LTV ve geri ödeme durumunu hesaplayın.',
    status: 'CANLI',
    category: 'Reklam',
    badge: 'CANLI · KOHORT · ÜCRETSİZ',
    href: '/araclar/yeni-musteri-cac-katki-ltv-hesaplayici',
    cta: 'Müşteri Ekonomisini Hesapla →',
  },
  {
    title: 'Ürün Kâr Marjı Hesaplayıcı',
    description:
      'Satış fiyatı, ürün maliyeti, pazaryeri komisyonu, kargo ve reklam kesintileriyle sipariş başına net kârınızı hesaplayın.',
    status: 'CANLI',
    category: 'Kârlılık',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/kar-marji-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'İndirim Kârlılık Simülatörü',
    description:
      'Yapılacak kampanyanın kârlılığınıza etkisini ve kârı korumak için gereken ek satış adedini simüle edin.',
    status: 'CANLI',
    category: 'Kârlılık',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/indirim-karlilik-simulatoru',
    cta: 'Simülasyonu Başlat →',
  },
  {
    title: 'Pazaryeri Komisyon Hesaplayıcı',
    description:
      'Trendyol, Hepsiburada, Amazon TR, N11 ve kendi sitenizdeki komisyon, kargo ve ödeme altyapısı kesintilerini karşılaştırın.',
    status: 'CANLI',
    category: 'Pazaryeri',
    badge: 'CANLI · 2 DK · ÜCRETSİZ',
    href: '/araclar/pazaryeri-komisyon-hesaplayici',
    cta: 'Hesaplamayı Başlat →',
  },
  {
    title: 'Pazaryeri Reklam Kârlılık Hesaplayıcı',
    description:
      'Retail media panel ROAS’ını iade, komisyon, ürün maliyeti ve tahmini artımsallıkla gerçek katkıya dönüştürün.',
    status: 'CANLI',
    category: 'Pazaryeri',
    badge: 'CANLI · RETAIL MEDIA · ÜCRETSİZ',
    href: '/araclar/pazaryeri-reklam-karlilik-hesaplayici',
    cta: 'Artımlı Katkıyı Hesapla →',
  },
  {
    title: 'Ürün Feed Sağlık Kontrolü',
    description:
      'CSV ürün verinizde eksik alan, fiyat, stok, URL, kimlik ve içerik sorunlarını tarayıcıda analiz edin.',
    status: 'CANLI',
    category: 'Yapay zekâ',
    badge: 'CANLI · TARAYICIDA · ÜCRETSİZ',
    href: '/araclar/urun-feed-saglik-kontrolu',
    cta: 'Feed’i Analiz Et →',
  },
  {
    title: 'Yapay Zekâ Görünürlük Analizi',
    description:
      'Markanızın AI cevaplarındaki görünürlük sinyallerini, rakip payını ve teknik hazırlığını açık yöntemle inceleyin.',
    status: 'BETA',
    category: 'Yapay zekâ',
    badge: 'BETA · TEKNİK ÖN ANALİZ · KANITLI',
    href: '/araclar/yapay-zeka-gorunurluk-analizi',
    cta: 'Görünürlüğü Analiz Et →',
  },
]

export default function AraclarPage() {
  const t = getDictionary('tr')
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['Tümü', 'Strateji', 'Kârlılık', 'Reklam', 'Pazaryeri', 'Yapay zekâ']

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = activeCategory === 'Tümü' || tool.category === activeCategory
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">ARAÇLAR / ÜCRETSİZ HESAPLAMA VE ANALİZ</div>
          <h1>Kararlarınızı Kolaylaştıran Ücretsiz E-Ticaret Araçları</h1>
          <p className="intro">
            Kârlılık, reklam ve operasyon verilerinizi görünür sonuçlara dönüştürün. Kayıt olmadan
            başlayın; yöntemleri açıkça inceleyin.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
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
            placeholder="Araç ara (ör. roas, komisyon, marj)…"
            aria-label="Araçlarda ara"
          />
        </div>

        <div className="grid">
          {filteredTools.map((tool) => (
            <a key={tool.href} href={tool.href} className="card" style={{ textDecoration: 'none' }}>
              <span className="tag live">{tool.badge}</span>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <span className="link">{tool.cta}</span>
            </a>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

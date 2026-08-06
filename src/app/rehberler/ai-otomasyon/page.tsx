import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { guides } from '@/lib/guides'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'E-Ticarette Yapay Zekâ ve Otomasyon Rehberi',
  description:
    'E-ticarette AI alışveriş hazırlığı, ürün verisi, otomasyon iş akışları ve insan onayı için güvenli öğrenme yolu.',
  alternates: { canonical: '/rehberler/ai-otomasyon' },
}

const guideSlugs = ['ai-alisveris-ajanlarina-hazirlik']
const workflows = [
  [
    '01',
    'Ürün verisini hazırlayın',
    'SKU, varyant, fiyat, stok, teslimat ve iade alanlarını tek doğruluk kaynağında eşitleyin.',
  ],
  [
    '02',
    'İş akışını sınırlayın',
    'AI çıktısını doğrudan yayınlamak yerine taslak, doğrulama ve onay adımlarına ayırın.',
  ],
  [
    '03',
    'Sonucu ölçün',
    'AI trafiğini yalnız tıklamayla değil; sipariş, iptal, iade ve katkı payıyla değerlendirin.',
  ],
]
const tools = [
  {
    title: 'AI Alışveriş Görünürlük Denetimi',
    description:
      'Ürün verisi, bulunabilirlik, senkronizasyon ve ölçüm hazırlığını açık skorla kontrol edin.',
    href: '/araclar/ai-alisveris-gorunurluk-denetimi',
  },
  {
    title: 'Ürün Feed Sağlık Kontrolü',
    description:
      'Katalog alanlarını, zorunlu değerleri ve kanal uyumsuzluklarını yayın öncesi tarayın.',
    href: '/araclar/urun-feed-saglik-kontrolu',
  },
  {
    title: 'AI Merchant Feed Alan Sözlüğü',
    description: 'Ürün feed alanlarını sahip, kaynak ve doğrulama kuralıyla kayıt altına alın.',
    href: '/sablonlar/ai-merchant-feed-alan-sozlugu',
  },
]
const guardrails = [
  ['Veri', 'Müşteri veya sipariş bilgisini gereksiz yere modele göndermeyin.'],
  ['Doğruluk', 'Fiyat, stok, teslimat ve iade alanlarını yayın öncesi kaynak sistemle eşleştirin.'],
  ['İnsan', 'İndirim, ürün iddiası, müşteri yanıtı ve kampanya değişikliği için sahip atayın.'],
  ['İz', 'Prompt sürümü, kaynak veri, çıktı ve son onay tarihini kaydedin.'],
]

export default function AiAutomationPillarPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const clusterGuides = guideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metadata.title,
    description: metadata.description,
    url: `${siteUrl}/rehberler/ai-otomasyon`,
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    hasPart: clusterGuides.map((guide) => ({
      '@type': 'Article',
      name: guide?.title,
      url: `${siteUrl}/rehberler/${guide?.slug}`,
    })),
  }

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />
      <section className="hero-shell ai-pillar-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> AI & OTOMASYON / ANA ÖĞRENME YOLU
            </div>
            <h1>
              AI ekleyin değil, <span className="accent">kontrollü sistem</span> kurun.
            </h1>
            <p className="intro">
              Ürün verisi, otomasyon ve yapay zekâ çıktısını aynı güven, insan onayı ve ölçüm
              çerçevesinde e-ticaret kararlarına bağlayın.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#ogrenme-yolu">
                Öğrenme yoluna başla ↘
              </a>
              <a className="hero-link" href="/araclar/ai-alisveris-gorunurluk-denetimi">
                Hazırlığı denetle
              </a>
            </div>
            <div className="signals">
              <span className="tag">
                <i />1 uygulama rehberi
              </span>
              <span className="tag">
                <i />2 çalışan denetim aracı
              </span>
              <span className="tag">
                <i />
                İnsan onayı çerçevesi
              </span>
            </div>
          </div>
          <div className="ai-console" aria-label="AI iş akışı güvenlik katmanları">
            <span className="eyebrow">AI WORKFLOW / GATE</span>
            {[
              ['01', 'GİRDİ', 'Kaynak veri'],
              ['02', 'ÜRETİM', 'Model çıktısı'],
              ['03', 'KONTROL', 'İnsan onayı'],
              ['04', 'ÖLÇÜM', 'Sipariş · iade'],
            ].map(([index, title, note]) => (
              <div key={index}>
                <small>{index}</small>
                <strong>{title}</strong>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-dark ai-principle">
        <div className="wrap section">
          <span className="eyebrow">60 SANİYELİK ÇERÇEVE</span>
          <h2>Otomasyon hız kazandırır. Kontrol katmanı güven oluşturur.</h2>
          <p>
            AI çıktısı doğrudan yayınlandığında hata maliyeti görünmezleşir. Kaynağı, kuralı, onayı
            ve sonucu aynı akışta tutun; model değişse bile operasyon standardınız kalsın.
          </p>
        </div>
      </section>
      <section id="ogrenme-yolu" className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">ADIM ADIM / ÖĞRENME YOLU</span>
              <h2>Önce veriyi, sonra modeli çalıştırın.</h2>
            </div>
            <p>
              AI alışveriş hazırlığıyla başlayın; feed, otomasyon ve ölçüm kapılarını sırayla kurun.
            </p>
          </div>
          <div className="profitability-path">
            {clusterGuides.map(
              (guide, index) =>
                guide && (
                  <a key={guide.slug} href={`/rehberler/${guide.slug}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <small>
                        {guide.category} · {guide.readingTime} DK
                      </small>
                      <h3>{guide.title}</h3>
                      <p>{guide.excerpt}</p>
                    </div>
                    <i>Rehberi aç →</i>
                  </a>
                ),
            )}
            {workflows.map(([index, title, description]) => (
              <div key={index} className="ai-workflow-row">
                <span>{index}</span>
                <div>
                  <small>OPERASYON KAPISI</small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <i>Uygulama katmanı</i>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-purple">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">GÜVENLİK KATMANI</span>
              <h2>Her AI akışında dört kapı.</h2>
            </div>
            <p>
              Modelin iyi cevap vermesi yeterli değildir; veri ve karar zinciri de denetlenebilir
              olmalıdır.
            </p>
          </div>
          <div className="ai-guardrail-grid">
            {guardrails.map(([title, description]) => (
              <article key={title}>
                <span>{title}</span>
                <h3>{description}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">ÇALIŞAN ARAÇLAR</span>
              <h2>Hazırlığı dosya ve skorla görün.</h2>
            </div>
            <p>AI yatırımı için önce mevcut veri kalitesini ve yayın kapılarını ölçün.</p>
          </div>
          <div className="grid profitability-tools">
            {tools.map((tool, index) => (
              <a key={tool.href} className="card" href={tool.href}>
                <span className="eyebrow">0{index + 1} · ÜCRETSİZ</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="link">Aç ve denetle →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-surface">
        <div className="wrap section ai-next">
          <div>
            <span className="eyebrow">SONRAKİ ADIM</span>
            <h2>Kendi AI iş akışınızı küçük bir görevle başlatın.</h2>
          </div>
          <div>
            <p>
              İlk otomasyonu tüm operasyonu kapsayacak şekilde değil, kaynağı ve başarısı
              ölçülebilen tek bir görevle deneyin.
            </p>
            <a className="btn alt" href="/sablonlar">
              Şablon kütüphanesine geç →
            </a>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

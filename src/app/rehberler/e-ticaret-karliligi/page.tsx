import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { guides } from '@/lib/guides'
import { glossaryTerms } from '@/lib/glossary'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'E-Ticaret Kârlılığı: Baştan Sona Rehber',
  description:
    'Ürün maliyeti, katkı payı, ROAS, CPA, indirim ve iadeyi tek bir e-ticaret kârlılık sisteminde birleştirin.',
  alternates: { canonical: '/rehberler/e-ticaret-karliligi' },
}

const guideSlugs = [
  'basabas-roas-nasil-hesaplanir',
  'e-ticaret-kar-marji-nasil-hesaplanir',
  'katki-payi-nedir',
  'maksimum-cpa-nasil-hesaplanir',
  'iade-orani-karliliga-nasil-eklenir',
  'indirim-karliligi-nasil-hesaplanir',
  'roas-yuksekken-kar-neden-duser',
  'mer-nedir-nasil-hesaplanir',
]

const toolCards = [
  {
    title: 'Başabaş ROAS Hesaplayıcı',
    description: 'Reklamda zarar etmeye başladığınız ROAS ve CPA sınırını bulun.',
    href: '/araclar/basabas-roas-hesaplayici',
  },
  {
    title: 'Kâr Marjı Hesaplayıcı',
    description: 'Ürün başına katkı payını ve marj katmanlarını hesaplayın.',
    href: '/araclar/kar-marji-hesaplayici',
  },
  {
    title: 'İndirim Kârlılık Simülatörü',
    description: 'İndirim sonrası gerekli ek satış hacmini karşılaştırın.',
    href: '/araclar/indirim-karlilik-simulatoru',
  },
  {
    title: 'Pazaryeri Komisyon Hesaplayıcı',
    description: 'Komisyon ve operasyon giderleri sonrası net sonucu görün.',
    href: '/araclar/pazaryeri-komisyon-hesaplayici',
  },
]

export default function ProfitabilityPillarPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const clusterGuides = guideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter(Boolean)
  const clusterTerms = glossaryTerms
    .filter((term) => ['Kârlılık', 'Reklam'].includes(term.category))
    .slice(0, 10)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Ticaret Kârlılığı: Baştan Sona Rehber',
    description: metadata.description,
    url: `${siteUrl}/rehberler/e-ticaret-karliligi`,
    inLanguage: 'tr-TR',
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

      <section className="hero-shell profitability-pillar-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" />
              E-TİCARET KÂRLILIĞI / ANA ÖĞRENME YOLU
            </div>
            <h1>
              Satışı değil, <span className="accent">gerçek katkıyı</span> büyütün.
            </h1>
            <p className="intro">
              Ürün maliyetinden reklama, iadeden indirime kadar bütün kâr katmanlarını tek bir karar
              sistemi içinde kurun.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#ogrenme-yolu">
                Öğrenme yoluna başla ↘
              </a>
              <a className="hero-link" href="/araclar">
                Doğrudan hesapla
              </a>
            </div>
            <div className="signals">
              <span className="tag">
                <i />8 uygulama rehberi
              </span>
              <span className="tag">
                <i />4 çalışan araç
              </span>
              <span className="tag">
                <i />
                10 temel kavram
              </span>
            </div>
          </div>

          <div className="profitability-stack" aria-label="E-ticaret kârlılık katmanları">
            <span className="eyebrow">KÂR KATMANLARI</span>
            <div>
              <small>01</small>
              <strong>Net satış</strong>
              <p>İndirim, iptal ve iade kapsamı tanımlı gelir.</p>
            </div>
            <div>
              <small>02</small>
              <strong>Brüt kâr</strong>
              <p>Ürün maliyeti sonrası kalan temel marj.</p>
            </div>
            <div>
              <small>03</small>
              <strong>Katkı payı</strong>
              <p>Komisyon, kargo ve değişken giderler sonrası kalan.</p>
            </div>
            <div>
              <small>04</small>
              <strong>Reklam sonrası katkı</strong>
              <p>Edinme maliyeti sonrası sabit gider ve kâr için kalan.</p>
            </div>
            <div>
              <small>05</small>
              <strong>Net kâr</strong>
              <p>Bütün faaliyet giderleri sonrası şirket sonucu.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-dark profitability-principle">
        <div className="wrap section">
          <span className="eyebrow">60 SANİYELİK ÇERÇEVE</span>
          <h2>Ciro sonuçtur. Kârlılık, katmanları doğru kurma işidir.</h2>
          <p>
            Her siparişte net gelirden ürün, komisyon, ödeme, kargo, paketleme, iade rezervi ve
            reklam maliyetini çıkarın. Kalan katkıyı sabit gider ve hedef kârla karşılaştırın. ROAS,
            CPA ve indirim hedeflerini ancak bundan sonra belirleyin.
          </p>
        </div>
      </section>

      <section id="ogrenme-yolu" className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">ADIM ADIM / 8 REHBER</span>
              <h2>Kârlılık öğrenme yolu.</h2>
            </div>
            <p>Temelden başlayın; reklam ve kampanya kararlarına aynı ekonomik dili taşıyın.</p>
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
          </div>
        </div>
      </section>

      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">HESAPLAMA KATMANI</span>
              <h2>Formülü kendi verinizle çalıştırın.</h2>
            </div>
            <p>Rehberde öğrendiğiniz yöntemi kayıt olmadan senaryoya dönüştürün.</p>
          </div>
          <div className="grid profitability-tools">
            {toolCards.map((tool, index) => (
              <a key={tool.href} className="card" href={tool.href}>
                <span className="eyebrow">0{index + 1} · ÜCRETSİZ ARAÇ</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="link">Aracı aç</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-surface">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">KAVRAM HARİTASI</span>
              <h2>Aynı metrik dilini kurun.</h2>
            </div>
            <p>Formül ve kısa örnek için ilgili sözlük maddesine geçin.</p>
          </div>
          <div className="pillar-term-grid">
            {clusterTerms.map((term) => (
              <a key={term.slug} href={`/sozluk/${term.slug}`}>
                <span>{term.english}</span>
                <strong>{term.term}</strong>
                <i>Tanımı aç →</i>
              </a>
            ))}
          </div>
          <a className="btn alt pillar-all-terms" href="/sozluk">
            Tüm kavramları gör →
          </a>
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

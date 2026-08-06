import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { guides } from '@/lib/guides'
import { glossaryTerms } from '@/lib/glossary'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'LTV, CAC ve Tekrar Satış Ekonomisi Rehberi',
  description:
    'Yeni müşteri CAC, 90 günlük katkı LTV ve tekrar satış davranışını aynı kohort ekonomisi içinde ölçün.',
  alternates: { canonical: '/rehberler/musteri-ekonomisi' },
}

const guideSlugs = ['yeni-musteri-cac-katki-ltv-nasil-hesaplanir']
const termSlugs = ['cac', 'katki-payi', 'ortalama-sepet-tutari', 'iade-orani']
const toolCards = [
  {
    title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV',
    description:
      'Edinme harcaması, ilk sipariş ve tekrar sipariş katkısını aynı kohortta hesaplayın.',
    href: '/araclar/yeni-musteri-cac-katki-ltv-hesaplayici',
  },
  {
    title: 'Kâr Marjı Hesaplayıcı',
    description:
      'LTV hesabına girecek ilk ve tekrar sipariş katkısını maliyetleriyle birlikte kurun.',
    href: '/araclar/kar-marji-hesaplayici',
  },
]

export default function CustomerEconomicsPillarPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const clusterGuides = guideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter(Boolean)
  const clusterTerms = termSlugs
    .map((slug) => glossaryTerms.find((term) => term.slug === slug))
    .filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'LTV, CAC ve Tekrar Satış Ekonomisi Rehberi',
    description: metadata.description,
    url: `${siteUrl}/rehberler/musteri-ekonomisi`,
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
      <section className="hero-shell customer-pillar-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> MÜŞTERİ EKONOMİSİ / ANA ÖĞRENME YOLU
            </div>
            <h1>
              İlk siparişi değil, <span className="accent">geri ödemeyi</span> büyütün.
            </h1>
            <p className="intro">
              CAC, ilk sipariş katkısı ve tekrar satış değerini aynı müşteri kohortunda
              birleştirerek büyümenin nakit ve marj etkisini görün.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#ogrenme-yolu">
                Kohort yoluna başla ↘
              </a>
              <a className="hero-link" href="/araclar/yeni-musteri-cac-katki-ltv-hesaplayici">
                Doğrudan hesapla
              </a>
            </div>
            <div className="signals">
              <span className="tag">
                <i />1 uygulama rehberi
              </span>
              <span className="tag">
                <i />2 çalışan hesaplayıcı
              </span>
              <span className="tag">
                <i />
                90 günlük ölçüm penceresi
              </span>
            </div>
          </div>
          <div className="customer-console" aria-label="Müşteri ekonomisi kohort akışı">
            <div className="customer-console-head">
              <span className="eyebrow">KOHORT KONSOLU</span>
              <i>ÖLÇÜLEBİLİR PENCERE</i>
            </div>
            <div className="customer-console-flow">
              <div>
                <small>01 / EDİNME</small>
                <strong>CAC</strong>
                <p>Doğrulanmış yeni müşteri maliyeti.</p>
              </div>
              <div>
                <small>02 / İLK SİPARİŞ</small>
                <strong>Katkı</strong>
                <p>İlk siparişte geri kazanılan değer.</p>
              </div>
              <div>
                <small>03 / TEKRAR</small>
                <strong>30 · 60 · 90</strong>
                <p>Kohortun olgunlaşan tekrar katkısı.</p>
              </div>
              <div>
                <small>04 / GERİ ÖDEME</small>
                <strong>LTV : CAC</strong>
                <p>Değerin maliyeti hangi sürede karşıladığı.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-band band-dark customer-principle">
        <div className="wrap section">
          <span className="eyebrow">60 SANİYELİK ÇERÇEVE</span>
          <h2>Gelir LTV’si büyüyebilir. Katkı LTV’si karar verir.</h2>
          <p>
            Yeni müşteri sayısını yalnız reklam platformundan almayın. CRM kimliğiyle kohortu
            doğrulayın; ilk ve tekrar sipariş katkısını aynı maliyet sözlüğüyle ölçün. 90 günlük
            pencereyi sonsuz yaşam boyu tahmini gibi sunmayın.
          </p>
        </div>
      </section>
      <section id="ogrenme-yolu" className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">ADIM ADIM / {clusterGuides.length} REHBER</span>
              <h2>Müşteri ekonomisi yolu.</h2>
            </div>
            <p>
              Önce müşteri kimliğini ve maliyet kapsamını sabitleyin; sonra tekrar satış değerini
              olgunlaştırın.
            </p>
          </div>
          <div className="profitability-path customer-path">
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
              <h2>Kohortu kendi verinizle çalıştırın.</h2>
            </div>
            <p>
              CAC ve katkı LTV’yi tek bir “iyi oran” aramak yerine geri ödeme ihtiyacınızla
              karşılaştırın.
            </p>
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
              <h2>Aynı müşteri dilini kurun.</h2>
            </div>
            <p>Her kavramı formül, kapsam ve ilgili kararla birlikte okuyun.</p>
          </div>
          <div className="pillar-term-grid">
            {clusterTerms.map(
              (term) =>
                term && (
                  <a key={term.slug} href={`/sozluk/${term.slug}`}>
                    <span>{term.english}</span>
                    <strong>{term.term}</strong>
                    <i>Tanımı aç →</i>
                  </a>
                ),
            )}
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

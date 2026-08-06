import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { researchGuides } from '@/lib/research-guides'
import { glossaryTerms } from '@/lib/glossary'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'E-Ticaret Teknoloji Yığını Kurma Rehberi',
  description:
    'Altyapı, CRM, analitik, destek, ERP ve entegrasyonları toplam sahip olma maliyeti ve veri güveniyle değerlendirin.',
  alternates: { canonical: '/rehberler/saas-teknoloji' },
}
const termSlugs = ['roas', 'mer', 'cac', 'katki-payi']
const toolCards = [
  {
    title: 'E-Ticaret Strateji ve Pazarlama Analizi',
    description: 'Teknoloji yatırımının ürün, kanal ve sabit gider kararına etkisini senaryolayın.',
    href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
  },
  {
    title: 'AI Merchant Feed Alan Sözlüğü',
    description:
      'Sistemler arasında ortak ürün alanlarını, sahipleri ve doğrulama kurallarını belgeleyin.',
    href: '/sablonlar/ai-merchant-feed-alan-sozlugu',
  },
]

export default function TechStackPillarPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const guide = researchGuides.find((item) => item.slug === 'e-ticaret-karlilik-isletim-sistemi')
  const clusterTerms = termSlugs
    .map((slug) => glossaryTerms.find((term) => term.slug === slug))
    .filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Ticaret Teknoloji Yığını Kurma Rehberi',
    description: metadata.description,
    url: `${siteUrl}/rehberler/saas-teknoloji`,
    inLanguage: 'tr-TR',
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    hasPart: guide
      ? [{ '@type': 'Article', name: guide.title, url: `${siteUrl}/rehberler/${guide.slug}` }]
      : [],
  }
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />
      <section className="hero-shell tech-pillar-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> SAAS VE TEKNOLOJİ YIĞINI / ANA ÖĞRENME YOLU
            </div>
            <h1>
              Daha çok araç değil, <span className="accent">daha iyi sistem</span> kurun.
            </h1>
            <p className="intro">
              Altyapı, CRM, analitik, destek ve entegrasyonları özellik listesiyle değil; veri
              akışı, operasyon yükü ve toplam sahip olma maliyetiyle karşılaştırın.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#ogrenme-yolu">
                Sistem yoluna başla ↘
              </a>
              <a className="hero-link" href="/araclar/e-ticaret-strateji-pazarlama-analizi">
                Senaryo çalıştır
              </a>
            </div>
            <div className="signals">
              <span className="tag">
                <i />1 temel rehber
              </span>
              <span className="tag">
                <i />2 uygulama kaynağı
              </span>
              <span className="tag">
                <i />
                TCO odaklı karar
              </span>
            </div>
          </div>
          <div className="tech-console" aria-label="Teknoloji yığını karar akışı">
            <div className="tech-console-head">
              <span className="eyebrow">STACK KARAR KONSOLU</span>
              <i>VERİ → İŞ → MALİYET</i>
            </div>
            <div className="tech-console-flow">
              <div>
                <small>01 / KAYNAK</small>
                <strong>Veri akışı</strong>
                <p>Hangi sistem neyin sahibi?</p>
              </div>
              <div>
                <small>02 / OPERASYON</small>
                <strong>İş yükü</strong>
                <p>Kim kuruyor, kim sürdürüyor?</p>
              </div>
              <div>
                <small>03 / ENTEGRASYON</small>
                <strong>Bağlantı</strong>
                <p>Hata, gecikme ve kilitlenme riski.</p>
              </div>
              <div>
                <small>04 / EKONOMİ</small>
                <strong>TCO</strong>
                <p>Lisans + kurulum + fırsat maliyeti.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-band band-dark tech-principle">
        <div className="wrap section">
          <span className="eyebrow">60 SANİYELİK ÇERÇEVE</span>
          <h2>En iyi teknoloji en çok özelliğe sahip olan değildir.</h2>
          <p>
            Doğru sistem; kritik veriyi sahiplenir, ekip kararını hızlandırır ve toplam maliyeti
            görünür kılar. Abonelik fiyatına kurulum, entegrasyon, veri taşıma, eğitim, bakım ve
            çıkış maliyetlerini de ekleyin.
          </p>
        </div>
      </section>
      <section id="ogrenme-yolu" className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">ADIM ADIM / 1 REHBER</span>
              <h2>Teknoloji sistemi yolu.</h2>
            </div>
            <p>Önce işletim modelini ve veri sahipliğini tanımlayın; sonra araç seçimini yapın.</p>
          </div>
          <div className="profitability-path tech-path">
            {guide && (
              <a href={`/rehberler/${guide.slug}`}>
                <span>01</span>
                <div>
                  <small>
                    {guide.category} · {guide.readingTime} DK
                  </small>
                  <h3>{guide.title}</h3>
                  <p>{guide.excerpt}</p>
                </div>
                <i>Rehberi aç →</i>
              </a>
            )}
          </div>
        </div>
      </section>
      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">UYGULAMA KATMANI</span>
              <h2>Sistemi maliyet ve veriyle test edin.</h2>
            </div>
            <p>Teknoloji kararını ürün ekonomisi ve veri sözleşmesiyle birlikte görünür kılın.</p>
          </div>
          <div className="grid profitability-tools">
            {toolCards.map((tool, index) => (
              <a key={tool.href} className="card" href={tool.href}>
                <span className="eyebrow">0{index + 1} · KAYNAK</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="link">Aç →</span>
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
              <h2>Sistemi aynı metriklerle değerlendirin.</h2>
            </div>
            <p>Aracı değil, karar etkisini ölçmek için ortak kavramları kullanın.</p>
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

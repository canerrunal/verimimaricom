import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import CollaborationForm from '@/components/contact/CollaborationForm'
import JsonLd from '@/components/common/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { brandProfile, getSiteUrl } from '@/lib/seo'

const routePath = '/e-ticaret-danismani'

export const metadata: Metadata = {
  title: { absolute: 'E-Ticaret ve Dijital Pazarlama Danışmanı | Caner Ünal' },
  description:
    'E-ticaret kârlılığı, reklam performansı, ölçüm altyapısı ve AI otomasyonu için veri odaklı e-ticaret ve dijital pazarlama danışmanlığı.',
  keywords: [
    'e-ticaret danışmanı',
    'e-ticaret uzmanı',
    'dijital pazarlama uzmanı',
    'dijital pazarlama danışmanı',
    'e-ticaret danışmanlığı',
    'e-ticaret büyüme danışmanlığı',
  ],
  alternates: { canonical: routePath },
  openGraph: {
    title: 'E-Ticaret ve Dijital Pazarlama Danışmanı | Caner Ünal',
    description:
      'Reklam, kârlılık, ölçüm ve otomasyonu tek karar sisteminde birleştiren danışmanlık yaklaşımı.',
    type: 'website',
    url: routePath,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret ve Dijital Pazarlama Danışmanı | Caner Ünal',
    description: 'E-ticaret büyümesi için veriye dayalı analiz, yol haritası ve uygulama sistemi.',
  },
}

const services = [
  {
    number: '01',
    title: 'E-Ticaret Kârlılık ve Büyüme Analizi',
    description:
      'Ürün marjı, komisyon, kargo, iade, CAC, LTV ve reklam harcamasını birlikte okuyarak büyümenin gerçekten kârlı olup olmadığını ortaya çıkarırız.',
    links: [
      { label: 'Kârlılık yöntemlerini incele', href: '/rehberler/e-ticaret-karliligi' },
      { label: 'Strateji aracını kullan', href: '/araclar/e-ticaret-strateji-pazarlama-analizi' },
    ],
  },
  {
    number: '02',
    title: 'Dijital Pazarlama ve Ölçüm Stratejisi',
    description:
      'Google Ads, Meta ve pazaryeri reklamlarını yalnızca panel ROAS’ıyla değil; katkı payı, yeni müşteri maliyeti ve toplam pazarlama verimliliğiyle değerlendiririz.',
    links: [
      { label: 'Reklam ölçüm rehberini aç', href: '/rehberler/reklam-performansi' },
      { label: 'ROAS ve MER’i karşılaştır', href: '/karsilastirmalar/roas-vs-mer' },
    ],
  },
  {
    number: '03',
    title: 'AI ve Operasyon Otomasyonu',
    description:
      'Raporlama, ürün verisi, yorum analizi ve tekrarlanan operasyon adımlarını; insan kontrolünü ve veri güvenliğini koruyan uygulanabilir iş akışlarına dönüştürürüz.',
    links: [
      { label: 'AI otomasyon yolunu incele', href: '/rehberler/ai-otomasyon' },
      { label: 'Feed sağlığını denetle', href: '/araclar/urun-feed-saglik-kontrolu' },
    ],
  },
]

const process = [
  ['01', 'Durum haritası', 'Hedef, veri kaynakları, darboğazlar ve karar soruları netleştirilir.'],
  ['02', 'Karar modeli', 'Kârlılığı ve kanal performansını açıklayan metrik zinciri kurulur.'],
  ['03', 'Öncelik planı', 'Etki ve uygulama maliyetine göre 30–90 günlük yol haritası çıkarılır.'],
  [
    '04',
    'Ölçüm döngüsü',
    'Sonuçların hangi veriyle, ne sıklıkta ve kim tarafından izleneceği belirlenir.',
  ],
]

const faqs = [
  {
    question: 'E-ticaret danışmanı ne yapar?',
    answer:
      'E-ticaret danışmanı; satış, ürün, reklam ve operasyon verilerini birlikte değerlendirerek kârlılığı sınırlayan sorunları belirler. Veri Mimarı yaklaşımında çıktı yalnızca sunum değil; açık hesaplama modeli, önceliklendirilmiş aksiyon planı ve ölçüm çerçevesidir.',
  },
  {
    question: 'Dijital pazarlama danışmanlığı hangi alanları kapsar?',
    answer:
      'Kapsam; ölçüm altyapısı, bütçe dağılımı, Google Ads ve Meta performansı, pazaryeri reklamları, CAC, LTV, ROAS, MER ve dönüşüm darboğazlarını içerir. Kanal yönetiminden önce işletme hedefi ve kârlılık sınırı netleştirilir.',
  },
  {
    question: 'Hangi e-ticaret ekipleri için uygundur?',
    answer:
      'Satışı bulunan ancak hangi ürünün, kanalın veya kampanyanın gerçek katkı ürettiğini net göremeyen markalar; ölçüm sistemini kurmak isteyen ekipler ve tekrarlanan veri işlerini otomatikleştirmek isteyen işletmeler için uygundur.',
  },
  {
    question: 'Danışmanlık süreci nasıl başlar?',
    answer:
      'Formda mevcut durumunuzu, hedefinizi ve temel darboğazı paylaşırsınız. İlk değerlendirmede problemin kapsamı, gerekli veri ve uygun çalışma biçimi netleştirilir; kapsam uygun değilse bu da açıkça belirtilir.',
  },
]

function getPageJsonLd() {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}${routePath}`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'E-Ticaret ve Dijital Pazarlama Danışmanı | Caner Ünal',
      description: metadata.description,
      inLanguage: 'tr-TR',
      isPartOf: { '@id': `${siteUrl}#website` },
      about: { '@id': `${siteUrl}#service` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}${brandProfile.image}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'E-Ticaret Danışmanlığı',
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]
}

export default function ETicaretDanismaniPage() {
  const t = getDictionary('tr')
  const jsonLd = getPageJsonLd()

  return (
    <main className="page consulting-page">
      {jsonLd.map((schema, index) => (
        <JsonLd key={index} id={`consulting-schema-${index}`} data={schema} />
      ))}
      <NavBar t={t} />

      <section className="hero-shell consulting-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> E-TİCARET / DİJİTAL PAZARLAMA / DANIŞMANLIK
            </div>
            <h1>
              E-ticaret ve <span className="accent">dijital pazarlama</span> danışmanı.
            </h1>
            <p className="intro">
              Ben Caner Ünal. E-ticaret kârlılığını, reklam performansını ve operasyon verisini tek
              karar sisteminde birleştiriyorum. Çıktı; daha fazla rapor değil, uygulanabilir bir
              büyüme planı.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#proje-formu">
                Çalışma kapsamını paylaş <span>↓</span>
              </a>
              <a className="hero-link" href="#hizmetler">
                Danışmanlık alanlarını incele ↗
              </a>
            </div>
            <div className="signals" aria-label="Danışmanlık özellikleri">
              <span className="tag">
                <i /> Açık yöntem
              </span>
              <span className="tag">
                <i /> Kârlılık odağı
              </span>
              <span className="tag">
                <i /> Türkiye · Uzaktan
              </span>
            </div>
          </div>

          <aside className="panel consulting-brief" aria-label="Danışmanlık yaklaşımı özeti">
            <span className="eyebrow">KARAR SİSTEMİ / 04 KATMAN</span>
            <strong>Reklam panelinden işletme gerçeğine.</strong>
            <dl>
              <div>
                <dt>01</dt>
                <dd>Ürün ekonomisi</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Reklam verimliliği</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Müşteri değeri</dd>
              </div>
              <div>
                <dt>04</dt>
                <dd>Operasyon ve otomasyon</dd>
              </div>
            </dl>
            <a className="link" href="/analizler">
              Örnek analizleri ve yöntemi gör
            </a>
          </aside>
        </div>
      </section>

      <section id="hizmetler" className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · DANIŞMANLIK ALANLARI</span>
              <h2>Uzmanlık, kararın çalıştığı yerde başlar.</h2>
            </div>
            <p>
              E-ticaret uzmanı ve dijital pazarlama danışmanı desteği; kanal listesinden önce
              işletmenin ekonomi modelini anlamalıdır.
            </p>
          </div>
          <div className="grid consulting-service-grid">
            {services.map((service) => (
              <article key={service.number} className="card consulting-service-card">
                <span className="eyebrow">{service.number} / ÇALIŞMA ALANI</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="consulting-card-links">
                  {service.links.map((link) => (
                    <a key={link.href} className="link" href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · ÇALIŞMA MODELİ</span>
              <h2>Teşhisten ölçüm döngüsüne.</h2>
            </div>
            <p>Her adımın girdisi, çıktısı ve karar sahibi görünür tutulur.</p>
          </div>
          <ol className="consulting-process-grid">
            {process.map(([number, title, detail]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band band-dark consulting-proof">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 03 · YÖNTEM KANITI</span>
              <h2>Söylenen değil, yeniden hesaplanabilen.</h2>
            </div>
            <p>
              Veri Mimarı’ndaki ücretsiz araçlar ve açıklamalı analizler, danışmanlık yaklaşımının
              açık örnekleridir.
            </p>
          </div>
          <div className="grid">
            <a className="card" href="/araclar">
              <span className="eyebrow">11 CANLI ARAÇ</span>
              <h3>Rakamı karara çevirin.</h3>
              <p>ROAS, marj, komisyon, CAC ve LTV hesaplarını kendi verinizle test edin.</p>
              <span className="link">Ücretsiz araçları aç</span>
            </a>
            <a className="card" href="/analizler">
              <span className="eyebrow">AÇIK HESAP ZİNCİRİ</span>
              <h3>Varsayımı ve sınırı görün.</h3>
              <p>Kaynak, formül, karar ve sınırlamayı aynı yüzeyde inceleyin.</p>
              <span className="link">Analizleri incele</span>
            </a>
            <a className="card" href="/hakkinda">
              <span className="eyebrow">KURUCU PROFİLİ</span>
              <h3>Caner Ünal’ı tanıyın.</h3>
              <p>E-ticaret, dijital pazarlama, veri analizi ve AI yaklaşımını inceleyin.</p>
              <span className="link">Uzmanlık profilini aç</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-band band-paper consulting-faqs">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 04 · SIK SORULAN SORULAR</span>
              <h2>Başlamadan önce netleştirelim.</h2>
            </div>
          </div>
          <div className="consulting-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div id="proje-formu" className="consulting-form-anchor">
        <CollaborationForm />
      </div>
      <Footer t={t} />
    </main>
  )
}

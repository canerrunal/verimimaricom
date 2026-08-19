import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import JsonLd from '@/components/common/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { caseAnalyses } from '@/lib/cases'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: 'Caner Ünal | E-Ticaret ve Dijital Pazarlama Uzmanı' },
  description:
    'Veri Mimarı kurucusu Caner Ünal; e-ticaret kârlılığı, dijital pazarlama analitiği, reklam ölçümü ve yapay zekâ otomasyonu için çalışan sistemler geliştirir.',
  keywords: [
    'Caner Ünal',
    'Caner Ünal kimdir',
    'e-ticaret uzmanı',
    'dijital pazarlama uzmanı',
    'e-ticaret kârlılık danışmanı',
    'reklam analitiği uzmanı',
    'Veri Mimarı kurucusu',
  ],
  alternates: { canonical: '/hakkinda' },
  openGraph: {
    title: 'Caner Ünal | Veri Mimarı Kurucusu',
    description:
      'E-ticaret kârlılığı, reklam analitiği ve AI otomasyonunu çalışan karar sistemlerine dönüştüren uzmanlık profili.',
    type: 'profile',
    url: '/hakkinda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caner Ünal | E-Ticaret ve Dijital Pazarlama Uzmanı',
    description:
      'E-ticaret kârlılığı, reklam analitiği ve AI otomasyonu için açık yöntemler ve çalışan sistemler.',
  },
}

const focusAreas = [
  {
    number: '01',
    eyebrow: 'BİRİM EKONOMİSİ',
    title: 'E-ticaret kârlılığı',
    description:
      'Ürün marjı, komisyon, kargo, iade, reklam harcaması ve müşteri ekonomisini aynı karar modelinde birleştiriyorum.',
  },
  {
    number: '02',
    eyebrow: 'ÖLÇÜM VE BÜYÜME',
    title: 'Dijital pazarlama analitiği',
    description:
      'ROAS, MER, CAC ve LTV metriklerini panel raporundan çıkarıp işletmenin gerçek katkısıyla uzlaştırıyorum.',
  },
  {
    number: '03',
    eyebrow: 'UYGULAMA KATMANI',
    title: 'Yapay zekâ ve otomasyon',
    description:
      'Raporlama, ürün verisi ve tekrarlanan operasyonları insan kontrolünü koruyan ölçülebilir iş akışlarına dönüştürüyorum.',
  },
]

const publicProof = [
  {
    eyebrow: 'ÇALIŞAN ARAÇLAR',
    title: 'Formülü görünen hesaplayıcılar',
    description:
      'Başa baş ROAS, kâr marjı, indirim, komisyon, CAC ve LTV kararlarını tarayıcıda çalışan araçlara dönüştürüyorum.',
    href: '/araclar',
    cta: 'Araçları incele',
  },
  {
    eyebrow: 'PROJE ANALİZLERİ',
    title: 'Varsayımı ve sınırı açıklanan vakalar',
    description:
      'Anonimleştirilmiş proje analizlerinde veri kaynağını, yöntemi, kararı ve sonucun neyi kanıtlamadığını birlikte yayınlıyorum.',
    href: '/analizler',
    cta: 'Analizleri incele',
  },
  {
    eyebrow: 'YÖNTEM KÜTÜPHANESİ',
    title: 'Uygulanabilir e-ticaret rehberleri',
    description:
      'Kârlılık, reklam performansı, müşteri ekonomisi, pazaryerleri ve otomasyon için güncellenebilir yöntemler yayınlıyorum.',
    href: '/rehberler',
    cta: 'Rehberleri aç',
  },
  {
    eyebrow: 'ÜRÜN GELİŞTİRME',
    title: 'Problemi ürüne dönüştüren sistemler',
    description:
      'Veri Mimarı ve Zolm üzerinden analizi yalnızca anlatmakla bırakmayıp kullanılabilir yazılım ve karar yüzeyleri geliştiriyorum.',
    href: '/projeler',
    cta: 'Projeleri gör',
  },
]

const method = [
  [
    '01',
    'Teşhis',
    'İşletme hedefini, veri kaynaklarını ve kararın önündeki gerçek darboğazı netleştiririm.',
  ],
  ['02', 'Model', 'Metrikleri ürün ekonomisi ve katkı payıyla aynı hesaplama zincirine bağlarım.'],
  [
    '03',
    'Uygulama',
    'Kararı rapor, araç, entegrasyon veya otomasyon olarak çalışan sisteme dönüştürürüm.',
  ],
  [
    '04',
    'Doğrulama',
    'Sonucu veri kaynağı, varsayım, sınırlama ve sonraki ölçüm adımıyla birlikte değerlendiririm.',
  ],
]

const faqs = [
  {
    question: 'Caner Ünal kimdir?',
    answer:
      'Caner Ünal, e-ticaret verisini daha kârlı kararlara dönüştüren araçlar ve yöntemler geliştiren Veri Mimarı platformunun kurucusudur.',
  },
  {
    question: 'Caner Ünal hangi alanlarda çalışır?',
    answer:
      'Ana çalışma alanları e-ticaret kârlılığı, dijital pazarlama ve reklam analitiği, müşteri ekonomisi, ürün verisi ve yapay zekâ destekli operasyon otomasyonudur.',
  },
  {
    question: 'Uzmanlık yaklaşımı nasıl doğrulanabilir?',
    answer:
      'Veri Mimarı üzerindeki çalışan araçlar, yöntemi açıklanan rehberler, anonimleştirme notu taşıyan proje analizleri ve geliştirilen ürünler kamuya açık çalışma kanıtlarını oluşturur.',
  },
  {
    question: 'Caner Ünal ile nasıl çalışılır?',
    answer:
      'E-ticaret kârlılığı, reklam ölçümü veya AI otomasyonu ihtiyacı danışmanlık formuyla paylaşılır. Uygun kapsam; gerekli veri, beklenen çıktı ve ölçüm yöntemi netleştirildikten sonra belirlenir.',
  },
]

function getPageJsonLd() {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}/hakkinda`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${url}#profilepage`,
      url,
      name: 'Caner Ünal | E-Ticaret ve Dijital Pazarlama Uzmanı',
      description: metadata.description,
      inLanguage: 'tr-TR',
      dateModified: '2026-08-19',
      mainEntity: { '@id': `${siteUrl}#person` },
      isPartOf: { '@id': `${siteUrl}#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}${brandProfile.image}`,
      },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Caner Ünal', item: url },
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

export default function HakkindaPage() {
  const t = getDictionary('tr')
  const jsonLd = getPageJsonLd()
  const selectedAnalyses = caseAnalyses.slice(0, 3)

  return (
    <main className="page profile-page">
      {jsonLd.map((schema, index) => (
        <JsonLd key={index} id={`profile-schema-${index}`} data={schema} />
      ))}
      <NavBar t={t} />

      <section className="hero-shell profile-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> CANER ÜNAL / VERİ MİMARI KURUCUSU
            </div>
            <h1>
              E-ticaret verisini <span className="accent">kârlı kararlara</span> dönüştüren
              sistemler kuruyorum.
            </h1>
            <p className="intro">
              E-ticaret kârlılığı, dijital pazarlama analitiği ve yapay zekâ otomasyonunu aynı
              çalışma disiplininde birleştiriyorum.{' '}
              <strong>
                Yöntemi açıklıyor, aracı geliştiriyor ve sonucu doğrulanabilir hâle getiriyorum.
              </strong>
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#kamuya-acik-kanitlar">
                Çalışma kanıtlarını incele <span>↓</span>
              </a>
              <a className="hero-link" href="/e-ticaret-danismani">
                Danışmanlık kapsamını gör ↗
              </a>
            </div>
            <div className="signals" aria-label="Uzmanlık odağı">
              <span className="tag">
                <i /> E-ticaret kârlılığı
              </span>
              <span className="tag">
                <i /> Reklam analitiği
              </span>
              <span className="tag">
                <i /> AI otomasyonu
              </span>
            </div>
          </div>

          <aside className="panel profile-identity-card" aria-label="Caner Ünal profil özeti">
            <span className="eyebrow">DOĞRULANABİLİR PROFİL / TR</span>
            <strong>Caner Ünal</strong>
            <p>Veri Mimarı kurucusu ve sistem geliştiricisi.</p>
            <dl>
              <div>
                <dt>Ana odak</dt>
                <dd>E-ticaret kârlılığı</dd>
              </div>
              <div>
                <dt>Karar modeli</dt>
                <dd>ROAS → katkı → kâr</dd>
              </div>
              <div>
                <dt>Uygulama</dt>
                <dd>Araç · rehber · otomasyon</dd>
              </div>
              <div>
                <dt>Resmî kanal</dt>
                <dd>verimimari.com</dd>
              </div>
            </dl>
            <a className="link" href="mailto:hello@verimimari.com">
              hello@verimimari.com ↗
            </a>
          </aside>
        </div>
      </section>

      <section className="section-band band-paper profile-focus" aria-labelledby="uzmanlik-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · ANA UZMANLIK</span>
              <h2 id="uzmanlik-basligi">Birbirine bağlı üç karar alanı.</h2>
            </div>
            <p>
              Reklam performansını ürün ekonomisinden, otomasyonu da gerçek iş çıktısından ayırmadan
              ele alıyorum.
            </p>
          </div>
          <ol className="grid profile-focus-grid">
            {focusAreas.map((area) => (
              <li className="card" key={area.number}>
                <span className="eyebrow">
                  {area.number} · {area.eyebrow}
                </span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="kamuya-acik-kanitlar"
        className="section-band band-cyan profile-proof"
        aria-labelledby="kanit-basligi"
      >
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · KAMUYA AÇIK KANITLAR</span>
              <h2 id="kanit-basligi">Uzmanlık, görülebilen işe dönüşmeli.</h2>
            </div>
            <p>
              Buradaki kanıt standardı unvan değil; çalışan çıktı, açıklanan yöntem, veri kaynağı ve
              görünür sınırlamadır.
            </p>
          </div>
          <div className="grid profile-proof-grid">
            {publicProof.map((proof) => (
              <a className="card" href={proof.href} key={proof.title}>
                <span className="eyebrow">{proof.eyebrow}</span>
                <h3>{proof.title}</h3>
                <p>{proof.description}</p>
                <span className="link">{proof.cta} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-paper profile-method" aria-labelledby="yontem-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 03 · ÇALIŞMA YÖNTEMİ</span>
              <h2 id="yontem-basligi">Teşhisten doğrulamaya.</h2>
            </div>
            <p>Her çalışma, kararın nedenini ve sonraki ölçüm adımını görünür bırakır.</p>
          </div>
          <ol className="profile-method-grid">
            {method.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band band-dark profile-analysis" aria-labelledby="analiz-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 04 · SEÇİLİ ANALİZLER</span>
              <h2 id="analiz-basligi">Kararın arkasındaki hesap.</h2>
            </div>
            <p>
              Analizler anonimleştirme açıklaması, varsayımlar, veri kaynakları ve sınırlamalarla
              birlikte yayınlanır.
            </p>
          </div>
          <div className="grid profile-analysis-grid">
            {selectedAnalyses.map((analysis) => (
              <a className="card" href={`/analizler/${analysis.slug}`} key={analysis.slug}>
                <span className="eyebrow">{analysis.eyebrow}</span>
                <h3>{analysis.title}</h3>
                <p>{analysis.summary}</p>
                <span className="link">Analizi ve yöntemi gör ↗</span>
              </a>
            ))}
          </div>
          <div className="profile-disclosure">
            <span className="eyebrow">ŞEFFAFLIK NOTU</span>
            <p>
              Bu profil; kamuya açık çıktıları, yöntemleri ve geliştirilen sistemleri belgeler.
              Yayınlanmamış müşteri adı, doğrulanamayan başarı rakamı, ödül veya “en iyi uzman”
              iddiası içermez.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band band-paper profile-faq" aria-labelledby="sss-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 05 · KISA PROFİL</span>
              <h2 id="sss-basligi">Caner Ünal hakkında.</h2>
            </div>
          </div>
          <div className="profile-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="profile-final-cta panel">
            <div>
              <span className="eyebrow">PROJENİZİ PAYLAŞIN</span>
              <h2>Veriyi bir sonraki doğru karara bağlayalım.</h2>
              <p>
                E-ticaret kârlılığı, reklam ölçümü veya AI otomasyonu ihtiyacınızı mevcut veri ve
                beklenen çıktıyla birlikte değerlendirelim.
              </p>
            </div>
            <a className="btn hero-primary" href="/e-ticaret-danismani#proje-formu">
              Çalışma kapsamını paylaş ↗
            </a>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

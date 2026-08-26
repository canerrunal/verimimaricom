import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import NewsletterSection from '@/components/landing/NewsletterSection'
import JsonLd from '@/components/common/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { formatTurkishDate, getAiLabCatalog } from '@/lib/ai-lab-catalog'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Uygulamalı Yapay Zekâ Sistemleri ve Deneyleri',
  description:
    'Caner Ünal’ın e-ticaret, RAG, AI ajanları, otomasyon ve yerel model ölçümlerini çalışan sistemlere dönüştüren uygulamalı yapay zekâ merkezi.',
  alternates: { canonical: '/yapay-zeka' },
  openGraph: {
    title: 'Uygulamalı Yapay Zekâ | Caner Ünal ve Veri Mimarı',
    description:
      'Çalışan AI sistemleri, açık yöntemler, model ölçümleri ve e-ticaret uygulamaları.',
    url: '/yapay-zeka',
    type: 'website',
  },
}

const expertiseAreas = [
  {
    number: '01',
    title: 'AI ajanları ve karar sistemleri',
    description:
      'Kullanıcının sorusunu ürün, kârlılık ve operasyon verisiyle buluşturan; cevabın yanında kanıt ve sonraki aksiyon üreten sistemler.',
  },
  {
    number: '02',
    title: 'RAG ve bilgi mimarisi',
    description:
      'Dağınık kaynakları doğrulanan belgelere, aranabilir bilgi katmanına ve kaynak gösteren yanıtlara dönüştüren mimari.',
  },
  {
    number: '03',
    title: 'E-ticaret için uygulamalı AI',
    description:
      'Ürün feed’i, görünürlük, müşteri yorumu ve strateji verisini ölçülebilir e-ticaret kararlarına bağlayan araçlar.',
  },
  {
    number: '04',
    title: 'Otomasyon ve entegrasyon',
    description:
      'Model çıktısını doğrudan yayınlamak yerine veri doğrulama, insan onayı, kayıt ve sonuç ölçümü kapılarıyla yöneten iş akışları.',
  },
]

const workingSystems = [
  {
    eyebrow: 'KONUŞMALI KARAR ARACI',
    title: 'Veri Asistanı',
    description:
      'Veri Mimarı bilgi tabanı ve araçlarını kaynak gösteren, soruyu ölçülebilir karara dönüştüren konuşmalı sistem.',
    href: '/araclar/veri-asistani',
    cta: 'Asistanı deneyin',
  },
  {
    eyebrow: 'AI GÖRÜNÜRLÜK',
    title: 'Yapay Zekâ Görünürlük Analizi',
    description:
      'Bir markanın AI yanıtlarında anlaşılabilirlik, kaynaklanabilirlik ve varlık tutarlılığını kontrol eden denetim yüzeyi.',
    href: '/araclar/yapay-zeka-gorunurluk-analizi',
    cta: 'Görünürlüğü analiz edin',
  },
  {
    eyebrow: 'ÜRÜN VERİSİ',
    title: 'Ürün Feed Sağlık Kontrolü',
    description:
      'Katalog alanlarını AI alışveriş ve kanal yayınları öncesinde zorunlu değer, biçim ve tutarlılık kurallarıyla tarar.',
    href: '/araclar/urun-feed-saglik-kontrolu',
    cta: 'Feed’i kontrol edin',
  },
  {
    eyebrow: 'SİNYAL ÇIKARIMI',
    title: 'İade Nedeni ve Yorum Sinyali',
    description:
      'Serbest metin müşteri geri bildirimini ürün, operasyon ve içerik ekiplerinin kullanabileceği yapılandırılmış sinyallere ayırır.',
    href: '/araclar/iade-nedeni-yorum-sinyali',
    cta: 'Sinyalleri inceleyin',
  },
  {
    eyebrow: 'STRATEJİ ANALİZİ',
    title: 'E-ticaret Strateji ve Pazarlama Analizi',
    description:
      'Mağaza girdilerini büyüme, ölçüm ve operasyon başlıklarında önceliklendirilmiş değerlendirmeye dönüştürür.',
    href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
    cta: 'Analizi başlatın',
  },
  {
    eyebrow: 'AÇIK MODEL VERİSİ',
    title: 'Yerel Model Laboratuvarı',
    description:
      'Açık kaynak performans ölçümlerini donanım, hız, gecikme ve enerji verimliliği açısından Türkçe karar katmanına çevirir.',
    href: '/yapay-zeka/model-laboratuvari',
    cta: 'Ölçümleri keşfedin',
  },
]

const method = [
  [
    '01',
    'Problemi sınırla',
    'Modelden önce kullanıcıyı, kararı ve başarının nasıl ölçüleceğini tanımlarım.',
  ],
  [
    '02',
    'Veriyi doğrula',
    'Kaynak, güncellik, lisans ve veri kalitesini sistemin görünür bir parçası yaparım.',
  ],
  [
    '03',
    'Kontrollü uygula',
    'Üretim, doğrulama ve insan onayını tek bir izlenebilir iş akışına bağlarım.',
  ],
  [
    '04',
    'Sonucu ölç',
    'Çıktıyı tıklama sayısıyla değil; doğruluk, süre, maliyet ve iş sonucuyla değerlendiririm.',
  ],
]

export default function YapayZekaPage() {
  const t = getDictionary('tr')
  const catalog = getAiLabCatalog()
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Uygulamalı Yapay Zekâ Sistemleri ve Deneyleri',
    description: metadata.description,
    url: `${siteUrl}/yapay-zeka`,
    inLanguage: 'tr-TR',
    author: { '@id': `${siteUrl}#person`, name: brandProfile.name },
    hasPart: workingSystems.map((item) => ({
      '@type': 'SoftwareApplication',
      name: item.title,
      url: `${siteUrl}${item.href}`,
    })),
  }

  return (
    <main className="page ai-expertise-page">
      <JsonLd id="ai-expertise-schema" data={jsonLd} />
      <NavBar t={t} />

      <section className="hero-shell ai-expertise-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> CANER ÜNAL / UYGULAMALI YAPAY ZEKÂ
            </div>
            <h1>
              Yapay zekâyı anlatmakla kalmıyorum. <span className="accent">Çalışan sisteme</span>{' '}
              dönüştürüyorum.
            </h1>
            <p className="intro">
              E-ticaret verisi, RAG, AI ajanları ve otomasyonu; kaynağı görünen, insan kontrolünü
              koruyan ve sonucu ölçülebilen ürünlere dönüştürüyorum.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="/yapay-zeka/model-laboratuvari">
                Model laboratuvarını aç ↘
              </a>
              <a className="hero-link" href="/yapay-zeka/deneyler">
                Çalışan deneyleri görün
              </a>
            </div>
            <div className="signals" aria-label="Uygulamalı yapay zekâ kanıtları">
              <span className="tag">
                <i /> 5 çalışan AI aracı
              </span>
              <span className="tag">
                <i /> Açık yöntem
              </span>
              <span className="tag">
                <i /> Kaynak görünürlüğü
              </span>
            </div>
          </div>

          <aside className="ai-system-map" aria-label="Caner Ünal yapay zekâ uygulama yöntemi">
            <header>
              <span className="eyebrow">AI SYSTEM / CONTROL PLANE</span>
              <strong>Model tek başına ürün değildir.</strong>
            </header>
            <ol>
              {[
                ['01', 'PROBLEM', 'Karar ve başarı ölçütü'],
                ['02', 'VERİ', 'Kaynak · kalite · izin'],
                ['03', 'MODEL', 'Üretim · arama · sınıflama'],
                ['04', 'KONTROL', 'Kural · insan · kayıt'],
                ['05', 'ÖLÇÜM', 'Doğruluk · maliyet · etki'],
              ].map(([number, title, note]) => (
                <li key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <small>{note}</small>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="ai-proof-strip" aria-label="Yapay zekâ uzmanlık özeti">
        <div className="wrap">
          <div>
            <strong>RAG</strong>
            <span>Kaynaklı bilgi erişimi</span>
          </div>
          <div>
            <strong>AI ajanları</strong>
            <span>Görev ve karar akışları</span>
          </div>
          <div>
            <strong>E-ticaret AI</strong>
            <span>Ürün ve müşteri sinyalleri</span>
          </div>
          <div>
            <strong>Otomasyon</strong>
            <span>Kontrollü entegrasyon</span>
          </div>
        </div>
      </section>

      <section className="section-band band-paper" aria-labelledby="ai-uzmanlik-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · UZMANLIK HARİTASI</span>
              <h2 id="ai-uzmanlik-basligi">Modelden önce sistemi tasarlıyorum.</h2>
            </div>
            <p>
              Teknoloji seçimini gerçek görev, güvenlik sınırı ve ölçülebilir iş çıktısına göre
              yapıyorum.
            </p>
          </div>
          <ol className="ai-expertise-grid">
            {expertiseAreas.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band band-cyan" aria-labelledby="ai-sistemler-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · KAMUYA AÇIK KANIT</span>
              <h2 id="ai-sistemler-basligi">Çalışan sistemler.</h2>
            </div>
            <p>Her kart doğrudan kullanabileceğiniz bir araca veya ölçüm yüzeyine açılır.</p>
          </div>
          <div className="grid ai-systems-grid">
            {workingSystems.map((item, index) => (
              <a className="card" href={item.href} key={item.href}>
                <span className="eyebrow">
                  0{index + 1} · {item.eyebrow}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="link">{item.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-purple ai-lab-preview" aria-labelledby="ai-lab-basligi">
        <div className="wrap section">
          <div className="ai-lab-preview-copy">
            <span className="eyebrow">/ 03 · AÇIK MODEL ÖLÇÜMLERİ</span>
            <h2 id="ai-lab-basligi">Yerel AI için teknik veriyi karara çevirin.</h2>
            <p>
              Donanım ve model ölçümlerini yalnızca sıralamıyorum. Hız, ilk yanıt süresi, enerji
              verimliliği, lisans ve ölçüm koşullarını birlikte okunabilir hâle getiriyorum.
            </p>
            <a className="btn hero-primary" href="/yapay-zeka/model-laboratuvari">
              {catalog.summary.benchmarkCount} ölçümü inceleyin ↗
            </a>
          </div>
          <dl className="ai-lab-preview-metrics">
            <div>
              <dt>Gerçek ölçüm</dt>
              <dd>{catalog.summary.benchmarkCount}</dd>
              <small>benchmark kaydı</small>
            </div>
            <div>
              <dt>Ölçülen cihaz</dt>
              <dd>{catalog.summary.measuredDeviceCount}</dd>
              <small>donanım profili</small>
            </div>
            <div>
              <dt>Model kataloğu</dt>
              <dd>{catalog.summary.modelCount}</dd>
              <small>model tanımı</small>
            </div>
            <div>
              <dt>Son ölçüm</dt>
              <dd>{formatTurkishDate(catalog.summary.latestMeasurementAt)}</dd>
              <small>kaynak veri tarihi</small>
            </div>
          </dl>
          <div className="ai-source-note">
            <strong>Kaynak şeffaflığı</strong>
            <p>
              Ölçümler Veri Mimarı veya Caner Ünal tarafından üretilmedi. Veriler{' '}
              <a href={catalog.metadata.source} target="_blank" rel="noreferrer">
                ai-local-lab
              </a>{' '}
              tarafından yayınlanıyor; Veri Mimarı doğrulama, Türkçeleştirme ve karar arayüzünü
              sağlıyor. Lisans: <a href={catalog.metadata.licenseUrl}>{catalog.metadata.license}</a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-band band-dark ai-method" aria-labelledby="ai-yontem-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 04 · ÇALIŞMA YÖNTEMİ</span>
              <h2 id="ai-yontem-basligi">Dört kapılı uygulama disiplini.</h2>
            </div>
            <p>Model değişebilir. Kaynak, kontrol ve ölçüm standardı kalmalıdır.</p>
          </div>
          <ol className="ai-method-grid">
            {method.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <div className="ai-final-cta">
            <div>
              <span className="eyebrow">BİR AI PROJESİ Mİ PLANLIYORSUNUZ?</span>
              <h2>Önce problemi ve veri akışını birlikte netleştirelim.</h2>
            </div>
            <a className="btn hero-primary" href="/e-ticaret-danismani#proje-formu">
              Projenizi paylaşın ↗
            </a>
          </div>
        </div>
      </section>

      <NewsletterSection t={t} />
      <Footer t={t} />
    </main>
  )
}

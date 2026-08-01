import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { guides } from '@/lib/guides'
import { glossaryTerms } from '@/lib/glossary'
import { brandProfile, getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'E-Ticaret Reklam Performansı Ölçüm Rehberi',
  description: 'ROAS, MER, CPA, atıf ve katkı metriklerini kampanya teşhisinden şirket bütçesine uzanan tek bir reklam ölçüm sisteminde birleştirin.',
  alternates: { canonical: '/rehberler/reklam-performansi' },
}

const guideSlugs = [
  'e-ticaret-dashboard-metrikleri',
  'haftalik-reklam-raporu-nasil-hazirlanir',
  'mer-nedir-nasil-hesaplanir',
  'maksimum-cpa-nasil-hesaplanir',
  'roas-yuksekken-kar-neden-duser',
  'basabas-roas-nasil-hesaplanir',
]

const toolCards = [
  {
    title: 'E-Ticaret Strateji ve Pazarlama Analizi',
    description: 'Çoklu ürün reklam sınırlarını, fiyatı ve sabit giderleri aynı portföy görünümünde analiz edin.',
    href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
  },
  {
    title: 'Başabaş ROAS Hesaplayıcı',
    description: 'Kampanya ROAS ve CPA sonuçlarını ürün ekonomisinden gelen eşikle karşılaştırın.',
    href: '/araclar/basabas-roas-hesaplayici',
  },
]

export default function AdvertisingPerformancePillarPage() {
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const clusterGuides = guideSlugs.map((slug) => guides.find((guide) => guide.slug === slug)).filter(Boolean)
  const termSlugs = ['roas', 'mer', 'poas', 'cpa', 'cac', 'donusum-orani']
  const clusterTerms = termSlugs.map((slug) => glossaryTerms.find((term) => term.slug === slug)).filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Ticaret Reklam Performansı Ölçüm Rehberi',
    description: metadata.description,
    url: `${siteUrl}/rehberler/reklam-performansi`,
    inLanguage: 'tr-TR',
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    hasPart: clusterGuides.map((guide) => ({ '@type': 'Article', name: guide?.title, url: `${siteUrl}/rehberler/${guide?.slug}` })),
  }

  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar t={t} />

      <section className="hero-shell advertising-pillar-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="crumb"><i aria-hidden="true" />REKLAM ANALİTİĞİ / ANA ÖĞRENME YOLU</div>
            <h1>Paneli değil, <span className="accent">kararı</span> ölçün.</h1>
            <p className="intro">Kreatif tıklamasından şirket gelirine, ROAS’tan reklam sonrası katkıya kadar her metriği doğru karar seviyesine yerleştirin.</p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#olcum-yolu">Ölçüm yoluna başla ↘</a>
              <a className="hero-link" href="/karsilastirmalar/roas-vs-mer">ROAS ve MER’i karşılaştır</a>
            </div>
            <div className="signals">
              <span className="tag"><i />6 uygulama rehberi</span>
              <span className="tag"><i />2 çalışan analiz aracı</span>
              <span className="tag"><i />1 karar karşılaştırması</span>
            </div>
          </div>

          <div className="advertising-console" aria-label="Reklam ölçüm katmanları">
            <div className="advertising-console-head"><span className="eyebrow">ÖLÇÜM KONSOLU</span><i>CANLI ÇERÇEVE</i></div>
            <div className="advertising-console-flow">
              <div><small>01 / SİNYAL</small><strong>CPM · CTR · CPC</strong><p>Reklamın erişim ve tıklama kalitesi.</p></div>
              <div><small>02 / DÖNÜŞÜM</small><strong>CVR · CPA · CAC</strong><p>Trafiğin sipariş veya müşteriye dönüşümü.</p></div>
              <div><small>03 / ATIF</small><strong>ROAS</strong><p>Platformun reklama yazdığı gelir verimliliği.</p></div>
              <div><small>04 / ŞİRKET</small><strong>MER</strong><p>Toplam gelirin toplam pazarlama harcamasına oranı.</p></div>
              <div><small>05 / EKONOMİ</small><strong>Katkı · POAS</strong><p>Reklamdan sonra gerçekten kalan ekonomik sonuç.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-dark advertising-principle">
        <div className="wrap section">
          <span className="eyebrow">60 SANİYELİK ÇERÇEVE</span>
          <h2>Tek bir “doğru metrik” yok. Doğru karar seviyesi var.</h2>
          <p>Kreatif için CTR ve CVR, kampanya için ROAS ve CPA, şirket bütçesi için MER, kârlı büyüme için reklam sonrası katkı gerekir. Bu katmanları aynı tanım, dönem ve veri kaynağıyla uzlaştırmadan bütçe kararına geçmeyin.</p>
        </div>
      </section>

      <section id="olcum-yolu" className="section-band band-paper">
        <div className="wrap section">
          <div className="head"><div><span className="eyebrow">ADIM ADIM / {clusterGuides.length} REHBER</span><h2>Reklam ölçüm yolu.</h2></div><p>Önce raporu kurun; sonra metriği, ekonomik eşiği ve bütçe kararını bağlayın.</p></div>
          <div className="profitability-path advertising-path">
            {clusterGuides.map((guide, index) => guide && (
              <a key={guide.slug} href={`/rehberler/${guide.slug}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><small>{guide.category} · {guide.readingTime} DK</small><h3>{guide.title}</h3><p>{guide.excerpt}</p></div>
                <i>Rehberi aç →</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head"><div><span className="eyebrow">KARAR KATMANI</span><h2>Aynı veriyi üç farklı açıdan okuyun.</h2></div><p>Karşılaştırma, demo vaka ve araç aynı ölçüm çerçevesini farklı görevlerde çalıştırır.</p></div>
          <div className="advertising-decision-grid">
            <a href="/karsilastirmalar/roas-vs-mer"><span>01 / KARŞILAŞTIRMA</span><h3>ROAS vs MER</h3><p>Kampanya verimliliği ile toplam pazarlama verimliliğini ayırın.</p><i>Karar tablosunu aç →</i></a>
            <a href="/vaka-analizleri/roas-yuksek-kar-dusuk-demo-vaka"><span>02 / DEMO VAKA</span><h3>Aynı ROAS, farklı katkı</h3><p>Ürün karması değiştiğinde 4,2 ROAS’ın neden farklı sonuç ürettiğini görün.</p><i>Hesabı incele →</i></a>
            <a href="/rehberler/e-ticaret-karliligi"><span>03 / KARDEŞ PILLAR</span><h3>E-Ticaret Kârlılığı</h3><p>Reklam metriklerini ürün, sipariş ve şirket ekonomisine bağlayın.</p><i>Kârlılık yoluna geç →</i></a>
          </div>
        </div>
      </section>

      <section className="section-band band-surface">
        <div className="wrap section">
          <div className="head"><div><span className="eyebrow">ÇALIŞAN ARAÇLAR</span><h2>Eşiği kendi verinizle hesaplayın.</h2></div><p>Reklam hedefini sektör ortalamasından değil ürün ekonominizden türetin.</p></div>
          <div className="grid profitability-tools">
            {toolCards.map((tool, index) => <a className="card" key={tool.href} href={tool.href}><span className="eyebrow">0{index + 1} · ÜCRETSİZ ARAÇ</span><h3>{tool.title}</h3><p>{tool.description}</p><span className="link">Aracı aç →</span></a>)}
          </div>
        </div>
      </section>

      <section className="section-band band-paper">
        <div className="wrap section">
          <div className="head"><div><span className="eyebrow">METRİK SÖZLÜĞÜ</span><h2>Raporun dilini sabitleyin.</h2></div><p>Her metriğin formülünü, kapsamını ve karıştırıldığı kavramı görün.</p></div>
          <div className="pillar-term-grid advertising-terms">
            {clusterTerms.map((term) => term && <a key={term.slug} href={`/sozluk/${term.slug}`}><span>{term.english}</span><strong>{term.term}</strong><i>Tanımı aç →</i></a>)}
          </div>
          <a className="btn alt pillar-all-terms" href="/sozluk">Tüm kavramları gör →</a>
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

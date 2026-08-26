import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import JsonLd from '@/components/common/JsonLd'
import DeviceBenchmarkChart from '@/components/ai/DeviceBenchmarkChart'
import ModelLabExplorer from '@/components/ai/ModelLabExplorer'
import { getDictionary } from '@/lib/i18n'
import { formatTurkishDate, getAiLabCatalog } from '@/lib/ai-lab-catalog'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Yerel Yapay Zekâ Model Laboratuvarı',
  description:
    'Yerel AI model ve donanım ölçümlerini üretim hızı, ilk yanıt süresi ve enerji verimliliğine göre filtreleyin. Kaynak: ai-local-lab, CC BY 4.0.',
  alternates: { canonical: '/yapay-zeka/model-laboratuvari' },
  openGraph: {
    title: 'Yerel Yapay Zekâ Model Laboratuvarı | Veri Mimarı',
    description:
      'Açık ölçümleri karşılaştırın; kullanım senaryonuza uygun yerel AI kurulumunu değerlendirin.',
    url: '/yapay-zeka/model-laboratuvari',
    type: 'website',
  },
}

const readingGuide = [
  [
    'Üretim hızı',
    'Token/sn yükseldikçe uzun yanıtların tamamlanma süresi genellikle kısalır. Model boyutu ve çıktı kalitesiyle birlikte değerlendirin.',
  ],
  [
    'İlk yanıt süresi',
    'Kullanıcının ilk çıktıyı görmesine kadar geçen süredir. Sohbet, destek ve canlı arama deneyimlerinde kritik olabilir.',
  ],
  [
    'Enerji verimliliği',
    'Token/sn/W değeri aynı çıktı hızının enerji maliyetini karşılaştırmaya yardım eder. Güç ölçümü olmayan kayıtlarda gösterilmez.',
  ],
  [
    'Lisans ve koşul',
    'Ticari kullanım, model lisansı, quantization ve runtime üretim kararının ayrılmaz parçalarıdır.',
  ],
]

export default function ModelLaboratuvariPage() {
  const t = getDictionary('tr')
  const catalog = getAiLabCatalog()
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Veri Mimarı Yerel Yapay Zekâ Model Laboratuvarı',
    description: metadata.description,
    url: `${siteUrl}/yapay-zeka/model-laboratuvari`,
    license: catalog.metadata.licenseUrl,
    isBasedOn: catalog.metadata.source,
    dateModified: catalog.metadata.releasedAt,
    creator: { '@type': 'Organization', name: 'ai-local-lab', url: 'https://ai-local-lab.com' },
    provider: { '@type': 'Organization', name: 'Veri Mimarı', url: siteUrl },
  }

  return (
    <main className="page model-lab-page">
      <JsonLd id="model-lab-dataset-schema" data={jsonLd} />
      <NavBar t={t} />

      <section className="hero-shell model-lab-hero">
        <div className="wrap hero single">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> YAPAY ZEKÂ / MODEL LABORATUVARI
            </div>
            <h1>
              Yerel AI modelini tahminle değil, <span className="accent">ölçümle</span> seçin.
            </h1>
            <p className="intro">
              Gerçek donanım ölçümlerini model, cihaz, kuantizasyon, hız, gecikme ve enerji
              verimliliğine göre keşfedin. Sonucu kendi kullanım senaryonuzun kalite ve maliyet
              gereksinimleriyle birlikte değerlendirin.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#olcumler">
                Ölçümleri filtrele ↓
              </a>
              <a className="hero-link" href="/yapay-zeka">
                AI uzmanlık merkezine dön
              </a>
            </div>
            <div className="signals">
              <span className="tag">
                <i /> Gerçek ölçüm kayıtları
              </span>
              <span className="tag">
                <i /> Sürüm {catalog.metadata.datasetVersion}
              </span>
              <span className="tag">
                <i /> {catalog.metadata.license}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="model-lab-status" aria-label="Veri seti durumu">
        <div className="wrap">
          <div>
            <span>ÖLÇÜM</span>
            <strong>{catalog.summary.benchmarkCount}</strong>
            <small>gerçek benchmark</small>
          </div>
          <div>
            <span>CİHAZ</span>
            <strong>{catalog.summary.measuredDeviceCount}</strong>
            <small>ölçülmüş donanım</small>
          </div>
          <div>
            <span>MODEL</span>
            <strong>{catalog.summary.modelCount}</strong>
            <small>katalog kaydı</small>
          </div>
          <div>
            <span>SON TARİH</span>
            <strong>{formatTurkishDate(catalog.summary.latestMeasurementAt)}</strong>
            <small>kaynak ölçüm tarihi</small>
          </div>
        </div>
      </section>

      <DeviceBenchmarkChart
        benchmarks={catalog.benchmarks}
        benchmarkCount={catalog.summary.benchmarkCount}
        measuredDeviceCount={catalog.summary.measuredDeviceCount}
        modelCount={catalog.summary.modelCount}
      />

      <section
        id="olcumler"
        className="section-band band-paper model-lab-data"
        aria-labelledby="olcum-basligi"
      >
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · ÖLÇÜM GEZGİNİ</span>
              <h2 id="olcum-basligi">Karşılaştırılabilir kayıtları bulun.</h2>
            </div>
            <p>
              Hız tek başına kalite anlamına gelmez. Aynı modelin cihaz, kuantizasyon ve runtime
              farklarını birlikte okuyun.
            </p>
          </div>
          <ModelLabExplorer benchmarks={catalog.benchmarks} />
        </div>
      </section>

      <section className="section-band band-cyan" aria-labelledby="okuma-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · NASIL OKUNUR?</span>
              <h2 id="okuma-basligi">Dört metriği aynı kararda birleştirin.</h2>
            </div>
            <p>
              Önce kullanım senaryosunu tanımlayın; sonra performans, deneyim, maliyet ve lisans
              sınırlarını birlikte ele alın.
            </p>
          </div>
          <div className="model-reading-grid">
            {readingGuide.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-dark model-lab-method" aria-labelledby="kaynak-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 03 · KAYNAK VE SINIRLAR</span>
              <h2 id="kaynak-basligi">Ölçümü sahiplenmiyor, kaynağını görünür kılıyoruz.</h2>
            </div>
            <p>
              Bu sayfadaki arayüz ve Türkçe yorum katmanı Veri Mimarı’na; ham ölçümler
              ai-local-lab’e aittir.
            </p>
          </div>
          <div className="model-source-panel">
            <dl>
              <div>
                <dt>Veri üreticisi</dt>
                <dd>
                  <a href={catalog.metadata.source}>ai-local-lab ↗</a>
                </dd>
              </div>
              <div>
                <dt>Lisans</dt>
                <dd>
                  <a href={catalog.metadata.licenseUrl}>{catalog.metadata.license} ↗</a>
                </dd>
              </div>
              <div>
                <dt>Yöntem</dt>
                <dd>
                  <a href={catalog.metadata.methodologyUrl}>Ölçüm protokolü ↗</a>
                </dd>
              </div>
              <div>
                <dt>Veri sürümü</dt>
                <dd>
                  {catalog.metadata.datasetVersion} ·{' '}
                  {formatTurkishDate(catalog.metadata.releasedAt)}
                </dd>
              </div>
            </dl>
            <div>
              <strong>Sınırlama</strong>
              <p>
                {catalog.metadata.caveat} Tek bir benchmark, üretim kalitesi veya güvenilirliği
                hakkında kesin sonuç vermez.
              </p>
              <a className="link" href="/yapay-zeka/veri-guncellemeleri">
                Veri güncellemelerini inceleyin →
              </a>
            </div>
          </div>
          <div className="ai-final-cta">
            <div>
              <span className="eyebrow">KENDİ KURULUMUNUZU PLANLAYIN</span>
              <h2>Donanım, model ve iş yükünü birlikte değerlendirelim.</h2>
            </div>
            <a className="btn hero-primary" href="/e-ticaret-danismani#proje-formu">
              Projenizi paylaşın ↗
            </a>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

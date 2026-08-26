import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import JsonLd from '@/components/common/JsonLd'
import {
  formatTurkishDate,
  formatTurkishDateTime,
  getAiLabCatalog,
  getAiLabChangeReport,
} from '@/lib/ai-lab-catalog'
import { getDictionary } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'AI Model Verisi: Güncellemeler ve Kaynaklar',
  description:
    'Veri Mimarı Model Laboratuvarı’nın ai-local-lab kaynaklı veri güncellemelerini, kapsamını, lisansını ve yöntem notlarını inceleyin.',
  alternates: { canonical: '/yapay-zeka/veri-guncellemeleri' },
}

export default function AiDataUpdatesPage() {
  const t = getDictionary('tr')
  const catalog = getAiLabCatalog()
  const changeReport = getAiLabChangeReport()
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Veri Mimarı Model Laboratuvarı veri güncellemeleri',
    url: `${siteUrl}/yapay-zeka/veri-guncellemeleri`,
    dateModified: catalog.metadata.syncedAt,
    isBasedOn: catalog.metadata.source,
    license: catalog.metadata.licenseUrl,
  }

  return (
    <main className="page ai-data-updates-page">
      <JsonLd id="ai-data-updates-schema" data={jsonLd} />
      <NavBar t={t} />
      <section className="hero-shell ai-experiments-hero">
        <div className="wrap hero single">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> YAPAY ZEKÂ / VERİ GÜNCELLEMELERİ
            </div>
            <h1>
              Açık veriyi, <span className="accent">açık kaynak</span> notuyla yayınlıyoruz.
            </h1>
            <p className="intro">
              Model Laboratuvarı’ndaki ölçümlerin kaynağını, kapsamını ve güncelleme durumunu burada
              görün. Veri Mimarı ölçüm üreticisi değil; doğrulama ve karar arayüzüdür.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="/yapay-zeka/model-laboratuvari">
                Model laboratuvarını aç ↗
              </a>
              <a className="hero-link" href="/yapay-zeka">
                AI merkezine dön
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-paper" aria-labelledby="veri-durumu-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · VERİ SETİ DURUMU</span>
              <h2 id="veri-durumu-basligi">Şu an yayındaki kapsam.</h2>
            </div>
            <p>
              Yayınlanan katalog sürümü, son ölçüm tarihi ve kaynak bilgisi bu ekranla birlikte
              izlenebilir kalır.
            </p>
          </div>
          <dl className="ai-update-metrics">
            <div>
              <dt>Benchmark</dt>
              <dd>{catalog.summary.benchmarkCount}</dd>
              <small>gerçek ölçüm kaydı</small>
            </div>
            <div>
              <dt>Donanım</dt>
              <dd>{catalog.summary.measuredDeviceCount}</dd>
              <small>ölçülmüş cihaz profili</small>
            </div>
            <div>
              <dt>Model</dt>
              <dd>{catalog.summary.modelCount}</dd>
              <small>katalog kaydı</small>
            </div>
            <div>
              <dt>Son ölçüm</dt>
              <dd>{formatTurkishDate(catalog.summary.latestMeasurementAt)}</dd>
              <small>kaynak veri tarihi</small>
            </div>
          </dl>
          <div className="ai-update-delta" aria-label="Son veri aktarımı özeti">
            <span className="eyebrow">SON BAŞARILI SENKRONİZASYON</span>
            <strong>{formatTurkishDateTime(changeReport.generatedAt)}</strong>
            {changeReport.previousDatasetVersion ? (
              <p>
                Sürüm {changeReport.previousDatasetVersion} → {changeReport.datasetVersion}:{' '}
                {changeReport.addedBenchmarkIds.length} yeni,{' '}
                {changeReport.removedBenchmarkIds.length} kaldırılan benchmark kaydı.
              </p>
            ) : (
              <p>
                İlk katalog aktarımı: {changeReport.benchmarkCountAfter} benchmark kaydı sürüm{' '}
                {changeReport.datasetVersion} ile doğrulanarak yayına alındı.
              </p>
            )}
            <a className="link" href="/yapay-zeka/model-laboratuvari">
              Güncel ölçümleri aç →
            </a>
          </div>
        </div>
      </section>

      <section className="section-band band-cyan" aria-labelledby="guncelleme-sureci-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · GÜNCELLEME SÜRECİ</span>
              <h2 id="guncelleme-sureci-basligi">Her aktarımda kontrol edilenler.</h2>
            </div>
            <p>
              Güncelleme otomasyonu yeni sürümü alır; dosya bütünlüğünü, referansları ve katalog
              yapısını kontrol eder.
            </p>
          </div>
          <ol className="ai-update-process">
            <li>
              <span>01</span>
              <h3>Kaynağı al</h3>
              <p>
                Yalnızca ai-local-lab’in sürümlenmiş, herkese açık dağıtım manifesti kullanılır.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Bütünlüğü doğrula</h3>
              <p>
                Dosya boyutu, SHA-256 özeti, lisans ve veri seti sürümü beklenen manifestle
                karşılaştırılır.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>İlişkileri denetle</h3>
              <p>
                Benchmark, cihaz ve model kayıtları arasındaki referanslar; tekrar eden kayıtlar ve
                zorunlu alanlar kontrol edilir.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Karar katmanına aktar</h3>
              <p>
                Geçerli kayıtlar filtrelenebilir laboratuvara ve kaynaklı bilgi katmanına
                dönüştürülür.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section-band band-dark" aria-labelledby="kaynak-notu-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 03 · KAYNAK NOTU</span>
              <h2 id="kaynak-notu-basligi">Sahiplik ve sınırlar net.</h2>
            </div>
            <p>
              Teknik performans kayıtları ölçüm koşuluna bağlıdır; üretim kalitesi veya her kullanım
              senaryosu için kesin sonuç değildir.
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
                  <a href={catalog.metadata.methodologyUrl}>Yerel AI ölçüm protokolü ↗</a>
                </dd>
              </div>
              <div>
                <dt>Katalog sürümü</dt>
                <dd>
                  {catalog.metadata.datasetVersion} · yayımlanma:{' '}
                  {formatTurkishDate(catalog.metadata.releasedAt)}
                </dd>
              </div>
            </dl>
            <div>
              <strong>Veri Mimarı’nın rolü</strong>
              <p>
                Ölçüm verisini Türkçe karar arayüzüne dönüştürmek, kaynağı görünür tutmak ve teknik
                bağlamı kullanım kararına bağlamak.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

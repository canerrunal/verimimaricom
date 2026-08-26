import { formatTurkishDate, getAiLabCatalog } from '@/lib/ai-lab-catalog'

const systems = [
  {
    label: 'KAYNAKLI KARAR',
    title: 'Veri Asistanı',
    description: 'Bilgi tabanını, kaynakları ve araçları aynı konuşmada karar desteğine bağlar.',
    href: '/araclar/veri-asistani',
  },
  {
    label: 'AÇIK ÖLÇÜM',
    title: 'Yerel Model Laboratuvarı',
    description:
      'Yerel AI için donanım, model, hız ve gecikme kayıtlarını karşılaştırılabilir yapar.',
    href: '/yapay-zeka/model-laboratuvari',
  },
  {
    label: 'KONTROLLÜ OTOMASYON',
    title: 'AI uygulama rehberi',
    description: 'Ürün verisi, insan onayı ve sonuç ölçümünü tek iş akışında birleştirir.',
    href: '/rehberler/ai-otomasyon',
  },
]

export default function AiSystemsSection() {
  const catalog = getAiLabCatalog()

  return (
    <section className="section-band band-purple ai-home-section" aria-labelledby="ai-home-title">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">/ 04 · UYGULAMALI YAPAY ZEKÂ</span>
            <h2 id="ai-home-title">Yapay zekâyı iş akışına bağlayın.</h2>
          </div>
          <p>
            Model, veri ve otomasyonu tek başına değil; kaynak, insan kontrolü ve ölçülebilir iş
            sonucuyla birlikte ele alıyoruz.
          </p>
        </div>

        <div className="ai-home-layout">
          <div className="ai-home-catalog">
            <span className="eyebrow">AÇIK MODEL ÖLÇÜMÜ / CANLI KATALOG</span>
            <strong>{catalog.summary.benchmarkCount}</strong>
            <p>gerçek benchmark kaydı</p>
            <dl>
              <div>
                <dt>{catalog.summary.measuredDeviceCount}</dt>
                <dd>ölçülmüş cihaz</dd>
              </div>
              <div>
                <dt>{catalog.summary.modelCount}</dt>
                <dd>model kaydı</dd>
              </div>
              <div>
                <dt>{formatTurkishDate(catalog.summary.latestMeasurementAt)}</dt>
                <dd>son kaynak ölçümü</dd>
              </div>
            </dl>
            <p className="ai-home-source">
              Kaynak: <a href={catalog.metadata.source}>ai-local-lab</a> ·{' '}
              {catalog.metadata.license}
            </p>
            <a className="btn hero-primary" href="/yapay-zeka/model-laboratuvari">
              Ölçümleri karşılaştır ↗
            </a>
          </div>

          <div className="ai-home-systems">
            {systems.map((system, index) => (
              <a href={system.href} key={system.href}>
                <span>0{index + 1}</span>
                <div>
                  <small>{system.label}</small>
                  <h3>{system.title}</h3>
                  <p>{system.description}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>

        <div className="ai-home-footer">
          <p>
            Caner Ünal’ın AI çalışma yaklaşımı: problem → doğrulanmış veri → kontrollü üretim →
            ölçülen sonuç.
          </p>
          <a className="link" href="/yapay-zeka">
            Uygulamalı AI merkezini inceleyin →
          </a>
        </div>
      </div>
    </section>
  )
}

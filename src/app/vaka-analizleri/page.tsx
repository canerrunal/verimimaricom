import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { demoCases, scenarioMetrics, changeRate } from '@/lib/cases'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Vaka Analizleri',
  description:
    'E-ticaret kârlılığı için varsayımları, formülleri, veri kapsamını ve sınırlamaları açık demo vaka analizleri.',
  alternates: { canonical: '/vaka-analizleri' },
}

const formatPercent = (value: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'percent', maximumFractionDigits: 1 }).format(value)

export default function VakaAnalizleriPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero-shell case-index-hero">
        <div className="wrap hero single">
          <div>
            <div className="crumb">
              <i aria-hidden="true" />
              VAKA ANALİZLERİ / YÖNTEM VE ŞEFFAFLIK
            </div>
            <h1>
              Sonucu değil, <span className="accent">hesap zincirini</span> görün.
            </h1>
            <p className="intro">
              Her vakada veri kaynağı, varsayım, formül, karar ve sınırlama aynı yüzeyde. Demo
              senaryolar gerçek müşteri başarısı gibi sunulmaz.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band band-paper">
        <div className="wrap section case-index-section">
          <div className="case-disclosure" role="note">
            <strong>DEMO VAKA ANALİZLERİ</strong>
            <span>
              Simüle edilmiş veya anonimleştirilmiş veri açıkça etiketlenir. Sayısal sonuçların
              dönemi, yöntemi ve kapsam dışı kalemleri ayrıca gösterilir.
            </span>
          </div>

          <div className="head">
            <div>
              <span className="eyebrow">
                AÇIK HESAP / {String(demoCases.length).padStart(2, '0')}
              </span>
              <h2>Türkiye pazaryerleri için karar laboratuvarı.</h2>
            </div>
            <p>Reklam, kampanya, iade ve pazaryeri maliyetlerini satır satır karşılaştırın.</p>
          </div>

          <div className="case-index-grid">
            {demoCases.map((item) => {
              const before = scenarioMetrics(item.baseline)
              const after = scenarioMetrics(item.revised)
              return (
                <article key={item.slug} className="case-feature-card">
                  <div className="case-card-copy">
                    <span className="tag">
                      <i />
                      SİMÜLE EDİLMİŞ VERİ
                    </span>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <dl className="case-card-facts">
                      <div>
                        <dt>Kapsam</dt>
                        <dd>{item.duration}</dd>
                      </div>
                      <div>
                        <dt>ROAS</dt>
                        <dd>
                          {before.roas.toFixed(1)} → {after.roas.toFixed(1)}
                        </dd>
                      </div>
                      <div>
                        <dt>Simülasyon sonucu</dt>
                        <dd>
                          {formatPercent(
                            changeRate(before.postAdContribution, after.postAdContribution),
                          )}{' '}
                          katkı değişimi
                        </dd>
                      </div>
                    </dl>
                    <a className="btn" href={`/vaka-analizleri/${item.slug}`}>
                      Hesabı adım adım incele →
                    </a>
                  </div>
                  <div className="case-card-signal" aria-label="Vakanın ana bulgusu">
                    <span>{item.featuredMetric.label}</span>
                    <strong>{item.featuredMetric.value}</strong>
                    <p>{item.featuredMetric.detail}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-band band-dark">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">OKUMA PROTOKOLÜ</span>
              <h2>Bir vakayı güvenilir yapan dört katman.</h2>
            </div>
          </div>
          <div className="case-method-grid">
            {[
              ['01', 'Kaynak', 'Hangi veri alanlarının kullanıldığı açıkça yazılır.'],
              ['02', 'Varsayım', 'Eksik kalan koşullar ve sabit kabul edilenler listelenir.'],
              ['03', 'Formül', 'Sonuç metrikleri ara adımlarıyla yeniden hesaplanabilir olur.'],
              ['04', 'Sınır', 'Nedensellik ve genellenebilirlik iddiasının sınırı belirtilir.'],
            ].map(([number, title, detail]) => (
              <div key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

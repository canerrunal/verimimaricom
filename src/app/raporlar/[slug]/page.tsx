import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { benchmarkReports, getBenchmarkReport, type BenchmarkReport, type TechnicalReport } from '@/lib/reports'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return benchmarkReports.map((report) => ({ slug: report.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const report = getBenchmarkReport((await params).slug)
  if (!report) return { title: 'Rapor Bulunamadı' }
  return {
    title: report.title,
    description: report.description,
    alternates: { canonical: `/raporlar/${report.slug}` },
    openGraph: { title: report.title, description: report.description, type: 'article' },
  }
}

export default async function ReportDetailPage({ params }: PageProps) {
  const report = getBenchmarkReport((await params).slug)
  if (!report) notFound()
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const reportUrl = `${siteUrl}/raporlar/${report.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Report',
      name: report.title,
      description: report.description,
      url: reportUrl,
      datePublished: report.publishedAt,
      dateModified: report.reviewedAt,
      inLanguage: 'tr-TR',
      author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
      publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Raporlar', item: `${siteUrl}/raporlar` },
        { '@type': 'ListItem', position: 3, name: report.title, item: reportUrl },
      ],
    },
  ]
  if (report.kind === 'technical' && report.technical) {
    return <TechnicalReportView report={report} technical={report.technical} t={t} jsonLd={jsonLd} />
  }
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />
      <section className="hero-shell report-detail-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <a className="back-link" href="/raporlar">
              ← Tüm raporlar
            </a>
            <div className="crumb">
              <i aria-hidden="true" /> E-TİCARET KÂRLILIĞI / BENCHMARK NOTU
            </div>
            <h1>{report.title}</h1>
            <p className="intro">{report.description}</p>
            <div className="signals">
              <span className="tag">
                <i />
                {report.status}
              </span>
              <span className="tag">
                <i />
                Son kontrol: {report.reviewedAt.split('-').reverse().join('.')}
              </span>
              <span className="tag">
                <i />
                Açık yöntem
              </span>
            </div>
          </div>
          <aside className="report-manifest" aria-label="Rapor özeti">
            <span className="eyebrow">RAPOR MANİFESTOSU</span>
            <strong>05</strong>
            <small>SENARYO</small>
            <p>{report.sample}</p>
            <dl>
              <div>
                <dt>Veri tipi</dt>
                <dd>Simüle edilmiş ekonomi</dd>
              </div>
              <div>
                <dt>Karar amacı</dt>
                <dd>ROAS eşiğini marj ve iade ile birlikte okumak</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <section className="section-band band-orange report-warning">
        <div className="wrap section">
          <strong>OKUMA NOTU</strong>
          <p>
            Bu rapor gerçek pazar ortalaması veya müşteri sonucu değildir. Sayılar, yöntemi
            göstermek için oluşturulmuş simülasyon senaryolarıdır.
          </p>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section report-headlines">
          <div className="head">
            <div>
              <span className="eyebrow">60 SANİYELİK ÖZET</span>
              <h2>Ürün ekonomisi reklam eşiğini belirler.</h2>
            </div>
            <p>
              Başabaş ROAS, reklam kararını ürün marjı ve beklenen iade etkisinden ayırmadan
              yorumlamayı sağlar.
            </p>
          </div>
          <div className="report-stat-grid">
            {report.headline.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-surface">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">SENARYO TABLOSU</span>
              <h2>Beş ekonomi, beş farklı eşik.</h2>
            </div>
            <p>Aynı reklam hedefi farklı marj ve iade koşullarında farklı bir karar üretir.</p>
          </div>
          <div
            className="report-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="Kârlılık benchmark tablosu"
          >
            <table className="table">
              <caption>Simüle edilmiş ürün ekonomisi senaryoları</caption>
              <thead>
                <tr>
                  <th>Senaryo</th>
                  <th>Katkı marjı</th>
                  <th>İade etkisi</th>
                  <th>Başabaş ROAS</th>
                  <th>MER planlama</th>
                  <th>Sinyal</th>
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row) => (
                  <tr key={row.segment}>
                    <th scope="row">{row.segment}</th>
                    <td>{row.margin}</td>
                    <td>{row.returnRate}</td>
                    <td>
                      <strong>{row.breakEvenRoas}</strong>
                    </td>
                    <td>{row.mer}</td>
                    <td>{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section-band band-dark">
        <div className="wrap section report-method">
          <div>
            <span className="eyebrow">YÖNTEM VE SINIR</span>
            <h2>Sonucu değil, hesap zincirini yeniden kurun.</h2>
          </div>
          <div>
            <h3>Nasıl hesaplandı?</h3>
            <ul>
              {report.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Sınırlamalar</h3>
            <ul>
              {report.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-band band-cyan">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">KARAR ÇERÇEVESİ</span>
              <h2>Tabloyu haftalık karara çevirin.</h2>
            </div>
          </div>
          <div className="report-decision-grid">
            {report.decisions.map((item, index) => (
              <article key={item.signal}>
                <span>0{index + 1}</span>
                <h3>{item.signal}</h3>
                <p>
                  <strong>Anlamı:</strong> {item.meaning}
                </p>
                <p>
                  <strong>Aksiyon:</strong> {item.action}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section report-bottom-grid">
          <div>
            <span className="eyebrow">KAYNAKLAR</span>
            <h2>Kaynağı ve kapsamı birlikte okuyun.</h2>
            <ol className="report-sources">
              {report.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target={source.url.startsWith('http') ? '_blank' : undefined}
                    rel={source.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {source.name} ↗
                  </a>
                  <span>{source.note}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <span className="eyebrow">BİR SONRAKİ ADIM</span>
            <h2>Kendi verinizi hesaplayın.</h2>
            <div className="report-links">
              {report.relatedTools.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.title} →
                </a>
              ))}
              {report.relatedGuides.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.title} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

type TechnicalReportViewProps = {
  report: BenchmarkReport
  technical: TechnicalReport
  t: ReturnType<typeof getDictionary>
  jsonLd: Record<string, unknown>[]
}

function TechnicalReportView({ report, technical, t, jsonLd }: TechnicalReportViewProps) {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar t={t} />
      <section className="hero-shell ai-experiments-hero report-detail-hero technical-report-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <a className="back-link" href="/raporlar">
              ← Tüm raporlar
            </a>
            <div className="crumb">
              <i aria-hidden="true" /> {technical.category}
            </div>
            <h1>{report.title}</h1>
            <p className="intro">{report.description}</p>
            <div className="signals">
              <span className="tag"><i /> Gerçek dünya deneyi</span>
              <span className="tag"><i /> {technical.testDate}</span>
              <span className="tag"><i /> {technical.readingTime}</span>
              <span className="tag"><i /> Açık sınırlamalar</span>
            </div>
          </div>
          <aside className="report-manifest technical-report-manifest" aria-label="Teknik rapor özeti">
            <span className="eyebrow">TEKNİK RAPOR MANİFESTOSU</span>
            <strong>6,0</strong>
            <small>TOK/S · TEMSİLÎ GENERATION</small>
            <p>{technical.outcome}</p>
            <dl>
              <div>
                <dt>Donanım</dt>
                <dd>2 × Mac mini M4 · 16 GB</dd>
              </div>
              <div>
                <dt>Model / framework</dt>
                <dd>Qwen3.8-27B 4-bit · EXO + MLX</dd>
              </div>
              <div>
                <dt>Dağıtım</dt>
                <dd>Pipeline Sharding · MLX Ring</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <section className="section-band band-orange report-warning">
        <div className="wrap section technical-report-disclosure">
          <strong>OKUMA NOTU</strong>
          <p>
            Bu sonuçlar bizim 29–30 Ağustos 2026 tarihli gerçek cihaz testimizden geliyor. Kontrollü
            akademik benchmark veya tüm M4 sistemleri için garanti edilen üst sınır değildir.
            “Çalışıyor” ile “verimli ve sürdürülebilir çalışıyor” ayrı sorulardır.
          </p>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">60 SANİYELİK ÖZET</span>
              <h2>Model sığıyor. Sistem zorlanıyor.</h2>
            </div>
            <p>
              İki node modeli gerçekten çalıştırdı; fakat bellek, ilk token süresi ve uzun süreli
              termal yük günlük kullanım kararını değiştiriyor.
            </p>
          </div>
          <div className="report-stat-grid technical-report-stat-grid">
            {technical.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-surface">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">SİSTEM TOPOLOJİSİ</span>
              <h2>İki Mac nasıl aynı isteği taşıdı?</h2>
            </div>
            <p>Modelin tamamı iki makineye tek parça olarak yüklenmedi; katmanlar ve ara aktivasyonlar node’lar arasında ilerledi.</p>
          </div>
          <div className="technical-architecture-grid">
            {technical.architecture.map((step) => (
              <article key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band band-dark">
        <div className="wrap section report-method technical-report-method">
          <div>
            <span className="eyebrow">YÖNTEM VE SINIR</span>
            <h2>Ölçümü, yorumu ve belirsizliği ayırın.</h2>
          </div>
          <div>
            <h3>Nasıl test edildi?</h3>
            <ul>
              {technical.methodology.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h3>Sınırlamalar</h3>
            <ul>
              {technical.limitations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section technical-reading-grid">
          <nav className="technical-report-toc" aria-label="Raporda gezin">
            <span className="eyebrow">RAPOR AKIŞI</span>
            {technical.sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                {String(index + 1).padStart(2, '0')} · {section.title}
              </a>
            ))}
          </nav>
          <div className="technical-report-body">
            <div className="head">
              <div>
                <span className="eyebrow">SAHA NOTLARI</span>
                <h2>Çalıştırma deneyiminden çıkan sekiz sonuç.</h2>
              </div>
            </div>
            {technical.sections.map((section) => (
              <article id={section.id} className="technical-report-section" key={section.id}>
                <span className="eyebrow">{section.eyebrow}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-band technical-report-conclusion">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">SON KARAR</span>
              <h2>Fit ≠ fast ≠ sustainable.</h2>
            </div>
            <p>Bu deney kapasiteyi kanıtladı; günlük üretim sisteminin kararını ise başka metriklere bıraktı.</p>
          </div>
          <div className="technical-conclusion-grid">
            <article><span>EVET</span><h3>Model çalıştı.</h3><p>İki node shard’landı, iki GPU aktifti, kullanılabilir cevap ve kod üretildi.</p></article>
            <article><span>EVET</span><h3>Bağlantı sağlıklıydı.</h3><p>37,7 Gbit/s ölçüm, Thunderbolt hattını ana şüpheli olmaktan çıkardı.</p></article>
            <article><span>HAYIR</span><h3>7/24 ideal değil.</h3><p>6 tok/s, swap, yüksek TTFT ve uzun yük sıcaklıkları sürekli kullanım için zayıf sinyal.</p></article>
          </div>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section report-bottom-grid">
          <div>
            <span className="eyebrow">KAYNAKLAR</span>
            <h2>Kaynakları ve test sınırını birlikte okuyun.</h2>
            <ol className="report-sources">
              {technical.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name} ↗</a>
                  <span>{source.note}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <span className="eyebrow">BİR SONRAKİ ADIM</span>
            <h2>Deneyi başka kullanım mimarileriyle karşılaştırın.</h2>
            <div className="report-links">
              {technical.relatedTools.map((item) => <a key={item.href} href={item.href}>{item.title} →</a>)}
              {technical.relatedGuides.map((item) => <a key={item.href} href={item.href}>{item.title} →</a>)}
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

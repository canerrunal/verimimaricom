import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { changeRate, demoCases, getDemoCase, scenarioMetrics, type CaseScenario } from '@/lib/cases'
import { getDictionary } from '@/lib/i18n'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

const money = (value: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)

const percent = (value: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'percent', maximumFractionDigits: 1 }).format(value)

function scenarioRows(scenario: CaseScenario) {
  const metrics = scenarioMetrics(scenario)
  return [
    { label: 'Net satış', value: scenario.netRevenue, formula: 'İade ve iptal sonrası gelir' },
    ...scenario.costs.map((cost) => ({
      label: cost.label,
      value: -cost.amount,
      formula: cost.note,
    })),
    {
      label: 'Reklam öncesi katkı',
      value: metrics.preAdContribution,
      formula: 'Net satış − değişken giderler',
    },
    {
      label: 'Reklam harcaması',
      value: -scenario.adSpend,
      formula: `Net satış ÷ ${metrics.roas.toFixed(1)} ROAS`,
    },
    {
      label: 'Reklam sonrası katkı',
      value: metrics.postAdContribution,
      formula: `Net satışın ${percent(metrics.postAdContributionMargin)}`,
    },
  ]
}

export function generateStaticParams() {
  return demoCases.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getDemoCase(slug)
  if (!item) return {}

  return {
    title: `${item.title} — Demo Vaka`,
    description: item.summary,
    alternates: { canonical: `/vaka-analizleri/${item.slug}` },
  }
}

export default async function DemoCasePage({ params }: PageProps) {
  const { slug } = await params
  const item = getDemoCase(slug)
  if (!item) notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const baseline = scenarioMetrics(item.baseline)
  const revised = scenarioMetrics(item.revised)
  const contributionChange = changeRate(baseline.postAdContribution, revised.postAdContribution)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary,
    dateModified: item.updatedAt,
    inLanguage: 'tr-TR',
    url: `${siteUrl}/vaka-analizleri/${item.slug}`,
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    isBasedOn: 'Simüle edilmiş sipariş, reklam ve ürün maliyeti veri setleri',
    about: ['ROAS', 'E-ticaret kârlılığı', 'Reklam sonrası katkı'],
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Vaka Analizleri',
        item: `${siteUrl}/vaka-analizleri`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: item.shortTitle,
        item: `${siteUrl}/vaka-analizleri/${item.slug}`,
      },
    ],
  }

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <NavBar t={t} />

      <article>
        <header className="hero-shell case-detail-hero">
          <div className="wrap case-detail-head">
            <a className="crumb" href="/vaka-analizleri">
              <i aria-hidden="true" />
              VAKA ANALİZLERİ / GERİ DÖN
            </a>
            <div className="case-disclosure case-disclosure-hero" role="note">
              <strong>DEMO VAKA · SİMÜLE EDİLMİŞ VERİ</strong>
              <span>{item.disclosure}</span>
            </div>
            <span className="eyebrow">{item.eyebrow}</span>
            <h1>{item.title}</h1>
            <p className="intro">{item.summary}</p>
            <div className="case-hero-meta">
              <span>
                <small>KARŞILAŞTIRMA</small>
                {item.duration}
              </span>
              <span>
                <small>ROAS</small>
                {baseline.roas.toFixed(1)} → {revised.roas.toFixed(1)}
              </span>
              <span>
                <small>ÖRNEK SONUÇ</small>
                {percent(contributionChange)} katkı değişimi
              </span>
              <span>
                <small>GÜNCELLEME</small>
                {new Intl.DateTimeFormat('tr-TR').format(new Date(item.updatedAt))}
              </span>
            </div>
          </div>
        </header>

        <section className="section-band band-paper">
          <div className="wrap section case-reading-grid">
            <aside className="case-toc" aria-label="Vaka içindekiler">
              <span className="eyebrow">İÇİNDEKİLER</span>
              <a href="#senaryo">01 / Senaryo</a>
              <a href="#veri">02 / Veri ve varsayımlar</a>
              <a href="#teshis">03 / Teşhis</a>
              <a href="#hesap">04 / Hesap tablosu</a>
              <a href="#kararlar">05 / Kararlar</a>
              <a href="#sinirlar">06 / Sınırlamalar</a>
            </aside>

            <div className="case-body">
              <section id="senaryo" className="case-copy-section">
                <span className="eyebrow">01 / SENARYO</span>
                <h2>ROAS değişmeden kârlılık değişebilir mi?</h2>
                <p>
                  Bu laboratuvarın sorusu budur. Baz senaryoda net satış 1 milyon TL ve reklam
                  panelindeki ROAS 4,2’dir. Revize senaryoda net satış daha düşük olmasına rağmen
                  sipariş karmasının değiştiği varsayılır. İki dönemde ROAS sabit tutularak kâr
                  farkının medya veriminden değil, birim ekonomiden gelebileceği görünür hâle
                  getirilir.
                </p>
                <div className="case-answer">
                  <span>60 SANİYELİK CEVAP</span>
                  <strong>Aynı ROAS, aynı kâr demek değildir.</strong>
                  <p>
                    Ürün maliyeti, komisyon, lojistik ve iade yükü değiştiğinde her reklam
                    lirasından sonra kalan katkı da değişir.
                  </p>
                </div>
              </section>

              <section id="veri" className="case-copy-section">
                <span className="eyebrow">02 / VERİ VE VARSAYIMLAR</span>
                <h2>Hangi veri kullanıldı?</h2>
                <div className="case-source-grid">
                  {item.dataSources.map((source, index) => (
                    <div key={source}>
                      <span>0{index + 1}</span>
                      <p>{source}</p>
                    </div>
                  ))}
                </div>
                <h3>Model varsayımları</h3>
                <ul className="case-check-list">
                  {item.assumptions.map((assumption) => (
                    <li key={assumption}>{assumption}</li>
                  ))}
                </ul>
              </section>

              <section id="teshis" className="case-copy-section">
                <span className="eyebrow">03 / TEŞHİS</span>
                <h2>ROAS’tan katkıya giden kontrol zinciri.</h2>
                <div className="case-diagnosis">
                  {item.diagnosis.map((step, index) => (
                    <div key={step.title}>
                      <span>0{index + 1}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="hesap" className="case-copy-section">
                <span className="eyebrow">04 / HESAP TABLOSU</span>
                <h2>İki senaryoyu aynı formülle karşılaştırın.</h2>
                <p>
                  Tüm tutarlar TL ve tüm sonuçlar simülasyondur. Eksi değerler maliyet veya
                  harcamayı gösterir.
                </p>
                <div className="case-tables">
                  {[item.baseline, item.revised].map((scenario) => (
                    <div className="case-table-wrap" key={scenario.label}>
                      <div className="case-table-head">
                        <div>
                          <span>SİMÜLASYON</span>
                          <h3>{scenario.label}</h3>
                        </div>
                        <small>{scenario.period}</small>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Kalem</th>
                            <th scope="col">Formül / kapsam</th>
                            <th scope="col">Tutar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scenarioRows(scenario).map((row) => (
                            <tr
                              key={row.label}
                              className={
                                row.label === 'Reklam sonrası katkı' ? 'case-total-row' : undefined
                              }
                            >
                              <th scope="row">{row.label}</th>
                              <td>{row.formula}</td>
                              <td>{money(row.value)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
                <div className="case-result-strip">
                  <div>
                    <span>BAZ KATKI</span>
                    <strong>{money(baseline.postAdContribution)}</strong>
                    <small>{percent(baseline.postAdContributionMargin)} marj</small>
                  </div>
                  <i aria-hidden="true">→</i>
                  <div>
                    <span>REVİZE KATKI</span>
                    <strong>{money(revised.postAdContribution)}</strong>
                    <small>{percent(revised.postAdContributionMargin)} marj</small>
                  </div>
                  <div className="case-result-change">
                    <span>SİMÜLASYON SONUCU</span>
                    <strong>{percent(contributionChange)}</strong>
                    <small>reklam sonrası katkı değişimi</small>
                  </div>
                </div>
                <div className="case-formula">
                  <span>TEKRARLANABİLİR FORMÜL</span>
                  <code>
                    Reklam sonrası katkı = Net satış − Ürün maliyeti − Komisyon/ödeme −
                    Kargo/paketleme − İade rezervi − Reklam harcaması
                  </code>
                </div>
              </section>

              <section id="kararlar" className="case-copy-section">
                <span className="eyebrow">05 / KARAR GÜNLÜĞÜ</span>
                <h2>Model hangi kararları sınar?</h2>
                <div className="case-decision-grid">
                  {item.decisions.map((decision, index) => (
                    <div key={decision.title}>
                      <span>0{index + 1}</span>
                      <h3>{decision.title}</h3>
                      <p>{decision.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="sinirlar" className="case-copy-section">
                <span className="eyebrow">06 / SINIRLAMALAR</span>
                <h2>Bu sonuç neyi kanıtlamaz?</h2>
                <div className="case-limit-panel">
                  <strong>Bu örnek bir başarı hikâyesi veya nedensel etki kanıtı değildir.</strong>
                  <ul>
                    {item.limitations.map((limitation) => (
                      <li key={limitation}>{limitation}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="section-band band-cyan">
          <div className="wrap section">
            <div className="head">
              <div>
                <span className="eyebrow">KENDİ VERİNİZLE</span>
                <h2>Modeli araçlarda yeniden kurun.</h2>
              </div>
              <p>Varsayımları kendi ürün maliyeti ve reklam verinizle değiştirin.</p>
            </div>
            <div className="grid case-related-grid">
              {item.relatedTools.map((link) => (
                <a className="card" key={link.href} href={link.href}>
                  <span className="tag">ÜCRETSİZ ARAÇ</span>
                  <h3>{link.title}</h3>
                  <span className="link">Aracı aç →</span>
                </a>
              ))}
              {item.relatedGuides.map((link) => (
                <a className="card" key={link.href} href={link.href}>
                  <span className="tag">REHBER</span>
                  <h3>{link.title}</h3>
                  <span className="link">Rehberi oku →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>

      <Footer t={t} />
    </main>
  )
}

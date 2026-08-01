import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { comparisonExampleMetrics, getMetricComparison, metricComparisons } from '@/lib/comparisons'
import { getDictionary } from '@/lib/i18n'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

const money = (value: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value)

export function generateStaticParams() {
  return metricComparisons.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getMetricComparison(slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/karsilastirmalar/${item.slug}` },
  }
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = getMetricComparison(slug)
  if (!item) notFound()

  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const example = comparisonExampleMetrics(item)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.description,
    dateModified: item.reviewedAt,
    inLanguage: 'tr-TR',
    url: `${siteUrl}/karsilastirmalar/${item.slug}`,
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    about: [item.left.name, item.right.name, 'E-ticaret reklam analitiği'],
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Karşılaştırmalar', item: `${siteUrl}/karsilastirmalar` },
      { '@type': 'ListItem', position: 2, name: `${item.left.name} vs ${item.right.name}`, item: `${siteUrl}/karsilastirmalar/${item.slug}` },
    ],
  }

  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <NavBar t={t} />

      <article>
        <header className="hero-shell comparison-hero">
          <div className="wrap comparison-head">
            <a className="crumb" href="/karsilastirmalar"><i aria-hidden="true" />KARŞILAŞTIRMALAR / GERİ DÖN</a>
            <div className="comparison-trust"><span>BAĞIMSIZ · SPONSOR DEĞİL</span><span>SON KONTROL · {new Intl.DateTimeFormat('tr-TR').format(new Date(item.reviewedAt))}</span></div>
            <span className="eyebrow">{item.category} / KARAR REHBERİ</span>
            <h1>{item.title}</h1>
            <p className="intro">{item.description}</p>
            <div className="comparison-verdict">
              <span>60 SANİYELİK KARAR</span>
              <strong>{item.verdict}</strong>
            </div>
          </div>
        </header>

        <section className="section-band band-paper">
          <div className="wrap section comparison-body">
            <section className="comparison-duel" aria-labelledby="scope-title">
              <div className="comparison-section-head"><span className="eyebrow">01 / KAPSAM</span><h2 id="scope-title">İki metrik, iki farklı karar seviyesi.</h2></div>
              {[item.left, item.right].map((metric, index) => (
                <div className="comparison-metric" key={metric.name}>
                  <div className="comparison-metric-title"><small>0{index + 1}</small><span>{metric.longName}</span><h3>{metric.name}</h3><p>{metric.question}</p></div>
                  <dl>
                    <div><dt>Formül</dt><dd>{metric.formula}</dd></div>
                    <div><dt>Pay</dt><dd>{metric.numerator}</dd></div>
                    <div><dt>Payda</dt><dd>{metric.denominator}</dd></div>
                  </dl>
                  <div className="comparison-list"><strong>Güçlü olduğu kararlar</strong><ul>{metric.bestFor.map((point) => <li key={point}>{point}</li>)}</ul></div>
                  <div className="comparison-list comparison-limit"><strong>Sınırlamalar</strong><ul>{metric.limits.map((point) => <li key={point}>{point}</li>)}</ul></div>
                </div>
              ))}
            </section>

            <section className="comparison-section" aria-labelledby="example-title">
              <div className="comparison-section-head"><span className="eyebrow">02 / ÖRNEK HESAP</span><h2 id="example-title">Platformlar iyi görünürken toplam sonuç neden farklı?</h2><p>Tüm değerler öğretici amaçlı simüle edilmiştir.</p></div>
              <div className="comparison-example">
                <div className="comparison-example-source">
                  <span>{item.example.period}</span>
                  <dl>
                    <div><dt>Toplam net gelir</dt><dd>{money(item.example.totalRevenue)}</dd></div>
                    <div><dt>Meta atfedilen gelir / harcama</dt><dd>{money(item.example.metaAttributedRevenue)} / {money(item.example.metaSpend)}</dd></div>
                    <div><dt>Google atfedilen gelir / harcama</dt><dd>{money(item.example.googleAttributedRevenue)} / {money(item.example.googleSpend)}</dd></div>
                  </dl>
                </div>
                <div className="comparison-example-results">
                  <div><span>META ROAS</span><strong>{example.metaRoas.toFixed(2)}</strong><small>Platform atfı</small></div>
                  <div><span>GOOGLE ROAS</span><strong>{example.googleRoas.toFixed(2)}</strong><small>Platform atfı</small></div>
                  <div className="comparison-example-mer"><span>MEDYA MER</span><strong>{example.mer.toFixed(2)}</strong><small>Toplam gelir ÷ {money(example.totalSpend)}</small></div>
                </div>
              </div>
              <div className="comparison-overlap">
                <span>ATIF UYARISI</span>
                <strong>Platformların toplam atfedilen geliri, mağaza gelirinden {money(example.attributionOverlap)} daha yüksek.</strong>
                <p>Aynı sipariş iki platform tarafından sahiplenilmiş olabilir. Bu nedenle platform ROAS değerleri toplanmaz; toplam görünüm şirket geliriyle uzlaştırılır.</p>
              </div>
            </section>

            <section className="comparison-section" aria-labelledby="decision-title">
              <div className="comparison-section-head"><span className="eyebrow">03 / KARAR TABLOSU</span><h2 id="decision-title">Hangi durumda hangisine bakmalısınız?</h2></div>
              <div className="comparison-table-wrap" tabIndex={0} role="region" aria-label="ROAS ve MER karar tablosu">
                <table>
                  <thead><tr><th scope="col">Karar</th><th scope="col">Birincil metrik</th><th scope="col">Yanına ekle</th><th scope="col">Neden?</th></tr></thead>
                  <tbody>{item.decisions.map((row) => <tr key={row.situation}><th scope="row">{row.situation}</th><td><strong>{row.primary}</strong></td><td>{row.companion}</td><td>{row.reason}</td></tr>)}</tbody>
                </table>
              </div>
            </section>

            <section className="comparison-section comparison-checks" aria-labelledby="checks-title">
              <div className="comparison-section-head"><span className="eyebrow">04 / KALİTE KONTROLÜ</span><h2 id="checks-title">Raporu yayınlamadan önce.</h2></div>
              <ol>{item.checklist.map((check, index) => <li key={check}><span>{String(index + 1).padStart(2, '0')}</span><p>{check}</p></li>)}</ol>
            </section>

            <section className="comparison-section comparison-sources" aria-labelledby="sources-title">
              <div className="comparison-section-head"><span className="eyebrow">05 / KAYNAKLAR</span><h2 id="sources-title">Tanımların dayanağı.</h2><p>Bir sonraki içerik kontrolü: {new Intl.DateTimeFormat('tr-TR').format(new Date(item.reviewDueAt))}</p></div>
              <ol>{item.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a><p>{source.note}</p></li>)}</ol>
            </section>
          </div>
        </section>

        <section className="section-band band-cyan">
          <div className="wrap section">
            <div className="head"><div><span className="eyebrow">SONRAKİ ADIM</span><h2>Karşılaştırmayı kendi karar sisteminize taşıyın.</h2></div><p>Ekonomik eşiği hesaplayın veya ilgili metrik rehberine geçin.</p></div>
            <div className="grid comparison-related">
              <a className="card" href={item.relatedTool.href}><span className="tag">ÜCRETSİZ ARAÇ</span><h3>{item.relatedTool.title}</h3><span className="link">Aracı aç →</span></a>
              {item.relatedGuides.map((link) => <a className="card" key={link.href} href={link.href}><span className="tag">REHBER</span><h3>{link.title}</h3><span className="link">Rehberi oku →</span></a>)}
              {item.relatedTerms.map((link) => <a className="card" key={link.href} href={link.href}><span className="tag">SÖZLÜK</span><h3>{link.title}</h3><span className="link">Tanımı aç →</span></a>)}
            </div>
          </div>
        </section>
      </article>
      <Footer t={t} />
    </main>
  )
}

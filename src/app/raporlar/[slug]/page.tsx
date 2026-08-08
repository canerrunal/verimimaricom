import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { benchmarkReports, getBenchmarkReport } from '@/lib/reports'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return benchmarkReports.map((report) => ({ slug: report.slug })) }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const report = getBenchmarkReport((await params).slug)
  if (!report) return { title: 'Rapor Bulunamadı' }
  return { title: report.title, description: report.description, alternates: { canonical: `/raporlar/${report.slug}` }, openGraph: { title: report.title, description: report.description, type: 'article' } }
}

export default async function ReportDetailPage({ params }: PageProps) {
  const report = getBenchmarkReport((await params).slug)
  if (!report) notFound()
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const reportUrl = `${siteUrl}/raporlar/${report.slug}`
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Report', name: report.title, description: report.description, url: reportUrl, datePublished: report.publishedAt, dateModified: report.reviewedAt, inLanguage: 'tr-TR', author: { '@type': 'Person', name: brandProfile.name, url: siteUrl }, publisher: { '@type': 'Organization', name: brandProfile.brand, url: siteUrl } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Raporlar', item: `${siteUrl}/raporlar` }, { '@type': 'ListItem', position: 3, name: report.title, item: reportUrl }] },
  ]
  return <main className="page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <NavBar t={t} />
    <section className="hero-shell report-detail-hero"><div className="wrap hero"><div className="hero-copy"><a className="back-link" href="/raporlar">← Tüm raporlar</a><div className="crumb"><i aria-hidden="true" /> E-TİCARET KÂRLILIĞI / BENCHMARK NOTU</div><h1>{report.title}</h1><p className="intro">{report.description}</p><div className="signals"><span className="tag"><i />{report.status}</span><span className="tag"><i />Son kontrol: 02.08.2026</span><span className="tag"><i />Açık yöntem</span></div></div><aside className="report-manifest" aria-label="Rapor özeti"><span className="eyebrow">RAPOR MANİFESTOSU</span><strong>05</strong><small>SENARYO</small><p>{report.sample}</p><dl><div><dt>Veri tipi</dt><dd>Simüle edilmiş ekonomi</dd></div><div><dt>Karar amacı</dt><dd>ROAS eşiğini marj ve iade ile birlikte okumak</dd></div></dl></aside></div></section>
    <section className="section-band band-orange report-warning"><div className="wrap section"><strong>OKUMA NOTU</strong><p>Bu rapor gerçek pazar ortalaması veya müşteri sonucu değildir. Sayılar, yöntemi göstermek için oluşturulmuş simülasyon senaryolarıdır.</p></div></section>
    <section className="section-band band-paper"><div className="wrap section report-headlines"><div className="head"><div><span className="eyebrow">60 SANİYELİK ÖZET</span><h2>Ürün ekonomisi reklam eşiğini belirler.</h2></div><p>Başabaş ROAS, reklam kararını ürün marjı ve beklenen iade etkisinden ayırmadan yorumlamayı sağlar.</p></div><div className="report-stat-grid">{report.headline.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><p>{item.note}</p></div>)}</div></div></section>
    <section className="section-band band-surface"><div className="wrap section"><div className="head"><div><span className="eyebrow">SENARYO TABLOSU</span><h2>Beş ekonomi, beş farklı eşik.</h2></div><p>Aynı reklam hedefi farklı marj ve iade koşullarında farklı bir karar üretir.</p></div><div className="report-table-wrap" tabIndex={0} role="region" aria-label="Kârlılık benchmark tablosu"><table className="table"><caption>Simüle edilmiş ürün ekonomisi senaryoları</caption><thead><tr><th>Senaryo</th><th>Katkı marjı</th><th>İade etkisi</th><th>Başabaş ROAS</th><th>MER planlama</th><th>Sinyal</th></tr></thead><tbody>{report.rows.map((row) => <tr key={row.segment}><th scope="row">{row.segment}</th><td>{row.margin}</td><td>{row.returnRate}</td><td><strong>{row.breakEvenRoas}</strong></td><td>{row.mer}</td><td>{row.signal}</td></tr>)}</tbody></table></div></div></section>
    <section className="section-band band-dark"><div className="wrap section report-method"><div><span className="eyebrow">YÖNTEM VE SINIR</span><h2>Sonucu değil, hesap zincirini yeniden kurun.</h2></div><div><h3>Nasıl hesaplandı?</h3><ul>{report.methodology.map((item) => <li key={item}>{item}</li>)}</ul><h3>Sınırlamalar</h3><ul>{report.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section-band band-cyan"><div className="wrap section"><div className="head"><div><span className="eyebrow">KARAR ÇERÇEVESİ</span><h2>Tabloyu haftalık karara çevirin.</h2></div></div><div className="report-decision-grid">{report.decisions.map((item, index) => <article key={item.signal}><span>0{index + 1}</span><h3>{item.signal}</h3><p><strong>Anlamı:</strong> {item.meaning}</p><p><strong>Aksiyon:</strong> {item.action}</p></article>)}</div></div></section>
    <section className="section-band band-paper"><div className="wrap section report-bottom-grid"><div><span className="eyebrow">KAYNAKLAR</span><h2>Kaynağı ve kapsamı birlikte okuyun.</h2><ol className="report-sources">{report.sources.map((source) => <li key={source.url}><a href={source.url} target={source.url.startsWith('http') ? '_blank' : undefined} rel={source.url.startsWith('http') ? 'noopener noreferrer' : undefined}>{source.name} ↗</a><span>{source.note}</span></li>)}</ol></div><div><span className="eyebrow">BİR SONRAKİ ADIM</span><h2>Kendi verinizi hesaplayın.</h2><div className="report-links">{report.relatedTools.map((item) => <a key={item.href} href={item.href}>{item.title} →</a>)}{report.relatedGuides.map((item) => <a key={item.href} href={item.href}>{item.title} →</a>)}</div></div></div></section>
    <Footer t={t} />
  </main>
}

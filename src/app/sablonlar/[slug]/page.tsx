import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import TrackLink from '@/components/analytics/TrackLink'
import { getDictionary } from '@/lib/i18n'
import { getResourceTemplate, resourceTemplates } from '@/lib/templates'
import { brandProfile, getSiteUrl } from '@/lib/seo'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return resourceTemplates.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = getResourceTemplate((await params).slug)
  if (!item) return { title: 'Şablon Bulunamadı' }
  return { title: item.title, description: item.description, alternates: { canonical: `/sablonlar/${item.slug}` } }
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const item = getResourceTemplate((await params).slug)
  if (!item) notFound()
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'DigitalDocument', name: item.title,
      description: item.description, encodingFormat: 'text/csv', inLanguage: 'tr-TR',
      url: `${siteUrl}/sablonlar/${item.slug}`, dateModified: item.updatedAt,
      author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Şablonlar', item: `${siteUrl}/sablonlar` },
        { '@type': 'ListItem', position: 3, name: item.title, item: `${siteUrl}/sablonlar/${item.slug}` },
      ],
    },
  ]

  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar t={t} />
      <section className="hero-shell template-detail-hero">
        <div className="wrap hero">
          <div className="hero-copy">
            <a className="back-link" href="/sablonlar">← Tüm şablonlar</a>
            <div className="crumb"><i aria-hidden="true" /> {item.category} / ÜCRETSİZ ŞABLON</div>
            <h1>{item.title}</h1>
            <p className="intro">{item.description}</p>
            <div className="actions-row">
              <TrackLink className="btn hero-primary" href={item.downloadHref} eventName="template_download" payload={{ template_slug: item.slug }} download>
                CSV şablonunu indir ↓
              </TrackLink>
              <a className="hero-link" href="#kullanim">Kullanım yöntemini gör</a>
            </div>
            <div className="signals"><span className="tag"><i />Kayıt gerektirmez</span><span className="tag"><i />{item.format}</span><span className="tag"><i />Son kontrol: 02.08.2026</span></div>
          </div>
          <aside className="template-manifest" aria-label="Şablon özeti">
            <span className="eyebrow">DOSYA MANİFESTOSU</span>
            <strong>{item.sheets.length}</strong><small>ÇALIŞMA ALANI</small>
            <p>{item.primaryOutcome}</p>
            <dl><div><dt>Hedef kullanıcı</dt><dd>{item.audience}</dd></div><div><dt>Veri işleme</dt><dd>Yerel dosya; siteye veri göndermez</dd></div></dl>
          </aside>
        </div>
      </section>

      <section className="section-band band-dark template-outcome"><div className="wrap section"><span className="eyebrow">TEK ANA ÇIKTI</span><h2>{item.primaryOutcome}</h2></div></section>

      <section id="kullanim" className="section-band band-paper"><div className="wrap section">
        <div className="head"><div><span className="eyebrow">İÇERİK HARİTASI</span><h2>Dosyanın içinde ne var?</h2></div><p>Alanları kendi sisteminize uyarlayın; tanımları sessizce değiştirmeyin.</p></div>
        <div className="template-sheet-grid">{item.sheets.map((sheet, index) => <article key={sheet.name}><span>0{index + 1}</span><h3>{sheet.name}</h3><p>{sheet.purpose}</p><ul>{sheet.fields.map((field) => <li key={field}>{field}</li>)}</ul></article>)}</div>
      </div></section>

      <section className="section-band band-surface"><div className="wrap section">
        <div className="head"><div><span className="eyebrow">UYGULAMA PROTOKOLÜ</span><h2>Dört adımda kullanın.</h2></div></div>
        <ol className="template-steps">{item.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
      </div></section>

      <section className="section-band band-cyan"><div className="wrap section">
        <div className="head"><div><span className="eyebrow">METRİK SÖZLÜĞÜ</span><h2>Her sütunun bir karar görevi var.</h2></div></div>
        <div className="guide-table-wrap" tabIndex={0} role="region" aria-label="Şablon metrik tanımları"><table className="table"><thead><tr><th>Metrik</th><th>Tanım</th><th>Desteklediği karar</th></tr></thead><tbody>{item.metrics.map((metric) => <tr key={metric.name}><th scope="row">{metric.name}</th><td>{metric.definition}</td><td>{metric.decision}</td></tr>)}</tbody></table></div>
      </div></section>

      <section className="section-band band-paper"><div className="wrap section template-quality">
        <div><span className="eyebrow">YAYINLAMADAN ÖNCE</span><h2>Kalite kontrol listesi.</h2></div>
        <ul className="guide-checklist">{item.checks.map((check) => <li key={check}>{check}</li>)}</ul>
      </div></section>

      <section className="section-band band-dark"><div className="wrap section template-next">
        <div><span className="eyebrow">ŞABLONU ÇALIŞTIRIN</span><h2>Dosyayı alın, yöntemi doğrulayın.</h2><p>Şablon bir karar desteğidir; veri tanımları ve ekonomik eşikler mağazanıza göre doğrulanmalıdır.</p></div>
        <div><TrackLink className="btn hero-primary" href={item.downloadHref} eventName="template_download" payload={{ template_slug: item.slug, placement: 'footer' }} download>Ücretsiz CSV’yi indir ↓</TrackLink><a href={item.relatedGuide.href}>{item.relatedGuide.title} →</a><a href={item.relatedTool.href}>{item.relatedTool.title} →</a></div>
      </div></section>
      <Footer t={t} />
    </main>
  )
}

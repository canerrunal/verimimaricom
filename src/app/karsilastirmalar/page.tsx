import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { metricComparisons } from '@/lib/comparisons'

export const metadata: Metadata = {
  title: 'E-Ticaret Metrik Karşılaştırmaları',
  description: 'ROAS, MER ve diğer e-ticaret metriklerini kapsam, formül, kullanım alanı ve sınırlamalarıyla karşılaştırın.',
  alternates: { canonical: '/karsilastirmalar' },
}

export default function ComparisonsPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />
      <section className="wrap hero single comparison-index-hero">
        <div>
          <div className="crumb">KARŞILAŞTIRMALAR / KARAR REHBERLERİ</div>
          <h1>Aynı görünen metrikleri doğru kararda ayırın.</h1>
          <p className="intro">Formülü ezberlemek yerine kapsamı, veri kaynağını, güçlü olduğu kararı ve yanıltabileceği noktayı karşılaştırın.</p>
        </div>
      </section>

      <section className="wrap comparison-index">
        <div className="comparison-index-note">
          <strong>BAĞIMSIZ KARŞILAŞTIRMA</strong>
          <span>Sponsorlu içerik veya affiliate bağlantı içermez. Kaynak ve son doğrulama tarihi her sayfada görünür.</span>
        </div>
        <div className="comparison-card-grid">
          {metricComparisons.map((item, index) => (
            <a key={item.slug} href={`/karsilastirmalar/${item.slug}`} className="comparison-card">
              <div><span className="tag">{item.category}</span><small>{String(index + 1).padStart(2, '0')}</small></div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <dl><div><dt>Sol metrik</dt><dd>{item.left.name}</dd></div><div><dt>Sağ metrik</dt><dd>{item.right.name}</dd></div></dl>
              <span className="link">Karar tablosunu aç →</span>
            </a>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { benchmarkReports } from '@/lib/reports'

export const metadata: Metadata = {
  title: 'E-Ticaret Raporları ve Benchmark Notları',
  description:
    'Açık yöntem, simülasyon etiketi ve sınırlamalarıyla e-ticaret kârlılığı benchmark raporları.',
  alternates: { canonical: '/raporlar' },
}

export default function ReportsPage() {
  const t = getDictionary('tr')
  return (
    <main className="page">
      <NavBar t={t} />
      <section className="hero-shell report-index-hero">
        <div className="wrap hero single">
          <div>
            <div className="crumb">
              <i aria-hidden="true" /> RAPORLAR / AÇIK BENCHMARK
            </div>
            <h1>
              Oranı değil, <span className="accent">varsayımı</span> karşılaştırın.
            </h1>
            <p className="intro">
              Benchmark notları tek bir “ideal” sayı vermek yerine formülü, veri kapsamını,
              senaryoyu ve karara etkisini açıklar.
            </p>
          </div>
        </div>
      </section>
      <section className="section-band band-paper">
        <div className="wrap section report-index">
          <div className="report-disclosure">
            <strong>AÇIKÇA ETİKETLENMİŞ VERİ</strong>
            <span>
              Simülasyon, gerçek müşteri sonucu veya pazar ortalaması gibi sunulmaz. Her raporda
              örneklem, varsayım ve sınırlama görünürdür.
            </span>
          </div>
          <div className="head">
            <div>
              <span className="eyebrow">RAPOR KÜTÜPHANESİ / {benchmarkReports.length}</span>
              <h2>Karar vermeden önce kapsamı okuyun.</h2>
            </div>
            <p>Raporlar; rehber, araç ve şablonlara bağlanan açık metodoloji notlarıdır.</p>
          </div>
          <div className="report-card-grid">
            {benchmarkReports.map((report, index) => (
              <a key={report.slug} href={`/raporlar/${report.slug}`} className="report-card">
                <div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="tag">{report.status}</span>
                </div>
                <h2>{report.title}</h2>
                <p>{report.description}</p>
                <dl>
                  <div>
                    <dt>Kapsam</dt>
                    <dd>{report.sample}</dd>
                  </div>
                  <div>
                    <dt>Güncellendi</dt>
                    <dd>02 Ağustos 2026</dd>
                  </div>
                </dl>
                <strong>Raporu ve yöntemi aç →</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

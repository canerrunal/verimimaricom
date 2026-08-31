import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { benchmarkReports } from '@/lib/reports'

export const metadata: Metadata = {
  title: 'Teknik Araştırma ve E-Ticaret Raporları',
  description:
    'Açık yöntem, gerçek ölçüm, simülasyon etiketi ve sınırlamalarıyla teknik araştırma ve e-ticaret raporları.',
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
              <i aria-hidden="true" /> RAPORLAR / AÇIK YÖNTEM
            </div>
            <h1>
              Sonucu değil, <span className="accent">kapsamı</span> okuyun.
            </h1>
            <p className="intro">
              Teknik deneyler ve benchmark notları tek bir “ideal” sayı vermek yerine yöntemi,
              ölçümü, veri kapsamını ve karara etkisini açıklar.
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
              <span className="eyebrow">
                RAPOR KÜTÜPHANESİ / {String(benchmarkReports.length).padStart(2, '0')}
              </span>
              <h2>Karar vermeden önce kapsamı okuyun.</h2>
            </div>
            <p>Raporlar; rehber, araç ve deney notlarına bağlanan açık metodoloji yüzeyleridir.</p>
          </div>
          <div className="report-card-grid">
            {benchmarkReports.map((report, index) => (
              <a key={report.slug} href={`/raporlar/${report.slug}`} className="report-card">
                <div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="tag">
                    {report.kind === 'technical' ? 'TEKNİK DENEY' : report.status}
                  </span>
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
                    <dd>{report.reviewedAt.split('-').reverse().join('.')}</dd>
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

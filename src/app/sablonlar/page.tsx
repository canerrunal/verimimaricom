import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { resourceTemplates } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Ücretsiz E-Ticaret Şablonları ve Kontrol Listeleri',
  description:
    'Reklam raporlama, kampanya kârlılığı ve UTM standardı için Excel ve Google Sheets uyumlu ücretsiz e-ticaret şablonları.',
  alternates: { canonical: '/sablonlar' },
}

export default function TemplatesPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />
      <section className="hero-shell template-index-hero">
        <div className="wrap hero single">
          <div>
            <div className="crumb"><i aria-hidden="true" /> ŞABLONLAR / UYGULAMAYA HAZIR</div>
            <h1>Boş tabloyla değil, <span className="accent">karar sistemiyle</span> başlayın.</h1>
            <p className="intro">
              Excel ve Google Sheets’e aktarılabilen ücretsiz tablolar; alan tanımları, kullanım
              adımları ve kalite kontrol listesiyle birlikte gelir.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band band-paper">
        <div className="wrap section template-index">
          <div className="template-library-note" role="note">
            <strong>ÜCRETSİZ · KAYIT GEREKTİRMEZ</strong>
            <span>Şablonlar örnek veri içerir; mağaza veriniz tarayıcıdan Veri Mimarı’na gönderilmez.</span>
          </div>
          <div className="head">
            <div><span className="eyebrow">KAYNAK KÜTÜPHANESİ / {resourceTemplates.length}</span><h2>Kopyalayın, uyarlayın, karar verin.</h2></div>
            <p>Her dosyanın neyi ölçtüğünü ve hangi kararı desteklediğini indirmeden önce görün.</p>
          </div>
          <div className="template-card-grid">
            {resourceTemplates.map((item, index) => (
              <a key={item.slug} href={`/sablonlar/${item.slug}`} className="template-card">
                <div><span>{String(index + 1).padStart(2, '0')}</span><span className="tag">{item.category}</span></div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <dl><div><dt>Format</dt><dd>{item.format}</dd></div><div><dt>İçerik</dt><dd>{item.sheets.length} çalışma alanı</dd></div></dl>
                <strong>Şablonu ve yöntemi aç →</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

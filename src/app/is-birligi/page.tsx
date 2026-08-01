import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import CollaborationForm from '@/components/contact/CollaborationForm'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'İş Birliği ve İletişim',
  description:
    'E-ticaret markaları, dijital pazarlama ekipleri ve teknoloji projeleri için iş birliği ve danışmanlık.',
}

export default function IsBirligiPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">İLETİŞİM / PROJE VE DANIŞMANLIK</div>
          <h1>Projeniz veya markanız için iletişime geçin.</h1>
          <p className="intro">
            E-ticaret büyümesi, kârlılık modelleri veya yapay zeka otomasyon projeleriniz için
            doğrudan iletişim.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="two-col" style={{ marginBottom: 12 }}>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow" style={{ marginBottom: 12 }}>
              DOĞRUDAN KANAL
            </span>
            <h2
              style={{ font: "700 22px 'Space Mono'", letterSpacing: '-0.02em', margin: '0 0 8px' }}
            >
              Doğrudan E-Posta
            </h2>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: 10 }}>
              Sorularınız ve hızlı ulaşım için:
            </p>
            <a
              href="mailto:hello@verimimari.com"
              className="link"
              style={{ marginTop: 'auto', paddingTop: 14 }}
            >
              hello@verimimari.com
            </a>
          </div>

          <div className="panel">
            <span className="eyebrow" style={{ marginBottom: 12 }}>
              DESTEK ALANLARI
            </span>
            <h2
              style={{
                font: "700 22px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}
            >
              Hangi Alanlarda Destek Sunuyorum?
            </h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
              {[
                'E-ticaret Reklam ve Katkı Payı Modellemesi',
                'Özel Hesaplama Araçları ve Landing Page Geliştirme',
                'Yapay Zeka Destekli İçerik ve Otomasyon Sistemleri',
                'Ölçülebilir Vaka Analizi ve Veri Hikayeciliği',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    padding: '7px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: 10,
                    color: 'var(--ink)',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CollaborationForm />
      <Footer t={t} />
    </main>
  )
}

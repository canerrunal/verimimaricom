import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import CollaborationForm from '@/components/contact/CollaborationForm'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'İş Birliği ve İletişim | Veri Mimarı',
  description: 'E-ticaret markaları, dijital pazarlama ekipleri ve teknoloji projeleri için iş birliği ve danışmanlık.',
}

export default function IsBirligiPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">İLETİŞİM / PROJE VE DANIŞMANLIK</span>
        <h1>İş Birliği İletişimi</h1>
        <p style={{ fontSize: '1.1rem' }}>E-ticaret büyümesi, reklam analitiği veya yapay zeka otomasyon projeleriniz için doğrudan iletişime geçin.</p>
      </section>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.1rem' }}>Doğrudan E-Posta</h2>
          <p style={{ color: 'var(--text-1)', margin: 0 }}>
            Sorularınız ve hızlı ulaşım için:{' '}
            <a href="mailto:hello@verimimari.com" style={{ color: 'var(--accent-0)', fontWeight: 600 }}>
              hello@verimimari.com
            </a>
          </p>
        </section>

        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.1rem' }}>Hangi Alanlarda Destek Sunuyorum?</h2>
          <ul style={{ color: 'var(--text-1)', lineHeight: '1.8', paddingLeft: '1.2rem', margin: 0 }}>
            <li>E-ticaret Reklam ve Katkı Payı Modellemesi</li>
            <li>Özel Hesaplama Araçları ve Landing Page Geliştirme</li>
            <li>Yapay Zeka Destekli İçerik ve Otomasyon Sistemleri</li>
            <li>Ölçülebilir Vaka Analizi ve Veri Hikayeciliği</li>
          </ul>
        </section>

        <CollaborationForm />
      </div>
    </main>
  )
}

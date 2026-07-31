import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import WaitlistForm from '@/components/zolm/WaitlistForm'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Zolm — E-Ticaret Reklam Zekâsı Platformu',
  description: 'E-ticaret reklamlarınızı ve kârlılığınızı otomatik analiz eden akıllı karar platformu Zolm.',
}

export default function ZolmPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <span className="maturity-chip seed" style={{ marginBottom: '0.8rem' }}>YAKINDA / BEKLEME LİSTESİ</span>
        <h1 style={{ maxWidth: '100%' }}>Zolm — E-Ticaret Reklam Zekâsı</h1>
        <p style={{ maxWidth: '640px', margin: '0.8rem auto 0' }}>
          Reklam harcamalarınızı ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren akıllı karar platformu.
        </p>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        <div className="card glass">
          <h3>Otomatik Başa Baş Hesabı</h3>
          <p>Her ürününüzün maliyetini, komisyonunu ve kargosunu anlık çekerek minimum harcama eşiğini otomatik günceller.</p>
        </div>
        <div className="card glass">
          <h3>Bütçe Kaçak Alarmı</h3>
          <p>Zarar ettiren reklam setlerini anında tespit eder ve harcamayı durdurmanız için uyarı gönderir.</p>
        </div>
        <div className="card glass">
          <h3>Kâr Odaklı Ölçekleme</h3>
          <p>Ciroya değil, net katkı payına göre hangi kampanyayı büyütmeniz gerektiğini söyler.</p>
        </div>
        <div className="card glass">
          <h3>Pazaryeri & POS Entegrasyonu</h3>
          <p>Trendyol, Hepsiburada, Shopify ve İyzi verilerinizi tek bir kârlılık kokpitinde birleştirir.</p>
        </div>
      </section>

      <WaitlistForm />
    </main>
  )
}

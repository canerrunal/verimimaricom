import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import WaitlistForm from '@/components/zolm/WaitlistForm'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Zolm — E-Ticaret Reklam Zekâsı Platformu',
  description:
    'E-ticaret reklamlarınızı ve kârlılığınızı otomatik analiz eden akıllı karar platformu Zolm.',
}

const features = [
  {
    title: 'Otomatik Başa Baş Hesabı',
    desc: 'Her ürününüzün maliyetini, komisyonunu ve kargosunu anlık çekerek minimum harcama eşiğini otomatik günceller.',
  },
  {
    title: 'Bütçe Kaçak Alarmı',
    desc: 'Zarar ettiren reklam setlerini anında tespit eder ve harcamayı durdurmanız için uyarı gönderir.',
  },
  {
    title: 'Kâr Odaklı Ölçekleme',
    desc: 'Ciroya değil, net katkı payına göre hangi kampanyayı büyütmeniz gerektiğini söyler.',
  },
  {
    title: 'Pazaryeri & POS Entegrasyonu',
    desc: 'Trendyol, Hepsiburada, Shopify ve İyzi verilerinizi tek bir kârlılık kokpitinde birleştirir.',
  },
]

export default function ZolmPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single" style={{ paddingBottom: 20 }}>
        <div className="crumb">PROJELER / ÜRÜN EKOSİSTEMİ</div>
        <h1>Zolm — E-Ticaret Reklam Zekâsı ve Kârlılık Platformu</h1>
        <p className="intro">
          Reklam harcamalarınızı ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren
          akıllı karar platformu.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="grid">
          {features.map((f, i) => (
            <div key={f.title} className="card">
              <span className="eyebrow" style={{ fontSize: 8 }}>
                0{i + 1}
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <WaitlistForm />
      <Footer t={t} />
    </main>
  )
}

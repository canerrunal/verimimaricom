import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Gizlilik ve Veri Politikası',
  description:
    'Veri Mimarı hesaplama araçları, iletişim formları ve geri bildirim kayıtlarının nasıl işlendiğini açıklar.',
  alternates: { canonical: '/gizlilik' },
  openGraph: {
    title: 'Gizlilik ve Veri Politikası | Veri Mimarı',
    description:
      'Hesaplama verilerinin, iletişim taleplerinin ve geri bildirimlerin nasıl işlendiğini okuyun.',
    type: 'website',
    url: '/gizlilik',
  },
}

const policies = [
  {
    n: '01',
    title: 'Hesaplama Araçlarında Veri Saklamama Sözü',
    body: 'Veri Mimarı web platformunda yer alan Başa Baş ROAS Hesaplayıcı ve diğer kârlılık araçlarına girdiğiniz maliyet, satış fiyatı veya marj verileri hiçbir sunucuya gönderilmez veya veritabanında saklanmaz. Tüm hesaplamalar doğrudan tarayıcınızda (client-side) anlık olarak çalışır.',
  },
  {
    n: '02',
    title: 'E-posta Üyeliği',
    body: 'Bültene kendi rızanızla kaydolduğunuzda e-posta adresiniz yalnızca haftalık Veri Mimarı Notları bültenini iletmek amacıyla kullanılır. İlettiğimiz e-postalardaki abonelikten çıkma bağlantısını kullanarak dilediğiniz an listenin dışına çıkabilirsiniz.',
  },
  {
    n: '03',
    title: 'Çerezler ve Analitik',
    body: 'Web sitemizin performansını anlamak ve ziyaretçi deneyimini iyileştirmek için anonimleştirilmiş temel analitik etkinlikleri toplanır. Bu veriler üçüncü şahıslara satılmaz veya kişisel kimlik bilgilerinizle eşleştirilmez.',
  },
  {
    n: '04',
    title: 'İletişim ve Geri Bildirim Kayıtları',
    body: 'İş birliği formu üzerinden gönderdiğiniz ad, e-posta ve proje bilgileri ile araçlarda isteğinizle paylaştığınız geri bildirimler Supabase üzerinde saklanır. Yeni gönderimler, yanıt verebilmek ve platformu geliştirmek amacıyla Resend üzerinden destek e-posta adresimize bildirilir. Bu bilgiler üçüncü taraflara satılmaz. İşleme amacı tamamlanana kadar tutulur; silme talebinizi verimimaridestek@gmail.com adresine iletebilirsiniz.',
  },
]

export default function GizlilikPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">POLİTİKA VE GÜVENLİK / GİZLİLİK</div>
          <h1>Hesaplama verileriniz cihazınızda kalır.</h1>
          <p className="intro">
            Maliyet ve hesaplama girdileri sunucularımıza kaydedilmez. Yalnızca kendi isteğinizle
            gönderdiğiniz iletişim talepleri ve geri bildirimler güvenli biçimde saklanır.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72, display: 'grid', gap: 12 }}>
        {policies.map((p) => (
          <div key={p.n} className="panel">
            <span className="eyebrow">{p.n}</span>
            <h2
              style={{
                font: "700 17px 'Space Mono'",
                letterSpacing: '-0.02em',
                margin: '12px 0 8px',
              }}
            >
              {p.title}
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0, fontSize: 11 }}>
              {p.body}
            </p>
          </div>
        ))}
      </section>
      <Footer t={t} />
    </main>
  )
}

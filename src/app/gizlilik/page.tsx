import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Gizlilik ve Veri Politikası',
  description: 'Veri Mimarı gizlilik politikası ve ücretsiz hesaplama araçları veri saklamama prensipleri.',
}

export default function GizlilikPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single">
        <div>
          <div className="crumb">POLİTİKA VE GÜVENLİK / GİZLİLİK</div>
          <h1>Verileriniz saklanmaz, tarayıcınızda işlenir.</h1>
          <p className="intro">Hesaplama araçlarına girdiğiniz hiçbir veri sunucularımıza kaydedilmez. Tüm hesaplamalar %100 istemci taraflı çalışır.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.1rem' }}>1. Hesaplama Araçlarında Veri Saklamama Sözü</h2>
          <p style={{ color: 'var(--text-1)', lineHeight: '1.7', margin: 0 }}>
            Veri Mimarı web platformunda yer alan Başa Baş ROAS Hesaplayıcı ve diğer kârlılık araçlarına girdiğiniz maliyet, satış fiyatı veya marj verileri hiçbir sunucuya gönderilmez veya veritabanında saklanmaz. Tüm hesaplamalar doğrudan tarayıcınızda (client-side) anlık olarak çalışır.
          </p>
        </section>

        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.1rem' }}>2. E-posta Üyeliği</h2>
          <p style={{ color: 'var(--text-1)', lineHeight: '1.7', margin: 0 }}>
            Bültene kendi rızanızla kaydolduğunuzda e-posta adresiniz yalnızca haftalık Veri Mimarı Notları bültenini iletmek amacıyla kullanılır. İlettiğimiz e-postalardaki abonelikten çıkma bağlantısını kullanarak dilediğiniz an listenin dışına çıkabilirsiniz.
          </p>
        </section>

        <section className="glass" style={{ padding: '1.8rem', borderRadius: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.1rem' }}>3. Çerezler ve Analitik</h2>
          <p style={{ color: 'var(--text-1)', lineHeight: '1.7', margin: 0 }}>
            Web sitemizin performansını anlamak ve ziyaretçi deneyimini iyileştirmek için anonimleştirilmiş temel analitik etkinlikleri toplanır. Bu veriler üçüncü şahıslara satılmaz veya kişisel kimlik bilgilerinizle eşleştirilmez.
          </p>
        </section>
      </div>
    </main>
  )
}

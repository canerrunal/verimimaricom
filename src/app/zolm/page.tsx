import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
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
          <p>Ciroya değil, net katkı payına göre hangi kampanyayı büyüteceğinizi söyler.</p>
        </div>
      </section>

      <section className="glass" style={{ padding: '2.5rem', borderRadius: '1.25rem', textAlign: 'center', marginTop: '1rem' }}>
        <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem' }}>Zolm Erken Erişime Katılın</h2>
        <p style={{ color: 'var(--text-1)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
          İlk sürüme katılmak ve kapalı betada ücretsiz denemek için e-postanızı bırakın.
        </p>
        <form style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="E-posta adresiniz"
            required
            style={{
              padding: '0.65rem 1rem',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '0.65rem',
              fontSize: '0.9rem',
              width: '280px',
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--text-0)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.65rem 1.2rem',
              background: 'linear-gradient(120deg, rgba(157,123,255,0.5), rgba(105,212,255,0.4))',
              color: 'var(--text-0)',
              border: '1px solid rgba(185,180,255,0.5)',
              borderRadius: '0.65rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Bekleme Listesine Katıl →
          </button>
        </form>
      </section>
    </main>
  )
}

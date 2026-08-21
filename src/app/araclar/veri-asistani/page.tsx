import type { Metadata } from 'next'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import VeriAssistantChat from '@/components/veribot/VeriAssistantChat'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Veri Asistanı — Trendyol ve Kârlılık Analizi',
  description:
    'Trendyol ürün ve kategori sinyallerini sorun; satış fiyatı, maliyet, komisyon ve kargoyla kârınızı konuşarak hesaplayın.',
  alternates: { canonical: '/araclar/veri-asistani' },
  openGraph: {
    title: 'Veri Asistanı | Veri Mimarı',
    description:
      'Pazar gözlemlerini, açık kârlılık formüllerini ve doğru Veri Mimarı aracını tek konuşmada birleştirin.',
    url: '/araclar/veri-asistani',
    type: 'website',
  },
}

const capabilities = [
  {
    index: '01',
    title: 'Tüm profillerde ürün bulur',
    description:
      'Fiyat, puan, fırsat skoru ve görünür satış sinyali filtrelerini günlük gözlemlerde birlikte çalıştırır.',
  },
  {
    index: '02',
    title: 'Kârı konuşarak hesaplar',
    description:
      'Satış, maliyet, komisyon ve kargoyu alır; güncellediğiniz değere göre hesabı yeniden kurar.',
  },
  {
    index: '03',
    title: 'Kategorileri aynı zeminde kıyaslar',
    description:
      'Medyan fiyat, yükseliş, fiyat düşüşü ve stok riskini aynı veri sözleşmesiyle karşılaştırır.',
  },
]

export default function VeriAssistantPage() {
  const t = getDictionary('tr')

  return (
    <main className="page assistant-page">
      <NavBar t={t} />

      <section className="hero-shell assistant-hero-shell">
        <div className="wrap hero single assistant-hero">
          <a href="/araclar" className="back-link">
            ← Tüm Araçlar
          </a>
          <div className="crumb">
            <i aria-hidden="true" /> ARAÇLAR / VERİ ASİSTANI / BETA
          </div>
          <h1>
            Soruyu yazın. <span className="accent">Doğru hesabı</span> birlikte çalıştıralım.
          </h1>
          <p className="intro">
            Ürün linkini veya kategori sorunuzu paylaşın; isterseniz maliyetleri yazıp kârı
            konuşarak hesaplayın ya da iki kategoriyi karşılaştırın. Asistan, Veri Mimarı’nın pazar
            gözlemlerini ve açık hesaplama motorlarını kullanır.
          </p>
          <div className="actions-row">
            <a className="btn hero-primary" href="#asistana-sor">
              Ücretsiz dene <span>↓</span>
            </a>
            <a className="hero-link" href="#yontem">
              Yöntemi ve sınırları oku ↗
            </a>
          </div>
          <div className="signals assistant-hero-signals">
            <span className="tag live">BETA · KAYIT YOK · ÜCRETSİZ</span>
            <span className="tag">ÇOKLU PROFİL + AÇIK FORMÜL</span>
            <span className="tag">UYDURMA SAYI YOK</span>
          </div>
        </div>
      </section>

      <section className="wrap assistant-workspace" id="asistana-sor">
        <aside className="assistant-brief" aria-label="Veri Asistanı yetenekleri">
          <span className="eyebrow">TEK SORU / ÜÇ KARAR MOTORU</span>
          <h2>Doğru aracı sizin yerinize seçsin.</h2>
          <p>
            Ayrı hesaplayıcılar ve pazar ekranları arasında dolaşmadan niyetinizi yazın. Sonuç,
            kaynağı ve bir sonraki doğru adımıyla gelir.
          </p>
          <ol>
            {capabilities.map((capability) => (
              <li key={capability.index}>
                <span>{capability.index}</span>
                <div>
                  <strong>{capability.title}</strong>
                  <p>{capability.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
        <div className="assistant-chat-column">
          <VeriAssistantChat />
        </div>
      </section>

      <section className="section-band band-dark assistant-method" id="yontem">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">YÖNTEM / KAYNAK / SINIR</span>
              <h2>Sayı varsa kaynağı; yoksa eksiği görün.</h2>
            </div>
            <p>
              Asistan, pazar tahmini üretmek yerine Veri Mimarı’nın günlük gözlem kapsamını ve
              deterministik hesaplama motorlarını kullanır.
            </p>
          </div>
          <div className="grid assistant-method-grid">
            <article className="card">
              <span className="tag">01 / PAZAR</span>
              <h3>Gözlemlenen sinyaller</h3>
              <p>
                Fiyat, sıra, stok ve Trendyol’un herkese açık talep ifadeleri tarih bilgisiyle
                sunulur. Bunlar kesin pazar satışı değildir.
              </p>
            </article>
            <article className="card">
              <span className="tag">02 / HESAP</span>
              <h3>Yalnız sizin girdiniz</h3>
              <p>
                Kârlılık hesabında eksik komisyon veya kargo için sektör ortalaması varsayılmaz;
                asistan eksik değeri sizden ister.
              </p>
            </article>
            <article className="card">
              <span className="tag">03 / GİZLİLİK</span>
              <h3>Minimum veri ilkesi</h3>
              <p>
                Soru sunucuda işlenir; bu deneyim konuşmayı bir kullanıcı profiline bağlayarak
                saklamaz. Hassas mağaza verisi paylaşmayın.
              </p>
            </article>
          </div>
        </div>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="Veri Asistanı" />
    </main>
  )
}

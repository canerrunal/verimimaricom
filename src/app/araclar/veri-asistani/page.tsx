import type { Metadata } from 'next'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import VeriAssistantChat from '@/components/veribot/VeriAssistantChat'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Veri Asistanı V2 — Ürün, Pazar ve Kârlılık Analizi',
  description:
    'Trendyol ürün linkini, kategori ve marka gözlemlerini analiz edin; ölçütünüze göre ürün bulun ve kârınızı konuşarak hesaplayın.',
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
    title: 'Ürün linkini tek karta çevirir',
    description:
      'Fiyatı, görülen satıcıları, sıralamayı ve görünür talep hızını aynı kaynak kartında toplar.',
  },
  {
    index: '02',
    title: 'Ölçütünüzle ürün bulur',
    description:
      'Fiyat, puan, fırsat, talep hızı ve gözlenen satıcı yoğunluğunu birlikte filtreler.',
  },
  {
    index: '03',
    title: 'Markayı pazar bağlamına koyar',
    description:
      'Ürün, alt kategori, medyan fiyat ve talep alt sınırını aynı gözlem kümesindeki karşılaştırılabilir ürünlerle birlikte gösterir.',
  },
  {
    index: '04',
    title: 'Kârı konuşarak hesaplar',
    description:
      'Ürün fiyatını gözlemden alabilir; maliyet, komisyon ve kargoyu konuşmada güncel tutar.',
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
            <i aria-hidden="true" /> ARAÇLAR / VERİ ASİSTANI / V2 BETA
          </div>
          <h1>
            Ürünü sorun. <span className="accent">Rakamın kaynağını</span> birlikte görelim.
          </h1>
          <p className="intro">
            Ürün linkini paylaşın, ölçütünüze göre ürün bulun veya marka ve kategoriyi analiz edin.
            Ardından maliyetleri yazıp kârı konuşarak hesaplayın. Ölçülen, türetilen ve sizin
            girdiğiniz değerler birbirine karışmaz.
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
            <span className="tag">6 KARAR MOTORU + AÇIK FORMÜL</span>
            <span className="tag">HER RAKAMDA KAYNAK TÜRÜ</span>
          </div>
        </div>
      </section>

      <section className="wrap assistant-workspace" id="asistana-sor">
        <aside className="assistant-brief" aria-label="Veri Asistanı yetenekleri">
          <span className="eyebrow">TEK SORU / ALTI KARAR MOTORU</span>
          <h2>Soruyu doğru veri motoruna yönlendirsin.</h2>
          <p>
            Ayrı hesaplayıcılar ve pazar ekranları arasında dolaşmadan niyetinizi yazın. Sonuç;
            kapsamı, kaynak türü, yöntem notu ve bir sonraki doğru adımıyla gelir.
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
              Asistan, tek bir kesinlik etiketi kullanmaz. Ölçülen gözlemi, açık formülle türetilen
              değeri ve sizin girdiğiniz maliyeti ayrı gösterir.
            </p>
          </div>
          <div className="grid assistant-method-grid">
            <article className="card">
              <span className="tag">01 / ÖLÇÜLEN</span>
              <h3>Gözlem olduğu gibi kalır</h3>
              <p>
                Fiyat, satıcı, sıra, stok ve herkese açık talep ifadeleri tarih ve kapsam bilgisiyle
                sunulur. Gözlenmeyen değer tamamlanmaz.
              </p>
            </article>
            <article className="card">
              <span className="tag">02 / TÜRETİLEN</span>
              <h3>Formül görünür kalır</h3>
              <p>
                Medyan fiyat ve 30 günlük hız alt sınırı hangi sinyalden, hangi formülle üretildiyse
                adım adım açıklanır.
              </p>
            </article>
            <article className="card">
              <span className="tag">03 / SİZİN GİRDİNİZ</span>
              <h3>Maliyetler tahmin edilmez</h3>
              <p>
                Komisyon, kargo veya ürün maliyeti doğrulanamıyorsa sektör ortalaması eklenmez;
                asistan eksik değeri sizden ister.
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

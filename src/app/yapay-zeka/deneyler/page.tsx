import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Yapay Zekâ Deneyleri ve Çalışan Prototipler',
  description:
    'Caner Ünal’ın RAG, AI ajanları, e-ticaret veri kalitesi ve sinyal çıkarımı alanındaki çalışan deneylerini, yöntemlerini ve sınırlarını inceleyin.',
  alternates: { canonical: '/yapay-zeka/deneyler' },
}

const experiments = [
  {
    number: '01',
    status: 'ÇALIŞAN ARAÇ',
    title: 'Kaynak gösteren e-ticaret asistanı',
    question: 'Bir AI asistanı yalnız cevap değil, kanıt ve sonraki karar da üretebilir mi?',
    method: 'RAG · niyet sınıflama · kaynak sıralama · araç yönlendirme',
    result:
      'Veri Mimarı içeriklerini ve hesaplama araçlarını aynı konuşma içinde kaynaklı cevaplara bağlayan arayüz.',
    href: '/araclar/veri-asistani',
  },
  {
    number: '02',
    status: 'ÇALIŞAN ARAÇ',
    title: 'AI alışveriş görünürlük denetimi',
    question: 'Ürün verisi, AI alışveriş ajanlarının anlayacağı kadar açık ve tutarlı mı?',
    method: 'Alan kapsamı · veri tutarlılığı · senkronizasyon · ölçüm hazırlığı',
    result:
      'Eksikleri görünür skora ve önceliklendirilmiş düzeltme listesine dönüştüren denetim yüzeyi.',
    href: '/araclar/ai-alisveris-gorunurluk-denetimi',
  },
  {
    number: '03',
    status: 'AÇIK VERİ ARAYÜZÜ',
    title: 'Yerel model karar katmanı',
    question: 'Açık benchmark kayıtları teknik liste olmaktan çıkıp seçim kararına dönüşebilir mi?',
    method: 'Kaynak doğrulama · sürümleme · filtreleme · performans yorumlama',
    result:
      '178 dış kaynak ölçümünü hız, gecikme, enerji verimliliği ve lisans açısından keşfedilebilir yapan laboratuvar.',
    href: '/yapay-zeka/model-laboratuvari',
  },
  {
    number: '04',
    status: 'ÇALIŞAN ARAÇ',
    title: 'Yorum ve iade metninden sinyal çıkarımı',
    question: 'Serbest metin müşteri geri bildirimi ürün ve operasyon kararına nasıl çevrilir?',
    method: 'Metin ayrıştırma · tema sınıflama · kanıt görünürlüğü · aksiyon eşleme',
    result: 'Yorum ve iade nedenlerini yapılandırılmış sorun kümelerine ayıran uygulama yüzeyi.',
    href: '/araclar/iade-nedeni-yorum-sinyali',
  },
  {
    number: '05',
    status: 'AÇIK TEKNİK RAPOR',
    title: 'İki Mac mini ile dağıtık Qwen inference',
    question: 'İki ayrı 16 GB Apple Silicon node, tek bir 27B modeli gerçek iş yükünde taşıyabilir mi?',
    method: 'EXO · MLX Ring · Pipeline Sharding · Thunderbolt 4 · macmon',
    result:
      'Model iki node üzerinde çalıştı; yaklaşık 6 tok/s, swap ve termal yük birlikte ölçülerek production sınırı açıklandı.',
    href: '/raporlar/iki-mac-mini-m4-qwen38-27b-exo-mlx',
  },
]

export default function AiExperimentsPage() {
  const t = getDictionary('tr')

  return (
    <main className="page ai-experiments-page">
      <NavBar t={t} />
      <section className="hero-shell ai-experiments-hero">
        <div className="wrap hero single">
          <div className="hero-copy">
            <div className="crumb">
              <i aria-hidden="true" /> YAPAY ZEKÂ / ÇALIŞAN DENEYLER
            </div>
            <h1>
              Uzmanlık iddiası değil, <span className="accent">çalışma kanıtı.</span>
            </h1>
            <p className="intro">
              Her deney açık bir soruyla başlar; yöntemini, çalışan çıktısını ve neyi
              kanıtlamadığını birlikte gösterir.
            </p>
            <div className="actions-row">
              <a className="btn hero-primary" href="#deneyler">
                Deneyleri incele ↓
              </a>
              <a className="hero-link" href="/yapay-zeka">
                AI uzmanlık merkezine dön
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="deneyler" className="section-band band-paper" aria-labelledby="deneyler-basligi">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 01 · DENEY KAYITLARI</span>
              <h2 id="deneyler-basligi">Sorudan çalışan araca.</h2>
            </div>
            <p>
              Bu liste yalnızca açılabilen ve incelenebilen uygulamaları içerir; planlanan
              özellikler canlı gibi sunulmaz.
            </p>
          </div>
          <div className="ai-experiment-list">
            {experiments.map((item) => (
              <article key={item.number}>
                <div className="ai-experiment-number">{item.number}</div>
                <div className="ai-experiment-copy">
                  <span className="eyebrow">{item.status}</span>
                  <h3>{item.title}</h3>
                  <p className="ai-experiment-question">{item.question}</p>
                  <dl>
                    <div>
                      <dt>Yöntem</dt>
                      <dd>{item.method}</dd>
                    </div>
                    <div>
                      <dt>Çıktı</dt>
                      <dd>{item.result}</dd>
                    </div>
                  </dl>
                </div>
                <a className="btn alt" href={item.href}>
                  Çalışan çıktıyı aç ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-purple ai-experiment-principles">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">/ 02 · YAYIN İLKESİ</span>
              <h2>Gerçek olan gerçek, dış veri dış veri.</h2>
            </div>
            <p>
              Bir arayüzün çalışması, her koşulda doğru sonuç vereceği anlamına gelmez. Bu yüzden
              sınırı da ürünün parçası yapıyorum.
            </p>
          </div>
          <div className="ai-principle-grid">
            <article>
              <span>01</span>
              <h3>Kaynak görünür</h3>
              <p>Verinin kim tarafından, ne zaman ve hangi lisansla yayınlandığı saklanmaz.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Yöntem açıklanır</h3>
              <p>
                Skor, sıralama veya önerinin hangi girdilerden üretildiği kullanıcıya gösterilir.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Sınır belirtilir</h3>
              <p>Demo, dış veri, tahmin ve kullanıcı girdisi gerçek proje sonucu gibi sunulmaz.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-band band-dark">
        <div className="wrap section">
          <div className="ai-final-cta">
            <div>
              <span className="eyebrow">BİRLİKTE BİR DENEY TASARLAYALIM</span>
              <h2>Tek bir iş problemini ölçülebilir AI prototipine dönüştürelim.</h2>
            </div>
            <a className="btn hero-primary" href="/e-ticaret-danismani#proje-formu">
              Projenizi paylaşın ↗
            </a>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}

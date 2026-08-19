const expertiseAreas = [
  {
    number: '01',
    title: 'E-ticaret ve dijital pazarlama',
    description:
      'Ürün marjı, komisyon, kargo, iade ve reklam harcamasını aynı birim ekonomisi modelinde birleştiririm.',
    scope: 'E-TİCARET · KÂRLILIK · BİRİM EKONOMİSİ',
  },
  {
    number: '02',
    title: 'Dijital pazarlama analitiği',
    description:
      'ROAS, MER, CAC ve LTV metriklerini işletmenin gerçek katkı sonucu ve ölçüm altyapısıyla uzlaştırırım.',
    scope: 'REKLAM · ÖLÇÜM · MÜŞTERİ EKONOMİSİ',
  },
  {
    number: '03',
    title: 'Yapay zekâ ve otomasyon',
    description:
      'Raporlama, ürün verisi ve tekrarlanan operasyonları insan kontrolünü koruyan ölçülebilir iş akışlarına dönüştürürüm.',
    scope: 'AI · VERİ · OPERASYON',
  },
  {
    number: '04',
    title: 'Sistem ve yazılım geliştirme',
    description:
      'Karar modelini gerektiğinde API, ERP, CRM, SaaS entegrasyonu veya özel web ürünü olarak uygularım.',
    scope: 'ERP · CRM · SAAS · WEB · API',
  },
]

export default function FounderExpertiseSection() {
  return (
    <section id="caner-unal-uzmanlik" className="section-band band-paper founder-expertise">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">/ 04 · CANER ÜNAL / UZMANLIK HARİTASI</span>
            <h2>Tek bir kanal değil. Birbirine bağlı sistemler.</h2>
          </div>
          <p>
            E-ticaret kârlılığını, reklam ölçümünü ve otomasyonu aynı karar sisteminde birleştiren
            uygulamalı uzmanlık yaklaşımı.
          </p>
        </div>

        <div className="founder-expertise-layout">
          <article className="panel founder-expertise-profile">
            <span className="eyebrow">CANER ÜNAL / VERİ MİMARI KURUCUSU</span>
            <h3>Problemi yalnızca anlatmam. Çalışan sistemi kurarım.</h3>
            <p>
              E-ticaret kârlılığı, dijital pazarlama analitiği ve yapay zekâ otomasyonunu aynı
              çalışma disiplininde birleştiriyorum. Önce mevcut durumu ölçüyor, karar modelini
              kuruyor, çalışan sisteme dönüştürüyor ve sonucu doğruluyorum.
            </p>
            <div className="founder-expertise-actions">
              <a className="btn hero-primary" href="/e-ticaret-danismani#proje-formu">
                Projenizi paylaşın ↗
              </a>
              <a className="link" href="/hakkinda">
                Caner Ünal’ı tanıyın
              </a>
            </div>
            <small>TEŞHİS · MİMARİ · UYGULAMA · ÖLÇÜM</small>
          </article>

          <ol className="founder-expertise-list" aria-label="Caner Ünal uzmanlık alanları">
            {expertiseAreas.map((area) => (
              <li key={area.number}>
                <span>{area.number}</span>
                <div>
                  <small>{area.scope}</small>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

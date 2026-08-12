const expertiseAreas = [
  {
    number: '01',
    title: 'E-ticaret ve dijital pazarlama',
    description:
      'Kârlılık, reklam performansı, dönüşüm, teknik SEO ve büyüme kararlarını aynı ticari modelde birleştiririm.',
    scope: 'E-TİCARET · REKLAM · BÜYÜME',
  },
  {
    number: '02',
    title: 'Yapay zekâ ve otomasyon',
    description:
      'LLM, RAG ve ajan tabanlı iş akışlarını insan kontrolü, veri güvenliği ve ölçülebilir iş çıktısıyla tasarlarım.',
    scope: 'AI · LLM / RAG · OTOMASYON',
  },
  {
    number: '03',
    title: 'ERP, CRM ve SaaS sistemleri',
    description:
      'Dağınık operasyonları veri akışı, entegrasyon ve kullanıcı ihtiyaçları etrafında çalışan dijital ürünlere dönüştürürüm.',
    scope: 'ERP · CRM · SAAS · ENTEGRASYON',
  },
  {
    number: '04',
    title: 'Yazılım ve web geliştirme',
    description:
      'Modern web uygulamaları, API entegrasyonları ve işletmenin gerçek sürecine uyum sağlayan özel yazılım sistemleri geliştiririm.',
    scope: 'WEB · API · ÖZEL YAZILIM',
  },
  {
    number: '05',
    title: 'WordPress mühendisliği',
    description:
      'Virüs temizliği, güvenlik, hız, taşıma, hosting, tema geliştirme, teknik SEO, bakım, destek ve danışmanlığı uçtan uca yürütürüm.',
    scope: 'GÜVENLİK · HIZ · TAŞIMA · DESTEK',
  },
  {
    number: '06',
    title: 'Veri ve karar sistemleri',
    description:
      'Rapor, gösterge paneli ve hesaplama modellerini yalnızca bilgi veren değil, doğru sonraki adımı gösteren sistemler olarak kurarım.',
    scope: 'ANALİTİK · RAPORLAMA · KARAR',
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
            Ticari hedefi, veriyi ve teknolojiyi aynı masada buluşturan uçtan uca mühendislik ve
            danışmanlık yaklaşımı.
          </p>
        </div>

        <div className="founder-expertise-layout">
          <article className="panel founder-expertise-profile">
            <span className="eyebrow">CANER ÜNAL / VERİ MİMARI KURUCUSU</span>
            <h3>Problemi yalnızca anlatmam. Çalışan sistemi kurarım.</h3>
            <p>
              E-ticaret, yapay zekâ, ERP, CRM, SaaS, yazılım geliştirme, dijital pazarlama ve
              WordPress deneyimimi aynı çalışma disiplininde birleştiriyorum. Önce mevcut durumu
              ölçüyor, doğru mimariyi kuruyor, uyguluyor ve sonucu doğruluyorum.
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

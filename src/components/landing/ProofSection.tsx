export default function ProofSection({ t }: { t: any }) {
  const isEnglish = t?.locale === 'en'

  return (
    <section className="section-band band-dark">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">
              {t?.caseStudies?.eyebrow || '/ 04 · ANALİZLER & KURUCU'}
            </span>
            <h2>{t?.caseStudies?.title || 'Şeffaf metotlar.'}</h2>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <span className="eyebrow">PROJE ANALİZİ</span>
            <h3>E-Ticaret Dönüşüm Dashboardu</h3>
            <p>Katkı payı ve reklam analitiği tabanlı karar mekanizması.</p>
            <a className="link" href="/analizler">
              Analizleri Gör
            </a>
          </div>

          <div className="card">
            <span className="eyebrow">{t?.founder?.eyebrow || 'KURUCU HAKKINDA'}</span>
            <h3>Caner Ünal</h3>
            <p>E-ticaret verisini kârlı kararlara dönüştüren sistemler tasarlıyorum.</p>
            <a className="link" href="/hakkinda">
              Profili İncele
            </a>
          </div>

          <div className="card">
            <span className="eyebrow">{isEnglish ? 'CONSULTING' : 'DANIŞMANLIK'}</span>
            <h3>
              {isEnglish ? 'E-Commerce and Digital Marketing' : 'E-Ticaret ve Dijital Pazarlama'}
            </h3>
            <p>
              {isEnglish
                ? 'Connect profitability, ad measurement, and automation in one decision system.'
                : 'Kârlılık, reklam ölçümü ve otomasyonu tek karar sisteminde birleştirin.'}
            </p>
            <a className="link" href="/e-ticaret-danismani">
              {isEnglish ? 'Review the Consulting Scope' : 'Danışmanlık Kapsamını İncele'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

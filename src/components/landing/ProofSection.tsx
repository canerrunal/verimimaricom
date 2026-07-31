export default function ProofSection({ t }: { t: any }) {
  return (
    <section className="wrap section">
      <div className="head">
        <div>
          <span className="eyebrow">{t?.caseStudies?.eyebrow || '/ 04 · VAKA ANALİZLERİ & KURUCU'}</span>
          <h2>{t?.caseStudies?.title || 'Şeffaf metotlar.'}</h2>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <span className="eyebrow">VAKA ANALİZİ</span>
          <h3>E-Ticaret Dönüşüm Dashboardu</h3>
          <p>Katkı payı ve reklam analitiği tabanlı karar mekanizması.</p>
          <a className="link" href="/vaka-analizleri">Vaka Analizlerini Gör</a>
        </div>

        <div className="card">
          <span className="eyebrow">{t?.founder?.eyebrow || 'KURUCU HAKKINDA'}</span>
          <h3>Caner Ünal</h3>
          <p>E-ticaret verisini kârlı kararlara dönüştüren sistemler tasarlıyorum.</p>
          <a className="link" href="/hakkinda">Profili İncele</a>
        </div>
      </div>
    </section>
  )
}

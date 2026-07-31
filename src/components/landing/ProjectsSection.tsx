export default function ProjectsSection({ t }: { t: any }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.projects.eyebrow}</span>
            <h2>{t.projects.title}</h2>
          </div>
          <p>{t.projects.description}</p>
        </div>
        <div className="zolm">
          <div>
            <span className="eyebrow">PROJE / BETA</span>
            <h2>{t.projects.items[0].name}</h2>
            <p>{t.projects.items[0].description}</p>
            <a className="btn" href={t.projects.items[0].href} style={{ marginTop: 20 }}>
              {t.projects.items[0].cta} ↗
            </a>
          </div>
          <div className="zolm-panel">
            <div className="zp-head">
              <span>ZOLM / E-TİCARET DASHBOARD</span>
              <span className="status">● BETA</span>
            </div>
            <div className="zp-grid">
              <div className="zp-menu">
                <p>Kampanyalar</p>
                <p>Ürünler</p>
                <p>Kârlılık</p>
                <p>Raporlar</p>
              </div>
              <div className="zp-data">
                <div className="metric">
                  <small>Aylık Gelir</small>
                  <b>₺2.4M</b>
                </div>
                <div className="metric">
                  <small>Ort. Kâr Marjı</small>
                  <b>%34</b>
                </div>
                <div className="metric wide">
                  <small>ROAS Trendi</small>
                  <b>3.2x → 4.1x</b>
                  <div className="bar"><span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10, color: '#777', marginTop: 16 }}>{t.projects.note}</p>
      </div>
    </section>
  )
}

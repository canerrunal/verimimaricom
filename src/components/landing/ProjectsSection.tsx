export default function ProjectsSection({ t }: { t: any }) {
  return (
    <section className="section-band band-cyan">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">{t?.projects?.eyebrow || '/ 03 · PROJELER VE ZOLM'}</span>
            <h2>{t?.projects?.title || 'Çalışan sistemler.'}</h2>
          </div>
          <p>{t?.projects?.description || 'E-ticaret zekası ve otomasyon platformları.'}</p>
        </div>

        <div className="grid">
          <a
            href="/zolm"
            className="card"
            style={{ textDecoration: 'none', background: '#ece7ff', border: '1px solid #d8d0f7' }}
          >
            <span className="tag purple" style={{ borderColor: '#cfc0f7', background: '#fff' }}>
              PROJE / BEKLEME LİSTESİ
            </span>
            <h3>Zolm — E-Ticaret Reklam Zekâsı</h3>
            <p style={{ color: '#625e70' }}>
              Reklam harcamalarını ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren
              karar platformu.
            </p>
            <span className="link">İncele ve Katıl</span>
          </a>
        </div>
      </div>
    </section>
  )
}

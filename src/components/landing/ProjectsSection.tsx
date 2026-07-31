export default function ProjectsSection({ t }: { t: any }) {
  return (
    <section className="wrap section">
      <div className="head">
        <div>
          <span className="eyebrow">{t?.projects?.eyebrow || '/ 03 · PROJELER VE ZOLM'}</span>
          <h2>{t?.projects?.title || 'Çalışan sistemler.'}</h2>
        </div>
        <p>{t?.projects?.description || 'E-ticaret zekası ve otomasyon platformları.'}</p>
      </div>

      <div className="grid">
        <div className="card" style={{ background: '#ece7ff', border: '1px solid #d8d0f7' }}>
          <span className="eyebrow" style={{ color: '#7652db' }}>PROJE / BEKLEME LİSTESİ</span>
          <h3 style={{ color: '#111' }}>Zolm — E-Ticaret Reklam Zekâsı</h3>
          <p style={{ color: '#555' }}>Reklam harcamalarını ürün bazlı katkı payı ve başa baş ROAS ile otomatik eşleştiren akıllı karar platformu.</p>
          <a className="link" href="/zolm" style={{ color: '#7652db' }}>İncele ve Katıl</a>
        </div>
      </div>
    </section>
  )
}

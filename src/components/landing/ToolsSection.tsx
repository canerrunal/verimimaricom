export default function ToolsSection({ t }: { t: any }) {
  return (
    <section className="section-band band-surface">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">{t?.tools?.eyebrow || '/ 01 · ARAÇLAR'}</span>
            <h2>{t?.tools?.title || 'Önce hesabı görün.'}</h2>
          </div>
          <p>
            {t?.tools?.description ||
              'Karar vermek için gereken metrikleri sadeleştiren ücretsiz araçlar.'}
          </p>
        </div>

        <div className="grid">
          <div className="feature">
            <span className="eyebrow">YENİ / BETA / ÜCRETSİZ</span>
            <h3>Veri Asistanı</h3>
            <p>
              Pazar sinyalini sorun, kârı konuşarak hesaplayın; doğru Veri Mimarı aracını tek adımda
              çalıştırın.
            </p>
            <a className="btn" href="/araclar/veri-asistani">
              Asistana Sor
            </a>
          </div>

          <div className="card">
            <span className="tag live">CANLI</span>
            <h3>Başa Baş ROAS Hesaplayıcı</h3>
            <p>Reklamda zarar etmeye başladığınız seviyeyi bulun.</p>
            <a className="link" href="/araclar/basabas-roas-hesaplayici">
              ROAS eşiğini hesapla
            </a>
          </div>

          <div className="card">
            <span className="tag live">YENİ · CANLI</span>
            <h3>Ürün Feed Sağlık Kontrolü</h3>
            <p>CSV ürün verinizde kritik alan, fiyat, stok ve URL sorunlarını tarayın.</p>
            <a className="link" href="/araclar/urun-feed-saglik-kontrolu">
              Feed’i analiz et
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

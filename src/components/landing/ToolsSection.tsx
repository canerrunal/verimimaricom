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
            <span className="eyebrow" style={{ color: '#aaa' }}>
              CANLI / 2 DK
            </span>
            <h3 style={{ font: "700 24px 'Space Mono'", letterSpacing: '-0.02em' }}>
              Başa Baş ROAS Hesaplayıcı
            </h3>
            <p>Reklamda zarar etmeye başladığınız seviyeyi bulun.</p>
            <a className="btn" href="/araclar/basabas-roas-hesaplayici">
              Hesaplamayı Başlat
            </a>
          </div>

          <div className="card">
            <span className="tag live">CANLI</span>
            <h3>Kâr Marjı Hesaplayıcı</h3>
            <p>Sipariş başına katkı payınızı görün.</p>
            <a className="link" href="/araclar/kar-marji-hesaplayici">
              Hesaplamayı başlat
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

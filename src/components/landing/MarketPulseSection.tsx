export default function MarketPulseSection() {
  return (
    <section className="section-band band-cyan market-home-section">
      <div className="wrap section market-home-grid">
        <div>
          <span className="eyebrow">YENİ / HER GÜN YENİLENEN AÇIK VERİ</span>
          <h2>Trendyol Pazar Nabzı.</h2>
          <p>
            Dokuz kategoride çok satanları, yükselen ürünleri, fiyat düşüşlerini ve stok
            sinyallerini e-ticaret uzmanı bakışıyla inceleyin.
          </p>
          <a className="btn" href="/pazar-nabzi/trendyol">
            Bugünün pazar sinyallerini gör →
          </a>
        </div>
        <div className="market-home-console" aria-label="Pazar Nabzı kapsam özeti">
          <span>VM / MARKET INTELLIGENCE</span>
          <dl>
            <div>
              <dt>Aktif profil</dt>
              <dd>09</dd>
            </div>
            <div>
              <dt>Günlük gözlem</dt>
              <dd>1.800</dd>
            </div>
            <div>
              <dt>Yenileme</dt>
              <dd>Günlük</dd>
            </div>
          </dl>
          <small>Kaynak · zaman · yöntem · sınırlama görünür</small>
        </div>
      </div>
    </section>
  )
}

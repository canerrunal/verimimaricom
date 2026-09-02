import {
  getMarketProfiles,
  getMarketQualities,
  getMarketTaxonomyOverview,
} from '@/lib/trendyol-market'

function formatCount(value: number | null) {
  if (value === null) return '—'
  return new Intl.NumberFormat('tr-TR').format(value)
}

export default async function MarketPulseSection() {
  const profiles = await getMarketProfiles()
  const taxonomyOverview = await getMarketTaxonomyOverview()
  const qualities = taxonomyOverview ? [] : await getMarketQualities(profiles)
  const observedProductCount =
    taxonomyOverview?.uniqueProducts ||
    qualities.reduce((total, quality) => total + quality.productCount, 0)
  const summaryRows = taxonomyOverview
    ? [
        { label: 'Kategori evreni', value: formatCount(taxonomyOverview.totalCategories) },
        { label: 'Benzersiz ürün', value: formatCount(observedProductCount) },
        { label: 'Yenileme', value: 'Günlük' },
      ]
    : [
        { label: 'Aktif profil', value: formatCount(profiles.length) },
        { label: 'Günlük gözlem', value: formatCount(observedProductCount) },
        { label: 'Yenileme', value: 'Günlük' },
      ]

  return (
    <section className="section-band band-cyan market-home-section">
      <div className="wrap section market-home-grid">
        <div>
          <span className="eyebrow">YENİ / HER GÜN YENİLENEN AÇIK VERİ</span>
          <h2>Trendyol Pazar Nabzı.</h2>
          <p>
            Aktif pazar profillerinde çok satanları, yükselen ürünleri, fiyat düşüşlerini ve stok
            sinyallerini e-ticaret uzmanı bakışıyla inceleyin.
          </p>
          <a className="btn" href="/pazar-nabzi/trendyol">
            Bugünün pazar sinyallerini gör →
          </a>
        </div>
        <div className="market-home-console" aria-label="Pazar Nabzı kapsam özeti">
          <span>VM / MARKET INTELLIGENCE</span>
          <dl>
            {summaryRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <small>Kaynak · zaman · yöntem · sınırlama görünür</small>
        </div>
      </div>
    </section>
  )
}

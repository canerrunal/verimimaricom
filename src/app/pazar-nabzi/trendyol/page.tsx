import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import NavBar from '@/components/landing/NavBar'
import NewsletterSection from '@/components/landing/NewsletterSection'
import Footer from '@/components/landing/Footer'
import { MarketHistoryModal, MarketHistoryTrigger } from '@/components/market/MarketHistoryExplorer'
import productStyles from './TrendyolProductImage.module.css'
import { getDictionary } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/seo'
import {
  MARKET_VIEWS,
  formatMarketDate,
  formatMarketMoney,
  getMarketQualities,
  getMarketProfiles,
  getMarketSnapshot,
  getMarketTaxonomyCategories,
  getMarketTaxonomyDates,
  getMarketTaxonomyOverview,
  getMarketTaxonomySnapshot,
  getMarketView,
  selectMarketProducts,
  summarizeMarketProducts,
  type MarketProfileSlug,
  type MarketViewSlug,
} from '@/lib/trendyol-market'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Trendyol Pazar Nabzı ve Fırsat Radarı',
  description:
    'Trendyol çok satanlar, fiyat değişimleri, yükselen ürünler ve stok sinyallerini her gün açık yöntemle inceleyin.',
  alternates: { canonical: '/pazar-nabzi/trendyol' },
  openGraph: {
    title: 'Trendyol Pazar Nabzı | Veri Mimarı',
    description: 'Her gün genişleyen kategorilerde ürün, fiyat, sıralama ve stok sinyalleri.',
    url: '/pazar-nabzi/trendyol',
    type: 'website',
  },
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

function marketHref(profile: MarketProfileSlug, view: MarketViewSlug, query = '') {
  const params = new URLSearchParams({ kategori: profile, gorunum: view })
  if (query) params.set('arama', query)
  return `/pazar-nabzi/trendyol?${params.toString()}#radar`
}

function taxonomyHref(categoryId: number, date = '') {
  const params = new URLSearchParams({ 'kategori-id': String(categoryId) })
  if (date) params.set('tarih', date)
  return `/pazar-nabzi/trendyol?${params.toString()}#kategori-evreni`
}

function percent(value: number | null) {
  if (value === null) return '—'
  return `${value > 0 ? '+' : ''}${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(value)}%`
}

function compact(value: number | null) {
  if (value === null) return '—'
  return new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

function fullCount(value: number | null) {
  if (value === null) return '—'
  return new Intl.NumberFormat('tr-TR').format(value)
}

function stockLabel(status: string | null, signal: string | null) {
  if (status === 'OutOfStock') return 'Stok dışı'
  if (signal) return signal
  if (status === 'InStock') return 'Stokta'
  return 'Sinyal yok'
}

export default async function TrendyolMarketPage({ searchParams }: PageProps) {
  const params = await searchParams
  const category = first(params.kategori)
  const view = getMarketView(first(params.gorunum))
  const query = first(params.arama).slice(0, 80)
  const taxonomyQuery = first(params['taksonomi-arama']).slice(0, 80)
  const requestedRootId = Number(first(params['ana-kategori']))
  const requestedCategoryId = Number(first(params['kategori-id']))
  const requestedDate = /^\d{4}-\d{2}-\d{2}$/.test(first(params.tarih)) ? first(params.tarih) : ''
  const profiles = await getMarketProfiles()
  const [snapshot, qualities, taxonomyOverview, taxonomyDates] = await Promise.all([
    getMarketSnapshot(category, profiles),
    getMarketQualities(profiles),
    getMarketTaxonomyOverview(),
    getMarketTaxonomyDates(),
  ])
  const defaultCategoryId = taxonomyOverview?.roots[0]?.categoryId || 0
  const taxonomyCategoryId =
    Number.isInteger(requestedCategoryId) && requestedCategoryId > 0
      ? requestedCategoryId
      : defaultCategoryId
  const rootId = Number.isInteger(requestedRootId) && requestedRootId > 0 ? requestedRootId : null
  const [taxonomyCategories, taxonomySnapshot] = await Promise.all([
    getMarketTaxonomyCategories(taxonomyQuery, rootId, taxonomyQuery || rootId ? 60 : 19),
    taxonomyCategoryId
      ? getMarketTaxonomySnapshot(taxonomyCategoryId, requestedDate || null)
      : Promise.resolve({ category: null, products: [], observedDate: null }),
  ])
  const filtered = selectMarketProducts(snapshot.products, view, query)
  const products = filtered.slice(0, 40)
  const summary = summarizeMarketProducts(snapshot.products)
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const topOpportunity = selectMarketProducts(snapshot.products, 'firsat-radari')[0]
  const latestCapturedAt = snapshot.quality.capturedAt || snapshot.products[0]?.capturedAt || null
  const passedProfiles = qualities.filter((quality) => quality.status === 'PASS').length
  const observedProductCount =
    taxonomyOverview?.uniqueProducts ||
    qualities.reduce((total, quality) => total + quality.productCount, 0)
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Veri Mimarı Trendyol Pazar Nabzı — ${snapshot.profile.label}`,
    description:
      'Trendyol herkese açık ürün sayfalarından gözlemlenen sıralama, fiyat, stok ve talep sinyallerinin günlük görünümü.',
    url: `${siteUrl}/pazar-nabzi/trendyol?kategori=${snapshot.profile.slug}`,
    dateModified: snapshot.quality.observedDate || undefined,
    creator: { '@type': 'Organization', name: 'Veri Mimarı', url: siteUrl },
    isBasedOn: 'https://www.trendyol.com/',
    temporalCoverage: snapshot.quality.observedDate || undefined,
    measurementTechnique:
      'Günlük herkese açık sayfa gözlemi; kalite kapısı ve kapsam içi sıralama karşılaştırması.',
    license: `${siteUrl}/pazar-nabzi/trendyol#yontem`,
  }

  return (
    <main className="page market-page">
      <JsonLd id="trendyol-market-dataset" data={datasetLd} />
      <NavBar t={t} />

      <section className="hero-shell market-hero-shell">
        <div className="wrap hero single market-hero">
          <div className="crumb">
            <i aria-hidden="true" /> PAZAR NABZI / TRENDYOL / HER GÜN YENİLENİR
          </div>
          <h1>
            Çok satanı görün. <span className="accent">Fırsat sinyalini</span> ayırın.
          </h1>
          <p className="intro">
            Her gün genişleyen kategorilerde fiyat, sıralama, stok ve görünür talep sinyallerini
            aynı ekranda inceleyin. Her metrik kaynağı, zamanı ve sınırıyla birlikte ücretsiz
            sunulur.
          </p>
          <div className="actions-row">
            <a className="btn hero-primary" href="#kategori-evreni">
              Tüm kategorileri keşfet <span>↓</span>
            </a>
            <a className="hero-link" href="#yontem">
              Yöntemi ve sınırları oku ↗
            </a>
          </div>
          <div className="signals market-hero-signals">
            <span className="tag">
              <i />{' '}
              {taxonomyOverview
                ? `${taxonomyOverview.coverage}% kategori kapsamı`
                : `${passedProfiles}/${profiles.length} profil kalite kapısından geçti`}
            </span>
            <span className="tag">
              <i /> {fullCount(observedProductCount)} günlük benzersiz ürün
            </span>
            <span className="tag">
              <i /> Son güncelleme:{' '}
              {formatMarketDate(taxonomyOverview?.capturedAt || latestCapturedAt)}
            </span>
          </div>
        </div>
      </section>

      <section className="market-status-strip" aria-label="Günlük pazar özeti">
        <div className="wrap market-status-grid">
          <div>
            <span>KATEGORİ EVRENİ</span>
            <strong>{fullCount(taxonomyOverview?.totalCategories || profiles.length)}</strong>
            <small>
              {fullCount(taxonomyOverview?.totalCategoryPaths || profiles.length)} kategori yolu
            </small>
          </div>
          <div>
            <span>BENZERSİZ ÜRÜN</span>
            <strong>{fullCount(taxonomyOverview?.uniqueProducts || observedProductCount)}</strong>
            <small>son başarılı günlük koşu</small>
          </div>
          <div>
            <span>SIRALAMA KAYDI</span>
            <strong>{fullCount(taxonomyOverview?.rankingMemberships || 0)}</strong>
            <small>kategori–ürün üyeliği</small>
          </div>
          <div>
            <span>VERİ KALİTESİ</span>
            <strong>{taxonomyOverview ? 'PASS' : snapshot.quality.status}</strong>
            <small>
              {taxonomyOverview
                ? `${fullCount(taxonomyOverview.coveredCategories)} kategori kapsandı`
                : `%${snapshot.quality.detailSuccessRate} detay yenileme`}
            </small>
          </div>
        </div>
      </section>

      <section className="section-band band-paper market-taxonomy-band" id="kategori-evreni">
        <div className="wrap section market-taxonomy-workspace">
          <div className="head market-head">
            <div>
              <span className="eyebrow">TÜM KATEGORİLER / GÜNLÜK ÇOK SATANLAR</span>
              <h2>Bir kategoriyi ve tarihi seçin.</h2>
            </div>
            <p>
              Yeni kategoriler günlük keşifle kendiliğinden eklenir. İkinci başarılı günden itibaren
              sıra ve fiyat hareketleri önceki günle karşılaştırılır.
            </p>
          </div>

          {taxonomyOverview ? (
            <>
              <form className="market-taxonomy-search panel" action="/pazar-nabzi/trendyol">
                <div>
                  <label htmlFor="taxonomy-root">Ana kategori</label>
                  <select id="taxonomy-root" name="ana-kategori" defaultValue={rootId || ''}>
                    <option value="">Tüm ana kategoriler</option>
                    {taxonomyOverview.roots.map((root) => (
                      <option key={root.categoryId} value={root.categoryId}>
                        {root.name} ({root.totalCategories})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="market-taxonomy-query">
                  <label htmlFor="taxonomy-query">Kategori yolu ara</label>
                  <input
                    id="taxonomy-query"
                    className="search"
                    type="search"
                    name="taksonomi-arama"
                    defaultValue={taxonomyQuery}
                    placeholder="Örn. robot süpürge, kahve, bebek bezi"
                  />
                </div>
                <button className="btn" type="submit">
                  Kategorileri bul
                </button>
              </form>

              <div className="market-taxonomy-layout">
                <aside className="market-taxonomy-categories" aria-label="Kategori sonuçları">
                  <div>
                    <span>KATEGORİ SONUÇLARI</span>
                    <strong>{taxonomyCategories.length}</strong>
                  </div>
                  <nav>
                    {taxonomyCategories.map((item) => (
                      <a
                        key={item.pathKey}
                        href={taxonomyHref(item.categoryId, requestedDate)}
                        className={
                          item.categoryId === taxonomySnapshot.category?.categoryId
                            ? 'active'
                            : undefined
                        }
                        aria-current={
                          item.categoryId === taxonomySnapshot.category?.categoryId
                            ? 'page'
                            : undefined
                        }
                      >
                        <span>{item.path}</span>
                        <small>
                          Seviye {item.level + 1} · #{item.categoryId}
                        </small>
                      </a>
                    ))}
                  </nav>
                  {!taxonomyCategories.length ? (
                    <p>Bu aramayla eşleşen kategori yolu bulunamadı.</p>
                  ) : null}
                </aside>

                <div className="market-taxonomy-results">
                  <div className="market-table-head">
                    <div>
                      <span className="eyebrow">SEÇİLİ KATEGORİ</span>
                      <h3>{taxonomySnapshot.category?.path || 'Kategori seçin'}</h3>
                    </div>
                    <form action="/pazar-nabzi/trendyol">
                      <input type="hidden" name="kategori-id" value={taxonomyCategoryId} />
                      <label htmlFor="taxonomy-date">Rapor tarihi</label>
                      <select
                        id="taxonomy-date"
                        name="tarih"
                        defaultValue={
                          taxonomySnapshot.observedDate ||
                          requestedDate ||
                          taxonomyOverview.observedDate
                        }
                      >
                        {taxonomyDates.map((date) => (
                          <option key={date} value={date}>
                            {formatMarketDate(date)}
                          </option>
                        ))}
                      </select>
                      <button className="btn alt" type="submit">
                        Tarihi getir
                      </button>
                    </form>
                  </div>

                  {taxonomySnapshot.products.length ? (
                    <div className="market-table-shell market-taxonomy-table-shell">
                      <table
                        className={`market-table market-taxonomy-table ${productStyles.productTable}`}
                      >
                        <caption>
                          {taxonomySnapshot.category?.path} için{' '}
                          {formatMarketDate(taxonomySnapshot.observedDate)} tarihli çok satanlar
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Sıra</th>
                            <th scope="col">Ürün</th>
                            <th scope="col">Fiyat</th>
                            <th scope="col">Günlük hareket</th>
                            <th scope="col">Stok / puan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {taxonomySnapshot.products.map((product) => (
                            <tr key={`${product.rank}-${product.productKey}`}>
                              <td data-label="Sıra">
                                <strong className="market-rank">{product.rank}</strong>
                              </td>
                              <th scope="row" data-label="Ürün">
                                <div className={productStyles.productCell}>
                                  <a
                                    className={`${productStyles.productImage}${product.imageUrl ? '' : ` ${productStyles.isEmpty}`}`}
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    aria-label={`${product.title} ürününü Trendyol'da aç`}
                                  >
                                    {product.imageUrl ? (
                                      <img
                                        src={product.imageUrl}
                                        alt={`${product.title} ürün görseli`}
                                        width="64"
                                        height="78"
                                        loading="lazy"
                                        decoding="async"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <span aria-hidden="true">GÖRSEL YOK</span>
                                    )}
                                  </a>
                                  <div>
                                    <a
                                      href={product.url}
                                      target="_blank"
                                      rel="noopener noreferrer nofollow"
                                    >
                                      {product.title}
                                    </a>
                                    <span className={productStyles.productMeta}>
                                      {product.brand || 'Marka belirtilmedi'} · Ürün #
                                      {product.productId}
                                    </span>
                                  </div>
                                </div>
                              </th>
                              <td data-label="Fiyat">
                                <MarketHistoryTrigger
                                  request={{
                                    source: 'taxonomy',
                                    metric: 'price',
                                    productId: product.productId,
                                    productKey: product.productKey,
                                    merchantId: product.merchantId,
                                    title: product.title,
                                  }}
                                  primary={formatMarketMoney(product.price)}
                                  secondary={product.promotions[0] || 'Kampanya etiketi yok'}
                                />
                              </td>
                              <td data-label="Günlük hareket">
                                <strong
                                  className={
                                    (product.rankDelta || 0) > 0
                                      ? 'signal-up'
                                      : (product.rankDelta || 0) < 0
                                        ? 'signal-down'
                                        : undefined
                                  }
                                >
                                  {product.rankDelta === null
                                    ? 'İlk gözlem'
                                    : product.rankDelta === 0
                                      ? 'Sıra değişmedi'
                                      : `${product.rankDelta > 0 ? '+' : ''}${product.rankDelta} sıra`}
                                </strong>
                                <span>Fiyat {percent(product.priceDeltaPercent)}</span>
                              </td>
                              <td data-label="Stok ve puan">
                                <MarketHistoryTrigger
                                  request={{
                                    source: 'taxonomy',
                                    metric: 'stock',
                                    productId: product.productId,
                                    productKey: product.productKey,
                                    merchantId: product.merchantId,
                                    title: product.title,
                                  }}
                                  primary={
                                    product.inStock === false
                                      ? 'Stok dışı'
                                      : product.runningOut
                                        ? 'Tükeniyor'
                                        : 'Stokta'
                                  }
                                  secondary={`${product.rating ? `${product.rating.toFixed(1)} puan` : 'Puan yok'} · ${compact(product.ratingCount)}`}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="market-empty" role="status">
                      <strong>Bu kategori ve tarih için ürün kaydı yok.</strong>
                      <p>Kategori başarılı ancak boş dönmüş olabilir; başka bir kategori seçin.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="market-empty" role="status">
              <strong>Kategori evreni ilk aktarımı bekliyor.</strong>
              <p>Son doğrulanmış 12 profil aşağıdaki konsolda görünmeye devam ediyor.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-band band-paper" id="radar">
        <div className="wrap section market-workspace">
          <div className="head market-head">
            <div>
              <span className="eyebrow">CANLI VERİ KONSOLU / {snapshot.profile.sourceLabel}</span>
              <h2>Bugünün pazar hareketini filtreleyin.</h2>
            </div>
            <p>
              Sonuçlar satış veya yatırım tavsiyesi değildir; ürün araştırmasında önceliklendirme
              sinyali sunar.
            </p>
          </div>

          <nav className="market-filter-group" aria-label="Kategori seçimi">
            <span>KATEGORİ</span>
            <div>
              {profiles.map((profile) => (
                <a
                  key={profile.slug}
                  href={marketHref(profile.slug, view, query)}
                  className={profile.slug === snapshot.profile.slug ? 'active' : undefined}
                  aria-current={profile.slug === snapshot.profile.slug ? 'page' : undefined}
                >
                  {profile.label}
                </a>
              ))}
            </div>
          </nav>

          <nav className="market-filter-group market-view-tabs" aria-label="Veri görünümü seçimi">
            <span>GÖRÜNÜM</span>
            <div>
              {MARKET_VIEWS.map((item) => (
                <a
                  key={item.slug}
                  href={marketHref(snapshot.profile.slug, item.slug, query)}
                  className={item.slug === view ? 'active' : undefined}
                  aria-current={item.slug === view ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <form className="market-search" role="search" action="/pazar-nabzi/trendyol">
            <input type="hidden" name="kategori" value={snapshot.profile.slug} />
            <input type="hidden" name="gorunum" value={view} />
            <label htmlFor="market-search-input">Ürün, marka veya satıcı ara</label>
            <div>
              <input
                id="market-search-input"
                className="search"
                type="search"
                name="arama"
                defaultValue={query}
                placeholder="Örn. kulaklık, LEGO, kahve"
              />
              <button className="btn" type="submit">
                Sonuçları filtrele
              </button>
              {query ? <a href={marketHref(snapshot.profile.slug, view)}>Temizle</a> : null}
            </div>
          </form>

          <div className="market-mini-metrics" aria-label="Seçili kategori sinyalleri">
            <div>
              <span>FİYATI DÜŞEN</span>
              <strong>{summary.priceDropCount}</strong>
              <small>aynı ürün ve satıcı teklifi</small>
            </div>
            <div>
              <span>STOK RİSKİ</span>
              <strong>{summary.stockRiskCount}</strong>
              <small>açık stok etiketi görülen</small>
            </div>
            <div>
              <span>GÖSTERİLEN SONUÇ</span>
              <strong>{filtered.length}</strong>
              <small>
                {query
                  ? `“${query}” araması`
                  : MARKET_VIEWS.find((item) => item.slug === view)?.label}
              </small>
            </div>
          </div>

          {topOpportunity ? (
            <aside className="market-expert-note" aria-label="Günün uzman notu">
              <span>UZMAN NOTU / ARAŞTIRMA ÖNCELİĞİ</span>
              <div>
                <h3>{topOpportunity.title}</h3>
                <p>
                  Görünür talep ve değerlendirme bariyerinin birlikte ürettiği fırsat skoru{' '}
                  <strong>{topOpportunity.opportunityScore?.toFixed(1)}</strong>. Tedarik maliyeti,
                  reklam CPC’si ve gerçek marj doğrulanmadan stok kararı verilmemeli.
                </p>
              </div>
              <a href={marketHref(snapshot.profile.slug, 'firsat-radari')}>Fırsat listesini aç →</a>
            </aside>
          ) : null}

          <div className="market-table-shell">
            <div className="market-table-head">
              <div>
                <span className="eyebrow">
                  {MARKET_VIEWS.find((item) => item.slug === view)?.label}
                </span>
                <h3>{snapshot.profile.label} kategorisi</h3>
              </div>
              <div>
                <span className={`market-quality-badge ${snapshot.quality.status.toLowerCase()}`}>
                  {snapshot.quality.status}
                </span>
                <a href={snapshot.csvUrl} target="_blank" rel="noopener noreferrer">
                  Ham CSV’yi aç ↗
                </a>
              </div>
            </div>

            {products.length ? (
              <table className="market-table">
                <caption>
                  {snapshot.profile.label} kategorisi için {formatMarketDate(latestCapturedAt)}{' '}
                  tarihli gözlemler
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Sıra</th>
                    <th scope="col">Ürün / kapsam</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Hareket</th>
                    <th scope="col">Görünür talep</th>
                    <th scope="col">Stok / puan</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={`${product.productId}-${product.offerKey}`}>
                      <td data-label="Kapsam içi sıra">
                        <strong className="market-rank">{product.rankPosition || '—'}</strong>
                      </td>
                      <th scope="row" data-label="Ürün">
                        <a href={product.url} target="_blank" rel="noopener noreferrer nofollow">
                          {product.title}
                        </a>
                        <span>
                          {product.brand || 'Marka belirtilmedi'} · {product.rankScopeLabel}
                        </span>
                      </th>
                      <td data-label="Fiyat">
                        <MarketHistoryTrigger
                          request={{
                            source: 'profile',
                            metric: 'price',
                            productId: product.productId,
                            offerKey: product.offerKey,
                            profileSlug: snapshot.profile.slug,
                            merchantId: product.merchantId,
                            title: product.title,
                          }}
                          primary={formatMarketMoney(product.price)}
                          secondary={
                            product.discountPercent
                              ? `%${product.discountPercent} indirim etiketi`
                              : 'Fiyat geçmişi'
                          }
                        />
                      </td>
                      <td data-label="Hareket">
                        <strong
                          className={
                            (product.rankDelta || 0) > 0
                              ? 'signal-up'
                              : (product.rankDelta || 0) < 0
                                ? 'signal-down'
                                : undefined
                          }
                        >
                          {product.rankDelta === null
                            ? 'Baz çizgisi'
                            : `${product.rankDelta > 0 ? '+' : ''}${product.rankDelta} sıra`}
                        </strong>
                        <span>Fiyat {percent(product.priceDeltaPercent)}</span>
                      </td>
                      <td data-label="Görünür talep">
                        <MarketHistoryTrigger
                          request={{
                            source: 'profile',
                            metric: 'sales',
                            productId: product.productId,
                            offerKey: product.offerKey,
                            profileSlug: snapshot.profile.slug,
                            merchantId: product.merchantId,
                            title: product.title,
                          }}
                          primary={product.salesSignal || 'Etiket yok'}
                          secondary={
                            product.salesSignalDailyMin !== null
                              ? `Günlük ≥ ${compact(product.salesSignalDailyMin)} alt sınır`
                              : 'Kesin satış adedi değildir'
                          }
                        />
                      </td>
                      <td data-label="Stok ve puan">
                        <MarketHistoryTrigger
                          request={{
                            source: 'profile',
                            metric: 'stock',
                            productId: product.productId,
                            offerKey: product.offerKey,
                            profileSlug: snapshot.profile.slug,
                            merchantId: product.merchantId,
                            title: product.title,
                          }}
                          primary={stockLabel(product.stockStatus, product.stockSignal)}
                          secondary={`${product.rating ? `${product.rating.toFixed(1)} puan` : 'Puan yok'} · ${compact(product.ratingCount)} değerlendirme`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="market-empty" role="status">
                <strong>Bu filtre için doğrulanmış sinyal bulunamadı.</strong>
                <p>
                  Arama ifadesini temizleyin veya başka bir görünüm seçin. Veri kaynağı geçici
                  olarak ulaşılamıyorsa son geçerli rapor korunur.
                </p>
                <a className="btn alt" href={marketHref(snapshot.profile.slug, 'cok-satanlar')}>
                  Çok satanlara dön
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-band band-cyan market-quality-section">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">VERİ SAĞLIĞI / PROFİL BAZINDA</span>
              <h2>Eksikliği saklamayan kalite panosu.</h2>
            </div>
            <p>Başarısız çalışma canlı verinin üzerine yazılmaz; son geçerli görüntü korunur.</p>
          </div>
          <div className="market-quality-grid">
            {profiles.map((profile) => {
              const quality = qualities.find((item) => item.profileSlug === profile.slug)
              return (
                <a key={profile.slug} href={marketHref(profile.slug, view)}>
                  <span>{profile.label}</span>
                  <strong>{quality?.status || 'UNKNOWN'}</strong>
                  <small>
                    {quality?.productCount || 0} ürün · %{quality?.detailSuccessRate || 0} detay
                  </small>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-band band-dark" id="yontem">
        <div className="wrap section market-method">
          <div className="head">
            <div>
              <span className="eyebrow">AÇIK YÖNTEM / V0.1</span>
              <h2>Sinyali, gerçekmiş gibi büyütmeden okuyun.</h2>
            </div>
            <p>Bu bağımsız çalışma Trendyol tarafından hazırlanmış veya onaylanmış değildir.</p>
          </div>
          <div className="market-method-grid">
            <article>
              <span>01</span>
              <h3>Kaynak</h3>
              <p>
                Yalnız herkese açık listeleme ve ürün sayfalarında toplama anında görülen alanlar.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Sıralama</h3>
              <p>
                Hareket yalnız aynı kategori veya arama kapsamındaki önceki gözlemle
                karşılaştırılır.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Satış sinyali</h3>
              <p>
                “500+ satıldı” etiketi alt sınırdır. Stok azalışından hesaplanan satış tahmini ayrı
                gösterilir; satıcı ve varyant aynı kalmalı, ölçüm aralığı yeterli olmalıdır.
              </p>
            </article>
            <article>
              <span>04</span>
              <h3>Stok sinyali</h3>
              <p>
                Stok durumu ve varsa seçili satıcı/varyantın bildirdiği stok adedi izlenir. Eksik
                miktar sıfır sayılmaz; satın alma limiti stok adedi olarak kullanılmaz.
              </p>
            </article>
            <article>
              <span>05</span>
              <h3>Fırsat radarı</h3>
              <p>
                Talep, değerlendirme bariyeri ve sıra sinyalini birleştiren araştırma önceliğidir.
              </p>
            </article>
            <article>
              <span>06</span>
              <h3>Karar sınırı</h3>
              <p>
                Tedarik maliyeti, marj, reklam CPC’si ve operasyon kapasitesi ayrıca
                doğrulanmalıdır.
              </p>
            </article>
          </div>
          <div className="market-disclaimer" role="note">
            <strong>BAĞIMSIZ VERİ NOTU</strong>
            <p>
              Ürün adları, fiyatlar ve görünür sinyaller kaynak platformda değişebilir. Toplama
              zamanı dışındaki güncellik garanti edilmez. Kaynak erişimi veya kalite kapısı
              başarısız olursa yeni veri yayınlanmaz.
            </p>
          </div>
        </div>
      </section>

      <NewsletterSection t={t} />
      <MarketHistoryModal />
      <Footer t={t} />
    </main>
  )
}

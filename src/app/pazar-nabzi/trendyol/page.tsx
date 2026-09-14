import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import NavBar from '@/components/landing/NavBar'
import NewsletterSection from '@/components/landing/NewsletterSection'
import Footer from '@/components/landing/Footer'
import { MarketHistoryModal } from '@/components/market/MarketHistoryExplorer'
import MarketProductTable from '@/components/market/MarketProductTable'
import tableStyles from '@/components/market/MarketProductTable.module.css'
import { getDictionary } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/seo'
import {
  formatMarketDate,
  getMarketTaxonomyCategories,
  getMarketTaxonomyDates,
  getMarketTaxonomyOverview,
  getMarketTaxonomySnapshot,
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

function taxonomyHref(categoryId: number, date = '', query = '', rootId: number | null = null) {
  const params = new URLSearchParams({ 'kategori-id': String(categoryId) })
  if (date) params.set('tarih', date)
  if (query) params.set('taksonomi-arama', query)
  if (rootId) params.set('ana-kategori', String(rootId))
  return `/pazar-nabzi/trendyol?${params.toString()}#kategori-evreni`
}

function fullCount(value: number | null) {
  if (value === null) return '—'
  return new Intl.NumberFormat('tr-TR').format(value)
}

export default async function TrendyolMarketPage({ searchParams }: PageProps) {
  const params = await searchParams
  const taxonomyQuery = first(params['taksonomi-arama']).slice(0, 80)
  const requestedRootId = Number(first(params['ana-kategori']))
  const requestedCategoryId = Number(first(params['kategori-id']))
  const requestedDate = /^\d{4}-\d{2}-\d{2}$/.test(first(params.tarih)) ? first(params.tarih) : ''
  const [taxonomyOverview, taxonomyDates] = await Promise.all([
    getMarketTaxonomyOverview(),
    getMarketTaxonomyDates(),
  ])
  const rootId = Number.isInteger(requestedRootId) && requestedRootId > 0 ? requestedRootId : null
  const taxonomyCategories = await getMarketTaxonomyCategories(
    taxonomyQuery,
    rootId,
    taxonomyQuery || rootId ? 60 : 19,
  )
  const taxonomyCategoryId =
    Number.isInteger(requestedCategoryId) && requestedCategoryId > 0
      ? requestedCategoryId
      : taxonomyCategories[0]?.categoryId || rootId || taxonomyOverview?.roots[0]?.categoryId || 0
  const taxonomySnapshot = taxonomyCategoryId
    ? await getMarketTaxonomySnapshot(taxonomyCategoryId, requestedDate || null)
    : { category: null, products: [], observedDate: null, metricsUnavailable: false }
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const latestCapturedAt =
    taxonomyOverview?.capturedAt || taxonomySnapshot.products[0]?.capturedAt || null
  const observedProductCount = taxonomyOverview?.uniqueProducts || 0
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Veri Mimarı Trendyol Pazar Nabzı — ${taxonomySnapshot.category?.path || 'Tüm kategoriler'}`,
    description:
      'Trendyol herkese açık ürün sayfalarından gözlemlenen sıralama, fiyat, stok ve talep sinyallerinin günlük görünümü.',
    url: `${siteUrl}/pazar-nabzi/trendyol`,
    dateModified: taxonomySnapshot.observedDate || taxonomyOverview?.observedDate || undefined,
    creator: { '@type': 'Organization', name: 'Veri Mimarı', url: siteUrl },
    isBasedOn: 'https://www.trendyol.com/',
    temporalCoverage: taxonomySnapshot.observedDate || taxonomyOverview?.observedDate || undefined,
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
                : 'Kategori kapsamı güncelleniyor'}
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
            <strong>{fullCount(taxonomyOverview?.totalCategories || 0)}</strong>
            <small>{fullCount(taxonomyOverview?.totalCategoryPaths || 0)} kategori yolu</small>
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
            <strong>{taxonomyOverview ? 'PASS' : 'BEKLİYOR'}</strong>
            <small>
              {taxonomyOverview
                ? `${fullCount(taxonomyOverview.coveredCategories)} kategori kapsandı`
                : 'son başarılı koşu korunuyor'}
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
              <details
                className={`market-taxonomy-picker ${tableStyles.layout}`}
                open={Boolean(taxonomyQuery || rootId)}
              >
                <summary>
                  <span>Kategori değiştir</span>
                  <strong>{taxonomySnapshot.category?.path || 'Kategori seçin'}</strong>
                  <small>{fullCount(taxonomyOverview.totalCategories)} kategori içinde ara</small>
                </summary>
                <div className="market-taxonomy-picker-body">
                  <form
                    className="market-taxonomy-search"
                    action="/pazar-nabzi/trendyol#kategori-evreni"
                  >
                    {requestedDate ? (
                      <input type="hidden" name="tarih" value={requestedDate} />
                    ) : null}
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

                  <aside className="market-taxonomy-categories" aria-label="Kategori sonuçları">
                    <div>
                      <span>KATEGORİ SONUÇLARI</span>
                      <strong>{taxonomyCategories.length}</strong>
                    </div>
                    <nav>
                      {taxonomyCategories.map((item) => (
                        <a
                          key={item.pathKey}
                          href={taxonomyHref(item.categoryId, requestedDate, taxonomyQuery, rootId)}
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
                </div>
              </details>

              <div className="market-taxonomy-results">
                <div className="market-table-head">
                  <div>
                    <span className="eyebrow">SEÇİLİ KATEGORİ</span>
                    <h3>{taxonomySnapshot.category?.path || 'Kategori seçin'}</h3>
                  </div>
                  <form action="/pazar-nabzi/trendyol#kategori-evreni">
                    <input type="hidden" name="kategori-id" value={taxonomyCategoryId} />
                    <input type="hidden" name="taksonomi-arama" value={taxonomyQuery} />
                    <input type="hidden" name="ana-kategori" value={rootId || ''} />
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

                <MarketProductTable
                  key={`${taxonomyCategoryId}-${taxonomySnapshot.observedDate}`}
                  products={taxonomySnapshot.products}
                  category={taxonomySnapshot.category?.path || 'Kategori'}
                  date={taxonomySnapshot.observedDate}
                  metricsUnavailable={taxonomySnapshot.metricsUnavailable}
                />
              </div>
            </>
          ) : (
            <div className="market-empty" role="status">
              <strong>Kategori evreni ilk aktarımı bekliyor.</strong>
              <p>Son başarılı koşu geldiğinde kategori sonuçları burada açılacak.</p>
            </div>
          )}
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

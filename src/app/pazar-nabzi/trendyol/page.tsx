import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import NavBar from '@/components/landing/NavBar'
import NewsletterSection from '@/components/landing/NewsletterSection'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/seo'
import {
  MARKET_VIEWS,
  formatMarketDate,
  formatMarketMoney,
  getMarketQualities,
  getMarketProfiles,
  getMarketSnapshot,
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
  const profiles = await getMarketProfiles()
  const [snapshot, qualities] = await Promise.all([
    getMarketSnapshot(category, profiles),
    getMarketQualities(profiles),
  ])
  const filtered = selectMarketProducts(snapshot.products, view, query)
  const products = filtered.slice(0, 40)
  const summary = summarizeMarketProducts(snapshot.products)
  const t = getDictionary('tr')
  const siteUrl = getSiteUrl()
  const topOpportunity = selectMarketProducts(snapshot.products, 'firsat-radari')[0]
  const latestCapturedAt = snapshot.quality.capturedAt || snapshot.products[0]?.capturedAt || null
  const passedProfiles = qualities.filter((quality) => quality.status === 'PASS').length
  const observedProductCount = qualities.reduce((total, quality) => total + quality.productCount, 0)
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
            <a className="btn hero-primary" href="#radar">
              Bugünün sinyallerini gör <span>↓</span>
            </a>
            <a className="hero-link" href="#yontem">
              Yöntemi ve sınırları oku ↗
            </a>
          </div>
          <div className="signals market-hero-signals">
            <span className="tag">
              <i /> {passedProfiles}/{profiles.length} profil kalite kapısından geçti
            </span>
            <span className="tag">
              <i /> {observedProductCount || '1.800'} günlük gözlem
            </span>
            <span className="tag">
              <i /> Son güncelleme: {formatMarketDate(latestCapturedAt)}
            </span>
          </div>
        </div>
      </section>

      <section className="market-status-strip" aria-label="Günlük pazar özeti">
        <div className="wrap market-status-grid">
          <div>
            <span>AKTİF KATEGORİ</span>
            <strong>{snapshot.profile.label}</strong>
            <small>{snapshot.quality.productCount || snapshot.products.length} ürün gözlemi</small>
          </div>
          <div>
            <span>MEDYAN FİYAT</span>
            <strong>{formatMarketMoney(summary.medianPrice)}</strong>
            <small>seçili günlük havuz</small>
          </div>
          <div>
            <span>YÜKSELİŞ SİNYALİ</span>
            <strong>{summary.risingCount}</strong>
            <small>aynı kapsam içindeki hareket</small>
          </div>
          <div>
            <span>VERİ KALİTESİ</span>
            <strong>{snapshot.quality.status}</strong>
            <small>%{snapshot.quality.detailSuccessRate} detay yenileme</small>
          </div>
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
                        <strong>{formatMarketMoney(product.price)}</strong>
                        {product.discountPercent ? (
                          <span>%{product.discountPercent} indirim etiketi</span>
                        ) : null}
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
                        <strong>{product.salesSignal || 'Etiket yok'}</strong>
                        {product.salesSignalDailyMin !== null ? (
                          <span>Günlük ≥ {compact(product.salesSignalDailyMin)} alt sınır</span>
                        ) : (
                          <span>Kesin satış adedi değildir</span>
                        )}
                      </td>
                      <td data-label="Stok ve puan">
                        <strong>{stockLabel(product.stockStatus, product.stockSignal)}</strong>
                        <span>
                          {product.rating ? `${product.rating.toFixed(1)} puan` : 'Puan yok'} ·{' '}
                          {compact(product.ratingCount)} değerlendirme
                        </span>
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
              <p>“500+ satıldı” alt sınırdır; gerçek sipariş adedi veya ciro değildir.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Stok sinyali</h3>
              <p>
                Stokta, stok dışı veya görünür uyarı izlenir; kesin envanter miktarı tahmin edilmez.
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
      <Footer t={t} />
    </main>
  )
}

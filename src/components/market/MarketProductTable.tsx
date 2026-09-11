'use client'

import { useMemo, useState } from 'react'
import type { MarketTaxonomyProduct } from '@/lib/trendyol-market'
import {
  csvCell,
  defaultTableFilters,
  matchesQuick,
  metricNumber,
  quantity,
  sales,
  selectTableProducts,
  type QuickFilter,
  type SortKey,
} from '@/lib/market-table'
import { MarketHistoryTrigger, type MarketHistoryMetric } from './MarketHistoryExplorer'
import styles from './MarketProductTable.module.css'

const number = (n: number | null) =>
  n === null ? 'Veri yok' : new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(n)
const money = (n: number | null) =>
  n === null
    ? 'Veri yok'
    : new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 2,
      }).format(n)
const presets: { id: QuickFilter; label: string }[] = [
  { id: 'all', label: 'Tüm ürünler' },
  { id: 'rising', label: 'Yükselenler' },
  { id: 'drops', label: 'Fiyatı düşenler' },
  { id: 'risk', label: 'Stok riski' },
  { id: 'rated', label: '4,5+ puan · 100+ değerlendirme' },
  { id: 'inventory', label: 'Stok adedi bilinen' },
]
const sorts: { id: SortKey; label: string }[] = [
  { id: 'rank', label: 'Kategori sırası' },
  { id: 'price', label: 'Fiyat' },
  { id: 'rankDelta', label: 'Sıra yükselişi' },
  { id: 'quantity', label: 'Stok adedi' },
  { id: 'sales', label: 'Günlük satış tahmini' },
  { id: 'rating', label: 'Ürün puanı' },
  { id: 'ratingCount', label: 'Değerlendirme sayısı' },
]

export default function MarketProductTable({
  products,
  category,
  date,
  metricsUnavailable,
}: {
  products: MarketTaxonomyProduct[]
  category: string
  date: string | null
  metricsUnavailable?: boolean
}) {
  const [filters, setFilters] = useState(defaultTableFilters)
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const brands = useMemo(
    () =>
      [...new Set(products.flatMap((p) => (p.brand ? [p.brand] : [])))].sort((a, b) =>
        a.localeCompare(b, 'tr'),
      ),
    [products],
  )
  const filtered = useMemo(() => selectTableProducts(products, filters), [products, filters])
  const update = (patch: Partial<typeof filters>) => {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(1)
  }
  const reset = () => {
    setFilters(defaultTableFilters)
    setPage(1)
  }
  const pages = Math.max(1, Math.ceil(filtered.length / 20))
  const visible = filtered.slice((page - 1) * 20, page * 20)
  const sort = (key: SortKey) =>
    update({
      sort: key,
      descending: filters.sort === key ? !filters.descending : key !== 'rank' && key !== 'price',
    })
  const exportCsv = () => {
    const rows = [
      [
        'Tarih',
        'Kategori',
        'Sıra',
        'Ürün',
        'Marka',
        'Fiyat TRY',
        'Sıra değişimi',
        'Stok durumu',
        'Bildirilen stok',
        'Günlük satış tahmini',
        'Puan',
        'Değerlendirme',
        'Yorum',
        'Soru-cevap',
        'Satıcı',
        'Kaynak',
      ],
      ...filtered.map((p) => [
        date,
        category,
        p.rank,
        p.title,
        p.brand,
        p.price,
        p.rankDelta,
        p.inStock === null ? '' : p.inStock ? 'Stokta' : 'Stok dışı',
        quantity(p),
        sales(p),
        p.rating,
        p.ratingCount,
        metricNumber(p, 'review_count'),
        metricNumber(p, 'question_count'),
        metricNumber(p, 'seller_count') ?? metricNumber(p, 'seller_count_observed'),
        p.url,
      ]),
    ]
    const url = URL.createObjectURL(
      new Blob(['\ufeff' + rows.map((r) => r.map(csvCell).join(';')).join('\r\n')], {
        type: 'text/csv;charset=utf-8;',
      }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = `trendyol-${date || 'rapor'}.csv`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const header = (key: SortKey, label: string) => (
    <th
      scope="col"
      aria-sort={filters.sort === key ? (filters.descending ? 'descending' : 'ascending') : 'none'}
    >
      <button onClick={() => sort(key)}>
        {label}{' '}
        <span aria-hidden="true">
          {filters.sort === key ? (filters.descending ? '↓' : '↑') : '↕'}
        </span>
      </button>
    </th>
  )
  const metric = (
    p: MarketTaxonomyProduct,
    key: MarketHistoryMetric,
    primary: string,
    secondary?: string,
  ) => (
    <MarketHistoryTrigger
      request={{
        source: 'taxonomy',
        metric: key,
        productId: p.productId,
        productKey: p.productKey,
        merchantId: p.merchantId,
        title: p.title,
        observedDate: date || undefined,
      }}
      primary={primary}
      secondary={secondary}
    />
  )
  return (
    <div className={styles.workspace}>
      <div className={styles.summary}>
        <div>
          <span>KATEGORİDEKİ ÜRÜN</span>
          <strong>{products.length}</strong>
        </div>
        <div>
          <span>YÜKSELEN</span>
          <strong>{products.filter((p) => matchesQuick(p, 'rising')).length}</strong>
        </div>
        <div>
          <span>FİYATI DÜŞEN</span>
          <strong>{products.filter((p) => matchesQuick(p, 'drops')).length}</strong>
        </div>
        <div>
          <span>STOK ADEDİ BİLİNEN</span>
          <strong>
            {products.filter((p) => quantity(p) !== null).length}
            <small> / {products.length}</small>
          </strong>
        </div>
      </div>
      <div className={styles.filters}>
        <div className={styles.quick} role="group" aria-label="Akıllı filtreler">
          {presets.map((p) => (
            <button
              key={p.id}
              aria-pressed={filters.quick === p.id}
              onClick={() => update({ quick: p.id })}
            >
              {p.label}
              <b>{products.filter((item) => matchesQuick(item, p.id)).length}</b>
            </button>
          ))}
        </div>
        <div className={styles.fields}>
          <label>
            Ürün, marka veya ürün no
            <input
              type="search"
              value={filters.query}
              onChange={(e) => update({ query: e.target.value })}
              placeholder="Örn. siyah çanta"
            />
          </label>
          <label>
            Marka
            <select value={filters.brand} onChange={(e) => update({ brand: e.target.value })}>
              <option value="">Tüm markalar</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label>
            En az fiyat (₺)
            <input
              type="number"
              min="0"
              value={filters.min}
              onChange={(e) => update({ min: e.target.value })}
              placeholder="0"
            />
          </label>
          <label>
            En çok fiyat (₺)
            <input
              type="number"
              min="0"
              value={filters.max}
              onChange={(e) => update({ max: e.target.value })}
              placeholder="Üst sınır yok"
            />
          </label>
          <label>
            Stok durumu
            <select value={filters.stock} onChange={(e) => update({ stock: e.target.value })}>
              <option value="">Tümü</option>
              <option value="in">Stokta</option>
              <option value="out">Stok dışı</option>
              <option value="unknown">Bilinmiyor</option>
            </select>
          </label>
        </div>
        {filters.min && filters.max && Number(filters.min) > Number(filters.max) ? (
          <p role="alert">En az fiyat, en çok fiyattan büyük olamaz. Fiyat aralığını düzeltin.</p>
        ) : null}
      </div>
      <div className={styles.toolbar}>
        <p role="status">
          <strong>{filtered.length}</strong> / {products.length} ürün eşleşti
        </p>
        <div>
          <label>
            Sıralama
            <select
              aria-label="Ürün sıralaması"
              value={filters.sort}
              onChange={(e) => sort(e.target.value as SortKey)}
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button className="btn alt" onClick={() => update({ descending: !filters.descending })}>
            {filters.descending ? 'Azalan ↓' : 'Artan ↑'}
          </button>
        </div>
        <div>
          <button className="btn alt" onClick={reset}>
            Filtreleri temizle
          </button>
          <button className="btn" onClick={exportCsv} disabled={!filtered.length}>
            CSV indir ↓
          </button>
        </div>
      </div>
      <div className={styles.note}>
        <p>
          Değerlerin üzerine tıklayarak tarihçeyi açın. “Veri yok” sıfır anlamına gelmez. Stok
          seçili satıcı/varyantın bildirdiği adettir; satış tahmini kesin sipariş değildir.
        </p>
        <button aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ek metrikleri gizle' : 'Yorum, soru ve satıcıları göster'}{' '}
          {expanded ? '−' : '+'}
        </button>
      </div>
      {metricsUnavailable ? (
        <p className={styles.notice} role="status">
          Ayrıntılı metrikler şu anda alınamadı. Fiyat ve sıralama kayıtları gösteriliyor; sayfayı
          yenileyerek tekrar deneyebilirsiniz.
        </p>
      ) : null}
      <table className={styles.table}>
        <caption>
          {category} · {date} tarihli gözlem · en fazla 200 ürün
        </caption>
        <thead>
          <tr>
            {header('rank', 'Sıra')}
            <th scope="col">Ürün / inceleme</th>
            {header('price', 'Fiyat / hareket')}
            {header('quantity', 'Stok')}
            {header('sales', 'Satış tahmini')}
            {header('rating', 'Puan / ilgi')}
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <tr key={p.productKey}>
              <td data-label="Sıra">
                <strong className={styles.rank}>{p.rank}</strong>
                <span className={styles.movement}>
                  {p.rankDelta === null
                    ? 'İlk gözlem'
                    : p.rankDelta === 0
                      ? 'Sıra sabit'
                      : `${p.rankDelta > 0 ? '↑' : '↓'} ${Math.abs(p.rankDelta)} sıra`}
                </span>
              </td>
              <th scope="row" data-label="Ürün">
                <div className={styles.product}>
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt=""
                      width="56"
                      height="72"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                  <div>
                    {metric(p, 'price', p.title, `${p.brand || 'Marka yok'} · #${p.productId}`)}
                    <a href={p.url} target="_blank" rel="noopener noreferrer nofollow">
                      Trendyol’da aç ↗
                    </a>
                  </div>
                </div>
              </th>
              <td data-label="Fiyat / hareket">
                {metric(
                  p,
                  'price',
                  money(p.price),
                  p.priceDeltaPercent === null
                    ? 'Önceki fiyat yok'
                    : `${p.priceDeltaPercent > 0 ? '+' : ''}${number(p.priceDeltaPercent)}% günlük değişim`,
                )}
                {p.promotions.length ? (
                  <span className={styles.promotion}>{p.promotions[0]}</span>
                ) : null}
              </td>
              <td data-label="Stok">
                {metric(
                  p,
                  'quantity',
                  quantity(p) === null ? 'Adet bilinmiyor' : `${number(quantity(p))} adet`,
                )}
                {metric(
                  p,
                  'stock',
                  p.inStock === false
                    ? 'Stok dışı'
                    : p.runningOut
                      ? 'Tükeniyor'
                      : p.inStock === true
                        ? 'Stokta'
                        : 'Durum bilinmiyor',
                )}
                {p.metrics.variant_label ? (
                  <small className={styles.promotion}>{String(p.metrics.variant_label)}</small>
                ) : null}
              </td>
              <td data-label="Satış tahmini">
                {metric(
                  p,
                  'estimatedSales',
                  sales(p) === null ? 'Yeterli gözlem yok' : `≈ ${number(sales(p))} / gün`,
                  'Stok azalışından tahmin',
                )}
              </td>
              <td data-label="Puan / ilgi">
                {metric(p, 'score', p.rating === null ? 'Puan yok' : `${number(p.rating)} / 5`)}
                {metric(
                  p,
                  'ratings',
                  `${number(p.ratingCount)}${p.ratingCount === null ? '' : ' değerlendirme'}`,
                )}
                {expanded ? (
                  <>
                    {metric(p, 'reviews', `${number(metricNumber(p, 'review_count'))} · yorum`)}
                    {metric(
                      p,
                      'questions',
                      `${number(metricNumber(p, 'question_count'))} · soru-cevap`,
                    )}
                    {metric(
                      p,
                      'sellers',
                      `${number(metricNumber(p, 'seller_count') ?? metricNumber(p, 'seller_count_observed'))} · satıcı`,
                    )}
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!filtered.length ? (
        <div className="market-empty" role="status">
          <strong>
            {products.length
              ? 'Filtrelerle eşleşen ürün yok.'
              : 'Bu kategori ve tarih için kayıt yok.'}
          </strong>
          <p>
            {products.length
              ? 'Filtreleri temizleyin veya fiyat aralığını genişletin.'
              : 'Başka bir kategori veya rapor tarihi seçin.'}
          </p>
          {products.length ? (
            <button className="btn alt" onClick={reset}>
              Tüm ürünleri göster
            </button>
          ) : null}
        </div>
      ) : null}
      <div className={styles.pagination}>
        <span>
          {filtered.length ? `${(page - 1) * 20 + 1}–${Math.min(page * 20, filtered.length)}` : '0'}{' '}
          / {filtered.length} ürün · Sayfa {page}/{pages}
        </span>
        <div>
          <button className="btn alt" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Önceki
          </button>
          <button
            className="btn alt"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Sonraki →
          </button>
        </div>
      </div>
    </div>
  )
}

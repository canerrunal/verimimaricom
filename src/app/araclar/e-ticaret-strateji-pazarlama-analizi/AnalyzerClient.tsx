'use client'

import { ChangeEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { getDictionary } from '@/lib/i18n'
import {
  analyzePortfolio,
  createProduct,
  type AnalysisSettings,
  type ProductAnalysis,
  type ProductInput,
  type StrategicDecision,
} from './analysis'
import { analyzerFaqs } from './faq'
import styles from './page.module.css'

const STORAGE_KEY = 'veri-mimari:ecommerce-strategy-analyzer:v1'

const defaultSettings: AnalysisSettings = {
  monthlyFixedCosts: 48_000,
  targetNetMargin: 20,
}

const sampleProducts: ProductInput[] = [
  createProduct({
    id: 'sample-hero',
    name: 'Premium termos',
    listPrice: 1_249,
    discountRate: 8,
    productCost: 340,
    marketplaceCommissionRate: 17,
    paymentFeeRate: 1.5,
    shippingCost: 72,
    packagingCost: 19,
    adCostPerOrder: 155,
    returnRate: 4,
    returnLoss: 180,
    monthlySales: 240,
    conversionRate: 3.2,
    currentCpc: 4.6,
  }),
  createProduct({
    id: 'sample-bag',
    name: 'Şehir sırt çantası',
    listPrice: 899,
    discountRate: 12,
    productCost: 315,
    marketplaceCommissionRate: 18,
    paymentFeeRate: 2,
    shippingCost: 68,
    packagingCost: 14,
    adCostPerOrder: 142,
    returnRate: 13,
    returnLoss: 210,
    monthlySales: 155,
    conversionRate: 2.1,
    currentCpc: 4.4,
  }),
  createProduct({
    id: 'sample-organizer',
    name: 'Masa düzenleyici',
    listPrice: 449,
    discountRate: 5,
    productCost: 128,
    marketplaceCommissionRate: 14,
    paymentFeeRate: 2.5,
    shippingCost: 54,
    packagingCost: 12,
    adCostPerOrder: 92,
    returnRate: 3,
    returnLoss: 90,
    monthlySales: 310,
    conversionRate: 4.1,
    currentCpc: 3.2,
  }),
]

type ResultTab = 'summary' | 'products' | 'strategy'

const currency = (value: number | null, fractionDigits = 0) =>
  value === null || !Number.isFinite(value)
    ? '—'
    : `${value.toLocaleString('tr-TR', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })} TL`

const number = (value: number | null, fractionDigits = 1) =>
  value === null || !Number.isFinite(value)
    ? '—'
    : value.toLocaleString('tr-TR', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })

const percent = (value: number, fractionDigits = 1) => `%${number(value, fractionDigits)}`

function decisionClass(decision: StrategicDecision) {
  if (decision === 'Büyüt') return styles.decisionScale
  if (decision === 'Optimize et') return styles.decisionOptimize
  if (decision === 'Kontrollü test') return styles.decisionTest
  return styles.decisionUrgent
}

function downloadFile(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function NumberField({
  label,
  hint,
  value,
  onChange,
  suffix,
  step = 'any',
  max,
}: {
  label: string
  hint: string
  value: number
  onChange: (value: number) => void
  suffix: string
  step?: string
  max?: number
}) {
  const id = useId()

  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        <span>{label}</span>
        <small>{hint}</small>
      </label>
      <div className={styles.inputShell}>
        <input
          id={id}
          type="number"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
        />
        <span aria-hidden="true">{suffix}</span>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  note,
  tone,
}: {
  label: string
  value: string
  note: string
  tone?: 'positive' | 'negative' | 'accent'
}) {
  return (
    <article className={`${styles.metricCard} ${tone ? styles[tone] : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function ProductEditor({
  product,
  index,
  result,
  onChange,
  onCopy,
  onDelete,
  canDelete,
}: {
  product: ProductInput
  index: number
  result: ProductAnalysis
  onChange: (patch: Partial<ProductInput>) => void
  onCopy: () => void
  onDelete: () => void
  canDelete: boolean
}) {
  const nameId = useId()

  return (
    <details className={styles.productEditor} open={index === 0}>
      <summary>
        <span className={styles.productIndex}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.productSummary}>
          <strong>{product.name || `Ürün ${index + 1}`}</strong>
          <small>
            {currency(result.unitProfit, 2)} / sipariş · {percent(result.contributionMargin)} katkı
          </small>
        </span>
        <span className={`${styles.decision} ${decisionClass(result.decision)}`}>
          {result.decision}
        </span>
      </summary>

      <div className={styles.editorBody}>
        <div className={styles.nameField}>
          <label htmlFor={nameId}>Ürün adı</label>
          <input
            id={nameId}
            type="text"
            value={product.name}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder="Örn. Premium termos"
          />
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.groupHeading}>
            <span>01</span>
            <h3>Fiyat ve kanal</h3>
          </div>
          <div className={styles.fieldsGrid}>
            <NumberField
              label="Liste fiyatı"
              hint="İndirim öncesi etiket fiyatı"
              value={product.listPrice}
              onChange={(value) => onChange({ listPrice: value })}
              suffix="TL"
            />
            <NumberField
              label="İndirim oranı"
              hint="Satışta uygulanan ortalama indirim"
              value={product.discountRate}
              onChange={(value) => onChange({ discountRate: value })}
              suffix="%"
              max={99}
            />
            <NumberField
              label="Pazaryeri komisyonu"
              hint="Net satış üzerinden kesinti"
              value={product.marketplaceCommissionRate}
              onChange={(value) => onChange({ marketplaceCommissionRate: value })}
              suffix="%"
              max={100}
            />
            <NumberField
              label="Ödeme kesintisi"
              hint="Sanal POS veya altyapı oranı"
              value={product.paymentFeeRate}
              onChange={(value) => onChange({ paymentFeeRate: value })}
              suffix="%"
              max={100}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.groupHeading}>
            <span>02</span>
            <h3>Maliyet ve operasyon</h3>
          </div>
          <div className={styles.fieldsGrid}>
            <NumberField
              label="Ürün maliyeti"
              hint="Ürünün size geliş maliyeti"
              value={product.productCost}
              onChange={(value) => onChange({ productCost: value })}
              suffix="TL"
            />
            <NumberField
              label="Kargo gideri"
              hint="Sipariş başına gidiş kargosu"
              value={product.shippingCost}
              onChange={(value) => onChange({ shippingCost: value })}
              suffix="TL"
            />
            <NumberField
              label="Paketleme gideri"
              hint="Kutu, dolgu ve sarf malzemesi"
              value={product.packagingCost}
              onChange={(value) => onChange({ packagingCost: value })}
              suffix="TL"
            />
            <NumberField
              label="İade oranı"
              hint="Siparişlerin iade edilen payı"
              value={product.returnRate}
              onChange={(value) => onChange({ returnRate: value })}
              suffix="%"
              max={100}
            />
            <NumberField
              label="İade başı kayıp"
              hint="Kargo, hasar ve operasyon kaybı"
              value={product.returnLoss}
              onChange={(value) => onChange({ returnLoss: value })}
              suffix="TL"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.groupHeading}>
            <span>03</span>
            <h3>Reklam ve hacim</h3>
          </div>
          <div className={styles.fieldsGrid}>
            <NumberField
              label="Sipariş başı reklam"
              hint="Gerçekleşen ortalama CPA"
              value={product.adCostPerOrder}
              onChange={(value) => onChange({ adCostPerOrder: value })}
              suffix="TL"
            />
            <NumberField
              label="Aylık satış adedi"
              hint="Ortalama tamamlanan sipariş"
              value={product.monthlySales}
              onChange={(value) => onChange({ monthlySales: value })}
              suffix="adet"
              step="1"
            />
            <NumberField
              label="Dönüşüm oranı"
              hint="Tıklamadan siparişe dönüşüm"
              value={product.conversionRate}
              onChange={(value) => onChange({ conversionRate: value })}
              suffix="%"
              max={100}
            />
            <NumberField
              label="Mevcut CPC"
              hint="Tıklama başına ortalama maliyet"
              value={product.currentCpc}
              onChange={(value) => onChange({ currentCpc: value })}
              suffix="TL"
            />
          </div>
        </div>

        <div className={styles.editorActions}>
          <button type="button" className="btn alt" onClick={onCopy}>
            Ürünü kopyala
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onDelete}
            disabled={!canDelete}
          >
            Ürünü sil
          </button>
        </div>
      </div>
    </details>
  )
}

export default function AnalyzerClient() {
  const t = getDictionary('tr')
  const [products, setProducts] = useState<ProductInput[]>([
    createProduct({ id: 'initial-product', name: 'Ana ürün' }),
  ])
  const [settings, setSettings] = useState<AnalysisSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<ResultTab>('summary')
  const [hydrated, setHydrated] = useState(false)
  const [notice, setNotice] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as {
          products?: ProductInput[]
          settings?: AnalysisSettings
        }
        if (Array.isArray(parsed.products) && parsed.products.length > 0)
          setProducts(parsed.products)
        if (parsed.settings) setSettings(parsed.settings)
      }
    } catch {
      setNotice('Kayıtlı çalışma okunamadı; güvenli başlangıç değerleri yüklendi.')
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, products, settings }))
    } catch {
      setNotice('Otomatik kayıt yapılamadı. Çalışmanızı JSON olarak indirerek koruyabilirsiniz.')
    }
  }, [hydrated, products, settings])

  const analysis = useMemo(() => analyzePortfolio(products, settings), [products, settings])

  const updateProduct = (id: string, patch: Partial<ProductInput>) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, ...patch } : product)),
    )
  }

  const addProduct = () => {
    setProducts((current) => [...current, createProduct({ name: `Ürün ${current.length + 1}` })])
    setNotice('Yeni ürün çalışma alanına eklendi.')
  }

  const copyProduct = (product: ProductInput) => {
    setProducts((current) => [
      ...current,
      createProduct({ ...product, id: undefined, name: `${product.name} — Kopya` }),
    ])
    setNotice(`${product.name} kopyalandı.`)
  }

  const removeProduct = (id: string) => {
    setProducts((current) =>
      current.length > 1 ? current.filter((product) => product.id !== id) : current,
    )
  }

  const loadSample = () => {
    setProducts(sampleProducts.map((product) => ({ ...product })))
    setSettings(defaultSettings)
    setNotice('Üç ürünlü örnek portföy yüklendi.')
  }

  const exportJson = () => {
    const payload = JSON.stringify(
      { version: 1, exportedAt: new Date().toISOString(), settings, products },
      null,
      2,
    )
    downloadFile(payload, 'application/json', 'veri-mimari-e-ticaret-analizi.json')
  }

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const parsed = JSON.parse(await file.text()) as {
        products?: ProductInput[]
        settings?: AnalysisSettings
      }
      if (!Array.isArray(parsed.products) || parsed.products.length === 0 || !parsed.settings) {
        throw new Error('Eksik proje yapısı')
      }
      setProducts(parsed.products.map((product) => createProduct(product)))
      setSettings(parsed.settings)
      setNotice(`${file.name} başarıyla yüklendi.`)
    } catch {
      setNotice('JSON dosyası yüklenemedi. Veri Mimarı proje çıktısı kullandığınızdan emin olun.')
    }
  }

  const exportCsv = () => {
    const headers = [
      'Ürün',
      'Net satış fiyatı',
      'Birim kâr',
      'Aylık ciro',
      'Faaliyet kârı',
      'Katkı marjı',
      'Gerçek ROAS',
      'Hedef ROAS',
      'Hedef CPA',
      'Maksimum CPC',
      'Önerilen fiyat',
      'Sağlık puanı',
      'Karar',
    ]
    const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`
    const rows = analysis.products.map((product) => [
      product.name,
      product.netSalePrice,
      product.unitProfit,
      product.monthlyRevenue,
      product.operatingProfit,
      product.contributionMargin,
      product.actualRoas ?? '',
      product.targetRoas ?? '',
      product.targetCpa,
      product.maxCpc,
      product.recommendedListPrice ?? '',
      product.healthScore,
      product.decision,
    ])
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(';')).join('\n')
    downloadFile(`\uFEFF${csv}`, 'text/csv;charset=utf-8', 'veri-mimari-urun-analizi.csv')
  }

  const bridgeItems = [
    ['Ciro', analysis.profitBridge.revenue, true],
    ['Ürün maliyeti', analysis.profitBridge.productCosts, false],
    ['Komisyon', analysis.profitBridge.commissions, false],
    ['Ödeme kesintisi', analysis.profitBridge.paymentFees, false],
    ['Kargo + paketleme', analysis.profitBridge.shipping + analysis.profitBridge.packaging, false],
    ['İade kaybı', analysis.profitBridge.returns, false],
    ['Reklam', analysis.profitBridge.advertising, false],
    ['Sabit gider', analysis.profitBridge.fixedCosts, false],
    ['Faaliyet sonucu', analysis.profitBridge.operatingProfit, true],
  ] as const

  const maxBridgeValue = Math.max(...bridgeItems.map(([, value]) => Math.abs(value)), 1)

  return (
    <main className={`page ${styles.page}`}>
      <NavBar t={t} />

      <section className={`wrap hero single ${styles.hero}`}>
        <a href="/araclar" className="back-link">
          ← Tüm araçlar
        </a>
        <div className="crumb">ARAÇLAR / STRATEJİ / 05</div>
        <h1>E-Ticaret Strateji ve Pazarlama Analizi</h1>
        <p className="intro">
          Ürün kârlılığını, reklam sınırlarını ve fiyat kararlarını aynı modelde görün. Portföyünüzü
          hangi ürünü büyüteceğinizi söyleyen net bir aksiyon planına dönüştürün.
        </p>
        <div className="actions-row">
          <a className="btn hero-primary" href="#analiz-alani">
            Portföyü analiz et ↓
          </a>
          <a className="hero-link" href="#yontem">
            Yöntemi incele ↗
          </a>
        </div>
        <div className="signals">
          <span className="tag live">CANLI · ÜCRETSİZ</span>
          <span className="tag">ÇOKLU ÜRÜN ANALİZİ</span>
          <span className="tag">VERİLER CİHAZINIZDA</span>
        </div>
      </section>

      <section id="analiz-alani" className={styles.workspace}>
        <div className="wrap">
          <div className={styles.toolbar}>
            <div>
              <span className="eyebrow">ÇALIŞMA ALANI</span>
              <h2>Rakamları girin. Kararı görün.</h2>
              <p>Değişiklikler anında hesaplanır ve bu tarayıcıda otomatik kaydedilir.</p>
            </div>
            <div className={styles.toolbarActions}>
              <button type="button" className="btn" onClick={addProduct}>
                + Ürün ekle
              </button>
              <button type="button" className="btn alt" onClick={loadSample}>
                Örnek veri
              </button>
              <button type="button" className="btn alt" onClick={exportJson}>
                JSON indir
              </button>
              <button
                type="button"
                className="btn alt"
                onClick={() => fileInputRef.current?.click()}
              >
                JSON yükle
              </button>
              <input
                ref={fileInputRef}
                className={styles.hiddenInput}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={importJson}
              />
            </div>
          </div>

          {notice && (
            <div className={styles.notice} role="status">
              {notice}
            </div>
          )}

          <div className={styles.assumptionPanel}>
            <div>
              <span className="eyebrow">PORTFÖY VARSAYIMLARI</span>
              <h2>Hedef ve sabit gider</h2>
              <p>Bu iki değer tüm ürünlerin faaliyet sonucu ve fiyat önerisini etkiler.</p>
            </div>
            <NumberField
              label="Aylık toplam sabit gider"
              hint="Kira, ekip, yazılım ve genel giderler"
              value={settings.monthlyFixedCosts}
              onChange={(value) =>
                setSettings((current) => ({ ...current, monthlyFixedCosts: value }))
              }
              suffix="TL"
            />
            <NumberField
              label="Hedef net kâr marjı"
              hint="Sabit gider payı ve reklam sonrası hedef"
              value={settings.targetNetMargin}
              onChange={(value) =>
                setSettings((current) => ({ ...current, targetNetMargin: Math.min(95, value) }))
              }
              suffix="%"
              max={95}
            />
          </div>

          <div className={styles.inputLayout}>
            <div className={styles.productList}>
              {products.map((product, index) => (
                <ProductEditor
                  key={product.id}
                  product={product}
                  index={index}
                  result={analysis.products[index]}
                  onChange={(patch) => updateProduct(product.id, patch)}
                  onCopy={() => copyProduct(product)}
                  onDelete={() => removeProduct(product.id)}
                  canDelete={products.length > 1}
                />
              ))}
              <button type="button" className={styles.addProductButton} onClick={addProduct}>
                + Bir ürün daha ekle
              </button>
            </div>

            <aside className={`results ${styles.liveSummary}`} aria-label="Canlı portföy özeti">
              <span className={styles.liveLabel}>CANLI PORTFÖY ÖZETİ</span>
              <div className={styles.scoreRing}>
                <strong>{analysis.healthScore}</strong>
                <span>/ 100</span>
              </div>
              <p>{analysis.managerSummary}</p>
              <dl>
                <div>
                  <dt>Aylık ciro</dt>
                  <dd>{currency(analysis.totalRevenue)}</dd>
                </div>
                <div>
                  <dt>Faaliyet sonucu</dt>
                  <dd
                    className={
                      analysis.operatingProfit >= 0 ? styles.valuePositive : styles.valueNegative
                    }
                  >
                    {currency(analysis.operatingProfit)}
                  </dd>
                </div>
                <div>
                  <dt>Katkı marjı</dt>
                  <dd>{percent(analysis.contributionMargin)}</dd>
                </div>
                <div>
                  <dt>Reklam harcaması</dt>
                  <dd>{currency(analysis.adSpend)}</dd>
                </div>
              </dl>
              <a className="btn" href="#sonuclar">
                Detaylı sonucu gör ↓
              </a>
              <small>
                Sonuçlar simülasyondur; vergi ve nakit akışı ayrıca değerlendirilmelidir.
              </small>
            </aside>
          </div>
        </div>
      </section>

      <section id="sonuclar" className={styles.resultsSection}>
        <div className="wrap">
          <div className={styles.resultsHeading}>
            <div>
              <span className="eyebrow">YÖNETİM EKRANI</span>
              <h2>Sonuçtan aksiyona.</h2>
            </div>
            <div className={styles.exportActions}>
              <button type="button" className="btn alt" onClick={exportCsv}>
                CSV raporu
              </button>
              <button type="button" className="btn alt" onClick={() => window.print()}>
                Yazdır / PDF
              </button>
            </div>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Analiz sonuçları">
            {(
              [
                ['summary', 'Özet'],
                ['products', 'Ürün analizi'],
                ['strategy', 'Strateji'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                className={activeTab === id ? styles.activeTab : ''}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'summary' && (
            <div id="panel-summary" role="tabpanel" className={styles.tabPanel}>
              <div className={styles.metricGrid}>
                <MetricCard
                  label="Portföy sağlık puanı"
                  value={`${analysis.healthScore}/100`}
                  note={`${analysis.products.length} ürünün ağırlıklı skoru`}
                  tone="accent"
                />
                <MetricCard
                  label="Aylık tahmini ciro"
                  value={currency(analysis.totalRevenue)}
                  note="İndirim sonrası net satış"
                />
                <MetricCard
                  label="Faaliyet kârı"
                  value={currency(analysis.operatingProfit)}
                  note="Sabit gider sonrası tahmin"
                  tone={analysis.operatingProfit >= 0 ? 'positive' : 'negative'}
                />
                <MetricCard
                  label="Katkı marjı"
                  value={percent(analysis.contributionMargin)}
                  note="Reklam sonrası, sabit gider öncesi"
                />
                <MetricCard
                  label="Reklam harcaması"
                  value={currency(analysis.adSpend)}
                  note="Sipariş başı reklam × hacim"
                />
                <MetricCard
                  label="Başa baş ciro"
                  value={currency(analysis.breakEvenRevenue)}
                  note="Mevcut katkı marjıyla gerekli ciro"
                />
              </div>

              <div className={styles.summaryGrid}>
                <article className={styles.managerCard}>
                  <span className="eyebrow">YÖNETİCİ ÖZETİ</span>
                  <h3>
                    {analysis.operatingProfit >= 0
                      ? 'Portföy değer üretiyor.'
                      : 'Portföy müdahale istiyor.'}
                  </h3>
                  <p>{analysis.managerSummary}</p>
                  <div className={styles.summarySignals}>
                    <div>
                      <span>Büyütme adayı</span>
                      <strong>{analysis.scaleProduct?.name ?? '—'}</strong>
                    </div>
                    <div>
                      <span>İlk müdahale</span>
                      <strong>{analysis.interventionProduct?.name ?? '—'}</strong>
                    </div>
                  </div>
                </article>

                <article className={styles.bridgeCard}>
                  <span className="eyebrow">KÂR KÖPRÜSÜ</span>
                  <h3>Cirodan faaliyet sonucuna</h3>
                  <div className={styles.bridgeList}>
                    {bridgeItems.map(([label, value, total]) => (
                      <div key={label} className={total ? styles.bridgeTotal : ''}>
                        <span>{label}</span>
                        <progress
                          max={maxBridgeValue}
                          value={Math.abs(value)}
                          aria-label={`${label}: ${currency(value)}`}
                        />
                        <strong>
                          {label === 'Ciro' || label === 'Faaliyet sonucu' ? '' : '−'}
                          {currency(value)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div id="panel-products" role="tabpanel" className={styles.tabPanel}>
              <div className={styles.tableShell}>
                <table className={styles.analysisTable}>
                  <caption>Ürün bazında kârlılık, reklam ve strateji karşılaştırması</caption>
                  <thead>
                    <tr>
                      <th>Ürün</th>
                      <th>Birim kâr</th>
                      <th>Katkı marjı</th>
                      <th>Aylık sonuç</th>
                      <th>ROAS / hedef</th>
                      <th>Önerilen fiyat</th>
                      <th>Puan</th>
                      <th>Karar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.products.map((product) => (
                      <tr key={product.id}>
                        <th scope="row">
                          <strong>{product.name}</strong>
                          <small>{currency(product.netSalePrice)} net satış</small>
                        </th>
                        <td
                          className={
                            product.unitProfit >= 0 ? styles.tablePositive : styles.tableNegative
                          }
                        >
                          {currency(product.unitProfit, 2)}
                        </td>
                        <td>{percent(product.contributionMargin)}</td>
                        <td
                          className={
                            product.operatingProfit >= 0
                              ? styles.tablePositive
                              : styles.tableNegative
                          }
                        >
                          {currency(product.operatingProfit)}
                        </td>
                        <td>
                          {number(product.actualRoas, 2)}x{' '}
                          <small>/ {number(product.targetRoas, 2)}x</small>
                        </td>
                        <td>{currency(product.recommendedListPrice)}</td>
                        <td>
                          <strong>{product.healthScore}</strong>/100
                        </td>
                        <td>
                          <span className={`${styles.decision} ${decisionClass(product.decision)}`}>
                            {product.decision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.productAnalysisGrid}>
                {analysis.products.map((product) => (
                  <article key={product.id} className={styles.productAnalysisCard}>
                    <header>
                      <div>
                        <span className="eyebrow">ÜRÜN AKSİYONLARI</span>
                        <h3>{product.name}</h3>
                      </div>
                      <span className={`${styles.decision} ${decisionClass(product.decision)}`}>
                        {product.decision}
                      </span>
                    </header>
                    <dl>
                      <div>
                        <dt>Brüt marj</dt>
                        <dd>{percent(product.grossMargin)}</dd>
                      </div>
                      <div>
                        <dt>Başa baş CPA</dt>
                        <dd>{currency(product.breakEvenCpa, 2)}</dd>
                      </div>
                      <div>
                        <dt>Hedef CPA</dt>
                        <dd>{currency(product.targetCpa, 2)}</dd>
                      </div>
                      <div>
                        <dt>Maksimum CPC</dt>
                        <dd>{currency(product.maxCpc, 2)}</dd>
                      </div>
                      <div>
                        <dt>Başa baş ROAS</dt>
                        <dd>{number(product.breakEvenRoas, 2)}x</dd>
                      </div>
                      <div>
                        <dt>Başa baş satış</dt>
                        <dd>
                          {product.breakEvenSalesUnits === null
                            ? '—'
                            : `${Math.ceil(product.breakEvenSalesUnits)} adet`}
                        </dd>
                      </div>
                    </dl>
                    <ul>
                      {product.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div id="panel-strategy" role="tabpanel" className={styles.tabPanel}>
              <div className={styles.strategyGrid}>
                <article className={styles.strategyCard}>
                  <span className="eyebrow">01 / BÜYÜTME</span>
                  <h3>{analysis.scaleProduct?.name ?? 'Ürün ekleyin'}</h3>
                  <p>
                    {analysis.scaleProduct
                      ? `${analysis.scaleProduct.healthScore}/100 sağlık puanı ve ${percent(analysis.scaleProduct.contributionMargin)} katkı marjıyla portföyün en güçlü bütçe adayı.`
                      : 'Analiz için ürün verisi gerekli.'}
                  </p>
                </article>
                <article className={styles.strategyCard}>
                  <span className="eyebrow">02 / İLK MÜDAHALE</span>
                  <h3>{analysis.interventionProduct?.name ?? 'Ürün ekleyin'}</h3>
                  <p>
                    {analysis.interventionProduct?.actions[0] ?? 'Analiz için ürün verisi gerekli.'}
                  </p>
                </article>
                <article className={styles.strategyCard}>
                  <span className="eyebrow">03 / FİYATLANDIRMA</span>
                  <h3>Hedef marjı fiyatla sınayın.</h3>
                  <p>
                    Önerilen fiyatı tek seferde uygulamak yerine düşük riskli ürünlerde kontrollü
                    A/B testiyle doğrulayın.
                  </p>
                </article>
                <article className={styles.strategyCard}>
                  <span className="eyebrow">04 / REKLAM DİSİPLİNİ</span>
                  <h3>CPA ve CPC tavanını koruyun.</h3>
                  <p>
                    Bütçeyi yalnızca gerçek CPA hedef CPA’nın, mevcut CPC de maksimum CPC’nin
                    altında kaldığında artırın.
                  </p>
                </article>
              </div>

              <article className={styles.planCard}>
                <header>
                  <span className="eyebrow">30 GÜNLÜK UYGULAMA PLANI</span>
                  <h3>Dört haftada kontrollü ilerleme</h3>
                </header>
                <ol>
                  <li>
                    <span>01–07</span>
                    <div>
                      <strong>Veriyi doğrula</strong>
                      <p>
                        Ürün maliyeti, komisyon, iade kaybı ve gerçek sipariş başı reklam maliyetini
                        son 30 gün faturalarıyla eşleştirin.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>08–14</span>
                    <div>
                      <strong>İlk sızıntıyı kapat</strong>
                      <p>
                        {analysis.interventionProduct?.name ?? 'En düşük skorlu ürün'} için en
                        kritik aksiyonu uygulayın; aynı anda yalnızca bir değişkeni değiştirin.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>15–21</span>
                    <div>
                      <strong>Fiyat ve reklam testi yap</strong>
                      <p>
                        Önerilen fiyatı veya maksimum CPC sınırını kontrollü bir kampanyada test
                        edin; dönüşüm ve iade etkisini birlikte izleyin.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>22–30</span>
                    <div>
                      <strong>Bütçeyi yeniden dağıt</strong>
                      <p>
                        Hedef CPA altında kalan ürünlere bütçe aktarın; faaliyet zararı üreten
                        ürünlerde büyümeyi durdurun ve analizi yenileyin.
                      </p>
                    </div>
                  </li>
                </ol>
              </article>
            </div>
          )}
        </div>
      </section>

      <section id="yontem" className={`section-band band-dark ${styles.methodSection}`}>
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">AÇIK HESAPLAMA YÖNTEMİ</span>
              <h2>Sonuçların arkasında ne var?</h2>
            </div>
            <p>Matematik cihazınızda çalışır. Ürün verileri bir sunucuya gönderilmez.</p>
          </div>
          <div className={styles.methodGrid}>
            <article>
              <span>01</span>
              <h3>Net satış</h3>
              <p>Liste fiyatı × (1 − indirim oranı)</p>
            </article>
            <article>
              <span>02</span>
              <h3>Birim katkı</h3>
              <p>Net satış − ürün − kanal − operasyon − iade − reklam</p>
            </article>
            <article>
              <span>03</span>
              <h3>Faaliyet sonucu</h3>
              <p>Aylık birim katkı − ciro payına göre dağıtılmış sabit gider</p>
            </article>
            <article>
              <span>04</span>
              <h3>Maksimum CPC</h3>
              <p>Hedef CPA × dönüşüm oranı</p>
            </article>
          </div>
          <p className={styles.disclaimer}>
            Bu araç karar desteği sağlayan bir simülasyondur; finansal danışmanlık değildir. KDV,
            vergi, vade, nakit akışı ve kanal özelindeki ek bedelleri ayrıca değerlendirin.
          </p>
          <nav className={styles.relatedLinks} aria-label="İlgili kaynaklar">
            <span className="eyebrow">İLGİLİ KAYNAKLAR</span>
            <a href="/rehberler/e-ticaret-karliligi">E-ticaret kârlılığı rehberi ↗</a>
            <a href="/rehberler/reklam-performansi">Reklam performansı ölçüm rehberi ↗</a>
          </nav>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className="wrap">
          <div className={styles.faqHeading}>
            <div>
              <span className="eyebrow">SIK SORULAN SORULAR</span>
              <h2 id="faq-title">Aracı kullanmadan önce bilinmesi gerekenler.</h2>
            </div>
            <p>
              Hesaplama kapsamını, kullanılan maliyetleri ve verilerin nasıl işlendiğini kısa kısa
              açıklıyoruz.
            </p>
          </div>
          <div className={styles.faqList}>
            {analyzerFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="E-Ticaret Strateji ve Pazarlama Analizi" />
    </main>
  )
}

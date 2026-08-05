'use client'

import { FormEvent, useMemo, useRef, useState } from 'react'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import {
  buildManualBenchmark,
  manualEvidenceKey,
  manualProviders,
  type ManualProvider,
} from '@/features/ai-visibility/manual-benchmark'
import { buildPrompts } from '@/features/ai-visibility/prompts'
import { sampleVisibilityReport } from '@/features/ai-visibility/sample-report'
import type {
  BrandProfile,
  PreflightOutput,
  ProviderId,
  VisibilityBenchmarkOutput,
} from '@/features/ai-visibility/types'
import { getDictionary } from '@/lib/i18n'
import { aiVisibilityFaqs } from './faq'
import styles from './page.module.css'

type View = 'preflight' | 'profile' | 'manual-input' | 'benchmark' | 'sample'

interface ManualEntryState {
  responseText: string
  sourcesText: string
}

const providerNames: Partial<Record<ProviderId, string>> = {
  openai: 'ChatGPT',
  perplexity: 'Perplexity',
}

const providerLinks: Record<ManualProvider, string> = {
  openai: 'https://chatgpt.com/',
  perplexity: 'https://www.perplexity.ai/',
}

const journeySteps = [
  { id: 1, label: 'Teknik zemini tara', meta: 'ANA SAYFA + ROBOTS + SITEMAP' },
  { id: 2, label: 'Ölçüm planını kur', meta: 'MARKA + KATEGORİ + RAKİPLER' },
  { id: 3, label: 'Gerçek kanıtı işle', meta: '4 SORU × 2 ÜCRETSİZ YÜZEY' },
] as const

const technicalDimensionDefinitions = [
  {
    label: 'Erişilebilirlik',
    detail: 'Sayfa, robots ve sitemap',
    checkIds: ['reachability', 'robots', 'sitemap'],
  },
  {
    label: 'Sayfa açıklığı',
    detail: 'Title, açıklama, H1 ve canonical',
    checkIds: ['title', 'description', 'h1', 'canonical'],
  },
  {
    label: 'Varlık sinyali',
    detail: 'Marka ve ürün yapılandırılmış verisi',
    checkIds: ['organization-schema', 'product-schema'],
  },
] as const

const initialProfile: BrandProfile = {
  brandName: '',
  aliases: [],
  sector: '',
  products: [],
  country: 'Türkiye',
  language: 'tr',
  targetAudience: '',
  competitors: [],
  exclusions: [],
}

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20)
}

function scoreLabel(score: number) {
  if (score >= 80) return 'Güçlü teknik sinyal'
  if (score >= 60) return 'İyi teknik temel'
  if (score >= 40) return 'Kısmi teknik temel'
  return 'Kritik teknik eksikler'
}

function recommendationForCheck(checkId: string) {
  const recommendations: Record<string, string> = {
    reachability: 'Sunucu yanıtını ve ana alan adı yönlendirmelerini kontrol edin.',
    robots: 'robots.txt içinde genel taramayı engelleyen kuralları kaldırın.',
    sitemap: 'Güncel URL’leri içeren kök sitemap.xml dosyasını yayınlayın.',
    title: 'Kategori ve marka bağlamını anlatan benzersiz bir sayfa başlığı ekleyin.',
    description: 'Ana faydayı özetleyen açıklayıcı bir meta description ekleyin.',
    h1: 'Sayfanın ana konusunu açıkça söyleyen tek bir H1 kullanın.',
    canonical: 'Ana sayfanın tercih edilen adresini canonical etiketiyle belirtin.',
    'organization-schema': 'Marka adı ve resmi URL’yi içeren Organization JSON-LD ekleyin.',
    'product-schema':
      'Ürün sitesiyseniz Product JSON-LD alanlarını görünür ürün verisiyle eşleyin.',
  }

  return recommendations[checkId] || 'Bu sinyali teknik ekip veya içerik sahibiyle doğrulayın.'
}

function formatPercent(value: number | null) {
  return value === null ? '—' : `%${Math.round(value * 10) / 10}`
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function ScoreCard({
  label,
  value,
  note,
  accent,
}: {
  label: string
  value: string
  note: string
  accent?: boolean
}) {
  return (
    <article className={`${styles.scoreCard} ${accent ? styles.scoreAccent : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

export default function AnalyzerClient() {
  const t = getDictionary('tr')
  const workspaceRef = useRef<HTMLElement>(null)
  const manualRef = useRef<HTMLElement>(null)
  const sampleRef = useRef<HTMLElement>(null)
  const benchmarkRef = useRef<HTMLElement>(null)
  const [view, setView] = useState<View>('preflight')
  const [domain, setDomain] = useState('')
  const [country, setCountry] = useState('Türkiye')
  const [language, setLanguage] = useState('tr')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preflight, setPreflight] = useState<PreflightOutput | null>(null)
  const [profile, setProfile] = useState<BrandProfile>(initialProfile)
  const [benchmark, setBenchmark] = useState<VisibilityBenchmarkOutput | null>(null)
  const [manualEntries, setManualEntries] = useState<Record<string, ManualEntryState>>({})
  const [copiedPrompt, setCopiedPrompt] = useState('')
  const [activeProvider, setActiveProvider] = useState<ManualProvider>('openai')

  const prompts = useMemo(() => buildPrompts(profile, 4), [profile])
  const journeyStep = benchmark || view === 'manual-input' ? 3 : preflight ? 2 : 1
  const priorityFindings = preflight?.checks.filter((check) => check.status !== 'pass') || []
  const technicalDimensions = useMemo(
    () =>
      preflight
        ? technicalDimensionDefinitions.map((dimension) => {
            const checks = preflight.checks.filter((check) =>
              dimension.checkIds.includes(check.id as never),
            )
            const passed = checks.filter((check) => check.status === 'pass').length
            return { ...dimension, passed, total: checks.length }
          })
        : [],
    [preflight],
  )
  const providerCompletedCounts = useMemo(
    () =>
      Object.fromEntries(
        manualProviders.map((provider) => [
          provider,
          prompts.filter(
            (prompt) =>
              manualEntries[manualEvidenceKey(provider, prompt.id)]?.responseText.trim().length > 0,
          ).length,
        ]),
      ) as Record<ManualProvider, number>,
    [manualEntries, prompts],
  )

  const scrollToWorkspace = () => {
    window.setTimeout(
      () => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  const scrollToSample = () => {
    window.setTimeout(
      () => sampleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  const scrollToManual = () => {
    window.setTimeout(
      () => manualRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  const scrollToBenchmark = () => {
    window.setTimeout(
      () => benchmarkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  const runPreflight = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/ai-visibility/preflight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, country, language, consent }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Ön analiz tamamlanamadı.')
      const result = payload as PreflightOutput
      setPreflight(result)
      setProfile({
        ...initialProfile,
        brandName: result.suggestedProfile.brandName,
        sector: result.suggestedProfile.sector,
        country,
        language,
      })
      setView('profile')
      scrollToWorkspace()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ön analiz tamamlanamadı.')
    } finally {
      setLoading(false)
    }
  }

  const updateManualEntry = (
    provider: ManualProvider,
    promptId: string,
    field: keyof ManualEntryState,
    value: string,
  ) => {
    const key = manualEvidenceKey(provider, promptId)
    setManualEntries((current) => ({
      ...current,
      [key]: { responseText: '', sourcesText: '', ...current[key], [field]: value },
    }))
  }

  const copyPrompt = async (evidenceKey: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPrompt(evidenceKey)
      window.setTimeout(() => setCopiedPrompt(''), 1600)
    } catch {
      setCopiedPrompt('')
    }
  }

  const manualCompletedCount = Object.values(manualEntries).filter(
    (entry) => entry.responseText.trim().length > 0,
  ).length

  const compileManualBenchmark = () => {
    const result = buildManualBenchmark({
      domain,
      profile: { ...profile, country, language },
      prompts,
      evidence: manualProviders.flatMap((provider) =>
        prompts.map((prompt) => ({
          provider,
          promptId: prompt.id,
          responseText: manualEntries[manualEvidenceKey(provider, prompt.id)]?.responseText || '',
          sourcesText: manualEntries[manualEvidenceKey(provider, prompt.id)]?.sourcesText || '',
        })),
      ),
    })
    setBenchmark(result)
    setView('benchmark')
    scrollToBenchmark()
  }

  return (
    <main className={`${styles.page} page`}>
      <NavBar t={t} />

      <section className={`hero-shell ${styles.heroShell}`}>
        <div className={`wrap ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <a href="/araclar" className="back-link">
              ← Tüm Araçlar
            </a>
            <div className="crumb">ARAÇLAR / AI GÖRÜNÜRLÜĞÜ / BETA</div>
            <h1>
              Yapay zekâ sizi öneriyor mu? <span>Kanıtla ölçün.</span>
            </h1>
            <p className="intro">
              Teknik hazırlığınızı tarayın; dört gerçek kullanıcı sorusunda ChatGPT ve
              Perplexity’nin markanızı nasıl gördüğünü yanıt, sıra ve kaynak kanıtıyla ölçün.
            </p>
            <div className={styles.heroActions}>
              <a className="btn hero-primary" href="#analysis-title">
                Ücretsiz analizi başlat ↓
              </a>
              <button
                className={`btn alt ${styles.heroDemoButton}`}
                type="button"
                onClick={() => {
                  setView('sample')
                  scrollToSample()
                }}
              >
                Örnek raporu incele →
              </button>
            </div>
            <div className={`signals ${styles.signals}`}>
              <span className="tag purple">BETA · 0 TL · API YOK</span>
              <span className="tag">8 KANIT HÜCRESİ</span>
              <span className="tag">VERİ TARAYICIDA KALIR</span>
            </div>
          </div>

          <aside className={`results ${styles.heroConsole}`} aria-label="Analiz kapsamı özeti">
            <div className={styles.heroConsoleHead}>
              <span>VM / VISIBILITY LAB</span>
              <b>CANLI SİSTEM</b>
            </div>
            <div className={styles.heroConsoleScore}>
              <small>ÖLÇÜM MİMARİSİ</small>
              <strong>3</strong>
              <span>KATMAN</span>
            </div>
            <div className={styles.heroConsoleRows}>
              <div>
                <span>01</span>
                <div>
                  <b>Teknik zemin</b>
                  <small>9 doğrulanabilir site sinyali</small>
                </div>
                <em>CANLI</em>
              </div>
              <div>
                <span>02</span>
                <div>
                  <b>Soru matrisi</b>
                  <small>Keşif, güven, kıyas ve karar</small>
                </div>
                <em>4 × 2</em>
              </div>
              <div>
                <span>03</span>
                <div>
                  <b>Kanıt raporu</b>
                  <small>Anılma, sıra, kaynak ve rakip payı</small>
                </div>
                <em>JSON</em>
              </div>
            </div>
            <div className={styles.heroConsoleOutput}>
              <span>ÇIKTI</span>
              <b>Skor + kaynak haritası + öncelik listesi</b>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.journeyBand} aria-label="Analiz adımları">
        <ol className={`wrap ${styles.journeyRail}`}>
          {journeySteps.map((step) => (
            <li
              className={`${styles.journeyStep} ${journeyStep > step.id ? styles.journeyComplete : ''} ${journeyStep === step.id ? styles.journeyActive : ''}`}
              key={step.id}
            >
              <span>{journeyStep > step.id ? '✓' : String(step.id).padStart(2, '0')}</span>
              <div>
                <b>{step.label}</b>
                <small>{step.meta}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.inputBand} ref={workspaceRef} aria-labelledby="analysis-title">
        <div className={`wrap ${styles.inputLayout}`}>
          <div className={styles.inputCopy}>
            <span className="eyebrow">01 / ALAN ADI ÖN ANALİZİ</span>
            <h2 id="analysis-title">Önce sitenin ölçülebilir temelini doğrulayın.</h2>
            <p>
              Ana sayfa, robots.txt, sitemap ve yapılandırılmış veri sinyalleri güvenli bir hızlı
              taramayla kontrol edilir. Giriş gerektiren sayfalara erişilmez.
            </p>
            <ul>
              <li>Ana sayfa teknik sinyali ile AI görünürlüğü ayrı değerlendirilir.</li>
              <li>Her bulgu, kontrol edilen URL ve metinsel durumla gösterilir.</li>
              <li>AI yanıtlarını siz getirirsiniz; araç ücretli sağlayıcı çağrısı yapmaz.</li>
            </ul>
          </div>

          <form className={`panel ${styles.domainForm}`} onSubmit={runPreflight} noValidate>
            <div className={styles.formHeading}>
              <span>VM / AI VISIBILITY</span>
              <b>CANLI ÖN KONTROL</b>
            </div>
            <div className={styles.field}>
              <label htmlFor="ai-domain">Web sitesi</label>
              <small>Herkese açık ana alan adını girin.</small>
              <input
                id="ai-domain"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="ornekmagaza.com"
                aria-describedby={error ? 'ai-domain-error' : undefined}
              />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="ai-country">Hedef ülke</label>
                <select
                  id="ai-country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                >
                  <option>Türkiye</option>
                  <option>Almanya</option>
                  <option>Birleşik Krallık</option>
                  <option>Amerika Birleşik Devletleri</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="ai-language">Analiz dili</label>
                <select
                  id="ai-language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">İngilizce</option>
                </select>
              </div>
            </div>
            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span>
                Bu siteyi analiz etme yetkim olduğunu ve yalnızca herkese açık sayfaların kontrol
                edileceğini onaylıyorum.
              </span>
            </label>
            {error && (
              <p className={styles.error} id="ai-domain-error" role="alert">
                {error}
              </p>
            )}
            <button className="btn hero-primary" type="submit" disabled={loading}>
              {loading ? 'Ön analiz yapılıyor…' : 'Ücretsiz ön analizi başlat →'}
            </button>
            <p className={styles.formNote}>
              Kredi kartı gerekmez. Ön analiz sonucu kalıcı olarak saklanmaz.
            </p>
          </form>
        </div>
      </section>

      {preflight && view !== 'preflight' && (
        <section className={`wrap ${styles.preflightResults}`} aria-live="polite">
          <div className={styles.resultHeading}>
            <div>
              <span className="eyebrow">02 / TEKNİK ÖN ANALİZ</span>
              <h2>Ölçülebilir temel görünür durumda.</h2>
              <p>{preflight.finalUrl}</p>
            </div>
            <button
              className="btn alt"
              type="button"
              onClick={() => downloadJson('veri-mimari-ai-on-analiz.json', preflight)}
            >
              Ön analizi indir ↓
            </button>
          </div>

          <div className={styles.dimensionGrid} aria-label="Teknik sinyal boyutları">
            {technicalDimensions.map((dimension, index) => (
              <article key={dimension.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <b>{dimension.label}</b>
                  <small>{dimension.detail}</small>
                </div>
                <strong>
                  {dimension.passed}/{dimension.total}
                </strong>
                <progress value={dimension.passed} max={dimension.total || 1}>
                  {dimension.passed}/{dimension.total}
                </progress>
              </article>
            ))}
          </div>

          <div className={styles.preflightGrid}>
            <aside className={`results ${styles.readinessPanel}`}>
              <small>ANA SAYFA TEKNİK SİNYAL PUANI</small>
              <strong>{preflight.technicalReadinessScore}/100</strong>
              <h3>{scoreLabel(preflight.technicalReadinessScore)}</h3>
              <p>
                Bu puan ana sayfa, robots.txt ve sitemap üzerindeki hızlı teknik kontroldür; tüm
                sitenin hazırlığını veya AI cevaplarındaki görünürlüğü temsil etmez.
              </p>
              <dl>
                <div>
                  <dt>Yanıt süresi</dt>
                  <dd>{preflight.responseTimeMs} ms</dd>
                </div>
                <div>
                  <dt>Şema türü</dt>
                  <dd>{preflight.page.schemaTypes.length || 0}</dd>
                </div>
                <div>
                  <dt>Kontrol</dt>
                  <dd>{preflight.checks.length}</dd>
                </div>
              </dl>
            </aside>
            <div className={styles.checkList}>
              {preflight.checks.map((check, index) => (
                <article key={check.id} className={styles.checkItem}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{check.label}</h3>
                    <p>{check.detail}</p>
                  </div>
                  <b className={styles[check.status]}>
                    {check.status === 'pass'
                      ? 'GEÇTİ'
                      : check.status === 'fail'
                        ? 'KRİTİK'
                        : 'İNCELE'}
                  </b>
                </article>
              ))}
            </div>
          </div>

          {priorityFindings.length > 0 && (
            <section className={styles.priorityPanel} aria-labelledby="priority-title">
              <div className={styles.priorityHead}>
                <div>
                  <span className="eyebrow">ÖNCELİKLİ İYİLEŞTİRMELER</span>
                  <h3 id="priority-title">Skoru yükseltecek ilk teknik işler.</h3>
                </div>
                <strong>{priorityFindings.length} AÇIK BULGU</strong>
              </div>
              <ol>
                {priorityFindings.slice(0, 3).map((finding, index) => (
                  <li key={finding.id}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <b>{finding.label}</b>
                      <p>{recommendationForCheck(finding.id)}</p>
                    </div>
                    <small>{finding.status === 'fail' ? 'KRİTİK' : 'İNCELE'}</small>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className={`panel ${styles.profilePanel}`}>
            <div className={styles.profileIntro}>
              <span className="eyebrow">03 / MARKA PROFİLİ</span>
              <h2>Manuel ölçümden önce marka bağlamını doğrulayın.</h2>
              <p>
                Marka, kategori ve rakip adları yalnızca yapıştırdığınız yanıtlardaki metinsel
                sinyalleri sınıflandırmak için kullanılır.
              </p>
            </div>
            <div className={styles.profileWorkspace}>
              <div>
                <div className={styles.profileFields}>
                  <div className={styles.field}>
                    <label htmlFor="brand-name">Marka adı</label>
                    <input
                      id="brand-name"
                      value={profile.brandName}
                      onChange={(event) =>
                        setProfile({ ...profile, brandName: event.target.value })
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brand-sector">Sektör / kategori</label>
                    <input
                      id="brand-sector"
                      value={profile.sector}
                      onChange={(event) => setProfile({ ...profile, sector: event.target.value })}
                      placeholder="Örn. doğal kozmetik"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brand-products">Ürün veya hizmetler</label>
                    <input
                      id="brand-products"
                      value={profile.products.join(', ')}
                      onChange={(event) =>
                        setProfile({ ...profile, products: splitList(event.target.value) })
                      }
                      placeholder="Virgülle ayırın"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brand-competitors">Bilinen rakipler</label>
                    <input
                      id="brand-competitors"
                      value={profile.competitors.join(', ')}
                      onChange={(event) =>
                        setProfile({ ...profile, competitors: splitList(event.target.value) })
                      }
                      placeholder="Virgülle ayırın"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brand-audience">Hedef kitle</label>
                    <input
                      id="brand-audience"
                      value={profile.targetAudience}
                      onChange={(event) =>
                        setProfile({ ...profile, targetAudience: event.target.value })
                      }
                      placeholder="Örn. Türkiye'deki KOBİ sahipleri"
                    />
                  </div>
                </div>
                <div className={styles.promptPreview}>
                  <span>MARKASIZ SORU MATRİSİ</span>
                  {profile.sector.trim().length >= 2 ? (
                    <ol>
                      {prompts.map((prompt, index) => (
                        <li key={prompt.id}>
                          <span>{['KEŞİF', 'GÜVEN', 'KIYAS', 'KARAR'][index]}</span>
                          {prompt.text}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>Kategori alanını doldurduğunuzda dört niyet için soru matrisi oluşur.</p>
                  )}
                </div>
              </div>

              <aside className={styles.measurementPlan} aria-label="Ölçüm planı">
                <div className={styles.measurementPlanHead}>
                  <span>VM / ÖLÇÜM PLANI</span>
                  <b>{profile.sector.trim().length >= 2 ? 'HAZIR' : 'BEKLİYOR'}</b>
                </div>
                <div className={styles.measurementMetrics}>
                  <div>
                    <strong>4</strong>
                    <span>KULLANICI NİYETİ</span>
                  </div>
                  <div>
                    <strong>2</strong>
                    <span>ÜCRETSİZ YÜZEY</span>
                  </div>
                  <div>
                    <strong>8</strong>
                    <span>KANIT HÜCRESİ</span>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>HEDEF MARKA</dt>
                    <dd>{profile.brandName || '—'}</dd>
                  </div>
                  <div>
                    <dt>KATEGORİ</dt>
                    <dd>{profile.sector || 'Kategori bekleniyor'}</dd>
                  </div>
                  <div>
                    <dt>RAKİP SETİ</dt>
                    <dd>
                      {profile.competitors.length
                        ? `${profile.competitors.length} marka`
                        : 'İsteğe bağlı'}
                    </dd>
                  </div>
                  <div>
                    <dt>VERİ AKIŞI</dt>
                    <dd>Yalnızca bu tarayıcı</dd>
                  </div>
                </dl>
              </aside>
            </div>
            <div className={styles.betaNotice}>
              <div>
                <b>0 TL / API YOK / YANITI SİZ GETİRİN</b>
                <p>
                  Soruları ücretsiz ChatGPT veya Perplexity web oturumunda çalıştırın. Yanıtları
                  buraya yapıştırın; yalnızca doldurulan kanıtlar puanlanır ve hiçbir ücretli API
                  çağrısı yapılmaz.
                </p>
              </div>
              <div className={styles.benchmarkActions}>
                <button
                  className="btn"
                  type="button"
                  disabled={profile.brandName.trim().length < 2 || profile.sector.trim().length < 2}
                  onClick={() => {
                    setManualEntries({})
                    setBenchmark(null)
                    setActiveProvider('openai')
                    setView('manual-input')
                    scrollToManual()
                  }}
                >
                  Ücretsiz manuel benchmarkı aç →
                </button>
                <button
                  className={`btn alt ${styles.demoButton}`}
                  type="button"
                  onClick={() => {
                    setView('sample')
                    scrollToSample()
                  }}
                >
                  Demo raporu gör
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {preflight && view === 'manual-input' && (
        <section
          className={styles.manualBand}
          aria-labelledby="manual-benchmark-title"
          ref={manualRef}
        >
          <div className="wrap">
            <div className={styles.sampleHeading}>
              <div>
                <span className="tag lime">0 TL · MANUEL KANIT · API YOK</span>
                <h2 id="manual-benchmark-title">Gerçek yanıtı ücretsiz oturumdan getirin.</h2>
                <p>
                  Soruyu kopyalayın, sağlayıcının ücretsiz web arayüzünde çalıştırın ve yanıtı
                  buraya yapıştırın. Kaynak bağlantıları varsa ayrı alana ekleyin.
                </p>
              </div>
              <div className={styles.manualProgress} aria-live="polite">
                <strong>
                  {manualCompletedCount}/{prompts.length * manualProviders.length}
                </strong>
                <span>DOLDURULAN YANIT</span>
              </div>
            </div>

            <ol className={styles.manualSteps}>
              <li>
                <span>01</span> Soruyu kopyala
              </li>
              <li>
                <span>02</span> Ücretsiz oturumda sor
              </li>
              <li>
                <span>03</span> Yanıtı ve varsa kaynakları yapıştır
              </li>
            </ol>

            <div className={styles.providerTabs} role="tablist" aria-label="Kanıt sağlayıcısı">
              {manualProviders.map((provider, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeProvider === provider}
                  aria-controls={`manual-provider-${provider}`}
                  className={activeProvider === provider ? styles.providerTabActive : ''}
                  onClick={() => setActiveProvider(provider)}
                  key={provider}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{providerNames[provider]}</b>
                    <small>ÜCRETSİZ WEB OTURUMU</small>
                  </div>
                  <strong>
                    {providerCompletedCounts[provider]}/{prompts.length}
                  </strong>
                </button>
              ))}
            </div>

            <div className={styles.manualProviders}>
              {[activeProvider].map((provider) => (
                <section
                  className={`panel ${styles.manualProvider}`}
                  id={`manual-provider-${provider}`}
                  role="tabpanel"
                  key={provider}
                >
                  <div className={styles.manualProviderHead}>
                    <div>
                      <span>
                        AKTİF YÜZEY · {providerCompletedCounts[provider]}/{prompts.length} KANIT
                      </span>
                      <h3>{providerNames[provider]}</h3>
                    </div>
                    <a href={providerLinks[provider]} target="_blank" rel="noreferrer">
                      Ücretsiz oturumu aç ↗
                    </a>
                  </div>

                  <div className={styles.manualPromptList}>
                    {prompts.map((prompt, index) => {
                      const key = manualEvidenceKey(provider, prompt.id)
                      const entry = manualEntries[key] || { responseText: '', sourcesText: '' }
                      return (
                        <article className={styles.manualPrompt} key={key}>
                          <div className={styles.manualPromptHead}>
                            <span>
                              SORU {String(index + 1).padStart(2, '0')} ·{' '}
                              {['KEŞİF', 'GÜVEN', 'KIYAS', 'KARAR'][index]}
                            </span>
                            <button type="button" onClick={() => copyPrompt(key, prompt.text)}>
                              {copiedPrompt === key ? 'KOPYALANDI ✓' : 'SORUYU KOPYALA'}
                            </button>
                          </div>
                          <p>{prompt.text}</p>
                          <div className={styles.field}>
                            <label htmlFor={`${provider}-${prompt.id}-response`}>AI yanıtı</label>
                            <textarea
                              id={`${provider}-${prompt.id}-response`}
                              rows={6}
                              value={entry.responseText}
                              onChange={(event) =>
                                updateManualEntry(
                                  provider,
                                  prompt.id,
                                  'responseText',
                                  event.target.value,
                                )
                              }
                              placeholder="Sağlayıcının yanıtını değiştirmeden buraya yapıştırın."
                            />
                          </div>
                          <div className={styles.field}>
                            <label htmlFor={`${provider}-${prompt.id}-sources`}>
                              Kaynak bağlantıları <small>(isteğe bağlı)</small>
                            </label>
                            <textarea
                              id={`${provider}-${prompt.id}-sources`}
                              rows={2}
                              value={entry.sourcesText}
                              onChange={(event) =>
                                updateManualEntry(
                                  provider,
                                  prompt.id,
                                  'sourcesText',
                                  event.target.value,
                                )
                              }
                              placeholder="Her satıra bir https:// bağlantısı"
                            />
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className={styles.manualSubmit}>
              <div>
                <b>Yalnızca doldurulan yanıtlar hesaplanır.</b>
                <p>Yapıştırdığınız metinler sunucuya gönderilmez ve tarayıcı kapanınca silinir.</p>
              </div>
              <button
                className="btn hero-primary"
                type="button"
                disabled={manualCompletedCount === 0}
                onClick={compileManualBenchmark}
              >
                Manuel kanıt raporunu hesapla →
              </button>
            </div>
          </div>
        </section>
      )}

      {benchmark && view === 'benchmark' && (
        <section
          className={styles.benchmarkBand}
          aria-labelledby="benchmark-title"
          ref={benchmarkRef}
        >
          <div className="wrap">
            <div className={styles.sampleHeading}>
              <div>
                <span className="tag lime">
                  MANUEL KANIT ·{' '}
                  {benchmark.status === 'completed'
                    ? 'TAMAMLANDI'
                    : benchmark.status === 'partial'
                      ? 'KISMİ'
                      : 'GEÇERLİ YANIT YOK'}
                </span>
                <h2 id="benchmark-title">Yapıştırdığınız yanıtların görünürlük özeti hazır.</h2>
                <p>
                  {benchmark.promptCount} markasız soru · {benchmark.visibility.validRuns}/
                  {benchmark.plannedRuns} doldurulan manuel yanıt · {profile.country} ·{' '}
                  {profile.language === 'tr' ? 'Türkçe' : 'İngilizce'}
                </p>
              </div>
              <button
                className="btn alt"
                type="button"
                onClick={() => downloadJson('veri-mimari-ai-gorunurluk-manuel.json', benchmark)}
              >
                Manuel kanıtları indir ↓
              </button>
            </div>

            <div className={styles.scoreGrid}>
              <ScoreCard
                label="MANUEL AI VISIBILITY"
                value={benchmark.visibility.validRuns ? `${benchmark.visibility.index}/100` : '—'}
                note="Yapıştırılan yanıtlardaki anılma, sıra, kaynak ve tutarlılık bileşimi"
                accent
              />
              <ScoreCard
                label="ANILMA ORANI"
                value={formatPercent(
                  benchmark.visibility.validRuns ? benchmark.visibility.coverage : null,
                )}
                note={`${benchmark.visibility.mentionCount}/${benchmark.visibility.validRuns} geçerli yanıtta marka anıldı`}
              />
              <ScoreCard
                label="GEÇERLİ YANIT"
                value={`${benchmark.visibility.validRuns}/${benchmark.plannedRuns}`}
                note="Boş bırakılan sağlayıcı ve sorular puan dışı"
              />
              <ScoreCard
                label="SAĞLAYICI TUTARLILIĞI"
                value={formatPercent(
                  benchmark.visibility.validRuns ? benchmark.visibility.consistency : null,
                )}
                note={`%95 anılma aralığı: %${Math.round(benchmark.visibility.wilson95.low)}–%${Math.round(benchmark.visibility.wilson95.high)}`}
              />
            </div>

            <div className={styles.reportGrid}>
              <section className={`panel ${styles.providerPanel}`}>
                <div className={styles.panelTitle}>
                  <span>04 / SAĞLAYICI MATRİSİ</span>
                  <h3>Hangi ücretsiz yüzeylerden kanıt girdiniz?</h3>
                </div>
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>Sağlayıcı</th>
                        <th>Durum</th>
                        <th>Geçerli</th>
                        <th>Anılma</th>
                        <th>Hedef atıf</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchmark.providerAvailability.map((availability) => {
                        const stat = benchmark.byProvider.find(
                          (item) => item.provider === availability.provider,
                        )
                        return (
                          <tr key={availability.provider}>
                            <th>
                              {availability.label}
                              <small className={styles.modelName}>{availability.model}</small>
                            </th>
                            <td>{availability.configured ? 'MANUEL KANIT VAR' : 'YANIT YOK'}</td>
                            <td>{stat?.total ?? 0}</td>
                            <td>{stat?.mentioned ?? 0}</td>
                            <td>{formatPercent(stat?.citationRate ?? null)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className={`panel ${styles.competitorPanel}`}>
                <div className={styles.panelTitle}>
                  <span>05 / RAKİP SİNYALİ</span>
                  <h3>Yanıtlarda kim öne çıktı?</h3>
                </div>
                {benchmark.competitors.some((item) => item.mentions > 0) ? (
                  <ol>
                    {benchmark.competitors
                      .filter((item) => item.mentions > 0)
                      .map((competitor, index) => (
                        <li key={competitor.name}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <b>{competitor.name}</b>
                            <small>{competitor.mentions} geçerli yanıtta anıldı</small>
                          </div>
                          <strong>%{competitor.shareOfVoice}</strong>
                        </li>
                      ))}
                  </ol>
                ) : (
                  <p className={styles.emptyState}>
                    Girilen rakiplerden hiçbiri geçerli sağlayıcı yanıtlarında tespit edilmedi.
                  </p>
                )}
              </section>
            </div>

            <section className={`panel ${styles.sourcePanel}`}>
              <div className={styles.panelTitle}>
                <span>06 / KAYNAK HARİTASI</span>
                <h3>Yapıştırdığınız kaynak alan adları.</h3>
              </div>
              {benchmark.sourceGap.length ? (
                <div className={styles.sourceGrid}>
                  {benchmark.sourceGap.map((source) => (
                    <article key={source.domain}>
                      <span>{source.citations} ATIF</span>
                      <strong>{source.domain}</strong>
                      <small>
                        {source.targetPresent
                          ? 'Marka bu kaynakta desteklendi'
                          : 'Marka desteği tespit edilmedi'}
                      </small>
                    </article>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>Geçerli yanıtlarda kaynak bağlantısı dönmedi.</p>
              )}
            </section>

            <section className={styles.observationList} aria-labelledby="evidence-title">
              <div className={styles.panelTitle}>
                <span>07 / HAM KANIT</span>
                <h3 id="evidence-title">Yapıştırılan her soruyu, yanıtı ve atfı denetleyin.</h3>
              </div>
              {benchmark.observations.map((observation, index) => (
                <details
                  className={styles.evidencePanel}
                  key={`${observation.provider}-${observation.promptId}`}
                >
                  <summary>
                    <span>
                      {String(index + 1).padStart(2, '0')} ·{' '}
                      {providerNames[observation.provider] || observation.provider} ·{' '}
                      {observation.status === 'success'
                        ? observation.mentioned
                          ? 'MARKA ANILDI'
                          : 'MARKA ANILMADI'
                        : observation.status === 'blocked'
                          ? 'HAZIR DEĞİL'
                          : 'YANIT HATASI'}
                    </span>
                    <b>+</b>
                  </summary>
                  <div>
                    <dl>
                      <div>
                        <dt>Model</dt>
                        <dd>{observation.model}</dd>
                      </div>
                      <div>
                        <dt>Soru</dt>
                        <dd>{observation.prompt}</dd>
                      </div>
                      <div>
                        <dt>Rapor zamanı</dt>
                        <dd>{new Date(observation.timestamp).toLocaleString('tr-TR')}</dd>
                      </div>
                      <div>
                        <dt>Süre</dt>
                        <dd>{observation.latencyMs ? `${observation.latencyMs} ms` : '—'}</dd>
                      </div>
                    </dl>
                    <div className={styles.rawEvidence}>
                      {observation.error ? (
                        <p className={styles.inlineError}>{observation.error.message}</p>
                      ) : (
                        <blockquote>{observation.responseText}</blockquote>
                      )}
                      {observation.citations.length > 0 && (
                        <ol>
                          {observation.citations.map((citation) => (
                            <li key={`${citation.ordinal}-${citation.url}`}>
                              <a href={citation.url} target="_blank" rel="noreferrer">
                                {citation.title || citation.domain} ↗
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </section>

            <p className={styles.methodNote}>{benchmark.methodologyNote}</p>
          </div>
        </section>
      )}

      {view === 'sample' && (
        <section className={styles.sampleBand} aria-labelledby="sample-title" ref={sampleRef}>
          <div className="wrap">
            <div className={styles.sampleHeading}>
              <div>
                <span className="tag yellow">DEMO VERİ · GERÇEK TARAMA DEĞİL</span>
                <h2 id="sample-title">Kanıtlı rapor böyle okunur.</h2>
                <p>
                  Bu örnek, dokümantasyondaki veri sözleşmesini gösterir; girdiğiniz alan adına ait
                  sonuç değildir.
                </p>
              </div>
              <button
                className="btn alt"
                type="button"
                onClick={() =>
                  downloadJson('veri-mimari-ai-gorunurluk-demo.json', sampleVisibilityReport)
                }
              >
                Demo JSON indir ↓
              </button>
            </div>

            <div className={styles.scoreGrid}>
              <ScoreCard
                label="AI VISIBILITY INDEX"
                value={`${sampleVisibilityReport.visibilityIndex}/100`}
                note={`${sampleVisibilityReport.mentions}/${sampleVisibilityReport.validRuns} geçerli cevapta anılma`}
                accent
              />
              <ScoreCard
                label="AI READINESS SCORE"
                value={`${sampleVisibilityReport.readinessScore}/100`}
                note="Teknik hazırlık görünürlükten ayrıdır"
              />
              <ScoreCard
                label="CONFIDENCE LEVEL"
                value={`${sampleVisibilityReport.confidenceLevel}/100`}
                note={`${sampleVisibilityReport.validRuns}/${sampleVisibilityReport.plannedRuns} geçerli çalışma`}
              />
              <ScoreCard
                label="SHARE OF VOICE"
                value={`%${sampleVisibilityReport.shareOfVoice}`}
                note={`%95 aralık: ${sampleVisibilityReport.mentionInterval}`}
              />
            </div>

            <div className={styles.reportGrid}>
              <section className={`panel ${styles.providerPanel}`}>
                <div className={styles.panelTitle}>
                  <span>04 / SAĞLAYICI MATRİSİ</span>
                  <h3>Beş yüzeyi aynı koşulda karşılaştırın.</h3>
                </div>
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>Sağlayıcı</th>
                        <th>Geçerli</th>
                        <th>Anılma</th>
                        <th>Atıf</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleVisibilityReport.providers.map((provider) => (
                        <tr key={provider.name}>
                          <th>{provider.name}</th>
                          <td>{provider.runs}</td>
                          <td>{provider.mentions}</td>
                          <td>{provider.citations}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section className={`panel ${styles.competitorPanel}`}>
                <div className={styles.panelTitle}>
                  <span>05 / RAKİP PAYI</span>
                  <h3>Kimin, kaç cevapta kazandığını görün.</h3>
                </div>
                <ol>
                  {sampleVisibilityReport.competitors.map((competitor, index) => (
                    <li key={competitor.name}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <b>{competitor.name}</b>
                        <small>
                          {competitor.mentions} anılma · ort. sıra {competitor.position}
                        </small>
                      </div>
                      <strong>%{competitor.share}</strong>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <section className={styles.actionsPanel}>
              <div className={styles.panelTitle}>
                <span>06 / 7–30–90 GÜN</span>
                <h3>Skoru değil, sıradaki işi görün.</h3>
              </div>
              <div>
                {sampleVisibilityReport.actions.map((action, index) => (
                  <article key={action.phase}>
                    <span>
                      {String(index + 1).padStart(2, '0')} / {action.phase}
                    </span>
                    <h4>{action.title}</h4>
                    <p>{action.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <details className={styles.evidencePanel}>
              <summary>
                Ham kanıt örneğini aç <span>+</span>
              </summary>
              <div>
                <dl>
                  <div>
                    <dt>Sağlayıcı</dt>
                    <dd>{sampleVisibilityReport.evidence.provider}</dd>
                  </div>
                  <div>
                    <dt>Model</dt>
                    <dd>{sampleVisibilityReport.evidence.model}</dd>
                  </div>
                  <div>
                    <dt>Prompt</dt>
                    <dd>{sampleVisibilityReport.evidence.prompt}</dd>
                  </div>
                  <div>
                    <dt>Atıf</dt>
                    <dd>{sampleVisibilityReport.evidence.citation}</dd>
                  </div>
                </dl>
                <blockquote>{sampleVisibilityReport.evidence.excerpt}</blockquote>
              </div>
            </details>
          </div>
        </section>
      )}

      <section className="section-band band-dark">
        <div className={`wrap section ${styles.methodology}`}>
          <div>
            <span className="eyebrow">AÇIK YÖNTEM / SIFIR API MALİYETİ</span>
            <h2>Gerçek yanıt var. Otomatik fatura yok.</h2>
          </div>
          <div className={styles.methodCards}>
            <article>
              <span>01</span>
              <h3>Manuel AI görünürlüğü</h3>
              <p>
                Ücretsiz web oturumlarından yapıştırdığınız cevaplarda anılma, sıra, kaynak ve
                sağlayıcı tutarlılığını hesaplar.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Teknik hazırlık</h3>
              <p>
                Taranabilirlik, varlık açıklığı, yapılandırılmış veri ve cevaplanabilir içeriği
                değerlendirir.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Güven seviyesi</h3>
              <p>
                Doldurulan yanıt sayısı ve eklediğiniz kaynak kapsamını açıkça gösterir; boş
                yüzeyleri sonuç gibi sunmaz.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.faq}`}>
        <span className="eyebrow">SIK SORULANLAR</span>
        <h2>Ölçümün sınırlarını baştan bilin.</h2>
        <div>
          {aiVisibilityFaqs.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="AI Görünürlük ve Teknik Hazırlık Ön Analizi" />
    </main>
  )
}

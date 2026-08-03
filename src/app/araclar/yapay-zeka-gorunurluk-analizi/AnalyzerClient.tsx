'use client'

import { FormEvent, useMemo, useRef, useState } from 'react'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import { buildPrompts } from '@/features/ai-visibility/prompts'
import { sampleVisibilityReport } from '@/features/ai-visibility/sample-report'
import type { BrandProfile, PreflightOutput } from '@/features/ai-visibility/types'
import { getDictionary } from '@/lib/i18n'
import { aiVisibilityFaqs } from './faq'
import styles from './page.module.css'

type View = 'preflight' | 'profile' | 'sample'

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
  if (score >= 80) return 'Yüksek hazırlık'
  if (score >= 60) return 'İyi temel'
  if (score >= 40) return 'Kısmi hazırlık'
  return 'Kritik temel eksikler'
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
  const sampleRef = useRef<HTMLElement>(null)
  const [view, setView] = useState<View>('preflight')
  const [domain, setDomain] = useState('')
  const [country, setCountry] = useState('Türkiye')
  const [language, setLanguage] = useState('tr')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preflight, setPreflight] = useState<PreflightOutput | null>(null)
  const [profile, setProfile] = useState<BrandProfile>(initialProfile)

  const prompts = useMemo(() => buildPrompts(profile, 4), [profile])

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

  const runPreflight = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/ai-visibility/preflight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, consent }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Ön analiz tamamlanamadı.')
      const result = payload as PreflightOutput
      setPreflight(result)
      setProfile({
        ...initialProfile,
        brandName: result.suggestedProfile.brandName,
        sector: result.suggestedProfile.sector,
        country: result.suggestedProfile.country || country,
        language: result.suggestedProfile.language || language,
      })
      setView('profile')
      scrollToWorkspace()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ön analiz tamamlanamadı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={`${styles.page} page`}>
      <NavBar t={t} />

      <section className={`wrap hero single ${styles.hero}`}>
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / AI GÖRÜNÜRLÜĞÜ / BETA</div>
        <h1>Yapay Zekâ Görünürlük Analizi</h1>
        <p className="intro">
          Markanızın AI cevaplarında ne ölçüde anıldığını, hangi rakiplerin öne çıktığını ve
          sitenizin teknik hazırlığını tek bir opak skora saklamadan inceleyin.
        </p>
        <div className={`signals ${styles.signals}`}>
          <span className="tag purple">BETA · KANITLI METODOLOJİ</span>
          <span className="tag">TEKNİK ÖN ANALİZ CANLI</span>
          <span className="tag">LİSTELEME GARANTİSİ DEĞİLDİR</span>
        </div>
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
              <li>Görünürlük ve teknik hazırlık ayrı değerlendirilir.</li>
              <li>Her bulgu, kontrol edilen URL ve metinsel durumla gösterilir.</li>
              <li>AI sağlayıcı benchmarkı gerçek API anahtarları olmadan taklit edilmez.</li>
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
              Kredi kartı veya üyelik gerekmez. Ön analiz sonucu kalıcı olarak saklanmaz.
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

          <div className={styles.preflightGrid}>
            <aside className={`results ${styles.readinessPanel}`}>
              <small>TEKNİK HAZIRLIK / HIZLI ÖRNEKLEM</small>
              <strong>{preflight.technicalReadinessScore}/100</strong>
              <h3>{scoreLabel(preflight.technicalReadinessScore)}</h3>
              <p>
                Bu puan yalnızca hızlı teknik ön kontroldür; AI cevaplarındaki gerçekleşen
                görünürlüğü ölçmez.
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

          <div className={`panel ${styles.profilePanel}`}>
            <div className={styles.profileIntro}>
              <span className="eyebrow">03 / MARKA PROFİLİ</span>
              <h2>Taramadan önce marka bağlamını siz doğrulayın.</h2>
              <p>
                Yanlış marka veya kategori tespiti pahalı ve yanıltıcı sağlayıcı çağrılarına
                dönüşmemeli.
              </p>
            </div>
            <div className={styles.profileFields}>
              <div className={styles.field}>
                <label htmlFor="brand-name">Marka adı</label>
                <input
                  id="brand-name"
                  value={profile.brandName}
                  onChange={(event) => setProfile({ ...profile, brandName: event.target.value })}
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
              <span>ÖRNEK MARKASIZ SORU SETİ</span>
              {profile.sector.trim().length >= 2 ? (
                <ol>
                  {prompts.map((prompt) => (
                    <li key={prompt.id}>{prompt.text}</li>
                  ))}
                </ol>
              ) : (
                <p>Kategori alanını doldurduğunuzda markasız örnek sorular burada oluşur.</p>
              )}
            </div>
            <div className={styles.betaNotice}>
              <div>
                <b>ÇOKLU SAĞLAYICI TARAMASI HENÜZ KAPALI</b>
                <p>
                  Canlı AI benchmarkı için sağlayıcı anahtarları, günlük maliyet limiti, kullanıcı
                  hesabı ve arka plan iş kuyruğu yapılandırılmalıdır.
                </p>
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setView('sample')
                  scrollToSample()
                }}
              >
                Demo rapor formatını incele →
              </button>
            </div>
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
            <span className="eyebrow">AÇIK YÖNTEM / İKİ AYRI EKSEN</span>
            <h2>Tek bir sihirli skor yok.</h2>
          </div>
          <div className={styles.methodCards}>
            <article>
              <span>01</span>
              <h3>AI görünürlüğü</h3>
              <p>Ölçülen cevaplarda anılma, sıra, citation ve sağlayıcı tutarlılığını hesaplar.</p>
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
                Örneklem, sağlayıcı başarısı, tekrar kararlılığı ve citation kapsamını açıkça
                gösterir.
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
      <FeedbackWidget toolName="Yapay Zekâ Görünürlük Analizi" />
    </main>
  )
}

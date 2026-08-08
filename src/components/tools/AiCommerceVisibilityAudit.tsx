'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import Footer from '@/components/landing/Footer'
import NavBar from '@/components/landing/NavBar'
import {
  aiCommerceCategoryLabels,
  aiCommerceReadinessChecks,
  calculateAiCommerceReadiness,
  type AiCommerceCategory,
  type AiCommerceReadinessStatus,
} from '@/lib/ai-commerce-readiness'
import { getDictionary } from '@/lib/i18n'

const sampleSelection = [
  'indexable-pages',
  'crawler-access',
  'internal-links-sitemap',
  'product-offer-schema',
  'stable-identifiers',
  'decision-content',
  'merchant-feed',
  'feed-freshness-monitoring',
  'organization-policies',
  'validation-monitoring',
  'evidence-content',
]

const statusCopy: Record<
  AiCommerceReadinessStatus,
  { label: string; explanation: string; tone: 'positive' | 'warning' | 'negative' }
> = {
  blocked: {
    label: 'Kritik yayın kapısı açık',
    explanation:
      'Toplam puan yüksek olsa bile kritik veri veya erişim açığı görünürlüğü riske atıyor.',
    tone: 'negative',
  },
  early: {
    label: 'Temel var, kapsam erken aşamada',
    explanation: 'Kritik kapılar kapalı; ürün ve ölçüm katmanlarında önemli eksikler devam ediyor.',
    tone: 'warning',
  },
  developing: {
    label: 'Gelişen hazırlık',
    explanation: 'Temel akış çalışıyor; puanı büyütmek için öncelik listesini sırayla kapatın.',
    tone: 'warning',
  },
  strong: {
    label: 'Güçlü hazırlık',
    explanation:
      'Kritik kapılar kapalı ve dört veri katmanında yüksek hazırlık seviyesi korunuyor.',
    tone: 'positive',
  },
}

const categoryOrder = Object.keys(aiCommerceCategoryLabels) as AiCommerceCategory[]

function AuditContent() {
  const t = getDictionary('tr')
  const searchParams = useSearchParams()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const checks = searchParams.get('checks')
    if (!checks) return
    const allowed = new Set(aiCommerceReadinessChecks.map((check) => check.id))
    setSelectedIds(checks.split(',').filter((id) => allowed.has(id)))
  }, [searchParams])

  const result = calculateAiCommerceReadiness(selectedIds)
  const status = statusCopy[result.status]

  const toggle = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const copyShareUrl = async () => {
    const params = new URLSearchParams()
    if (selectedIds.length > 0) params.set('checks', selectedIds.join(','))
    const query = params.toString()
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}${query ? `?${query}` : ''}`,
    )
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single ai-visibility-hero">
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / AI COMMERCE &amp; KEŞİF / 08</div>
        <h1>AI Alışveriş Görünürlük Denetimi</h1>
        <p className="intro">
          Ürün sayfalarınızın, yapılandırılmış verinizin ve merchant feed’inizin yapay zekâ destekli
          arama ve alışveriş yüzeylerine hazırlığını 100 puanlık açık yöntemle ölçün.
        </p>
        <div className="signals ai-visibility-signals">
          <span className="tag live">CANLI · 4–6 DK · ÜCRETSİZ</span>
          <span className="tag">SIRALAMA GARANTİSİ DEĞİLDİR</span>
          <span className="tag">VERİNİZ SAKLANMAZ</span>
          <button className="btn alt ai-visibility-share" type="button" onClick={copyShareUrl}>
            {copied ? '✓ Denetim bağlantısı kopyalandı' : 'Denetimi paylaş'}
          </button>
        </div>
      </section>

      <section
        className="wrap ai-visibility-workspace"
        aria-label="AI alışveriş görünürlük denetimi"
      >
        <div className="ai-visibility-checks">
          <div className="ai-visibility-toolbar">
            <div>
              <span className="eyebrow">01 / MEVCUT DURUM</span>
              <h2>Yalnız bugün doğrulayabildiklerinizi işaretleyin.</h2>
            </div>
            <div>
              <button type="button" onClick={() => setSelectedIds(sampleSelection)}>
                Örnek denetim
              </button>
              <button type="button" onClick={() => setSelectedIds([])}>
                Temizle
              </button>
            </div>
          </div>

          {categoryOrder.map((category, categoryIndex) => {
            const checks = aiCommerceReadinessChecks.filter((check) => check.category === category)
            return (
              <section className="panel ai-visibility-group" key={category}>
                <div className="ai-visibility-group-head">
                  <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{aiCommerceCategoryLabels[category]}</p>
                    <small>
                      {checks.reduce((total, check) => total + check.weight, 0)} PUANLIK KATMAN
                    </small>
                  </div>
                </div>
                <div className="ai-visibility-check-list">
                  {checks.map((check) => {
                    const checked = selectedIds.includes(check.id)
                    return (
                      <label
                        className={`ai-visibility-check ${checked ? 'is-checked' : ''}`}
                        key={check.id}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(check.id)}
                        />
                        <span className="ai-visibility-box" aria-hidden="true">
                          {checked ? '✓' : ''}
                        </span>
                        <span className="ai-visibility-check-copy">
                          <strong>{check.title}</strong>
                          <small>{check.description}</small>
                        </span>
                        <span className="ai-visibility-weight">
                          {check.critical && <b>KRİTİK</b>}+{check.weight}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <aside className="results ai-visibility-results" aria-live="polite">
          <small>HAZIRLIK PUANI</small>
          <span className="big">{result.score}/100</span>
          <div className={`ai-visibility-status status-${status.tone}`}>
            <strong>{status.label}</strong>
            <p>{status.explanation}</p>
          </div>
          <div className="metric-row">
            <span>Tamamlanan kontrol</span>
            <b>
              {result.completedCount}/{result.totalCount}
            </b>
          </div>
          <div className="metric-row">
            <span>Kritik açık</span>
            <b>{result.criticalGaps.length}</b>
          </div>
          <div className="ai-visibility-category-scores">
            {result.categories.map((category) => (
              <div key={category.category}>
                <span>
                  {aiCommerceCategoryLabels[category.category]}
                  <b>%{category.score}</b>
                </span>
                <progress value={category.score} max="100">
                  %{category.score}
                </progress>
              </div>
            ))}
          </div>
          <p className="fine">
            Bu puan Veri Mimarı hazırlık modelidir; Google veya OpenAI uygunluk, indeksleme ya da
            sıralama garantisi vermez.
          </p>
        </aside>
      </section>

      <section className="section-band band-paper ai-visibility-priorities">
        <div className="wrap section">
          <div className="head">
            <div>
              <span className="eyebrow">02 / DÜZELTME SIRASI</span>
              <h2>En yüksek riski önce kapatın.</h2>
            </div>
            <p>
              Kritik yayın kapıları toplam puandan önce gelir. Ardından ağırlığı en yüksek veri
              açıklarına geçin.
            </p>
          </div>

          {result.priorities.length === 0 ? (
            <div className="panel ai-visibility-complete">
              <span className="tag live">TÜM KONTROLLER TAMAM</span>
              <h3>Hazırlık modeli 100 puana ulaştı.</h3>
              <p>
                Canlı platform teşhislerini ve ürün verisi eşleşmesini düzenli izlemeye devam edin.
              </p>
            </div>
          ) : (
            <ol className="ai-visibility-priority-list">
              {result.priorities.slice(0, 6).map((priority, index) => (
                <li key={priority.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <div>
                      <h3>{priority.title}</h3>
                      {priority.critical && <span className="tag">KRİTİK YAYIN KAPISI</span>}
                    </div>
                    <p>{priority.action}</p>
                  </div>
                  <strong>+{priority.weight} PUAN</strong>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="section-band band-dark">
        <div className="wrap section ai-visibility-next-step">
          <div>
            <span className="eyebrow">03 / VERİYE İNİN</span>
            <h2>Hazırlık puanını gerçek feed hatalarıyla doğrulayın.</h2>
            <p>
              Önce yöntemi okuyun; ardından CSV ürün feed’inizi tarayıcıda analiz ederek kimlik,
              fiyat, stok ve satıcı alanlarındaki somut sorunları bulun.
            </p>
          </div>
          <div>
            <a className="btn hero-primary" href="/rehberler/ai-alisveris-ajanlarina-hazirlik">
              Hazırlık rehberini aç →
            </a>
            <a className="btn alt" href="/araclar/urun-feed-saglik-kontrolu">
              Feed’i analiz et →
            </a>
          </div>
        </div>
      </section>

      <section className="wrap ai-visibility-sources" aria-labelledby="ai-visibility-sources-title">
        <span className="eyebrow">YÖNTEM KAYNAKLARI · 2 AĞUSTOS 2026</span>
        <h2 id="ai-visibility-sources-title">AI için sihirli etiket yok; sağlam veri hattı var.</h2>
        <p>
          Model;{' '}
          <a
            href="https://developers.google.com/search/docs/appearance/ai-features"
            target="_blank"
            rel="noreferrer"
          >
            Google AI özellikleri rehberi
          </a>
          ,{' '}
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data/merchant-listing"
            target="_blank"
            rel="noreferrer"
          >
            Merchant Listing yapılandırılmış veri gereksinimleri
          </a>{' '}
          ve{' '}
          <a
            href="https://developers.openai.com/commerce/specs/file-upload/products"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI Agentic Commerce ürün feed şeması
          </a>{' '}
          üzerinden oluşturuldu. Platform teşhis ekranları nihai doğrulama kaynağıdır.
        </p>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="AI Alışveriş Görünürlük Denetimi" />
    </main>
  )
}

export default function AiCommerceVisibilityAudit() {
  return (
    <Suspense fallback={<div className="wrap loading-state">Denetim hazırlanıyor…</div>}>
      <AuditContent />
    </Suspense>
  )
}

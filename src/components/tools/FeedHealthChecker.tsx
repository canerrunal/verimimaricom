'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { trackDownload, trackEvent } from '@/lib/analytics'
import { getDictionary } from '@/lib/i18n'
import {
  analyzeProductFeed,
  buildIssueReportCsv,
  type FeedAnalysis,
  type FeedIssueSeverity,
} from '@/lib/feed-health'

const sampleFeed = `item_id,title,description,url,image_url,price,availability,brand,gtin,group_id,is_eligible_search,is_eligible_checkout,seller_name,seller_url,seller_privacy_policy,seller_tos,return_policy,target_countries,store_country
AYK-001-S42,Patika Koşu Ayakkabısı Siyah 42,"Su geçirmez saya, destekli taban ve kaymaz dış yüzeyle günlük patika koşuları için tasarlandı.",https://magaza.example.com/ayk-001-s42,https://magaza.example.com/images/ayk-001-s42.jpg,2499.90 TRY,in_stock,Patika,8691234567890,AYK-001,true,false,Örnek Mağaza,https://magaza.example.com,https://magaza.example.com/gizlilik,https://magaza.example.com/kosullar,https://magaza.example.com/iade,TR,TR
AYK-001-M41,Patika Koşu Ayakkabısı Mavi 41,"Nefes alan file yüzey, darbe emici orta taban ve ıslak zeminde tutuş sağlayan dış taban.",https://magaza.example.com/ayk-001-m41,https://magaza.example.com/images/ayk-001-m41.jpg,2299.90 TRY,in_stock,Patika,8691234567891,AYK-001,true,false,Örnek Mağaza,https://magaza.example.com,https://magaza.example.com/gizlilik,https://magaza.example.com/kosullar,https://magaza.example.com/iade,TR,TR
TSH-204-BEY-M,ORGANİK PAMUK TİŞÖRT BEYAZ M,"Organik pamuklu kısa kollu tişört.",https://magaza.example.com/tsh-204-bey-m,https://magaza.example.com/images/tsh-204-bey-m.jpg,899.90 TRY,out_of_stock,Örnek,,TSH-204,true,false,Örnek Mağaza,https://magaza.example.com,https://magaza.example.com/gizlilik,https://magaza.example.com/kosullar,https://magaza.example.com/iade,TR,TR
KUP-050,Seramik Filtre Kahve Kupası 350 ml,"Isıyı koruyan çift cidarlı seramik gövde ve rahat tutuş sağlayan geniş kulp.",https://magaza.example.com/kup-050,https://magaza.example.com/images/kup-050.jpg,649.90,in stock,Atölye,8691234567892,,true,false,Örnek Mağaza,https://magaza.example.com,https://magaza.example.com/gizlilik,https://magaza.example.com/kosullar,https://magaza.example.com/iade,TR,TR`

const severityCopy: Record<FeedIssueSeverity, string> = {
  critical: 'KRİTİK',
  warning: 'UYARI',
  improvement: 'İYİLEŞTİRME',
}

function scoreCopy(score: number) {
  if (score >= 90) return 'Yayına yakın'
  if (score >= 75) return 'Düzeltmeyle hazır'
  if (score >= 50) return 'Riskli'
  return 'Yayın kapısını geçmez'
}

export default function FeedHealthChecker() {
  const t = getDictionary('tr')
  const [feed, setFeed] = useState('')
  const [analysis, setAnalysis] = useState<FeedAnalysis | null>(null)
  const [error, setError] = useState('')

  const runAnalysis = () => {
    try {
      setAnalysis(analyzeProductFeed(feed))
      trackEvent('tool_calculation', { tool: 'feed_health_checker' })
      setError('')
      window.requestAnimationFrame(() => {
        document
          .getElementById('feed-results')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (caught) {
      setAnalysis(null)
      setError(caught instanceof Error ? caught.message : 'Feed analiz edilemedi.')
    }
  }

  const loadSample = () => {
    setFeed(sampleFeed)
    setAnalysis(null)
    setError('')
  }

  const clearFeed = () => {
    setFeed('')
    setAnalysis(null)
    setError('')
  }

  const downloadReport = () => {
    if (!analysis) return
    const blob = new Blob([`\uFEFF${buildIssueReportCsv(analysis)}`], {
      type: 'text/csv;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'veri-mimari-feed-saglik-raporu.csv'
    link.click()
    trackDownload(link.download, 'feed_health_checker')
    URL.revokeObjectURL(url)
  }

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single feed-health-hero">
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / AI &amp; OTOMASYON / 05</div>
        <h1>Ürün Feed Sağlık Kontrolü</h1>
        <p className="intro">
          CSV ürün verinizde kritik alan, kimlik, fiyat, stok, URL ve içerik sorunlarını tarayın;
          Google Merchant Center ve OpenAI ürün feed’i için zorunlu alan hazırlığını görün.
        </p>
        <div className="signals feed-health-signals">
          <span className="tag live">CANLI · TARAYICIDA ÇALIŞIR · ÜCRETSİZ</span>
          <span className="tag">VERİNİZ SUNUCUYA GÖNDERİLMEZ</span>
          <span className="tag">CSV · TSV · NOKTALI VİRGÜL</span>
        </div>
      </section>

      <section className="wrap feed-health-workspace" aria-labelledby="feed-input-title">
        <div className="panel feed-health-input-panel">
          <div className="feed-health-panel-head">
            <div>
              <span className="eyebrow">01 / FEED’İ EKLEYİN</span>
              <h2 id="feed-input-title">Başlık satırıyla birlikte CSV yapıştırın.</h2>
            </div>
            <span className="tag">İLK 5 SATIR RAPORLANIR</span>
          </div>
          <div className="form-group">
            <label htmlFor="feed-data">Ürün feed verisi</label>
            <textarea
              id="feed-data"
              className="feed-health-textarea"
              value={feed}
              onChange={(event) => setFeed(event.target.value)}
              placeholder="item_id,title,description,url,image_url,price,availability,brand…"
              spellCheck={false}
              aria-describedby="feed-data-help"
            />
            <p id="feed-data-help" className="feed-health-help">
              En fazla 1.000 satır önerilir. Analiz yalnız bu sekmede yapılır; veri yüklenmez veya
              saklanmaz.
            </p>
          </div>
          {error && (
            <p className="feed-health-error" role="alert">
              <strong>Analiz başlayamadı:</strong> {error}
            </p>
          )}
          <div className="feed-health-actions">
            <button className="btn hero-primary" type="button" onClick={runAnalysis}>
              Feed’i analiz et →
            </button>
            <button className="btn alt" type="button" onClick={loadSample}>
              Örnek veriyi yükle
            </button>
            <button className="feed-health-clear" type="button" onClick={clearFeed}>
              Temizle
            </button>
          </div>
        </div>

        <aside className="results feed-health-method" aria-label="Puanlama yöntemi">
          <small>SAĞLIK PUANI YÖNTEMİ</small>
          <span className="big">60/30/10</span>
          <p className="lead">
            Zorunlu alan doluluğu %60, biçim ve tekillik doğrulaması %30, içerik zenginliği %10
            ağırlık taşır.
          </p>
          <div className="metric-row">
            <span>Çekirdek alanlar</span>
            <b>%60</b>
          </div>
          <div className="metric-row">
            <span>Fiyat, stok, URL, kimlik</span>
            <b>%30</b>
          </div>
          <div className="metric-row">
            <span>Başlık, açıklama, GTIN/MPN</span>
            <b>%10</b>
          </div>
          <p className="fine">
            Bu puan Veri Mimarı ön denetim modelidir; platform kabulü veya ürün gösterimi garantisi
            değildir.
          </p>
        </aside>
      </section>

      {analysis && (
        <section
          id="feed-results"
          className="section-band band-paper feed-health-results"
          aria-live="polite"
        >
          <div className="wrap section">
            <div className="head">
              <div>
                <span className="eyebrow">02 / SONUÇ VE DÜZELTME SIRASI</span>
                <h2>Önce yayını engelleyenleri düzeltin.</h2>
              </div>
              <button className="btn alt" type="button" onClick={downloadReport}>
                Sorun raporunu indir ↓
              </button>
            </div>

            <div className="feed-health-score-grid">
              <div className="feed-health-score-card">
                <span>GENEL SAĞLIK PUANI</span>
                <strong>{analysis.score}</strong>
                <b>{scoreCopy(analysis.score)}</b>
              </div>
              <div className="metric">
                <small>ÜRÜN SATIRI</small>
                <b>{analysis.rowCount.toLocaleString('tr-TR')}</b>
              </div>
              <div className="metric">
                <small>ZORUNLU ALAN DOLULUĞU</small>
                <b>%{analysis.requiredCompleteness}</b>
              </div>
              <div className="metric">
                <small>KRİTİK BULGU</small>
                <b>{analysis.criticalCount}</b>
              </div>
              <div className="metric">
                <small>UYARI + İYİLEŞTİRME</small>
                <b>{analysis.warningCount + analysis.improvementCount}</b>
              </div>
            </div>

            <div className="feed-health-platforms" aria-label="Platform zorunlu alan hazırlığı">
              {analysis.platforms.map((platform) => (
                <article key={platform.name} className="panel feed-health-platform-card">
                  <span className="eyebrow">ZORUNLU ALAN HAZIRLIĞI</span>
                  <div>
                    <h3>{platform.name}</h3>
                    <strong>%{platform.score}</strong>
                  </div>
                  <p>{platform.note}</p>
                  <p>
                    <b>Eksik görülenler:</b>{' '}
                    {platform.missingFields.length > 0
                      ? platform.missingFields.join(', ')
                      : 'Temel zorunlu alan eksiği bulunmadı.'}
                  </p>
                </article>
              ))}
            </div>

            <div className="feed-health-issue-list">
              {analysis.issues.length === 0 ? (
                <div className="panel feed-health-success">
                  <span className="tag live">KRİTİK BULGU YOK</span>
                  <h3>Çekirdek feed kontrolleri temiz.</h3>
                  <p>
                    Canlı URL erişimi, sayfa-fiyat-stok eşleşmesi, görsel çözünürlüğü ve hesap
                    politikalarını platform teşhis ekranında ayrıca doğrulayın.
                  </p>
                </div>
              ) : (
                analysis.issues.map((issue, index) => (
                  <article
                    key={issue.id}
                    className={`feed-health-issue severity-${issue.severity}`}
                  >
                    <div className="feed-health-issue-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <span className="tag">{severityCopy[issue.severity]}</span>
                      <h3>{issue.title}</h3>
                      <p>{issue.detail}</p>
                      <p className="feed-health-fix">
                        <strong>Düzeltme:</strong> {issue.fix}
                      </p>
                    </div>
                    <div className="feed-health-issue-meta">
                      <strong>{issue.count}</strong>
                      <span>ETKİLENEN SATIR</span>
                      {issue.sampleRows.length > 0 && (
                        <small>Örnek: {issue.sampleRows.join(', ')}</small>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>

            <details className="feed-health-detected">
              <summary>Algılanan alan eşlemesini göster</summary>
              <div>
                {analysis.detectedFields.map((item) => (
                  <span key={item.field}>
                    <b>{item.field}</b>
                    <i>{item.header || '—'}</i>
                  </span>
                ))}
              </div>
            </details>
          </div>
        </section>
      )}

      <section className="section-band band-dark">
        <div className="wrap section feed-health-next-step">
          <div>
            <span className="eyebrow">03 / SONRAKİ ADIM</span>
            <h2>Feed’i düzeltin, sonra sayfayla eşleştirin.</h2>
            <p>
              CSV biçimi temiz olsa bile fiyat, stok ve politika bilgisinin ürün sayfası ve checkout
              ile aynı kalması gerekir. Hazırlık rehberi bu veri hattını adım adım kurar.
            </p>
          </div>
          <a className="btn hero-primary" href="/rehberler/ai-alisveris-ajanlarina-hazirlik">
            Feed hazırlık rehberini aç →
          </a>
        </div>
      </section>

      <section className="wrap feed-health-sources" aria-labelledby="feed-sources-title">
        <span className="eyebrow">YÖNTEM KAYNAKLARI · 1 AĞUSTOS 2026</span>
        <h2 id="feed-sources-title">Platform gereksinimleri değişebilir.</h2>
        <p>
          Alan adları ve zorunluluklar{' '}
          <a
            href="https://support.google.com/merchants/answer/7052112"
            target="_blank"
            rel="noreferrer"
          >
            Google Merchant Center ürün veri spesifikasyonu
          </a>{' '}
          ile{' '}
          <a
            href="https://developers.openai.com/commerce/specs/file-upload/products"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI Agentic Commerce ürün feed şeması
          </a>{' '}
          üzerinden kontrol edildi. Canlı yayından önce güncel resmî teşhis ve uygunluk ekranını
          kullanın.
        </p>
      </section>

      <Footer t={t} />
      <FeedbackWidget toolName="Ürün Feed Sağlık Kontrolü" />
    </main>
  )
}

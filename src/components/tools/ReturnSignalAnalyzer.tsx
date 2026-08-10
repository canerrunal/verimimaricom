'use client'

import { useState } from 'react'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import FeedbackWidget from '@/components/common/FeedbackWidget'
import { trackDownload, trackEvent } from '@/lib/analytics'
import { getDictionary } from '@/lib/i18n'
import { analyzeReturnSignals, type ReturnSignalAnalysis } from '@/lib/return-signal'

const sampleSignals = `sku,reason,text,rating,country
AYK-001,beden,42 numara dar geldi; ölçü tablosu yeterli değil,2,DE
AYK-001,kalite,Dikiş sökük ve malzeme hasarlı,1,DE
KUP-050,teslimat,Kargo gecikti ve paket hasarlı,2,FR
TSH-204,,Renk görselden farklı ve açıklama eksik,3,NL
TSH-204,,Çok memnun kaldım hızlı geldi,5,NL`

function scoreCopy(score: number) {
  if (score >= 90) return 'Aksiyon kuyruğu net'
  if (score >= 70) return 'İyi sınıflandırıldı'
  if (score >= 40) return 'Veri sözlüğünü güçlendirin'
  return 'Yorum veya neden alanı eksik'
}

function downloadReport(analysis: ReturnSignalAnalysis) {
  const rows = [
    ['Satır', 'SKU', 'Kategori', 'Sinyal', 'Puan', 'Ülke'],
    ...analysis.rows.map((row) => [
      row.row,
      row.sku,
      row.category,
      row.signal,
      row.rating ?? '',
      row.country,
    ]),
  ]
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
  link.download = 'veri-mimari-iade-sinyali-raporu.csv'
  link.click()
  trackDownload(link.download, 'return_signal_analyzer')
  URL.revokeObjectURL(link.href)
}

export default function ReturnSignalAnalyzer() {
  const t = getDictionary('tr')
  const [input, setInput] = useState('')
  const [analysis, setAnalysis] = useState<ReturnSignalAnalysis | null>(null)
  const [error, setError] = useState('')

  const runAnalysis = () => {
    try {
      setAnalysis(analyzeReturnSignals(input))
      trackEvent('tool_calculation', { tool: 'return_signal_analyzer' })
      setError('')
      window.requestAnimationFrame(() =>
        document
          .getElementById('return-signal-results')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
    } catch (caught) {
      setAnalysis(null)
      setError(caught instanceof Error ? caught.message : 'Sinyal analizi yapılamadı.')
    }
  }

  const loadSample = () => {
    setInput(sampleSignals)
    setAnalysis(null)
    setError('')
  }

  const clear = () => {
    setInput('')
    setAnalysis(null)
    setError('')
  }

  return (
    <main className="page">
      <NavBar t={t} />
      <section className="wrap hero single return-signal-hero">
        <a href="/araclar" className="back-link">
          ← Tüm Araçlar
        </a>
        <div className="crumb">ARAÇLAR / AI &amp; OTOMASYON / 09</div>
        <h1>İade Nedeni ve Yorum Sinyali Analizi</h1>
        <p className="intro">
          CSV yorum ve iade kayıtlarını tarayıcıda sınıflandırın; ürün, içerik, kalite, teslimat ve
          destek aksiyonlarını önem sırasına koyun.
        </p>
        <div className="signals return-signal-signals">
          <span className="tag live">CANLI · TARAYICIDA ÇALIŞIR · ÜCRETSİZ</span>
          <span className="tag">VERİNİZ SUNUCUYA GÖNDERİLMEZ</span>
          <span className="tag">CSV · YORUM + İADE NEDENİ</span>
        </div>
      </section>

      <section className="wrap return-signal-workspace" aria-labelledby="return-signal-input-title">
        <div className="panel return-signal-input-panel">
          <div className="return-signal-panel-head">
            <div>
              <span className="eyebrow">01 / SİNYALLERİ EKLEYİN</span>
              <h2 id="return-signal-input-title">Başlık satırıyla birlikte CSV yapıştırın.</h2>
            </div>
            <span className="tag">METİN YERELDE İŞLENİR</span>
          </div>
          <div className="form-group">
            <label htmlFor="return-signal-data">Yorum ve iade verisi</label>
            <textarea
              id="return-signal-data"
              className="return-signal-textarea"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="sku,reason,text,rating,country…"
              spellCheck={false}
              aria-describedby="return-signal-help"
            />
            <p id="return-signal-help" className="return-signal-help">
              `text`, `review`, `yorum` veya `reason` alanlarından biri yeterlidir. En fazla 5.000
              satır önerilir.
            </p>
          </div>
          {error && (
            <p className="return-signal-error" role="alert">
              <strong>Analiz başlayamadı:</strong> {error}
            </p>
          )}
          <div className="return-signal-actions">
            <button className="btn hero-primary" type="button" onClick={runAnalysis}>
              Sinyalleri analiz et →
            </button>
            <button className="btn alt" type="button" onClick={loadSample}>
              Örnek veriyi yükle
            </button>
            <button className="return-signal-clear" type="button" onClick={clear}>
              Temizle
            </button>
          </div>
        </div>
        <aside className="results return-signal-method" aria-label="Sınıflandırma yöntemi">
          <small>AKSİYON NETLİĞİ YÖNTEMİ</small>
          <span className="big">5 + 2</span>
          <p className="lead">
            Beş operasyon sınıfı; olumlu ve sınıflandırılamayan sinyallerden ayrılır.
          </p>
          <div className="metric-row">
            <span>Ürün / içerik / kalite</span>
            <b>3</b>
          </div>
          <div className="metric-row">
            <span>Teslimat / destek</span>
            <b>2</b>
          </div>
          <div className="metric-row">
            <span>Olumlu / belirsiz</span>
            <b>2</b>
          </div>
          <p className="fine">
            Bu araç duygu modeli veya nedensel iade tahmini değildir; düzenli bir aksiyon kuyruğu
            için ön sınıflandırmadır.
          </p>
        </aside>
      </section>

      {analysis && (
        <section
          id="return-signal-results"
          className="section-band band-paper return-signal-results"
          aria-live="polite"
        >
          <div className="wrap section">
            <div className="head">
              <div>
                <span className="eyebrow">02 / SONUÇ VE ÖNCELİK</span>
                <h2>En çok tekrar eden nedeni önce kapatın.</h2>
              </div>
              <button className="btn alt" type="button" onClick={() => downloadReport(analysis)}>
                Raporu indir ↓
              </button>
            </div>
            <div className="return-signal-score-grid">
              <div className="return-signal-score-card">
                <span>AKSİYON NETLİĞİ</span>
                <strong>{analysis.actionabilityScore}</strong>
                <b>{scoreCopy(analysis.actionabilityScore)}</b>
              </div>
              <div className="metric">
                <small>KAYIT</small>
                <b>{analysis.rowCount}</b>
              </div>
              <div className="metric">
                <small>İŞARETLİ SORUN</small>
                <b>{analysis.issueCount}</b>
              </div>
              <div className="metric">
                <small>OLUMLU SİNYAL</small>
                <b>{analysis.positiveCount}</b>
              </div>
              <div className="metric">
                <small>BELİRSİZ</small>
                <b>{analysis.unknownCount}</b>
              </div>
            </div>
            <div className="return-signal-category-grid">
              {analysis.categories.map((category) => (
                <div
                  key={category.category}
                  className={`return-signal-category category-${category.category}`}
                >
                  <span>{category.label}</span>
                  <strong>{category.count}</strong>
                </div>
              ))}
            </div>
            <div className="return-signal-priorities">
              {analysis.priorities.length === 0 ? (
                <div className="panel return-signal-success">
                  <span className="tag live">AKSİYON SİNYALİ YOK</span>
                  <h3>Bu veri setinde operasyon sınıfı bulunamadı.</h3>
                  <p>
                    İade nedeni veya yorum metni ekleyin; belirsiz kayıtları müşteri hizmetleri
                    sözlüğüyle eşleyin.
                  </p>
                </div>
              ) : (
                analysis.priorities.map((priority, index) => (
                  <article key={priority.category} className="return-signal-priority">
                    <div className="return-signal-priority-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <span className="tag">{priority.label}</span>
                      <h3>
                        {priority.count} kayıt · sorunların %{priority.share}’i
                      </h3>
                      <p>{priority.action}</p>
                      <small>Kanıt örneği: “{priority.evidence}”</small>
                    </div>
                  </article>
                ))
              )}
            </div>
            <div
              className="return-signal-table-wrap"
              tabIndex={0}
              role="region"
              aria-label="Sınıflandırılan yorumlar"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Kategori</th>
                    <th>Sinyal</th>
                    <th>Puan</th>
                    <th>Ülke</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.rows.slice(0, 20).map((row) => (
                    <tr key={`${row.row}-${row.sku}`}>
                      <th scope="row">{row.sku}</th>
                      <td>{categoryLabel(row.category)}</td>
                      <td>{row.signal}</td>
                      <td>{row.rating ?? '—'}</td>
                      <td>{row.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section-band band-dark">
        <div className="wrap section return-signal-next-step">
          <div>
            <span className="eyebrow">03 / SONRAKİ ADIM</span>
            <h2>Sinyali ürüne ve katkıya bağlayın.</h2>
            <p>
              İade sınıfını ürün sayfası, teslimat vaadi, destek SLA’sı ve reklam sonrası katkı ile
              aynı SKU/ülke kimliğinde izleyin.
            </p>
          </div>
          <div>
            <a className="btn hero-primary" href="/analizler/urun-sayfasi-iade-katkisi">
              İade katkısı vakasını aç →
            </a>
            <a href="/rehberler/e-ihracat-yerellestirme-teslimat-guveni">
              Teslimat güven rehberini oku →
            </a>
          </div>
        </div>
      </section>
      <section className="wrap return-signal-sources">
        <span className="eyebrow">YÖNTEM NOTU</span>
        <h2>Ön sınıflandırma, son karar değil.</h2>
        <p>
          Sinyaller tarayıcıda anahtar kelime ve açık neden alanıyla gruplanır. İçerik, iade ve
          müşteri hizmetleri ekipleri örnekleri doğrulayıp kendi sözlüğünü oluşturmalıdır.
        </p>
      </section>
      <Footer t={t} />
      <FeedbackWidget toolName="İade Nedeni ve Yorum Sinyali Analizi" />
    </main>
  )
}

function categoryLabel(category: ReturnSignalAnalysis['rows'][number]['category']) {
  return {
    'product-fit': 'Ürün uyumu / beden',
    quality: 'Kalite / hasar',
    delivery: 'Teslimat / kargo',
    service: 'Destek / iade süreci',
    expectation: 'Beklenti / içerik',
    positive: 'Olumlu sinyal',
    unknown: 'Sınıflandırılamadı',
  }[category]
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CollaborationPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    problem: '',
    goal: '',
    timeline: '',
    budget: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Teşekkürler! Projenizi değerlendirmeye aldık.')
  }

  return (
    <main className="page" aria-label="İş Birliği">
      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">İŞ BİRLİĞİ</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Birlikte ne geliştirebiliriz?
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            E-ticaret analitiği, dijital ürün geliştirme, yapay zekâ entegrasyonu ve özel araç projeleri için çalışma kapsamınızı paylaşın.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Uygun İş Birlikleri
              </h3>
              <ul style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 2 }}>
                <li>E-ticaret analiz aracı geliştirme</li>
                <li>Dashboard ve raporlama sistemi</li>
                <li>Yapay zekâ destekli iş akışı</li>
                <li>İç araç veya mikro SaaS</li>
                <li>Veri entegrasyonu</li>
                <li>Ürün prototipi</li>
                <li>İçerik veya eğitim ortaklığı</li>
              </ul>
            </div>

            <div className="tool-sm">
              <div className="indicator yellow"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Uygun Olmayan Talepler
              </h3>
              <ul style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 2 }}>
                <li>Garantili satış artışı iddiası</li>
                <li>Manipülatif veya yanıltıcı reklam sistemleri</li>
                <li>İzinsiz veri toplama</li>
                <li>Spam otomasyonları</li>
                <li>Sahte yorum veya sahte sosyal kanıt</li>
                <li>Kaynağı belirsiz kişisel veri kullanımı</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="form-group">
                <label htmlFor="name">Ad Soyad</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Marka veya Şirket</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="projectType">Proje Türü</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"' }}
                >
                  <option value="">Seçin</option>
                  <option value="e-ticaret-analiz">E-ticaret Analiz Aracı</option>
                  <option value="dashboard">Dashboard ve Raporlama</option>
                  <option value="ai-automation">Yapay Zekâ Entegrasyonu</option>
                  <option value="micro-saas">Mikro SaaS</option>
                  <option value="veri-entegrasyonu">Veri Entegrasyonu</option>
                  <option value="prototip">Ürün Prototipi</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="problem">Mevcut Problem</label>
              <textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={3}
                placeholder="Çözmek istediğiniz problem nedir?"
                style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"', resize: 'vertical' as const }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="goal">Hedeflenen Sonuç</label>
              <textarea
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                rows={3}
                placeholder="Bu proje sonunda ne başarmak istiyorsunuz?"
                style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"', resize: 'vertical' as const }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="form-group">
                <label htmlFor="timeline">Zamanlama</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"' }}
                >
                  <option value="">Seçin</option>
                  <option value="acil">Acil (1-2 hafta)</option>
                  <option value="yakinda">Yakında (1-3 ay)</option>
                  <option value="planlama">Planlama aşaması (3+ ay)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Tahmini Bütçe Aralığı</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"' }}
                >
                  <option value="">Seçin</option>
                  <option value="dusuk">Düşük</option>
                  <option value="orta">Orta</option>
                  <option value="yuksek">Yüksek</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 24 }}>
              <label htmlFor="notes">Ek Notlar</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Eklemek istediğiniz başka bir şey var mı?"
                style={{ border: '1px solid var(--line)', borderRadius: 5, background: '#fff', padding: '10px 12px', font: '12px "DM Mono"', resize: 'vertical' as const }}
              />
            </div>

            <button type="submit" className="btn">Projeyi Değerlendirmeye Gönder ↗</button>
          </form>
        </div>
      </section>
    </main>
  )
}

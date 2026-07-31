// @ts-nocheck
'use client'

import { useState } from 'react'
import TrackLink from '@/components/analytics/TrackLink'

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
    // TODO: Send to collaboration API
    alert('Teşekkürler! Projenizi değerlendirmeye aldık.')
  }

  return (
    <main className="page" aria-label="İş Birliği">
      <section className="section">
        <span className="eyebrow">İş Birliği</span>
        <h1>Birlikte ne geliştirebiliriz?</h1>
        <p className="section-description">
          E-ticaret analitiği, dijital ürün geliştirme, yapay zekâ entegrasyonu ve özel araç projeleri için çalışma kapsamınızı paylaşın.
        </p>

        <div className="card-grid-2">
          <article className="card">
            <h3>Uygun İş Birlikleri</h3>
            <ul className="feature-list">
              <li>E-ticaret analiz aracı geliştirme</li>
              <li>Dashboard ve raporlama sistemi</li>
              <li>Yapay zekâ destekli iş akışı</li>
              <li>İç araç veya mikro SaaS</li>
              <li>Veri entegrasyonu</li>
              <li>Ürün prototipi</li>
              <li>İçerik veya eğitim ortaklığı</li>
            </ul>
          </article>

          <article className="card">
            <h3>Uygun Olmayan Talepler</h3>
            <ul className="feature-list">
              <li>Garantili satış artışı iddiası</li>
              <li>Manipülatif veya yanıltıcı reklam sistemleri</li>
              <li>İzinsiz veri toplama</li>
              <li>Spam otomasyonları</li>
              <li>Sahte yorum veya sahte sosyal kanıt</li>
              <li>Kaynağı belirsiz kişisel veri kullanımı</li>
            </ul>
          </article>
        </div>

        <form className="collab-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Marka veya Şirket</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="projectType">Proje Türü</label>
              <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}>
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

          <div className="form-group">
            <label htmlFor="problem">Mevcut Problem</label>
            <textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} rows={3} placeholder="Çözmek istediğiniz problem nedir?" />
          </div>

          <div className="form-group">
            <label htmlFor="goal">Hedeflenen Sonuç</label>
            <textarea id="goal" name="goal" value={formData.goal} onChange={handleChange} rows={3} placeholder="Bu proje sonunda ne başarmak istiyorsunuz?" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="timeline">Zamanlama</label>
              <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}>
                <option value="">Seçin</option>
                <option value="acil">Acil (1-2 hafta)</option>
                <option value="yakinda">Yakında (1-3 ay)</option>
                <option value="planlama">Planlama aşaması (3+ ay)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="budget">Tahmini Bütçe Aralığı</label>
              <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                <option value="">Seçin</option>
                <option value="dusuk">Düşük</option>
                <option value="orta">Orta</option>
                <option value="yuksek">Yüksek</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Ek Notlar</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={2} placeholder="Eklemek istediğiniz başka bir şey var mı?" />
          </div>

          <button type="submit" className="cta-link cta-primary">Projeyi Değerlendirmeye Gönder</button>
        </form>
      </section>
    </main>
  )
}

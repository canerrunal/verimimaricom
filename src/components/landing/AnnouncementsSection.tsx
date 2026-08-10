'use client'

import { useState } from 'react'
import { announcements, sortAnnouncements } from '@/lib/announcements'

export default function AnnouncementsSection() {
  const orderedAnnouncements = sortAnnouncements(announcements)
  const [activeSlug, setActiveSlug] = useState(orderedAnnouncements[0]?.slug ?? '')
  const activeIndex = Math.max(
    0,
    orderedAnnouncements.findIndex((item) => item.slug === activeSlug),
  )
  const announcement = orderedAnnouncements[activeIndex]

  if (!announcement) return null

  return (
    <section className="section-band announcement-home-section">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">/ 02 · DUYURULAR</span>
            <h2>Sektörel gelişmeleri karar notuna çevirin.</h2>
          </div>
          <div className="announcement-head-actions">
            <p>Tarife, platform ve operasyon değişikliklerini kârlılık etkisiyle okuyun.</p>
            <a className="announcement-all-link" href="/duyurular">
              Tüm duyuruları gör ↗
            </a>
          </div>
        </div>

        <a className="announcement-feature" href={`/duyurular/${announcement.slug}`}>
          <div className="announcement-feature-copy">
            <span className="tag yellow">{announcement.category}</span>
            <span className="eyebrow">{announcement.eyebrow}</span>
            <h3>{announcement.title}</h3>
            <p>{announcement.excerpt}</p>
            <span className="link">Duyuruyu incele →</span>
          </div>
          <div className="announcement-feature-image">
            <img src={announcement.image} alt={announcement.imageAlt} />
          </div>
        </a>

        <div className="announcement-carousel" aria-label="Duyuru seçici">
          <div className="announcement-carousel-head">
            <span className="eyebrow">DİĞER DUYURULAR</span>
            <span className="announcement-carousel-count">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(orderedAnnouncements.length).padStart(2, '0')}
            </span>
          </div>
          <div className="announcement-carousel-track" role="group" aria-label="Duyuru seçimi">
            {orderedAnnouncements.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={`announcement-carousel-item ${item.slug === announcement.slug ? 'active' : ''}`}
                aria-pressed={item.slug === announcement.slug}
                onClick={() => setActiveSlug(item.slug)}
              >
                <span className="announcement-carousel-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="announcement-carousel-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

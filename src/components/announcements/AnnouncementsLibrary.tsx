'use client'

import { useMemo, useState } from 'react'
import type { Announcement, AnnouncementSortOrder } from '@/lib/announcements'
import { sortAnnouncements } from '@/lib/announcements'

type Props = {
  announcements: Announcement[]
}

export default function AnnouncementsLibrary({ announcements }: Props) {
  const categories = useMemo(
    () => [
      'Tümü',
      ...Array.from(new Set(announcements.map((announcement) => announcement.category))),
    ],
    [announcements],
  )
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [sortOrder, setSortOrder] = useState<AnnouncementSortOrder>('newest')

  const visibleAnnouncements = useMemo(() => {
    const filtered =
      activeCategory === 'Tümü'
        ? announcements
        : announcements.filter((announcement) => announcement.category === activeCategory)

    return sortAnnouncements(filtered, sortOrder)
  }, [activeCategory, announcements, sortOrder])

  return (
    <>
      <div className="announcement-toolbar" aria-label="Duyuru filtreleri ve sıralama">
        <div className="filters" aria-label="Duyuru kategorileri">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter ${activeCategory === category ? 'active' : ''}`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="announcement-sort">
          <span>SIRALA</span>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as AnnouncementSortOrder)}
          >
            <option value="newest">En yeni eklenen</option>
            <option value="updated">Son güncellenen</option>
            <option value="oldest">İlk eklenen</option>
          </select>
        </label>
      </div>

      <p className="announcement-result-count">
        {visibleAnnouncements.length} duyuru gösteriliyor
        {activeCategory !== 'Tümü' ? ` · ${activeCategory}` : ''}
      </p>

      {visibleAnnouncements.length > 0 ? (
        <div className="announcement-grid">
          {visibleAnnouncements.map((announcement) => (
            <a
              key={announcement.slug}
              className="announcement-card"
              href={`/duyurular/${announcement.slug}`}
            >
              <div className="announcement-card-image">
                <img src={announcement.image} alt={announcement.imageAlt} />
              </div>
              <div className="announcement-card-copy">
                <div className="announcement-card-meta">
                  <span className="tag yellow">{announcement.category}</span>
                  <span>{announcement.readingTime}</span>
                </div>
                <span className="eyebrow">{announcement.eyebrow}</span>
                <h2>{announcement.title}</h2>
                <p>{announcement.excerpt}</p>
                <span className="link">Duyuruyu incele →</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="announcement-empty">
          <span className="eyebrow">SONUÇ YOK</span>
          <p>Bu kategoride henüz duyuru bulunmuyor.</p>
        </div>
      )}
    </>
  )
}

import { announcements, sortAnnouncements } from '@/lib/announcements'

export default function AnnouncementsSection() {
  const announcement = sortAnnouncements(announcements)[0]

  return (
    <section className="section-band announcement-home-section">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">/ 02 · DUYURULAR</span>
            <h2>Sektörel gelişmeleri karar notuna çevirin.</h2>
          </div>
          <p>Tarife, platform ve operasyon değişikliklerini kârlılık etkisiyle okuyun.</p>
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
      </div>
    </section>
  )
}

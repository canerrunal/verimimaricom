import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import AnnouncementsLibrary from '@/components/announcements/AnnouncementsLibrary'
import { announcements } from '@/lib/announcements'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Duyurular',
  description:
    'E-ticaret, pazaryeri ve operasyon gündemindeki önemli gelişmeleri kârlılık etkisiyle okuyun.',
  alternates: { canonical: '/duyurular' },
}

export default function AnnouncementsPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="wrap hero single announcement-index-hero">
        <div>
          <div className="crumb">
            <i aria-hidden="true" /> DUYURULAR / SEKTÖREL GÜNDEM
          </div>
          <h1>
            Gündemi görün. <span className="accent">Maliyeti hesaplayın.</span>
          </h1>
          <p className="intro">
            Kargo tarifeleri, pazaryeri değişiklikleri ve operasyon gelişmelerini doğrudan sipariş
            ekonomisine bağlayan kısa karar notları.
          </p>
        </div>
      </section>

      <section className="section-band band-paper">
        <div className="wrap section announcement-index">
          <div className="announcement-index-head">
            <span className="eyebrow">
              GÜNCEL / {String(announcements.length).padStart(2, '0')}
            </span>
            <p>
              Yeni bir gelişme çıktığında, etkisini yalnızca yüzdeyle değil sipariş başına katkıyla
              okuyun.
            </p>
          </div>
          <AnnouncementsLibrary announcements={announcements} />
        </div>
      </section>

      <Footer t={t} />
    </main>
  )
}

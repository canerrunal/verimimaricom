import { describe, expect, it } from 'vitest'
import type { Announcement } from '@/lib/announcements'
import {
  renderAnnouncementSocialSvg,
  SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT,
  SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH,
} from '@/lib/social-announcement-image'

const announcement: Announcement = {
  slug: 'ornek-duyuru',
  addedOrder: 1,
  eyebrow: 'VERİ MİMARI / TEST',
  title: 'Önemli bir değişiklik: karar verisi artık daha görünür.',
  excerpt: 'Yeni editoryal sosyal medya görseli güçlü başlık ve açık veri hiyerarşisi kullanır.',
  category: 'AI ve Teknoloji',
  publishedAt: '2026-08-27',
  updatedAt: '2026-08-27',
  readingTime: '4 dk',
  image: '/ornek.svg',
  imageAlt: 'Örnek duyuru görseli',
  source: 'Veri Mimarı',
  sourceNote: 'Test kaynağı',
  stats: [
    { label: 'Birinci metrik', value: '%24', detail: 'Örnek açıklama' },
    { label: 'İkinci metrik', value: '3×', detail: 'Örnek açıklama' },
  ],
  sections: [],
}

describe('sosyal duyuru görseli', () => {
  it('editoryal 4:5 tuvali ve kanonik marka adresini üretir', () => {
    const svg = renderAnnouncementSocialSvg(announcement).toString('utf8')

    expect(svg).toContain(`width="${SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH}"`)
    expect(svg).toContain(`height="${SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT}"`)
    expect(svg).toContain('verimimari.com')
    expect(svg).not.toContain('VERIMIMARI.COM')
    expect(svg).toContain('font-weight: 900')
    expect(svg).toContain('fill="#D6FF63"')
  })
})

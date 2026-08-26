import sharp from 'sharp'
import { getAnnouncement } from '@/lib/announcements'
import {
  renderAnnouncementSocialSvg,
  SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT,
  SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH,
} from '@/lib/social-announcement-image'

export const runtime = 'nodejs'
export const revalidate = 86400

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const announcement = getAnnouncement(slug)

  if (!announcement) {
    return new Response('Duyuru bulunamadı.', { status: 404 })
  }

  const image = await sharp(renderAnnouncementSocialSvg(announcement))
    .resize(SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH, SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toBuffer()

  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
    },
  })
}

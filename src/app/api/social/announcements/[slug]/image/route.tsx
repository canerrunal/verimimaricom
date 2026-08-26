import { ImageResponse } from 'next/og'
import sharp from 'sharp'
import { getAnnouncement } from '@/lib/announcements'
import {
  SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT,
  SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH,
} from '@/lib/social-announcement-image'

export const runtime = 'nodejs'
export const revalidate = 86400

type RouteContext = { params: Promise<{ slug: string }> }

function wrapText(value: string, maxCharacters: number, maxLines: number) {
  const words = value.trim().split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxCharacters || !current) {
      current = candidate
      continue
    }
    lines.push(current)
    current = word
    if (lines.length === maxLines - 1) break
  }

  if (current && lines.length < maxLines) lines.push(current)
  const consumed = lines.join(' ').split(/\s+/).length
  if (consumed < words.length && lines.length) {
    lines[lines.length - 1] = `${lines.at(-1)?.replace(/[.,;:!?]?$/, '')}…`
  }
  return lines
}

const font = 'Arial, sans-serif'

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const announcement = getAnnouncement(slug)

  if (!announcement) return new Response('Duyuru bulunamadı.', { status: 404 })

  const titleLines = wrapText(announcement.title, 24, 4)
  const excerptLines = wrapText(announcement.excerpt, 58, 3)
  const stats = announcement.stats.slice(0, 2)
  const titleTop = 300
  const excerptTop = titleTop + titleLines.length * 83 + 38
  const panelTop = Math.max(782, excerptTop + excerptLines.length * 39 + 46)

  const rendered = new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#F6F4ED',
        color: '#101411',
        fontFamily: font,
      }}
    >
      {Array.from({ length: 24 }, (_, index) => (
        <div
          key={`v-${index}`}
          style={{
            position: 'absolute',
            left: index * 48,
            top: 0,
            width: 1,
            height: 1350,
            background: '#C9CCC3',
            opacity: 0.42,
          }}
        />
      ))}
      {Array.from({ length: 30 }, (_, index) => (
        <div
          key={`h-${index}`}
          style={{
            position: 'absolute',
            left: 0,
            top: index * 48,
            width: 1080,
            height: 1,
            background: '#C9CCC3',
            opacity: 0.42,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          left: 72,
          top: 72,
          width: 952,
          height: 1222,
          borderRight: '8px solid #101411',
          borderBottom: '8px solid #101411',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 64,
          width: 952,
          height: 1222,
          background: '#FFFEF9',
          border: '2px solid #101411',
          borderRadius: 18,
        }}
      />

      <svg
        viewBox="0 0 52 52"
        width="65"
        height="65"
        style={{ position: 'absolute', left: 84, top: 82 }}
      >
        <path fill="#101411" d="M5 15h7l10 18V12l4-4v34l-4 4z" />
        <path fill="#101411" d="m28 8 3 3v35l-3-4z" />
        <path
          fill="#101411"
          d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"
        />
        <path fill="#D6FF63" stroke="#101411" d="m42 35 4-4v5l-4 4z" />
      </svg>
      <div style={{ position: 'absolute', left: 158, top: 91, fontSize: 28, fontWeight: 800 }}>
        veri/mimarı
      </div>
      <div
        style={{
          position: 'absolute',
          left: 158,
          top: 128,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        BAĞIMSIZ VERİ REHBERİ
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 190,
          display: 'flex',
          alignItems: 'center',
          height: 44,
          padding: '0 24px',
          background: '#D6FF63',
          border: '2px solid #101411',
          borderRadius: 22,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 1.2,
        }}
      >
        {announcement.category.toLocaleUpperCase('tr-TR')}
      </div>

      {titleLines.map((line, index) => (
        <div
          key={`title-${index}`}
          style={{
            position: 'absolute',
            left: 84,
            top: titleTop + index * 83,
            width: 912,
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: -3.8,
          }}
        >
          {line}
        </div>
      ))}

      {excerptLines.map((line, index) => (
        <div
          key={`excerpt-${index}`}
          style={{
            position: 'absolute',
            left: 84,
            top: excerptTop + index * 39,
            width: 912,
            fontSize: 30,
            fontWeight: 500,
            color: '#5F655F',
          }}
        >
          {line}
        </div>
      ))}

      {stats.map((stat, index) => {
        const left = 84 + index * 458
        return (
          <div key={stat.label} style={{ display: 'flex' }}>
            <div
              style={{
                position: 'absolute',
                left: left + 6,
                top: panelTop + 6,
                width: 434,
                height: 190,
                borderRight: '6px solid #101411',
                borderBottom: '6px solid #101411',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left,
                top: panelTop,
                display: 'flex',
                flexDirection: 'column',
                width: 434,
                height: 190,
                padding: '24px 26px',
                background: '#FFFEF9',
                border: '2px solid #101411',
                borderRadius: 14,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1.2, color: '#5F655F' }}>
                {stat.label}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: stat.value.length > 11 ? 43 : 54,
                  lineHeight: 0.95,
                  fontWeight: 900,
                }}
              >
                {stat.value}
              </div>
              <div style={{ marginTop: 12, fontSize: 20, fontWeight: 500, color: '#5F655F' }}>
                {wrapText(stat.detail, 31, 1)[0] ?? ''}
              </div>
            </div>
          </div>
        )
      })}

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1128,
          width: 912,
          height: 2,
          background: '#101411',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1155,
          display: 'flex',
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {announcement.publishedAt} · {announcement.readingTime.toLocaleUpperCase('tr-TR')}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1210,
          display: 'flex',
          alignItems: 'center',
          height: 52,
          padding: '0 28px',
          background: '#101411',
          color: '#FFFEF9',
          borderRadius: 26,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        Duyurunun tamamını oku →
      </div>
      <div
        style={{
          position: 'absolute',
          right: 84,
          top: 1226,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 1.2,
        }}
      >
        VERIMIMARI.COM
      </div>
    </div>,
    { width: SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH, height: SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT },
  )

  const png = Buffer.from(await rendered.arrayBuffer())
  const image = await sharp(png).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer()

  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
    },
  })
}

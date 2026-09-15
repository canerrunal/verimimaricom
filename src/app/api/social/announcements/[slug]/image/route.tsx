import { readFileSync } from 'node:fs'
import { join } from 'node:path'
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

function readFont(name: string) {
  const font = readFileSync(join(process.cwd(), 'public/fonts', name))
  return font.buffer.slice(font.byteOffset, font.byteOffset + font.byteLength) as ArrayBuffer
}

const regularFont = readFont('inter-regular.ttf')
const semiboldFont = readFont('inter-semibold.ttf')
const boldFont = readFont('inter-bold.ttf')
const blackFont = readFont('inter-black.ttf')

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

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const announcement = getAnnouncement(slug)
  if (!announcement) return new Response('Duyuru bulunamadı.', { status: 404 })

  const titleLines = wrapText(announcement.title, 23, 4)
  const excerptLines = wrapText(announcement.excerpt, 58, 2)
  const sourceLines = wrapText(announcement.source, 58, 2)
  const stats = announcement.stats.slice(0, 3)
  const longestTitleLine = Math.max(...titleLines.map((line) => line.length))
  const titleSize = longestTitleLine >= 21 ? 74 : titleLines.length > 3 ? 82 : 92
  const titleLineHeight = titleSize <= 74 ? 74 : titleLines.length > 3 ? 78 : 88
  const titleTop = 270
  const excerptTop = titleTop + titleLines.length * titleLineHeight + 30
  const insightTop = Math.max(774, excerptTop + excerptLines.length * 38 + 34)
  const statsTop = insightTop + 132
  const statWidth = 896 / Math.max(stats.length, 1)
  const insight = wrapText(announcement.nextStep?.eyebrow ?? announcement.eyebrow, 42, 1)[0]

  const rendered = new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#F6F4ED',
        color: '#101411',
        fontFamily: 'VM Inter',
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
            opacity: 0.17,
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
            opacity: 0.17,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 58,
          width: 974,
          height: 1244,
          background: '#101411',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 48,
          top: 48,
          display: 'flex',
          width: 974,
          height: 1244,
          background: '#FFFEF9',
          border: '3px solid #101411',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 48,
          top: 48,
          width: 14,
          height: 1244,
          background: '#D6FF63',
        }}
      />

      <svg
        viewBox="0 0 52 52"
        width="62"
        height="62"
        style={{ position: 'absolute', left: 84, top: 75 }}
      >
        <path fill="#101411" d="M5 15h7l10 18V12l4-4v34l-4 4z" />
        <path fill="#101411" d="m28 8 3 3v35l-3-4z" />
        <path
          fill="#101411"
          d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"
        />
        <path fill="#D6FF63" stroke="#101411" d="m42 35 4-4v5l-4 4z" />
      </svg>
      <div style={{ position: 'absolute', left: 150, top: 82, fontSize: 27, fontWeight: 900 }}>
        veri/mimarı
      </div>
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 117,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 2.2,
        }}
      >
        BAĞIMSIZ VERİ REHBERİ
      </div>
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 88,
          display: 'flex',
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        DUYURU / {announcement.publishedAt}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 174,
          width: 896,
          height: 3,
          background: '#101411',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 216,
          display: 'flex',
          alignItems: 'center',
          height: 44,
          padding: '0 24px',
          background: '#D6FF63',
          border: '2px solid #101411',
          borderRadius: 22,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1.8,
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
            top: titleTop + index * titleLineHeight,
            width: 896,
            fontSize: titleSize,
            lineHeight: 0.95,
            fontWeight: 900,
            letterSpacing: -4.2,
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
            top: excerptTop + index * 38,
            width: 896,
            fontSize: 28,
            fontWeight: 600,
            color: '#3F453F',
          }}
        >
          {line}
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: insightTop,
          display: 'flex',
          alignItems: 'center',
          width: 896,
          height: 82,
          padding: '0 24px',
          background: '#101411',
          color: '#FFFEF9',
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: 1.8,
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#D6FF63' }} />
        <div style={{ marginLeft: 18 }}>{insight?.toLocaleUpperCase('tr-TR')}</div>
        <div style={{ marginLeft: 'auto', color: '#D6FF63', fontSize: 28 }}>↗</div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: statsTop,
          display: 'flex',
          width: 896,
          height: 170,
          borderTop: '3px solid #101411',
          borderBottom: '3px solid #101411',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: statWidth,
              height: 130,
              marginTop: 20,
              paddingLeft: index ? 28 : 0,
              borderLeft: index ? '2px solid #C9CCC3' : 'none',
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: 1.2, color: '#5F655F' }}>
              {stat.label.toLocaleUpperCase('tr-TR')}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: stat.value.length > 9 ? 48 : 58,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: -2.5,
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1126,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: 896,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        {sourceLines.map((line, index) => (
          <div key={`${index}-${line}`} style={{ display: 'flex' }}>
            {index ? '' : 'KAYNAK / '}
            {line.toLocaleUpperCase('tr-TR')}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1196,
          width: 896,
          height: 3,
          background: '#101411',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1230,
          display: 'flex',
          alignItems: 'center',
          width: 430,
          height: 58,
          padding: '0 28px',
          background: '#D6FF63',
          border: '2px solid #101411',
          borderRadius: 29,
          fontSize: 22,
          fontWeight: 900,
        }}
      >
        Analizin tamamını oku ↗
      </div>
      <div style={{ position: 'absolute', right: 100, top: 1248, fontSize: 24, fontWeight: 900 }}>
        verimimari.com
      </div>
    </div>,
    {
      width: SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH,
      height: SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT,
      fonts: [
        { name: 'VM Inter', data: regularFont, weight: 400, style: 'normal' },
        { name: 'VM Inter', data: semiboldFont, weight: 600, style: 'normal' },
        { name: 'VM Inter', data: boldFont, weight: 700, style: 'normal' },
        { name: 'VM Inter', data: blackFont, weight: 900, style: 'normal' },
      ],
    },
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

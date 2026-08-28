import type { Announcement } from '@/lib/announcements'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH = 1080
export const SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT = 1350

const interLatin = readFileSync(join(process.cwd(), 'public/fonts/inter-latin.woff2')).toString(
  'base64',
)
const interLatinExtended = readFileSync(
  join(process.cwd(), 'public/fonts/inter-latin-ext.woff2'),
).toString('base64')

export function getAnnouncementSocialImagePath(slug: string) {
  return `/api/social/announcements/${encodeURIComponent(slug)}/image`
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function upperTr(value: string) {
  return value.toLocaleUpperCase('tr-TR')
}

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
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[.,;:!?]?$/, '')}…`
  }

  return lines
}

function textLines(lines: string[], x: number, y: number, lineHeight: number, fontSize: number) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" class="title" font-size="${fontSize}">${escapeXml(line)}</text>`,
    )
    .join('')
}

export function renderAnnouncementSocialSvg(announcement: Announcement) {
  const titleLines = wrapText(announcement.title, 23, 4)
  const excerptLines = wrapText(announcement.excerpt, 58, 2)
  const stats = announcement.stats.slice(0, 3)
  const longestTitleLine = Math.max(...titleLines.map((line) => line.length))
  const titleSize = longestTitleLine >= 21 ? 74 : titleLines.length > 3 ? 82 : 92
  const titleLineHeight = titleSize <= 74 ? 74 : titleLines.length > 3 ? 78 : 88
  const titleY = 322
  const excerptY = titleY + titleLines.length * titleLineHeight + 38
  const insightY = Math.max(718, excerptY + excerptLines.length * 38 + 42)
  const statsY = insightY + 132
  const statWidth = 896 / Math.max(stats.length, 1)
  const sourceLines = wrapText(announcement.source, 58, 2)
  const insightSource = announcement.nextStep?.eyebrow ?? announcement.eyebrow
  const insight = wrapText(insightSource, 42, 1)[0] ?? insightSource

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH}" height="${SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT}" viewBox="0 0 1080 1350">
      <style>
        @font-face { font-family: "VM Inter"; src: url(data:font/woff2;base64,${interLatin}) format("woff2"); font-weight: 100 900; }
        @font-face { font-family: "VM Inter"; src: url(data:font/woff2;base64,${interLatinExtended}) format("woff2"); font-weight: 100 900; }
        .sans { font-family: "VM Inter", sans-serif; fill: #101411; }
        .mono { font-family: "VM Inter", sans-serif; fill: #101411; font-size: 22px; font-weight: 750; letter-spacing: 1.8px; }
        .title { font-family: "VM Inter", sans-serif; fill: #101411; font-weight: 900; letter-spacing: -5.6px; stroke: #101411; stroke-width: 1.5px; paint-order: stroke fill; }
        .body { font-family: "VM Inter", sans-serif; fill: #3F453F; font-size: 28px; font-weight: 600; }
        .stat-label { font-family: "VM Inter", sans-serif; fill: #5F655F; font-size: 18px; font-weight: 750; letter-spacing: 1.2px; }
        .stat-value { font-family: "VM Inter", sans-serif; fill: #101411; font-size: 58px; font-weight: 900; letter-spacing: -3px; stroke: #101411; stroke-width: .7px; paint-order: stroke fill; }
      </style>
      <rect width="1080" height="1350" fill="#F6F4ED"/>
      <g opacity="0.17" stroke="#C9CCC3" stroke-width="1">
        ${Array.from({ length: 24 }, (_, index) => `<path d="M${index * 48} 0V1350"/>`).join('')}
        ${Array.from({ length: 30 }, (_, index) => `<path d="M0 ${index * 48}H1080"/>`).join('')}
      </g>
      <rect x="58" y="58" width="974" height="1244" fill="#101411"/>
      <rect x="48" y="48" width="974" height="1244" fill="#FFFEF9" stroke="#101411" stroke-width="3"/>
      <rect x="48" y="48" width="14" height="1244" fill="#D6FF63"/>

      <g transform="translate(84 76) scale(1.18)">
        <path fill="#101411" d="M5 15h7l10 18V12l4-4v34l-4 4z"/>
        <path fill="#101411" d="m28 8 3 3v35l-3-4z"/>
        <path fill="#101411" d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"/>
        <path fill="#D6FF63" stroke="#101411" stroke-width="1" d="m42 35 4-4v5l-4 4z"/>
      </g>
      <text x="150" y="106" class="sans" font-size="27" font-weight="900" letter-spacing="-1.4">veri/mimarı</text>
      <text x="150" y="137" class="mono" font-size="14">BAĞIMSIZ VERİ REHBERİ</text>
      <text x="980" y="106" class="mono" font-size="16" text-anchor="end">DUYURU / ${escapeXml(announcement.publishedAt)}</text>
      <line x1="84" y1="176" x2="980" y2="176" stroke="#101411" stroke-width="3"/>

      <rect x="84" y="216" width="${Math.min(720, 58 + announcement.category.length * 15)}" height="44" rx="22" fill="#D6FF63" stroke="#101411" stroke-width="2"/>
      <text x="108" y="245" class="mono" font-size="18">${escapeXml(upperTr(announcement.category))}</text>

      ${textLines(titleLines, 84, titleY, titleLineHeight, titleSize)}
      ${excerptLines
        .map(
          (line, index) =>
            `<text x="84" y="${excerptY + index * 38}" class="body">${escapeXml(line)}</text>`,
        )
        .join('')}

      <g transform="translate(84 ${insightY})">
        <rect width="896" height="82" fill="#101411"/>
        <circle cx="32" cy="41" r="9" fill="#D6FF63"/>
        <text x="58" y="51" fill="#FFFEF9" font-family="VM Inter, sans-serif" font-size="22" font-weight="750" letter-spacing="1.8">${escapeXml(upperTr(insight))}</text>
        <text x="862" y="51" fill="#D6FF63" font-family="VM Inter, sans-serif" font-size="22" font-weight="750" text-anchor="end">↗</text>
      </g>

      <g transform="translate(84 ${statsY})">
        <line x1="0" y1="0" x2="896" y2="0" stroke="#101411" stroke-width="3"/>
        <line x1="0" y1="170" x2="896" y2="170" stroke="#101411" stroke-width="3"/>
        ${stats
          .map((stat, index) => {
            const x = index * statWidth
            return `
              ${index ? `<line x1="${x}" y1="20" x2="${x}" y2="150" stroke="#C9CCC3" stroke-width="2"/>` : ''}
              <text x="${x + (index ? 28 : 0)}" y="46" class="stat-label">${escapeXml(upperTr(stat.label))}</text>
              <text x="${x + (index ? 28 : 0)}" y="124" class="stat-value">${escapeXml(stat.value)}</text>
            `
          })
          .join('')}
      </g>

      ${sourceLines
        .map(
          (line, index) =>
            `<text x="84" y="${1144 + index * 26}" class="mono" font-size="13">${index ? '' : 'KAYNAK / '}${escapeXml(upperTr(line))}</text>`,
        )
        .join('')}
      <line x1="84" y1="1196" x2="980" y2="1196" stroke="#101411" stroke-width="3"/>
      <rect x="84" y="1230" width="430" height="58" rx="29" fill="#D6FF63" stroke="#101411" stroke-width="2"/>
      <text x="112" y="1268" class="sans" font-size="22" font-weight="900">Analizin tamamını oku ↗</text>
      <text x="980" y="1269" class="sans" font-size="25" font-weight="900" text-anchor="end">verimimari.com</text>
    </svg>
  `)
}

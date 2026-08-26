import type { Announcement } from '@/lib/announcements'

export const SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH = 1080
export const SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT = 1350

export function getAnnouncementSocialImagePath(slug: string) {
  return `/api/social/announcements/${encodeURIComponent(slug)}/image?v=2`
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
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

function textLines(lines: string[], x: number, y: number, lineHeight: number) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" class="title">${escapeXml(line)}</text>`,
    )
    .join('')
}

export function renderAnnouncementSocialSvg(announcement: Announcement) {
  const titleLines = wrapText(announcement.title, 24, 4)
  const excerptLines = wrapText(announcement.excerpt, 58, 3)
  const stats = announcement.stats.slice(0, 2)
  const titleY = 320
  const excerptY = titleY + titleLines.length * 83 + 46
  const panelY = Math.max(782, excerptY + excerptLines.length * 39 + 54)

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH}" height="${SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT}" viewBox="0 0 1080 1350">
      <style>
        .sans { font-family: Inter, Arial, Helvetica, sans-serif; fill: #101411; }
        .mono { font-family: SFMono-Regular, Consolas, monospace; fill: #101411; font-size: 22px; font-weight: 700; letter-spacing: 1.8px; }
        .title { font-family: Inter, Arial, Helvetica, sans-serif; fill: #101411; font-size: 76px; font-weight: 900; letter-spacing: -3.8px; }
        .body { font-family: Inter, Arial, Helvetica, sans-serif; fill: #5F655F; font-size: 30px; font-weight: 500; }
        .stat-label { font-family: SFMono-Regular, Consolas, monospace; fill: #5F655F; font-size: 18px; font-weight: 700; letter-spacing: 1.2px; }
        .stat-value { font-family: Inter, Arial, Helvetica, sans-serif; fill: #101411; font-size: 54px; font-weight: 900; letter-spacing: -2px; }
        .stat-detail { font-family: Inter, Arial, Helvetica, sans-serif; fill: #5F655F; font-size: 20px; font-weight: 500; }
      </style>
      <rect width="1080" height="1350" fill="#F6F4ED"/>
      <g opacity="0.42" stroke="#C9CCC3" stroke-width="1">
        ${Array.from({ length: 24 }, (_, index) => `<path d="M${index * 48} 0V1350"/>`).join('')}
        ${Array.from({ length: 30 }, (_, index) => `<path d="M0 ${index * 48}H1080"/>`).join('')}
      </g>
      <rect x="64" y="64" width="952" height="1222" rx="18" fill="#FFFEF9" stroke="#101411" stroke-width="2"/>
      <path d="M72 1294H1024V72" fill="none" stroke="#101411" stroke-width="8"/>

      <g transform="translate(84 86) scale(1.25)">
        <path fill="#101411" d="M5 15h7l10 18V12l4-4v34l-4 4z"/>
        <path fill="#101411" d="m28 8 3 3v35l-3-4z"/>
        <path fill="#101411" d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"/>
        <path fill="#D6FF63" stroke="#101411" stroke-width="1" d="m42 35 4-4v5l-4 4z"/>
      </g>
      <text x="158" y="117" class="sans" font-size="28" font-weight="850">veri/mimarı</text>
      <text x="158" y="146" class="mono" font-size="15">BAĞIMSIZ VERİ REHBERİ</text>

      <rect x="84" y="190" width="${Math.min(680, 52 + announcement.category.length * 15)}" height="44" rx="22" fill="#D6FF63" stroke="#101411" stroke-width="2"/>
      <text x="108" y="219" class="mono">${escapeXml(announcement.category.toUpperCase())}</text>

      ${textLines(titleLines, 84, titleY, 83)}
      ${excerptLines
        .map(
          (line, index) =>
            `<text x="84" y="${excerptY + index * 39}" class="body">${escapeXml(line)}</text>`,
        )
        .join('')}

      <g transform="translate(84 ${panelY})">
        ${stats
          .map((stat, index) => {
            const x = index * 458
            return `
              <rect x="${x}" y="0" width="434" height="190" rx="14" fill="#FFFEF9" stroke="#101411" stroke-width="2"/>
              <path d="M${x + 6} 196H${x + 440}V6" fill="none" stroke="#101411" stroke-width="6"/>
              <text x="${x + 26}" y="43" class="stat-label">${escapeXml(stat.label)}</text>
              <text x="${x + 26}" y="112" class="stat-value">${escapeXml(stat.value)}</text>
              <text x="${x + 26}" y="154" class="stat-detail">${escapeXml(wrapText(stat.detail, 31, 1)[0] ?? '')}</text>
            `
          })
          .join('')}
      </g>

      <line x1="84" y1="1128" x2="996" y2="1128" stroke="#101411" stroke-width="2"/>
      <text x="84" y="1180" class="mono">${escapeXml(announcement.publishedAt)} · ${escapeXml(announcement.readingTime.toUpperCase())}</text>
      <rect x="84" y="1210" width="340" height="52" rx="26" fill="#101411"/>
      <text x="112" y="1244" font-family="Inter, Arial, sans-serif" fill="#FFFEF9" font-size="22" font-weight="800">Duyurunun tamamını oku →</text>
      <text x="996" y="1244" class="mono" text-anchor="end">VERIMIMARI.COM</text>
    </svg>
  `)
}

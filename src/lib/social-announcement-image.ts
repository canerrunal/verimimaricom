import type { Announcement } from '@/lib/announcements'

export const SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH = 1080
export const SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT = 1350

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

function approximateTextWidth(value: string, fontSize: number) {
  return Math.min(900, Math.max(180, value.length * fontSize * 0.48))
}

export function renderAnnouncementSocialSvg(announcement: Announcement) {
  const titleLines = wrapText(announcement.title, 22, 4)
  const excerptLines = wrapText(announcement.excerpt, 55, 3)
  const stats = announcement.stats.slice(0, 2)
  const titleY = 338
  const titleLineHeight = titleLines.length > 3 ? 76 : 84
  const excerptY = titleY + titleLines.length * titleLineHeight + 50
  const panelY = Math.max(808, excerptY + excerptLines.length * 39 + 62)
  const emphasisLine = titleLines.at(-1) ?? announcement.title
  const emphasisWidth = approximateTextWidth(emphasisLine, 82)
  const emphasisY = titleY + (titleLines.length - 1) * titleLineHeight - 24

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${SOCIAL_ANNOUNCEMENT_IMAGE_WIDTH}" height="${SOCIAL_ANNOUNCEMENT_IMAGE_HEIGHT}" viewBox="0 0 1080 1350">
      <style>
        .sans { font-family: Inter, "Helvetica Neue", Arial, sans-serif; fill: #101411; }
        .mono { font-family: SFMono-Regular, Consolas, monospace; fill: #101411; font-size: 22px; font-weight: 700; letter-spacing: 1.8px; }
        .title { font-family: Inter, "Arial Black", "Helvetica Neue", Arial, sans-serif; fill: #101411; font-size: 82px; font-weight: 900; letter-spacing: -5.2px; }
        .body { font-family: Inter, "Helvetica Neue", Arial, sans-serif; fill: #3F453F; font-size: 30px; font-weight: 520; }
        .stat-label { font-family: SFMono-Regular, Consolas, monospace; fill: #5F655F; font-size: 18px; font-weight: 700; letter-spacing: 1.2px; }
        .stat-value { font-family: Inter, "Arial Black", "Helvetica Neue", Arial, sans-serif; fill: #101411; font-size: 58px; font-weight: 900; letter-spacing: -3px; }
        .stat-detail { font-family: Inter, "Helvetica Neue", Arial, sans-serif; fill: #5F655F; font-size: 20px; font-weight: 520; }
      </style>
      <rect width="1080" height="1350" fill="#F6F4ED"/>
      <g opacity="0.24" stroke="#C9CCC3" stroke-width="1">
        ${Array.from({ length: 24 }, (_, index) => `<path d="M${index * 48} 0V1350"/>`).join('')}
        ${Array.from({ length: 30 }, (_, index) => `<path d="M0 ${index * 48}H1080"/>`).join('')}
      </g>
      <rect x="48" y="48" width="984" height="1254" fill="#FFFEF9" stroke="#101411" stroke-width="2"/>
      <path d="M56 1310H1040V56" fill="none" stroke="#101411" stroke-width="8"/>

      <g transform="translate(76 74) scale(1.08)">
        <path fill="#101411" d="M5 15h7l10 18V12l4-4v34l-4 4z"/>
        <path fill="#101411" d="m28 8 3 3v35l-3-4z"/>
        <path fill="#101411" d="M32 12.5 38 20l5.5-5.5c.8-.8 1.6-.9 2.5-.5v22l-4 4V25l-3.2 4.1c-.7.9-1.5.9-2.2 0L32 24z"/>
        <path fill="#D6FF63" stroke="#101411" stroke-width="1" d="m42 35 4-4v5l-4 4z"/>
      </g>
      <text x="136" y="103" class="sans" font-size="25" font-weight="850" letter-spacing="-1">veri/mimarı</text>
      <text x="136" y="132" class="mono" font-size="14">BAĞIMSIZ VERİ REHBERİ</text>
      <text x="996" y="103" class="mono" font-size="16" text-anchor="end">DUYURU / ${escapeXml(announcement.publishedAt)}</text>
      <line x1="76" y1="164" x2="1004" y2="164" stroke="#101411" stroke-width="3"/>

      <rect x="76" y="212" width="${Math.min(720, 54 + announcement.category.length * 15)}" height="42" fill="#D6FF63"/>
      <text x="96" y="240" class="mono" font-size="18">${escapeXml(announcement.category.toUpperCase())}</text>

      <rect x="76" y="${emphasisY}" width="${emphasisWidth}" height="22" fill="#D6FF63"/>
      ${textLines(titleLines, 76, titleY, titleLineHeight)}
      ${excerptLines
        .map(
          (line, index) =>
            `<text x="76" y="${excerptY + index * 39}" class="body">${escapeXml(line)}</text>`,
        )
        .join('')}

      <g transform="translate(76 ${panelY})">
        <line x1="0" y1="0" x2="928" y2="0" stroke="#101411" stroke-width="3"/>
        <line x1="0" y1="184" x2="928" y2="184" stroke="#101411" stroke-width="3"/>
        <line x1="464" y1="20" x2="464" y2="164" stroke="#C9CCC3" stroke-width="2"/>
        ${stats
          .map((stat, index) => {
            const x = index * 464
            return `
              <text x="${x + (index ? 30 : 0)}" y="42" class="stat-label">${escapeXml(stat.label.toUpperCase())}</text>
              <text x="${x + (index ? 30 : 0)}" y="111" class="stat-value">${escapeXml(stat.value)}</text>
              <text x="${x + (index ? 30 : 0)}" y="151" class="stat-detail">${escapeXml(wrapText(stat.detail, 34, 1)[0] ?? '')}</text>
            `
          })
          .join('')}
      </g>

      <line x1="76" y1="1156" x2="1004" y2="1156" stroke="#101411" stroke-width="3"/>
      <text x="76" y="1204" class="mono" font-size="17">${escapeXml(announcement.eyebrow.toUpperCase())}</text>
      <rect x="76" y="1230" width="420" height="54" fill="#D6FF63" stroke="#101411" stroke-width="2"/>
      <text x="102" y="1265" class="sans" font-size="22" font-weight="850">Duyurunun tamamını oku ↗</text>
      <text x="1004" y="1265" class="sans" font-size="24" font-weight="850" text-anchor="end">verimimari.com</text>
    </svg>
  `)
}

import 'server-only'

import { lookup } from 'node:dns/promises'
import { request as requestHttp } from 'node:http'
import { request as requestHttps } from 'node:https'
import type { IncomingHttpHeaders } from 'node:http'
import { isIP } from 'node:net'
import type { PreflightCheck, PreflightOutput } from '../types'
import { isPublicIp } from '../security/url'

const MAX_REDIRECTS = 4
const MAX_HTML_BYTES = 1_500_000
const MAX_AUX_BYTES = 300_000
const REQUEST_TIMEOUT_MS = 8_000

interface TextResponse {
  status: number
  headers: IncomingHttpHeaders
  body: string
  finalUrl: string
  durationMs: number
  truncated: boolean
}

export class PreflightError extends Error {
  constructor(
    message: string,
    readonly code: 'unsafe_url' | 'unreachable' | 'invalid_response' | 'too_large',
    readonly status = 400,
  ) {
    super(message)
    this.name = 'PreflightError'
  }
}

function validateUrlShape(value: string) {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new PreflightError('Geçerli bir web adresi girin.', 'unsafe_url')
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new PreflightError(
      'Yalnızca herkese açık HTTP/HTTPS adresleri analiz edilebilir.',
      'unsafe_url',
    )
  }
  if (url.port && !['80', '443'].includes(url.port)) {
    throw new PreflightError(
      'Standart dışı portlara erişim güvenlik nedeniyle engellendi.',
      'unsafe_url',
    )
  }

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '')
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    throw new PreflightError('Yerel veya özel ağ adresleri analiz edilemez.', 'unsafe_url')
  }
  return url
}

async function resolvePublicAddress(hostname: string) {
  if (isIP(hostname)) {
    if (!isPublicIp(hostname)) {
      throw new PreflightError('Yerel veya özel ağ adresleri analiz edilemez.', 'unsafe_url')
    }
    return { address: hostname, family: isIP(hostname) as 4 | 6 }
  }

  let addresses: Array<{ address: string; family: number }>
  try {
    addresses = (await lookup(hostname, { all: true, verbatim: true })) as Array<{
      address: string
      family: number
    }>
  } catch {
    throw new PreflightError('Alan adının DNS kaydı çözümlenemedi.', 'unreachable', 422)
  }

  if (!addresses.length || addresses.some((entry) => !isPublicIp(entry.address))) {
    throw new PreflightError(
      'Alan adı güvenli, herkese açık bir IP adresine çözümlenmedi.',
      'unsafe_url',
    )
  }
  return addresses[0]
}

async function fetchText(
  input: string,
  options: { maxBytes?: number; redirectCount?: number; truncateAtLimit?: boolean } = {},
): Promise<TextResponse> {
  const url = validateUrlShape(input)
  const resolved = await resolvePublicAddress(url.hostname)
  const maxBytes = options.maxBytes ?? MAX_HTML_BYTES
  const startedAt = Date.now()

  return new Promise<TextResponse>((resolve, reject) => {
    const requester = url.protocol === 'https:' ? requestHttps : requestHttp
    const request = requester(
      url,
      {
        method: 'GET',
        headers: {
          accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.2',
          'accept-encoding': 'identity',
          'user-agent': 'VeriMimari-AIVisibilityPreflight/1.0 (+https://verimimari.com)',
        },
        lookup: (_hostname, lookupOptions, callback) => {
          if (typeof lookupOptions === 'object' && lookupOptions.all) {
            callback(null, [resolved])
            return
          }
          callback(null, resolved.address, resolved.family)
        },
        servername: url.hostname,
      },
      (response) => {
        const status = response.statusCode ?? 0
        const location = response.headers.location
        if (status >= 300 && status < 400 && location) {
          response.resume()
          const redirectCount = options.redirectCount ?? 0
          if (redirectCount >= MAX_REDIRECTS) {
            reject(
              new PreflightError('Site çok fazla yönlendirme yapıyor.', 'invalid_response', 422),
            )
            return
          }
          const nextUrl = new URL(location, url).toString()
          fetchText(nextUrl, {
            maxBytes,
            redirectCount: redirectCount + 1,
            truncateAtLimit: options.truncateAtLimit,
          }).then(resolve, reject)
          return
        }

        const chunks: Buffer[] = []
        let received = 0
        let settled = false

        const finish = (truncated: boolean) => {
          if (settled) return
          settled = true
          resolve({
            status,
            headers: response.headers,
            body: Buffer.concat(chunks).toString('utf8'),
            finalUrl: url.toString(),
            durationMs: Date.now() - startedAt,
            truncated,
          })
        }

        response.on('data', (chunk: Buffer) => {
          if (settled) return
          const remaining = maxBytes - received
          if (chunk.length > remaining) {
            if (remaining > 0) chunks.push(chunk.subarray(0, remaining))
            received = maxBytes
            if (options.truncateAtLimit) {
              finish(true)
              response.destroy()
              return
            }
            settled = true
            const error = new PreflightError(
              'Site yanıtı analiz sınırını aşıyor.',
              'too_large',
              413,
            )
            request.destroy(error)
            reject(error)
            return
          }
          received += chunk.length
          chunks.push(chunk)
        })
        response.on('end', () => finish(false))
      },
    )

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(
        new PreflightError('Site zaman sınırı içinde yanıt vermedi.', 'unreachable', 422),
      )
    })
    request.on('error', (error) => {
      reject(
        error instanceof PreflightError
          ? error
          : new PreflightError('Siteye güvenli bağlantı kurulamadı.', 'unreachable', 422),
      )
    })
    request.end()
  })
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
}

function cleanText(value: string | null | undefined) {
  if (!value) return null
  const cleaned = decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned || null
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function tagContent(html: string, tag: string) {
  const match = html.match(
    new RegExp(`<${escapeRegex(tag)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegex(tag)}>`, 'i'),
  )
  return cleanText(match?.[1])
}

function attributeValue(tag: string, attribute: string) {
  const match = tag.match(new RegExp(`\\b${escapeRegex(attribute)}\\s*=\\s*["']([^"']*)["']`, 'i'))
  return cleanText(match?.[1])
}

function metaContent(html: string, key: string) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    const name = attributeValue(tag, 'name') || attributeValue(tag, 'property')
    if (name?.toLowerCase() === key.toLowerCase()) return attributeValue(tag, 'content')
  }
  return null
}

function linkHref(html: string, relValue: string) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    const rel = attributeValue(tag, 'rel')?.toLowerCase().split(/\s+/) ?? []
    if (rel.includes(relValue.toLowerCase())) return attributeValue(tag, 'href')
  }
  return null
}

function structuredDataSummary(html: string) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
  const types = new Set<string>()
  let entityName: string | null = null
  const visit = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(visit)
    if (!value || typeof value !== 'object') return
    const object = value as Record<string, unknown>
    const type = object['@type']
    if (typeof type === 'string') types.add(type)
    if (Array.isArray(type))
      type.filter((item) => typeof item === 'string').forEach((item) => types.add(item))
    const typeList = Array.isArray(type) ? type : [type]
    if (
      !entityName &&
      typeList.some((item) =>
        ['Organization', 'Corporation', 'Brand', 'WebSite'].includes(String(item)),
      ) &&
      typeof object.name === 'string'
    ) {
      entityName = cleanText(object.name)
    }
    Object.values(object).forEach(visit)
  }
  for (const script of scripts) {
    try {
      visit(JSON.parse(script[1]))
    } catch {
      // Malformed JSON-LD is reported through the absence of detected schema types.
    }
  }
  return { types: [...types].sort(), entityName }
}

function deriveBrandName(
  html: string,
  title: string | null,
  hostname: string,
  structuredName: string | null,
) {
  const siteName = metaContent(html, 'og:site_name')
  if (siteName) return siteName.slice(0, 80)
  if (structuredName)
    return structuredName
      .split(/[|·–—]/)[0]
      .trim()
      .slice(0, 80)
  const titleBrand = title
    ?.split(/\s+[|·–—-]\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .at(-1)
  if (titleBrand && titleBrand.length <= 80) return titleBrand
  const root = hostname
    .replace(/^www\./, '')
    .split('.')[0]
    .replace(/[-_]+/g, ' ')
  return root.replace(/\b\w/g, (letter) => letter.toUpperCase()).slice(0, 80)
}

function statusCheck(
  id: string,
  label: string,
  passed: boolean,
  success: string,
  failure: string,
  url?: string,
): PreflightCheck {
  return { id, label, status: passed ? 'pass' : 'warning', detail: passed ? success : failure, url }
}

async function optionalFetch(url: string) {
  try {
    return await fetchText(url, { maxBytes: MAX_AUX_BYTES })
  } catch {
    return null
  }
}

export async function runPreflight(input: {
  domain: string
  country?: string
  language?: string
}): Promise<PreflightOutput> {
  const normalized = validateUrlShape(input.domain)
  let homepage: TextResponse
  try {
    homepage = await fetchText(normalized.toString(), { truncateAtLimit: true })
  } catch (error) {
    if (
      normalized.protocol !== 'https:' ||
      (error instanceof PreflightError && error.code === 'unsafe_url')
    ) {
      throw error
    }
    normalized.protocol = 'http:'
    homepage = await fetchText(normalized.toString(), { truncateAtLimit: true })
  }

  if (homepage.status < 200 || homepage.status >= 400) {
    throw new PreflightError(
      `Site ${homepage.status || 'geçersiz'} HTTP durumuyla yanıt verdi.`,
      'invalid_response',
      422,
    )
  }
  const contentType = String(homepage.headers['content-type'] || '').toLowerCase()
  if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
    throw new PreflightError('Ana adres bir HTML sayfası döndürmüyor.', 'invalid_response', 422)
  }

  const finalUrl = new URL(homepage.finalUrl)
  const origin = finalUrl.origin
  const [robots, sitemap] = await Promise.all([
    optionalFetch(new URL('/robots.txt', origin).toString()),
    optionalFetch(new URL('/sitemap.xml', origin).toString()),
  ])

  const html = homepage.body
  const title = tagContent(html, 'title')
  const description = metaContent(html, 'description')
  const h1 = tagContent(html, 'h1')
  const canonicalRaw = linkHref(html, 'canonical')
  const canonical = canonicalRaw ? new URL(canonicalRaw, finalUrl).toString() : null
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? ''
  const locale = attributeValue(htmlTag, 'lang')
  const structuredData = structuredDataSummary(html)
  const detectedSchemaTypes = structuredData.types
  const robotsAvailable = Boolean(robots && robots.status >= 200 && robots.status < 400)
  const robotsBlocksAll = Boolean(
    robotsAvailable && /user-agent:\s*\*[\s\S]{0,500}?disallow:\s*\/(?:\s|$)/i.test(robots!.body),
  )
  const sitemapAvailable = Boolean(sitemap && sitemap.status >= 200 && sitemap.status < 400)

  const checks: PreflightCheck[] = [
    {
      id: 'reachability',
      label: 'Site erişimi',
      status: 'pass',
      detail: `${homepage.status} HTTP yanıtı ${homepage.durationMs} ms içinde alındı.`,
      url: homepage.finalUrl,
    },
    statusCheck(
      'title',
      'Sayfa başlığı',
      Boolean(title),
      'Title etiketi bulundu.',
      'Title etiketi tespit edilemedi.',
    ),
    statusCheck(
      'description',
      'Meta açıklama',
      Boolean(description),
      'Meta description bulundu.',
      'Meta description tespit edilemedi.',
    ),
    statusCheck(
      'h1',
      'Ana başlık',
      Boolean(h1),
      'Sayfada H1 bulundu.',
      'Ana sayfada H1 tespit edilemedi.',
    ),
    statusCheck(
      'canonical',
      'Canonical adres',
      Boolean(canonical),
      'Canonical bağlantısı bulundu.',
      'Canonical bağlantısı tespit edilemedi.',
    ),
    {
      id: 'robots',
      label: 'Robots erişimi',
      status: !robotsAvailable ? 'warning' : robotsBlocksAll ? 'fail' : 'pass',
      detail: !robotsAvailable
        ? 'robots.txt okunamadı.'
        : robotsBlocksAll
          ? 'robots.txt genel tarayıcı erişimini engelliyor görünüyor.'
          : 'robots.txt erişilebilir ve genel engel tespit edilmedi.',
      url: new URL('/robots.txt', origin).toString(),
    },
    statusCheck(
      'sitemap',
      'Site haritası',
      sitemapAvailable,
      'Kök sitemap.xml erişilebilir.',
      'Kök sitemap.xml erişilebilir görünmüyor.',
      new URL('/sitemap.xml', origin).toString(),
    ),
    statusCheck(
      'organization-schema',
      'Marka yapılandırılmış verisi',
      detectedSchemaTypes.includes('Organization') || detectedSchemaTypes.includes('Corporation'),
      'Organization/Corporation JSON-LD bulundu.',
      'Organization veya Corporation JSON-LD tespit edilemedi.',
    ),
    statusCheck(
      'product-schema',
      'Ürün yapılandırılmış verisi',
      detectedSchemaTypes.includes('Product'),
      'Product JSON-LD bulundu.',
      'Ana sayfada Product JSON-LD tespit edilmedi; ürün sitesi değilse bu normal olabilir.',
    ),
  ]

  const weights: Record<string, number> = {
    reachability: 20,
    title: 10,
    description: 10,
    h1: 10,
    canonical: 10,
    robots: 10,
    sitemap: 10,
    'organization-schema': 10,
    'product-schema': 10,
  }
  const score = checks.reduce((total, check) => {
    const weight = weights[check.id] ?? 0
    if (check.status === 'pass') return total + weight
    if (check.status === 'warning') return total + weight * 0.5
    return total
  }, 0)

  const country = locale?.toLowerCase().startsWith('tr') ? 'Türkiye' : input.country || ''
  const language = locale?.split('-')[0].toLowerCase() || input.language || 'tr'

  return {
    ok: true,
    normalizedUrl: input.domain,
    finalUrl: homepage.finalUrl,
    fetchedAt: new Date().toISOString(),
    responseTimeMs: homepage.durationMs,
    technicalReadinessScore: Math.round(score),
    page: { title, description, h1, canonical, locale, schemaTypes: detectedSchemaTypes },
    suggestedProfile: {
      brandName: deriveBrandName(html, title, finalUrl.hostname, structuredData.entityName),
      sector: '',
      country,
      language,
    },
    checks,
    limitations: [
      'Bu ön analiz yalnızca herkese açık ana sayfa, robots.txt ve kök sitemap.xml sinyallerini kontrol eder.',
      ...(homepage.truncated
        ? [
            'Ana sayfa yanıtı güvenli boyut sınırında kesilerek incelendi; sayfanın sonraki bölümündeki sinyaller görünmeyebilir.',
          ]
        : []),
      'JavaScript ile sonradan üretilen içerik bu hızlı kontrolde görünmeyebilir.',
      'Teknik hazırlık puanı, AI cevaplarında görünürlük veya sıralama garantisi değildir.',
    ],
  }
}

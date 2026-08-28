import { readFile } from 'node:fs/promises'
import { createHmac, randomBytes } from 'node:crypto'
import ts from 'typescript'

export const SOCIAL_PLATFORMS = ['instagram', 'facebook', 'linkedin', 'x']

export async function loadAnnouncementsFromSource(source) {
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`
  const module = await import(moduleUrl)
  return module.announcements
}

export async function loadAnnouncements(sourcePath = 'src/lib/announcements.ts') {
  return loadAnnouncementsFromSource(await readFile(sourcePath, 'utf8'))
}

function clean(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

function hashtags(announcement) {
  const category = clean(announcement.category).toLocaleUpperCase('tr-TR')
  const topical = category.includes('AI') ? '#YapayZeka' : '#ETicaret'
  return `#VeriMimarı ${topical} #VeriyleKarar`
}

function keyStats(announcement) {
  return announcement.stats
    .slice(0, 3)
    .map((stat) => `• ${clean(stat.label)}: ${clean(stat.value)} — ${clean(stat.detail)}`)
    .join('\n')
}

function trimForX(text, maxLength = 280) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`
}

export function buildSocialContent(announcement, siteUrl = 'https://verimimari.com') {
  const baseUrl = siteUrl.replace(/\/$/, '')
  const url = `${baseUrl}/duyurular/${announcement.slug}`
  const imageUrl = `${baseUrl}/api/social/announcements/${announcement.slug}/image?v=6`
  const stats = keyStats(announcement)
  const tags = hashtags(announcement)
  const closing = clean(
    announcement.sections.find((section) => section.id === 'benim-yorumum')?.paragraphs?.[0] ??
      announcement.sections.at(-1)?.paragraphs?.[0] ??
      '',
  )

  const instagram = [
    clean(announcement.title),
    '',
    clean(announcement.excerpt),
    '',
    stats,
    '',
    closing,
    '',
    `Detaylı yorumumu okuyun: ${url}`,
    '',
    tags,
  ]
    .filter((part, index, parts) => part || (index > 0 && parts[index - 1]))
    .join('\n')
    .slice(0, 2200)

  const facebook = [
    clean(announcement.title),
    '',
    clean(announcement.excerpt),
    '',
    stats,
    '',
    closing,
    '',
    'Detaylı değerlendirmeyi bağlantıda paylaştım.',
    '',
    tags,
  ]
    .filter((part, index, parts) => part || (index > 0 && parts[index - 1]))
    .join('\n')

  const linkedin = [
    clean(announcement.title),
    '',
    clean(announcement.excerpt),
    '',
    'Benim için öne çıkan veriler:',
    stats,
    '',
    closing,
    '',
    `Detaylı değerlendirmem: ${url}`,
    '',
    tags,
  ]
    .filter((part, index, parts) => part || (index > 0 && parts[index - 1]))
    .join('\n')

  const xSuffix = `\n\nDetaylar profil bağlantısında.\n\n${tags}`
  const xLead = `${clean(announcement.title)} ${clean(announcement.excerpt)}`
  // X ağırlıklı karakter sayımı bazı Unicode işaretlerini birden fazla sayabiliyor.
  // 275 sınırı, API'nin 280 karakter limitinin altında güvenli bir pay bırakır.
  const x = `${trimForX(xLead, 275 - xSuffix.length)}${xSuffix}`

  return {
    url,
    imageUrl,
    imageAlt: clean(announcement.imageAlt),
    instagram,
    facebook,
    linkedin,
    x,
  }
}

async function readResponse(response, label) {
  const text = await response.text()
  let body
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    body = { raw: text }
  }

  if (!response.ok) {
    const detail =
      body?.error?.message ??
      body?.errors?.[0]?.message ??
      body?.detail ??
      body?.message ??
      body?.raw ??
      response.statusText
    throw new Error(`${label} başarısız (${response.status}): ${detail}`)
  }
  return body
}

function requireEnv(env, names) {
  const missing = names.filter((name) => !env[name])
  if (missing.length) throw new Error(`Eksik ortam değişkeni: ${missing.join(', ')}`)
}

export async function publishInstagram(content, { env = process.env, fetchImpl = fetch } = {}) {
  requireEnv(env, ['META_ACCESS_TOKEN', 'INSTAGRAM_ACCOUNT_ID'])
  const version = env.META_GRAPH_VERSION || 'v26.0'
  const graph = `https://graph.facebook.com/${version}`
  const createBody = new URLSearchParams({
    image_url: content.imageUrl,
    caption: content.instagram,
    alt_text: content.imageAlt,
    access_token: env.META_ACCESS_TOKEN,
  })
  const created = await readResponse(
    await fetchImpl(`${graph}/${env.INSTAGRAM_ACCOUNT_ID}/media`, {
      method: 'POST',
      body: createBody,
    }),
    'Instagram medya hazırlığı',
  )

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const status = await readResponse(
      await fetchImpl(
        `${graph}/${created.id}?fields=status_code&access_token=${encodeURIComponent(env.META_ACCESS_TOKEN)}`,
      ),
      'Instagram medya durumu',
    )
    if (status.status_code === 'FINISHED') break
    if (status.status_code === 'ERROR' || status.status_code === 'EXPIRED') {
      throw new Error(`Instagram medya hazırlığı ${status.status_code} durumuyla durdu.`)
    }
    if (attempt === 11) throw new Error('Instagram medya hazırlığı zaman aşımına uğradı.')
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }

  return readResponse(
    await fetchImpl(`${graph}/${env.INSTAGRAM_ACCOUNT_ID}/media_publish`, {
      method: 'POST',
      body: new URLSearchParams({
        creation_id: created.id,
        access_token: env.META_ACCESS_TOKEN,
      }),
    }),
    'Instagram yayını',
  )
}

export async function publishFacebook(content, { env = process.env, fetchImpl = fetch } = {}) {
  requireEnv(env, ['META_ACCESS_TOKEN', 'FACEBOOK_PAGE_ID'])
  const version = env.META_GRAPH_VERSION || 'v26.0'
  return readResponse(
    await fetchImpl(`https://graph.facebook.com/${version}/${env.FACEBOOK_PAGE_ID}/feed`, {
      method: 'POST',
      body: new URLSearchParams({
        message: content.facebook,
        link: content.url,
        access_token: env.META_ACCESS_TOKEN,
      }),
    }),
    'Facebook yayını',
  )
}

function linkedinHeaders(env, json = true) {
  return {
    Authorization: `Bearer ${env.LINKEDIN_ACCESS_TOKEN}`,
    'Linkedin-Version': env.LINKEDIN_VERSION || '202608',
    'X-Restli-Protocol-Version': '2.0.0',
    ...(json ? { 'Content-Type': 'application/json' } : {}),
  }
}

export async function publishLinkedIn(content, { env = process.env, fetchImpl = fetch } = {}) {
  requireEnv(env, ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_AUTHOR_URN'])
  const initialized = await readResponse(
    await fetchImpl('https://api.linkedin.com/rest/images?action=initializeUpload', {
      method: 'POST',
      headers: linkedinHeaders(env),
      body: JSON.stringify({
        initializeUploadRequest: { owner: env.LINKEDIN_AUTHOR_URN },
      }),
    }),
    'LinkedIn görsel kaydı',
  )
  const uploadUrl = initialized.value?.uploadUrl
  const imageUrn = initialized.value?.image
  if (!uploadUrl || !imageUrn) throw new Error('LinkedIn görsel yükleme adresi döndürmedi.')

  const imageResponse = await fetchImpl(content.imageUrl)
  if (!imageResponse.ok) throw new Error(`Sosyal görsel indirilemedi (${imageResponse.status}).`)
  const image = await imageResponse.arrayBuffer()
  await readResponse(
    await fetchImpl(uploadUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: image,
    }),
    'LinkedIn görsel yüklemesi',
  )

  const response = await fetchImpl('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: linkedinHeaders(env),
    body: JSON.stringify({
      author: env.LINKEDIN_AUTHOR_URN,
      commentary: content.linkedin,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      content: { media: { altText: content.imageAlt, id: imageUrn } },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  })
  const body = await readResponse(response, 'LinkedIn yayını')
  return { ...body, id: response.headers.get('x-restli-id') }
}

function xPercentEncode(value) {
  return encodeURIComponent(String(value)).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  )
}

export function createXOAuth1Header(
  url,
  env,
  { timestamp = Math.floor(Date.now() / 1000), nonce = randomBytes(16).toString('hex') } = {},
) {
  requireEnv(env, [
    'X_CONSUMER_KEY',
    'X_CONSUMER_SECRET',
    'X_ACCESS_TOKEN',
    'X_ACCESS_TOKEN_SECRET',
  ])
  const parameters = {
    oauth_consumer_key: env.X_CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(timestamp),
    oauth_token: env.X_ACCESS_TOKEN,
    oauth_version: '1.0',
  }
  const parameterString = Object.entries(parameters)
    .map(([key, value]) => [xPercentEncode(key), xPercentEncode(value)])
    .sort(
      ([keyA, valueA], [keyB, valueB]) => keyA.localeCompare(keyB) || valueA.localeCompare(valueB),
    )
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const signatureBase = ['POST', xPercentEncode(url), xPercentEncode(parameterString)].join('&')
  const signingKey = `${xPercentEncode(env.X_CONSUMER_SECRET)}&${xPercentEncode(env.X_ACCESS_TOKEN_SECRET)}`
  const signature = createHmac('sha1', signingKey).update(signatureBase).digest('base64')

  return `OAuth ${Object.entries({ ...parameters, oauth_signature: signature })
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${xPercentEncode(key)}="${xPercentEncode(value)}"`)
    .join(', ')}`
}

export async function publishX(content, { env = process.env, fetchImpl = fetch, oauth = {} } = {}) {
  const url = 'https://api.x.com/2/tweets'
  return readResponse(
    await fetchImpl(url, {
      method: 'POST',
      headers: {
        Authorization: createXOAuth1Header(url, env, oauth),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: content.x }),
    }),
    'X yayını',
  )
}

export const platformPublishers = {
  instagram: publishInstagram,
  facebook: publishFacebook,
  linkedin: publishLinkedIn,
  x: publishX,
}

export async function waitForLiveAnnouncement(content, { fetchImpl = fetch } = {}) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const [page, image] = await Promise.all([
        fetchImpl(content.url, { redirect: 'follow' }),
        fetchImpl(content.imageUrl, { redirect: 'follow' }),
      ])
      if (page.ok && image.ok && image.headers.get('content-type')?.includes('image/jpeg')) return
    } catch {
      // Deployment can briefly be unavailable while the production alias changes.
    }
    if (attempt === 19) break
    await new Promise((resolve) => setTimeout(resolve, 15000))
  }
  throw new Error(`Canlı duyuru veya sosyal görsel hazır değil: ${content.url}`)
}

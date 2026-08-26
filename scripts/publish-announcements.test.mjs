import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildSocialContent,
  loadAnnouncementsFromSource,
  publishFacebook,
  publishInstagram,
  publishLinkedIn,
  publishX,
} from './social-publisher-core.mjs'

const announcement = {
  slug: 'ornek-duyuru',
  addedOrder: 1,
  category: 'AI ve Teknoloji',
  title: 'Yeni bir veri sistemi duyuruldu.',
  excerpt: 'Benim için asıl önemli taraf, veriyi cihazdan çıkarmadan işleyebilmek.',
  imageAlt: 'Yeni veri sistemini açıklayan Veri Mimarı kartı',
  stats: [
    { label: 'HIZ', value: '2×', detail: 'Önceki sürüme göre' },
    { label: 'BELLEK', value: '64 GB', detail: 'Birleşik kapasite' },
  ],
  sections: [
    {
      id: 'benim-yorumum',
      paragraphs: ['Ben bunu yalnızca bir hız artışı olarak okumuyorum.'],
    },
  ],
}

function response(body = {}, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })
}

test('TypeScript duyuru kaynağını ek bağımlı runtime olmadan yükler', async () => {
  const items = await loadAnnouncementsFromSource(`
    export type Item = { slug: string }
    export const announcements: Item[] = [{ slug: 'bir' }]
  `)
  assert.deepEqual(items, [{ slug: 'bir' }])
})

test('platforma özgü metinleri ve 4:5 görsel adresini üretir', () => {
  const content = buildSocialContent(announcement, 'https://verimimari.com/')
  assert.equal(content.url, 'https://verimimari.com/duyurular/ornek-duyuru')
  assert.equal(
    content.imageUrl,
    'https://verimimari.com/api/social/announcements/ornek-duyuru/image',
  )
  assert.match(content.instagram, /#VeriMimarı/)
  assert.match(content.linkedin, /Benim için öne çıkan veriler/)
  assert.ok(content.x.length <= 280)
  assert.match(content.x, /https:\/\/verimimari\.com\/duyurular\/ornek-duyuru$/)
})

test('Instagram medya konteynerini hazırlayıp yayınlar', async () => {
  const calls = []
  const fetchImpl = async (url, options = {}) => {
    calls.push({ url: String(url), options })
    if (String(url).endsWith('/media')) return response({ id: 'container-1' })
    if (String(url).includes('container-1?')) return response({ status_code: 'FINISHED' })
    return response({ id: 'ig-post-1' })
  }
  const content = buildSocialContent(announcement)
  const result = await publishInstagram(content, {
    env: { META_ACCESS_TOKEN: 'secret', INSTAGRAM_ACCOUNT_ID: 'ig-1' },
    fetchImpl,
  })
  assert.equal(result.id, 'ig-post-1')
  assert.equal(calls.length, 3)
  assert.match(calls[0].url, /graph\.facebook\.com\/v26\.0\/ig-1\/media$/)
  assert.equal(calls[0].options.body.get('image_url'), content.imageUrl)
  assert.equal(calls[0].options.body.get('alt_text'), content.imageAlt)
})

test('Facebook sayfa gönderisini bağlantıyla oluşturur', async () => {
  let call
  const content = buildSocialContent(announcement)
  const result = await publishFacebook(content, {
    env: { META_ACCESS_TOKEN: 'secret', FACEBOOK_PAGE_ID: 'page-1' },
    fetchImpl: async (url, options) => {
      call = { url: String(url), options }
      return response({ id: 'fb-post-1' })
    },
  })
  assert.equal(result.id, 'fb-post-1')
  assert.match(call.url, /page-1\/feed$/)
  assert.equal(call.options.body.get('link'), content.url)
})

test('LinkedIn görselini yükleyip Posts API ile yayınlar', async () => {
  const calls = []
  const content = buildSocialContent(announcement)
  const fetchImpl = async (url, options = {}) => {
    calls.push({ url: String(url), options })
    if (String(url).includes('initializeUpload')) {
      return response({
        value: { uploadUrl: 'https://upload.linkedin.test/image', image: 'urn:li:image:1' },
      })
    }
    if (String(url) === content.imageUrl) {
      return new Response(new Uint8Array([1, 2, 3]), {
        headers: { 'content-type': 'image/jpeg' },
      })
    }
    if (String(url).includes('upload.linkedin.test')) return new Response('', { status: 201 })
    return response({}, { status: 201, headers: { 'x-restli-id': 'urn:li:share:1' } })
  }
  const result = await publishLinkedIn(content, {
    env: {
      LINKEDIN_ACCESS_TOKEN: 'secret',
      LINKEDIN_AUTHOR_URN: 'urn:li:organization:1',
      LINKEDIN_VERSION: '202608',
    },
    fetchImpl,
  })
  assert.equal(result.id, 'urn:li:share:1')
  const post = calls.find((call) => call.url.endsWith('/rest/posts'))
  const body = JSON.parse(post.options.body)
  assert.equal(body.content.media.id, 'urn:li:image:1')
  assert.equal(body.content.media.altText, content.imageAlt)
})

test('X gönderisini OAuth kullanıcı belirteciyle oluşturur', async () => {
  let call
  const content = buildSocialContent(announcement)
  const result = await publishX(content, {
    env: { X_USER_ACCESS_TOKEN: 'secret' },
    fetchImpl: async (url, options) => {
      call = { url: String(url), options }
      return response({ data: { id: 'x-post-1' } }, { status: 201 })
    },
  })
  assert.equal(result.data.id, 'x-post-1')
  assert.equal(call.url, 'https://api.x.com/2/tweets')
  assert.equal(call.options.headers.Authorization, 'Bearer secret')
  assert.equal(JSON.parse(call.options.body).text, content.x)
})

test('API hataları platform ve durum koduyla raporlanır', async () => {
  await assert.rejects(
    () =>
      publishX(buildSocialContent(announcement), {
        env: { X_USER_ACCESS_TOKEN: 'secret' },
        fetchImpl: async () => response({ detail: 'forbidden' }, { status: 403 }),
      }),
    /X yayını başarısız \(403\)/,
  )
})

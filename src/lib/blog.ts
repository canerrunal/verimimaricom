export const fallbackBlogPosts = [
  {
    slug: 'claude-fable-5-vercel-ai-gateway',
    title: "Claude Fable 5 Vercel AI Gateway'de Yayında",
    excerpt:
      "Vercel AI Gateway, Anthropic'in Claude Fable 5 modelini 1 milyon token bağlam, reasoning, tool use, explicit caching, dosya girdisi ve görüntü desteğiyle katalogda görünür hale getirdi.",
    maturity: 'growing',
    publishedAt: '2026-06-09',
    updatedAt: '2026-06-12',
    sourceName: 'Vercel AI Gateway',
    sourceUrl: 'https://vercel.com/ai-gateway/models/claude-fable-5',
    tags: ['Claude', 'Anthropic', 'Vercel AI Gateway', 'AI SDK', 'LLM'],
    highlights: [
      'Model kimliği AI SDK içinde anthropic/claude-fable-5 olarak kullanılıyor.',
      'Vercel sayfasında 1M context, reasoning, tool use, explicit caching, file input ve vision desteği listeleniyor.',
      'Provider tarafında Anthropic ve Google Vertex AI seçenekleri görünüyor.',
      'Vercel, modeli uzun süren, karmaşık ve asenkron görevlerde daha az kontrol noktasıyla çalışabilen Mythos-class bir model olarak konumlandırıyor.',
    ],
    sections: [
      {
        title: 'Haberin Kısa Özeti',
        body:
          "Vercel AI Gateway'in Claude Fable 5 sayfası, modeli Anthropic sağlayıcısı altında erişilebilir gösteriyor. Sayfada modelin uzun süren, karmaşık ve asenkron işleri önceki modellere göre daha az ara kontrolle yürütebildiği; güçlü güvenlik önlemleriyle gelen Mythos-class bir model olduğu belirtiliyor.",
      },
      {
        title: 'Teknik Notlar',
        body:
          'Geliştirici tarafında en pratik detay model adının anthropic/claude-fable-5 olması. Vercel AI SDK ile streamText çağrısında bu model kimliği doğrudan kullanılabiliyor. Katalogda reasoning, tool use, explicit caching, file input ve image vision destekleri öne çıkıyor.',
      },
      {
        title: 'Fiyat ve Provider Bilgisi',
        body:
          'Vercel model tablosunda Anthropic ve Google Vertex AI provider seçenekleri listeleniyor. Her iki provider için de 1M context, input başına 10 dolar/M, output başına 50 dolar/M, cache read için 1 dolar/M ve cache write için 12.5 dolar/M fiyat bilgisi görünüyor.',
      },
      {
        title: 'Veri Mimarı İçin Anlamı',
        body:
          'Bu haber özellikle ajan tabanlı yazılım üretimi, uzun bağlamlı analiz, araç kullanan otomasyonlar ve çok adımlı araştırma akışları için önemli. Vercel AI Gateway üzerinden provider yönlendirme yapılabilmesi, tek model entegrasyonunu farklı altyapılara dağıtmayı kolaylaştırıyor.',
      },
    ],
  },
  {
    slug: 'digital-garden-baslangic-notlari',
    title: 'Digital Garden Başlangıç Notları',
    excerpt: 'Seed aşamasındaki fikirlerin ürünleşme sürecine dönüşümü.',
    maturity: 'seed',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    sourceName: 'Veri Mimarı',
    sourceUrl: '/',
    tags: ['Digital Garden', 'Ürünleşme', 'Not Sistemi'],
    highlights: [
      'Fikirleri tek seferlik yazı yerine gelişen notlar olarak ele al.',
      'Seed, growing ve evergreen ayrımıyla içerik olgunluğunu görünür yap.',
    ],
    sections: [
      {
        title: 'Başlangıç',
        body:
          'Digital garden yaklaşımı, tamamlanmamış fikirleri de yayınlanabilir ve geliştirilebilir bilgi parçaları olarak ele alır.',
      },
    ],
  },
]

export function getFallbackBlogPost(slug: string) {
  return fallbackBlogPosts.find((post) => post.slug === slug)
}

export async function getBlogPostBySlug(slug: string) {
  const post = getFallbackBlogPost(slug)
  if (!post) return null

  const content = (post.sections || [])
    .map(
      (sec) =>
        `<section><h2>${sec.title}</h2><p>${sec.body}</p></section>`
    )
    .join('')

  return {
    ...post,
    content,
  }
}

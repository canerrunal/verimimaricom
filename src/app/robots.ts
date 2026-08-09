import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()
  const privatePaths = ['/studio/', '/api/', '/preview/', '/draft/', '/_internal/']

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
        ],
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

import type { MetadataRoute } from 'next'
import { fallbackJournalPosts } from '@/lib/blog'
import { guides } from '@/lib/guides'
import { glossaryTerms } from '@/lib/glossary'
import { demoCases } from '@/lib/cases'
import { metricComparisons } from '@/lib/comparisons'
import { getSiteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/araclar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/basabas-roas-hesaplayici`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/kar-marji-hesaplayici`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/indirim-karlilik-simulatoru`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/pazaryeri-komisyon-hesaplayici`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/e-ticaret-strateji-pazarlama-analizi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/urun-feed-saglik-kontrolu`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/yeni-musteri-cac-katki-ltv-hesaplayici`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/pazaryeri-reklam-karlilik-hesaplayici`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/yapay-zeka-gorunurluk-analizi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/araclar/iade-nedeni-yorum-sinyali`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/rehberler`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/rehberler/e-ticaret-karliligi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/rehberler/reklam-performansi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/rehberler/ai-otomasyon`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/rehberler/musteri-ekonomisi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/rehberler/donusum-optimizasyonu`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/rehberler/pazaryerleri`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/rehberler/veri-raporlama`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/rehberler/saas-teknoloji`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/sozluk`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.65,
    },
    {
      url: `${siteUrl}/projeler`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/vaka-analizleri`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/karsilastirmalar`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${siteUrl}/hakkinda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/bulten`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/gizlilik`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const guideRoutes: MetadataRoute.Sitemap = guides.map((post) => ({
    url: `${siteUrl}/rehberler/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: post.maturity === 'evergreen' ? 0.9 : 0.82,
  }))

  const blogRoutes: MetadataRoute.Sitemap = fallbackJournalPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: post.maturity === 'evergreen' ? 0.75 : 0.6,
  }))

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryTerms.map((item) => ({
    url: `${siteUrl}/sozluk/${item.slug}`,
    lastModified: new Date(item.reviewedAt),
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const caseRoutes: MetadataRoute.Sitemap = demoCases.map((item) => ({
    url: `${siteUrl}/vaka-analizleri/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.82,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = metricComparisons.map((item) => ({
    url: `${siteUrl}/karsilastirmalar/${item.slug}`,
    lastModified: new Date(item.reviewedAt),
    changeFrequency: 'monthly',
    priority: 0.82,
  }))

  return [
    ...staticRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...comparisonRoutes,
    ...caseRoutes,
    ...blogRoutes,
  ]
}

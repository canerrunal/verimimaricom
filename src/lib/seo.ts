export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://verimimari.com').replace(/\/$/, '')
}

export const brandProfile = {
  name: 'Caner Ünal',
  brand: 'Veri Mimarı',
  role: 'E-Ticaret Kârlılığı, Dijital Pazarlama Analitiği ve AI Otomasyonu Uzmanı',
  title: 'E-Ticaret Kârlılığı · Reklam Analitiği · AI Otomasyonu',
  description:
    'Veri Mimarı kurucusu Caner Ünal; e-ticaret kârlılığı, dijital pazarlama analitiği, reklam ölçümü ve yapay zekâ otomasyonu için çalışan karar sistemleri geliştirir.',
  email: 'hello@verimimari.com',
  image: '/opengraph-image',
  sameAs: ['https://github.com/caner8047-coder'],
}

export function getGlobalJsonLd(): Record<string, unknown>[] {
  const siteUrl = getSiteUrl()

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: brandProfile.name,
    alternateName: 'Caner Ünal · Veri Mimarı',
    jobTitle: brandProfile.role,
    description: brandProfile.description,
    url: `${siteUrl}/hakkinda`,
    image: `${siteUrl}${brandProfile.image}`,
    email: brandProfile.email,
    sameAs: brandProfile.sameAs,
    knowsAbout: [
      'E-ticaret danışmanlığı',
      'Dijital pazarlama stratejisi',
      'E-ticaret analitiği',
      'Başa baş ROAS',
      'Kârlılık ve katkı payı',
      'Yapay zekâ otomasyonu',
      'Müşteri ekonomisi, CAC ve LTV',
      'Pazaryeri ekonomisi',
      'Ürün verisi ve raporlama sistemleri',
      'ERP, CRM, SaaS ve özel yazılım entegrasyonları',
    ],
    worksFor: { '@id': `${siteUrl}#organization` },
    subjectOf: [
      {
        '@type': 'CollectionPage',
        name: 'Caner Ünal tarafından hazırlanan e-ticaret proje analizleri',
        url: `${siteUrl}/analizler`,
      },
      {
        '@type': 'CollectionPage',
        name: 'Caner Ünal tarafından hazırlanan e-ticaret rehberleri',
        url: `${siteUrl}/rehberler`,
      },
      {
        '@type': 'CollectionPage',
        name: 'Caner Ünal tarafından geliştirilen e-ticaret araçları',
        url: `${siteUrl}/araclar`,
      },
    ],
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: brandProfile.brand,
    url: siteUrl,
    description: brandProfile.description,
    image: `${siteUrl}${brandProfile.image}`,
    founder: { '@id': `${siteUrl}#person` },
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}#service`,
    name: 'E-Ticaret ve Dijital Pazarlama Danışmanlığı',
    description:
      'E-ticaret kârlılığı, reklam performansı, ölçüm altyapısı ve yapay zekâ otomasyonu için veri odaklı danışmanlık.',
    url: `${siteUrl}/e-ticaret-danismani`,
    provider: { '@id': `${siteUrl}#person` },
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    availableLanguage: ['tr-TR', 'en-US'],
    serviceType: [
      'E-ticaret danışmanlığı',
      'Dijital pazarlama danışmanlığı',
      'E-ticaret analitiği',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: `${brandProfile.brand} | ${brandProfile.name}`,
    url: siteUrl,
    inLanguage: ['tr-TR', 'en-US'],
    publisher: { '@id': `${siteUrl}#organization` },
  }

  return [person, organization, service, website]
}

export function getCaseStudyJsonLd(
  data: { title?: string; excerpt?: string; publishedAt?: string; industry?: string } | null,
  slug: string,
): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}/projeler/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data?.title || 'Case Study',
    description: data?.excerpt || 'Proje analizi içeriği',
    datePublished: data?.publishedAt || undefined,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: brandProfile.name,
    },
    publisher: {
      '@type': 'Organization',
      name: brandProfile.brand,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    about: ['Data Storytelling', data?.industry || 'Case Study'],
  }
}

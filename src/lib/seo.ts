export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://verimimari.com').replace(/\/$/, '')
}

export const brandProfile = {
  name: 'Caner Ünal',
  brand: 'Veri Mimarı',
  role: 'Yapay Zeka ve Veri Bilimi Uzmanı',
  title: 'Web Developer · E-ticaret · Grafik Tasarım · Dijital Pazarlama',
  description:
    'E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz araçlar, rehberler ve ürünler.',
  email: 'hello@verimimari.com',
  image: '/og/veri-mimari-og.png',
  sameAs: [
    'https://www.linkedin.com/in/caner-unal',
    'https://github.com/canerunal',
    'https://x.com/canerunal',
  ],
}

export function getGlobalJsonLd(): Record<string, unknown>[] {
  const siteUrl = getSiteUrl()

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: brandProfile.name,
    alternateName: brandProfile.brand,
    jobTitle: brandProfile.role,
    description: brandProfile.description,
    url: siteUrl,
    email: brandProfile.email,
    image: `${siteUrl}${brandProfile.image}`,
    sameAs: brandProfile.sameAs,
    knowsAbout: [
      'E-commerce Intelligence',
      'Data Analytics',
      'Break-even ROAS',
      'Profitability',
      'Artificial Intelligence',
    ],
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}#service`,
    name: 'Veri Mimarı Hizmetleri',
    url: siteUrl,
    provider: { '@id': `${siteUrl}#person` },
    areaServed: 'TR',
    availableLanguage: ['tr', 'en'],
    serviceType: [
      'E-commerce Analytics',
      'ROAS Calculators',
      'Growth Strategy',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: `${brandProfile.brand} | ${brandProfile.name}`,
    url: siteUrl,
    inLanguage: ['tr-TR', 'en-US'],
    publisher: { '@id': `${siteUrl}#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return [person, service, website]
}

export function getCaseStudyJsonLd(
  data: { title?: string; excerpt?: string; publishedAt?: string; industry?: string } | null,
  slug: string
): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}/projeler/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data?.title || 'Case Study',
    description: data?.excerpt || 'Vaka analizi içeriği',
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


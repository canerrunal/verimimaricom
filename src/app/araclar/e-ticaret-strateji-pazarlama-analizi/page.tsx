import type { Metadata } from 'next'
import { brandProfile, getSiteUrl } from '@/lib/seo'
import AnalyzerClient from './AnalyzerClient'
import { analyzerFaqs } from './faq'

const routePath = '/araclar/e-ticaret-strateji-pazarlama-analizi'
const pageTitle = 'E-Ticaret Strateji ve Pazarlama Analizi'
const pageDescription =
  'Ürün kârlılığı, ROAS, CPA, CPC, fiyat ve sabit giderlerinizi birlikte analiz edin; ürün bazında büyütme ve optimizasyon kararlarını görün.'
const pageUrl = `${getSiteUrl()}${routePath}`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'e-ticaret kârlılık analizi',
    'ürün kârlılığı hesaplama',
    'e-ticaret reklam analizi',
    'ROAS CPA CPC hesaplama',
    'e-ticaret strateji analizi',
  ],
  authors: [{ name: brandProfile.name, url: getSiteUrl() }],
  creator: brandProfile.name,
  publisher: brandProfile.name,
  alternates: {
    canonical: routePath,
  },
  openGraph: {
    title: pageTitle,
    description:
      'Çoklu ürün kârlılığını, reklam sınırlarını ve 30 günlük aksiyon planını tek ekranda hesaplayın.',
    type: 'website',
    locale: 'tr_TR',
    url: pageUrl,
    siteName: brandProfile.name,
    images: [
      {
        url: `${getSiteUrl()}/og/veri-mimari-og.png`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [`${getSiteUrl()}/og/veri-mimari-og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function EcommerceStrategyAnalysisPage() {
  const siteUrl = getSiteUrl()
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software`,
    name: pageTitle,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'E-commerce profitability and marketing analysis',
    operatingSystem: 'Web',
    url: pageUrl,
    inLanguage: 'tr-TR',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    description:
      'Çoklu ürün kârlılığı, reklam verimliliği, fiyatlandırma ve sabit gider analizi yapan ücretsiz e-ticaret karar aracı.',
    author: { '@type': 'Person', name: brandProfile.name, url: siteUrl },
    publisher: { '@type': 'Organization', name: brandProfile.name, url: siteUrl },
    featureList: [
      'Ürün kârlılığı ve katkı marjı analizi',
      'ROAS, CPA ve maksimum CPC sınırları',
      'Hedef marj için önerilen satış fiyatı',
      'Ürün sağlık puanı ve stratejik karar',
    ],
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Araçlar', item: `${siteUrl}/araclar` },
      { '@type': 'ListItem', position: 3, name: pageTitle, item: pageUrl },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: analyzerFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <AnalyzerClient />
    </>
  )
}

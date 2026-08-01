import type { Metadata } from 'next'
import AnalyzerClient from './AnalyzerClient'

export const metadata: Metadata = {
  title: 'E-Ticaret Strateji ve Pazarlama Analizi | Veri Mimarı',
  description:
    'Ürün kârlılığı, ROAS, CPA, CPC, fiyat ve sabit giderlerinizi birlikte analiz edin; ürün bazında büyütme ve optimizasyon kararlarını görün.',
  alternates: {
    canonical: '/araclar/e-ticaret-strateji-pazarlama-analizi',
  },
  openGraph: {
    title: 'E-Ticaret Strateji ve Pazarlama Analizi',
    description:
      'Çoklu ürün kârlılığını, reklam sınırlarını ve 30 günlük aksiyon planını tek ekranda hesaplayın.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function EcommerceStrategyAnalysisPage() {
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'E-Ticaret Strateji ve Pazarlama Analizi',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    description:
      'Çoklu ürün kârlılığı, reklam verimliliği, fiyatlandırma ve sabit gider analizi yapan ücretsiz e-ticaret karar aracı.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <AnalyzerClient />
    </>
  )
}

import type { Metadata } from 'next'
import AnalyzerClient from './AnalyzerClient'
import { aiVisibilityFaqs } from './faq'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Yapay Zekâ Görünürlük ve Teknik Hazırlık Ön Analizi',
  description:
    'Sitenizin teknik sinyallerini kontrol edin; markanızın OpenAI yanıtlarındaki görünürlüğünü dört markasız soruyla, ham kanıt ve kaynaklarla örnekleyin.',
  alternates: { canonical: '/araclar/yapay-zeka-gorunurluk-analizi' },
  openGraph: {
    title: 'AI Görünürlük ve Teknik Hazırlık Ön Analizi | Veri Mimarı',
    description:
      'Ana sayfa teknik sinyalini canlı OpenAI görünürlük örnekleminden ayırın; yanıtları ve kaynakları kanıtlarıyla inceleyin.',
    type: 'website',
  },
}

export default function AiVisibilityAnalysisPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Yapay Zekâ Görünürlük ve Teknik Hazırlık Ön Analizi',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${siteUrl}/araclar/yapay-zeka-gorunurluk-analizi`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description:
        'Ana sayfa teknik sinyallerini ve OpenAI cevaplarındaki marka görünürlüğü örneklemini ayrı değerlendiren beta analiz aracı.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: aiVisibilityFaqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyzerClient />
    </>
  )
}

// @ts-nocheck
import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import VeriBotChat from '@/components/veribot/VeriBotChat'
import VisitorCounter from '@/components/analytics/VisitorCounter'
import { brandProfile, getGlobalJsonLd, getSiteUrl } from '@/lib/seo'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veri Mimarı | E-ticaret Veri, AI ve Kârlılık Araçları',
    template: '%s | Veri Mimarı',
  },
  description:
    'E-ticaret reklam, ürün ve satış verilerinizi daha kârlı kararlara dönüştürün. Ücretsiz hesaplayıcılar, uygulanabilir rehberler ve AI araçları.',
  keywords: [
    'Veri Mimarı',
    'E-ticaret',
    'ROAS Hesaplama',
    'Kâr Marjı',
    'Dijital Pazarlama',
    'Yapay Zekâ',
    'Veri Analitiği',
    'E-ticaret Araçları',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    title: 'Veri Mimarı | E-ticaret Veri, AI ve Kârlılık Araçları',
    description: brandProfile.description,
    siteName: 'Veri Mimarı',
    images: [
      {
        url: brandProfile.image,
        width: 1200,
        height: 630,
        alt: 'Veri Mimarı - E-ticaret Veri, AI ve Kârlılık Araçları',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veri Mimarı | E-ticaret Veri, AI ve Kârlılık Araçları',
    description: brandProfile.description,
    images: [brandProfile.image],
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

export default function RootLayout({ children }: { children: any }) {
  const jsonLd = getGlobalJsonLd()

  return (
    <html lang="tr" className={jetbrains.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>
        {jsonLd.map((schema, index) => (
          <script
            key={`global-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <VisitorCounter />
        <VeriBotChat />
      </body>
    </html>
  )
}

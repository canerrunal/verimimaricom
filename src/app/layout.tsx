import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import VeriBotChat from '@/components/veribot/VeriBotChat'
import JsonLd from '@/components/common/JsonLd'
import { brandProfile, getGlobalJsonLd, getSiteUrl } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = getSiteUrl()
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'oTRvAIcqh7XPzyTuXHrgyk1UDwhZwVIdKSEVsEJvC8I'
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-3Z5PQ1P4CC'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veri Mimarı | E-Ticaret Veri ve Kârlılık Araçları',
    template: '%s | Veri Mimarı',
  },
  description:
    'E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz araçlar, rehberler ve ürünler.',
  keywords: [
    'Veri Mimarı',
    'Caner Ünal',
    'E-ticaret danışmanı',
    'E-ticaret uzmanı',
    'Dijital pazarlama uzmanı',
    'Dijital pazarlama danışmanlığı',
    'E-ticaret',
    'Başa Baş ROAS',
    'Reklam Analitiği',
    'Kârlılık',
    'Veri Analitiği',
    'Yapay Zeka',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    title: 'Veri Mimarı | Caner Ünal',
    description: brandProfile.description,
    siteName: 'Veri Mimarı',
    images: [
      {
        url: brandProfile.image,
        width: 1200,
        height: 630,
        alt: 'Veri Mimarı - Caner Ünal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veri Mimarı | Caner Ünal',
    description: brandProfile.description,
    images: [brandProfile.image],
  },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getGlobalJsonLd()

  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        {jsonLd.map((schema, index) => (
          <JsonLd key={`global-schema-${index}`} id={`global-schema-${index}`} data={schema} />
        ))}
        {children}
        <VeriBotChat />
      </body>
    </html>
  )
}

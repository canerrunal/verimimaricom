import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/gizlilik' },
  openGraph: { url: '/gizlilik', type: 'website' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}

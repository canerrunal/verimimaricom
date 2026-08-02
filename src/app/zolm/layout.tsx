import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/zolm' },
  openGraph: { url: '/zolm', type: 'website' },
}

export default function ZolmLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/is-birligi' },
  openGraph: { url: '/is-birligi', type: 'website' },
}

export default function CollaborationLayout({ children }: { children: React.ReactNode }) {
  return children
}

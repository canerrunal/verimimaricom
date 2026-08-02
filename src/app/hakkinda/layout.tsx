import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/hakkinda' },
  openGraph: { url: '/hakkinda', type: 'profile' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Üyelik Demo Akışı',
  robots: { index: false, follow: false, noarchive: true },
}

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children
}

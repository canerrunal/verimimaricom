import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membership Demo Flow',
  robots: { index: false, follow: false, noarchive: true },
}

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children
}

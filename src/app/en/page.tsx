import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import HeroPanel from '@/components/landing/HeroPanel'
import ProblemSection from '@/components/landing/ProblemSection'
import ToolsSection from '@/components/landing/ToolsSection'
import GuidesSection from '@/components/landing/GuidesSection'
import ProjectsSection from '@/components/landing/ProjectsSection'
import ProofSection from '@/components/landing/ProofSection'
import NewsletterSection from '@/components/landing/NewsletterSection'
import Footer from '@/components/landing/Footer'
import UtilityBar from '@/components/landing/UtilityBar'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'E-Commerce Data, AI and Profitability Tools',
  description:
    'Turn e-commerce advertising, product and sales data into profitable decisions with free calculators, practical guides and AI tools.',
  alternates: {
    canonical: '/en',
    languages: { 'tr-TR': '/', 'en-US': '/en', 'x-default': '/' },
  },
  openGraph: {
    title: 'E-Commerce Data, AI and Profitability Tools | Veri Mimarı',
    description: 'Free tools and practical methods for profitable e-commerce decisions.',
    url: '/en',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function HomePageEN() {
  const t = getDictionary('en')

  return (
    <main className="page" aria-label="Data Architect home page" data-locale={t.locale}>
      <UtilityBar />
      <NavBar t={t} />
      <HeroPanel t={t} />
      <ProblemSection t={t} />
      <ToolsSection t={t} />
      <GuidesSection t={t} />
      <ProjectsSection t={t} />
      <ProofSection t={t} />
      <NewsletterSection t={t} />
      <Footer t={t} />
    </main>
  )
}

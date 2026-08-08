import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import HeroPanel from '@/components/landing/HeroPanel'
import AnnouncementsSection from '@/components/landing/AnnouncementsSection'
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
  title: 'E-Ticaret Verisini Kârlı Kararlara Dönüştürün',
  description:
    'E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz hesaplayıcılar, uygulanabilir rehberler ve veri odaklı ürünler.',
  keywords: [
    'e-ticaret analitiği',
    'e-ticaret kârlılık araçları',
    'reklam performansı',
    'ROAS hesaplama',
    'veri odaklı karar',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'E-Ticaret Verisini Kârlı Kararlara Dönüştürün | Veri Mimarı',
    description: 'Kârlılık, reklam ve operasyon verisini tek bir karar sisteminde birleştirin.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Verisini Kârlı Kararlara Dönüştürün | Veri Mimarı',
    description: 'Ücretsiz araçlar, rehberler ve ürünlerle e-ticaret verisini karara dönüştürün.',
  },
}

export default async function HomePage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Veri Mimarı ana sayfa" data-locale={t.locale}>
      <UtilityBar />
      <NavBar t={t} />
      <HeroPanel t={t} />
      <AnnouncementsSection />
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

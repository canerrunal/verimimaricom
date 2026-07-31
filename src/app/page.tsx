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
import FloatingCursor from '@/components/landing/FloatingCursor'
import { getDictionary } from '@/lib/i18n'

export default async function HomePage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Veri Mimarı ana sayfa" data-locale={t.locale}>
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
      <FloatingCursor />
    </main>
  )
}

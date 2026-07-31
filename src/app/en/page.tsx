// @ts-nocheck
import NavBar from '@/components/landing/NavBar'
import HeroPanel from '@/components/landing/HeroPanel'
import ProblemSection from '@/components/landing/ProblemSection'
import ToolsSection from '@/components/landing/ToolsSection'
import GuidesSection from '@/components/landing/GuidesSection'
import ProjectsSection from '@/components/landing/ProjectsSection'
import CaseStudiesSection from '@/components/landing/CaseStudiesSection'
import FounderSection from '@/components/landing/FounderSection'
import NewsletterSection from '@/components/landing/NewsletterSection'
import FinalCtaSection from '@/components/landing/FinalCtaSection'
import CommandPalette from '@/components/navigation/CommandPalette'
import { getDictionary } from '@/lib/i18n'

export default async function HomePageEN() {
  const t = getDictionary('en')

  return (
    <main className="page" aria-label="Data Architect home page" data-locale={t.locale}>
      <NavBar t={t} />
      <HeroPanel t={t} />
      <ProblemSection t={t} />
      <ToolsSection t={t} />
      <GuidesSection t={t} />
      <ProjectsSection t={t} />
      <CaseStudiesSection t={t} />
      <FounderSection t={t} />
      <NewsletterSection t={t} />
      <FinalCtaSection t={t} />
      <CommandPalette />
    </main>
  )
}

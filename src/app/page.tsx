// @ts-nocheck
import NavBar from '@/components/landing/NavBar'
import HeroPanel from '@/components/landing/HeroPanel'
import BentoGrid from '@/components/landing/BentoGrid'
import PersonaQuickPaths from '@/components/landing/PersonaQuickPaths'
import CommandPalette from '@/components/navigation/CommandPalette'
import { getHomeCmsData } from '@/lib/cms'
import { getKnowledgeGraphData } from '@/lib/cms'
import KnowledgeGraph from '@/components/garden/KnowledgeGraph'
import { getDictionary } from '@/lib/i18n'

export default async function HomePage() {
  const cms = await getHomeCmsData()
  const graph = await getKnowledgeGraphData()
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Veri Mimarı ana sayfa" data-locale={t.locale}>
      <NavBar t={t} />
      <HeroPanel t={t} />
      <PersonaQuickPaths t={t} />
      <BentoGrid cms={cms} t={t} />

      <section
        id="knowledge-graph"
        className="garden-panel"
        aria-label={t.knowledgeGraph.sectionAriaLabel}
      >
        <div className="garden-head">
          <span className="eyebrow">{t.knowledgeGraph.eyebrow}</span>
          <h2>{t.knowledgeGraph.title}</h2>
          <p>{t.knowledgeGraph.description}</p>
          <div className="maturity-legend" aria-label={t.knowledgeGraph.maturityAriaLabel}>
            <span className="maturity-chip seed">Seed</span>
            <span className="maturity-chip growing">Growing</span>
            <span className="maturity-chip evergreen">Evergreen</span>
          </div>
        </div>
        <KnowledgeGraph graph={graph} />
      </section>
      <CommandPalette />
    </main>
  )
}


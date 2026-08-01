import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import GlossaryLibrary from '@/components/glossary/GlossaryLibrary'
import { getDictionary } from '@/lib/i18n'
import { glossaryTerms } from '@/lib/glossary'

export const metadata: Metadata = {
  title: 'E-Ticaret ve Reklam Sözlüğü',
  description: 'ROAS, MER, katkı payı, kâr marjı, CPA ve temel e-ticaret metriklerini formül ve örneklerle öğrenin.',
  alternates: { canonical: '/sozluk' },
}

export default function GlossaryPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />
      <section className="wrap hero single glossary-hero">
        <div className="crumb">SÖZLÜK / {glossaryTerms.length} TEMEL KAVRAM</div>
        <h1>E-ticaret metriklerini aynı dille konuşun.</h1>
        <p className="intro">Kısa tanımdan formüle, örnekten doğru karara ilerleyen bağımsız Türkçe e-ticaret sözlüğü.</p>
        <div className="actions-row">
          <a className="btn hero-primary" href="/rehberler/e-ticaret-karliligi">Kârlılık yoluna başla ↗</a>
          <a className="hero-link" href="/rehberler">Tüm rehberleri gör</a>
        </div>
      </section>
      <GlossaryLibrary />
      <Footer t={t} />
    </main>
  )
}

// @ts-nocheck
import TrackLink from '@/components/analytics/TrackLink'

export default function ProblemSection({ t }) {
  return (
    <section className="section" aria-label="Problem">
      <h2>{t.problem.title}</h2>
      <p className="section-description">{t.problem.description}</p>

      <div className="card-grid-3">
        {t.problem.cards.map((card: any, index: number) => (
          <article key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

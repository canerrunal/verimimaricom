export default function ProblemSection({ t }: { t: any }) {
  return (
    <section className="wrap strip">
      <div className="strip-title">KARLILIK NEDEN KAYBOLUYOR?</div>
      {t.problem.cards.map((item: any, idx: number) => (
        <div key={`problem-${idx}`} className="row">
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  )
}

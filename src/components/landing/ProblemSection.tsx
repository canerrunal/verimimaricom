export default function ProblemSection({ t }: { t: any }) {
  return (
    <section className="strip">
      <div className="wrap">
        <div className="strip-title">KARLILIK NEDEN KAYBOLUYOR?</div>
        <div className="strip-grid">
          {(t?.problem?.cards || []).map((item: any, idx: number) => (
            <div key={`problem-${idx}`} className="strip-item">
              <small>0{idx + 1}</small>
              <b>{item.title}</b>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

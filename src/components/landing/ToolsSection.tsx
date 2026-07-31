export default function ToolsSection({ t }: { t: any }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.tools.eyebrow}</span>
            <h2>{t.tools.title}</h2>
          </div>
          <p>{t.tools.description}</p>
        </div>
        <div className="tool-layout">
          <div className="tool-main">
            <span className="number">01 / ÜCRETSİZ</span>
            <h3>{t.tools.items[0].name}</h3>
            <p>{t.tools.items[0].description}</p>
            <a className="btn" href={t.tools.items[0].href}>{t.tools.items[0].cta} ↗</a>
          </div>
          <div className="tool-side">
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <span className="icon-box">📊</span>
              <h3>{t.tools.items[1].name}</h3>
              <p>{t.tools.items[1].description}</p>
              <a className="link" href={t.tools.items[1].href}>{t.tools.items[1].cta}</a>
            </div>
            <div className="tool-sm">
              <div className="indicator yellow"></div>
              <span className="icon-box">🎯</span>
              <h3>{t.tools.items[2].name}</h3>
              <p>{t.tools.items[2].description}</p>
              <a className="link" href={t.tools.items[2].href}>{t.tools.items[2].cta}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { guides } from '@/lib/guides'

export default function GuidesSection({ t }: { t: any }) {
  return (
    <section className="section-band band-paper">
      <div className="wrap section">
        <div className="head">
          <div>
            <span className="eyebrow">{t?.guides?.eyebrow || '/ 02 · REHBERLER'}</span>
            <h2>{t?.guides?.title || 'Metrikleri doğru okuyun.'}</h2>
          </div>
          <p>{t?.guides?.description || 'Uygulanabilir e-ticaret ve kârlılık rehberleri.'}</p>
        </div>

        <div className="grid">
          {guides.slice(0, 3).map((post, idx) => (
            <div key={post.slug} className="card">
              <span className="eyebrow">
                0{idx + 1} · {post.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'GELİŞEN REHBER'}
              </span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a className="link" href={`/rehberler/${post.slug}`}>
                Rehberi oku
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

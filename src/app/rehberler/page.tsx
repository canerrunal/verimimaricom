import type { Metadata } from 'next'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import { fallbackBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'E-Ticaret Rehberleri',
  description: 'E-ticaret kârlılığı, reklam metrikleri ve yapay zeka otomasyon rehberleri.',
}

export default function RehberlerPage() {
  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <span className="eyebrow">REHBERLER / E-TİCARET ZEKÂSI VE BÜYÜME</span>
        <h1>Uygulanabilir E-Ticaret ve Veri Rehberleri</h1>
        <p>Karmaşık pazarlama metriklerini, kârlılık dinamiklerini ve veri sistemlerini sadeleştiren rehberler.</p>
      </section>

      <section className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {fallbackBlogPosts.map((post) => (
          <a key={post.slug} href={`/rehberler/${post.slug}`} className="card glass" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <span className={`maturity-chip ${post.maturity || 'seed'}`}>
              {post.maturity === 'growing' ? 'GELİŞEN' : post.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'TASLAK'}
            </span>
            <h3 style={{ marginTop: '0.8rem' }}>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="card-cta" style={{ marginTop: 'auto' }}>Rehberi Oku →</span>
          </a>
        ))}
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/landing/NavBar'
import { getDictionary } from '@/lib/i18n'
import { fallbackBlogPosts, getBlogPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return fallbackBlogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Rehber Bulunamadı' }
  return { title: post.title, description: post.excerpt }
}

export default async function RehberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const t = getDictionary('tr')

  return (
    <main className="page">
      <NavBar t={t} />

      <section className="hero glass">
        <a href="/rehberler" className="card-cta" style={{ marginBottom: '1rem', display: 'inline-flex' }}>← Tüm Rehberlere Dön</a>
        <span className={`maturity-chip ${post.maturity || 'seed'}`}>
          {post.maturity === 'growing' ? 'GELİŞEN REHBER' : post.maturity === 'evergreen' ? 'TEMEL KAYNAK' : 'TASLAK'}
        </span>
        <h1 style={{ marginTop: '0.8rem' }}>{post.title}</h1>
        <p style={{ fontSize: '1.1rem' }}>{post.excerpt}</p>
      </section>

      <section className="glass" style={{ padding: '2rem', borderRadius: '1.25rem', lineHeight: '1.8', fontSize: '1rem' }}>
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p style={{ color: 'var(--text-1)' }}>Bu rehber yakında tam metin olarak güncellenecektir.</p>
        )}
      </section>
    </main>
  )
}

import { permanentRedirect } from 'next/navigation'

type PageProps = { params: Promise<{ slug: string }> }

export default async function LegacyAnalysisPage({ params }: PageProps) {
  const { slug } = await params
  permanentRedirect(`/analizler/${slug.replace(/-demo-vaka$/, '')}`)
}

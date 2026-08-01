import Link from 'next/link'
import { cookies } from 'next/headers'
import { hasActiveMembership } from '@/lib/membership'

export default async function PremiumGate({
  title = 'Premium İçerik',
  preview = 'Bu içerik sadece aktif üyeler için görüntülenebilir.',
  children,
}: {
  title?: string
  preview?: string
  children: any
}) {
  const jar = await cookies()
  const isMember = hasActiveMembership(jar)

  if (isMember) {
    return <>{children}</>
  }

  return (
    <section
      className="tool-sm"
      style={{ maxWidth: 500, margin: '40px auto' }}
      aria-label="Kilitli içerik"
    >
      <span className="tag yellow" style={{ marginBottom: 16 }}>
        PREMIUM İÇERİK
      </span>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 16 }}>{preview}</p>
      <Link className="btn" href="/uyelik">
        Üyeliği Aktifleştir ↗
      </Link>
    </section>
  )
}

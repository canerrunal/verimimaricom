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
    <section className="tool-sm" style={{ maxWidth: 500, margin: '40px auto' }} aria-label="Kilitli içerik kutusu">
      <div className="indicator yellow"></div>
      <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: 10, color: '#777', margin: '0 0 16px' }}>{preview}</p>
      <Link className="btn" href="/uyelik">
        Üyeliği Aktifleştir ↗
      </Link>
    </section>
  )
}

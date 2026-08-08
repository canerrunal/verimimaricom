export type AnnouncementStat = {
  label: string
  value: string
  detail: string
}

export type AnnouncementSection = {
  id: string
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type Announcement = {
  slug: string
  eyebrow: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  image: string
  imageAlt: string
  source: string
  sourceNote: string
  stats: AnnouncementStat[]
  sections: AnnouncementSection[]
}

export const announcements: Announcement[] = [
  {
    slug: 'kargo-tarifesi-10-agustos-2026',
    eyebrow: 'KARGO TARİFESİ / 10 AĞUSTOS 2026',
    title: 'Kargo zammını yüzdeyle okumak yetmez.',
    excerpt: 'Hangi deside ne kadar kâr kaybettiğinize bakın.',
    category: 'Operasyon ve kârlılık',
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    readingTime: '4 dk',
    image: '/duyurular/kargo-tarifesi-10-agustos-2026.png',
    imageAlt: 'PTT ve TEX kargo tarifesi değişikliklerini özetleyen Veri Mimarı görseli',
    source: 'Trendyol kargo tarifeleri · 16.07.2026 vs 10.08.2026',
    sourceNote:
      'Paylaşılan oranlar KDV hariç tarife karşılaştırmasına dayanır. KDV dahil ek yük, sipariş ekonomisi hesabında ayrıca ele alınmalıdır.',
    stats: [
      { label: 'PTT / 6 DESİ', value: '+%13,10', detail: 'Küçük desilerde ayrışan artış' },
      { label: 'PTT / 7 DESİ', value: '+%14,16', detail: 'Operasyon karmasında kritik eşik' },
      { label: 'TEX / 30 DESİ', value: '+%9,63', detail: '328,88 TL → 360,55 TL' },
      { label: 'KDV DAHİL', value: '+≈38 TL', detail: 'Tek TEX gönderisindeki yaklaşık ek yük' },
    ],
    sections: [
      {
        id: 'tek-oran-degil',
        heading: 'Tarife tek oranlı değil.',
        paragraphs: [
          'Trendyol’un 10 Ağustos 2026 tarifesi, PTT tarafında tek oranlı bir fiyat güncellemesi getirmiyor. Özellikle küçük ve orta desilerde maliyet artışı ciddi şekilde ayrışıyor.',
        ],
        bullets: [
          'PTT 6 desi → +%13,10',
          'PTT 7 desi → +%14,16',
          '10–100 desi bandında artış büyük ölçüde %8 civarında ilerliyor.',
        ],
      },
      {
        id: 'tex-degisikligi',
        heading: 'TEX fiyatlarını da hesaba katın.',
        paragraphs: [
          'Tarifenin gözden kaçabilecek ikinci tarafı TEX fiyatlarının da değişmesi. 30 deside 328,88 TL olan ücret 360,55 TL’ye çıkıyor: tek gönderide +31,67 TL, yani +%9,63.',
          'KDV dahil edildiğinde tek gönderideki ek yük yaklaşık 38 TL’ye ulaşıyor.',
        ],
      },
      {
        id: 'siparis-ekonomisi',
        heading: 'Buradan sonrası yüzde hesabı değil, sipariş ekonomisi.',
        paragraphs: [
          'Operasyonunuz ağırlıklı olarak 6–7 desi siparişlerden oluşuyorsa bütçeyi “kargoya %8 zam geldi” varsayımıyla güncellemek maliyeti eksik hesaplamak demek.',
          'Satış fiyatınız aynı kaldığında bu para doğrudan katkı payınızdan çıkar.',
        ],
        bullets: [
          'Ayda 100 adet 30 desi TEX gönderisi → yaklaşık 3.800 TL ek maliyet',
          'Ayda 500 gönderi → yaklaşık 19.000 TL ek maliyet',
          'Ayda 1.000 gönderi → yaklaşık 38.000 TL ek maliyet',
        ],
      },
      {
        id: 'karar-listesi',
        heading: 'Tarife değişince hangi kararlar yeniden hesaplanmalı?',
        paragraphs: [
          'Kargo maliyetini yalnızca operasyon ekibinin konusu olarak görmeyin. Yeni tarife, ticari karar tablosunun birkaç satırını aynı anda değiştirir.',
        ],
        bullets: [
          'Ürün bazlı kârlılık',
          'Kampanya marjı',
          'Ücretsiz kargo eşiği',
          'Başa baş ROAS',
          'Reklam için ayırabileceğiniz maksimum tutar',
        ],
      },
      {
        id: 'barem-alti',
        heading: 'Bir detay: barem altı uygulaması.',
        paragraphs: [
          'Barem altı uygulamasına dahil gönderiler ana tarife üzerinden faturalandırılmıyor. Bu nedenle doğru analiz “Kargo ne kadar zamlandı?” sorusuyla bitmiyor.',
          'Asıl soru şu: “Benim sipariş karmamda yeni tarife, sipariş başına katkı payını kaç TL düşürüyor?”',
        ],
      },
    ],
  },
]

export function getAnnouncement(slug: string) {
  return announcements.find((announcement) => announcement.slug === slug)
}

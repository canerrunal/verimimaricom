export const dictionaries = {
  tr: {
    locale: 'tr',
    basePath: '/',
    nav: {
      ariaLabel: 'Ana Navigasyon',
      brandAriaLabel: 'Veri Mimarı ana sayfa',
      brandText: 'VERİ MİMARI',
      links: [
        { href: '/araclar', label: 'Araçlar' },
        { href: '/rehberler', label: 'Rehberler' },
        { href: '/yapay-zeka', label: 'Yapay Zekâ' },
        { href: '/duyurular', label: 'Duyurular' },
        { href: '/analizler', label: 'Analizler' },
        { href: '/projeler', label: 'Projeler' },
        { href: '/hakkinda', label: 'Hakkında' },
      ],
      commandCenterLabel: 'Komuta Merkezi',
      languageSwitch: {
        trLabel: 'TR',
        enLabel: 'EN',
        trHref: '/',
        enHref: '/en',
      },
    },
    hero: {
      eyebrow: 'Veri Mimarı · Strateji + Ürün + Yapay Zeka',
      title: 'Veriyi ölçülebilir büyüme çıktısına dönüştüren dijital ürün ve AI çözümleri',
      description:
        'Caner Ünal; e-ticaret kârlılığı, dijital pazarlama analitiği ve yapay zekâ otomasyonunu çalışan karar sistemlerine dönüştürür.',
      ctaAriaLabel: 'Öne çıkan aksiyonlar',
      featuredCases: 'Öne Çıkan Analizler',
      featuredCasesHref: '#projeler',
      premiumAccess: 'Premium İçeriklere Eriş',
      premiumAccessHref: '/uyelik',
      badgeAriaLabel: 'Uzmanlık etiketleri',
      commandCenterLabel: 'Komuta Merkezi',
    },
    persona: {
      sectionAriaLabel: 'Persona bazlı hızlı geçişler',
      cards: [
        {
          eyebrow: 'Recruiter Path',
          title: 'Teknik Profili 60 Saniyede Değerlendir',
          description:
            'Yetkinlik özetleri, analiz derinliği ve çalışma yaklaşımını hızlıca inceleyin.',
          href: '#yetkinlik',
          cta: 'Teknik Özeti Gör',
          eventName: 'persona_recruiter_path_click',
        },
        {
          eyebrow: 'Business Path',
          title: 'İş Etkisi Üreten Çözümleri İncele',
          description:
            'Dönüşüm odaklı analizlere, metrik etkilerine ve premium içerik akışına erişin.',
          href: '#projeler',
          cta: 'Analiz Sonuçlarını Gör',
          eventName: 'persona_business_path_click',
        },
        {
          eyebrow: 'Builder Path',
          title: 'Teknik Laboratuvar ve Notlara Geç',
          description:
            'Canlı prototipler, mimari notlar ve Digital Garden içerikleriyle derine inin.',
          href: '/labs',
          cta: "Labs'i Aç",
          eventName: 'persona_builder_path_click',
        },
      ],
    },
    bento: {
      ariaLabel: 'Bento modüler ana panel',
      projects: {
        title: 'Öne Çıkan Dönüşüm Analizleri',
        description: 'Gerçek problem, uygulanan çözüm ve ölçülebilir etki sonuçlarını inceleyin.',
        allCasesCta: 'Tüm Analizleri Gör',
      },
      blog: {
        title: 'Digital Garden Yazıları',
        description: 'Veri hikayeciliği, ürün geliştirme ve AI uygulamaları üzerine son notlar.',
        cta: 'Yazıları Keşfet',
        ctaHref: '/labs',
      },
      skills: {
        title: 'Teknoloji Yığını ve Yetkinlik Haritası',
        description: 'Projelerde kullanılan araçlar, diller ve platformlar tek bakışta.',
      },
      labs: {
        title: 'Canlı Laboratuvar ve Prototipler',
        description: 'Model demoları, hızlı deneyler ve ürünleşmeye hazır prototip yayınları.',
        cta: 'Laboratuvara Git',
        ctaHref: '/labs',
      },
      resources: {
        title: 'Doküman ve Kaynak Merkezi',
        description: 'Sunumlar, raporlar ve operasyonel dokümanlar için düzenli kaynak alanı.',
      },
      contact: {
        title: 'İş Birliği ve Danışmanlık',
        description:
          'Yeni ürün geliştirme, veri odaklı dönüşüm ve AI entegrasyonu için iletişime geçin.',
        cta: 'İş Birliği Başlat',
      },
      maturity: {
        seed: 'Seed',
        growing: 'Growing',
        evergreen: 'Evergreen',
      },
    },
    problem: {
      cards: [
        {
          title: 'Yanlış ROAS Hedefi',
          description:
            'Katkı payını hesaba katmadan verilen reklam kararları kâr erimesine yol açar.',
        },
        {
          title: 'Gizli Maliyetler',
          description: 'Kargo, iade ve komisyon maliyetlerinin ürün bazında izlenememesi.',
        },
        {
          title: 'Verisiz Kararlar',
          description: 'Sezgisel pazarlama harcamaları ve ölçülemeyen kampanya sonuçları.',
        },
      ],
    },
    knowledgeGraph: {
      sectionAriaLabel: 'Dijital Bahçe bilgi grafiği',
      eyebrow: 'Digital Garden · Knowledge Graph',
      title: 'Blog ve Notlar Arası Organik Bilgi Ağı',
      description:
        'Düğümler içerikleri, çizgiler içerikler arası ilişkileri temsil eder. Bir düğüme tıklayarak ilgili yazıya geçiş yapabilirsiniz.',
      maturityAriaLabel: 'İçerik olgunluk seviyeleri',
    },
  },
  en: {
    locale: 'en',
    basePath: '/en',
    problem: {
      cards: [
        {
          title: 'Wrong ROAS Target',
          description:
            'Ad spend decisions made without accounting for contribution margin lead to profit erosion.',
        },
        {
          title: 'Hidden Overhead',
          description:
            'Unmonitored shipping, return, and marketplace commission costs at the SKU level.',
        },
        {
          title: 'Intuition-Based Spend',
          description:
            'Unmeasured marketing expenditure driven by guesswork instead of hard metrics.',
        },
      ],
    },
    nav: {
      ariaLabel: 'Main navigation',
      brandAriaLabel: 'Veri Mimarı home page',
      brandText: 'DATA ARCHITECT',
      links: [
        { href: '/araclar', label: 'Tools' },
        { href: '/rehberler', label: 'Guides' },
        { href: '/duyurular', label: 'Announcements' },
        { href: '/sozluk', label: 'Glossary' },
        { href: '/projeler', label: 'Projects' },
        { href: '/analizler', label: 'Case Studies' },
        { href: '/hakkinda', label: 'About' },
      ],
      commandCenterLabel: 'Command Center',
      languageSwitch: {
        trLabel: 'TR',
        enLabel: 'EN',
        trHref: '/',
        enHref: '/en',
      },
    },
    hero: {
      eyebrow: 'Data Architect · Strategy + Product + AI',
      title: 'Digital products and AI solutions that turn data into measurable growth outcomes',
      description:
        'Caner Ünal turns e-commerce profitability, digital marketing analytics, and AI automation into working decision systems.',
      ctaAriaLabel: 'Primary actions',
      featuredCases: 'Featured Case Studies',
      featuredCasesHref: '#projeler',
      premiumAccess: 'Access Premium Content',
      premiumAccessHref: '/en/uyelik',
      badgeAriaLabel: 'Expertise tags',
      commandCenterLabel: 'Command Center',
    },
    persona: {
      sectionAriaLabel: 'Persona-based quick paths',
      cards: [
        {
          eyebrow: 'Recruiter Path',
          title: 'Evaluate the technical profile in 60 seconds',
          description: 'Quickly review skill summaries, case depth, and working approach.',
          href: '#yetkinlik',
          cta: 'View Technical Summary',
          eventName: 'persona_recruiter_path_click',
        },
        {
          eyebrow: 'Business Path',
          title: 'Explore solutions with business impact',
          description: 'Access conversion-focused case studies, metric outcomes, and premium flow.',
          href: '#projeler',
          cta: 'View Business Impact',
          eventName: 'persona_business_path_click',
        },
        {
          eyebrow: 'Builder Path',
          title: 'Jump into labs and technical notes',
          description:
            'Go deeper with live prototypes, architecture notes, and Digital Garden content.',
          href: '/en/labs',
          cta: 'Open Labs',
          eventName: 'persona_builder_path_click',
        },
      ],
    },
    bento: {
      ariaLabel: 'Bento modular homepage panel',
      projects: {
        title: 'Featured Transformation Case Studies',
        description: 'Review real problems, delivered solutions, and measurable outcomes.',
        allCasesCta: 'View All Case Studies',
      },
      blog: {
        title: 'Digital Garden Articles',
        description: 'Latest notes on data storytelling, product development, and applied AI.',
        cta: 'Discover Articles',
        ctaHref: '/en/labs',
      },
      skills: {
        title: 'Tech Stack and Capability Map',
        description: 'Tools, languages, and platforms used across projects at a glance.',
      },
      labs: {
        title: 'Live Labs and Prototypes',
        description: 'Model demos, rapid experiments, and product-ready prototype drops.',
        cta: 'Go to Labs',
        ctaHref: '/en/labs',
      },
      resources: {
        title: 'Documents and Resource Hub',
        description: 'A structured space for decks, reports, and operational documentation.',
      },
      contact: {
        title: 'Collaboration and Advisory',
        description: 'Reach out for product development, data transformation, and AI integration.',
        cta: 'Start Collaboration',
      },
      maturity: {
        seed: 'Seed',
        growing: 'Growing',
        evergreen: 'Evergreen',
      },
    },
    knowledgeGraph: {
      sectionAriaLabel: 'Digital Garden knowledge graph',
      eyebrow: 'Digital Garden · Knowledge Graph',
      title: 'An organic knowledge network across blogs and notes',
      description:
        'Nodes represent content and links represent relationships between content. Click a node to navigate to the related article.',
      maturityAriaLabel: 'Content maturity levels',
    },
  },
}

export function getDictionary(locale: string) {
  if (String(locale).toLowerCase() === 'en') return dictionaries.en
  return dictionaries.tr
}

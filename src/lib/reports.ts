export type BenchmarkRow = {
  segment: string
  margin: string
  returnRate: string
  breakEvenRoas: string
  mer: string
  signal: string
}

export type TechnicalReportMetric = {
  label: string
  value: string
  note: string
}

export type TechnicalReportSection = {
  id: string
  eyebrow: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type TechnicalReport = {
  category: string
  readingTime: string
  testDate: string
  outcome: string
  metrics: TechnicalReportMetric[]
  architecture: { label: string; title: string; detail: string }[]
  sections: TechnicalReportSection[]
  methodology: string[]
  limitations: string[]
  sources: { name: string; url: string; note: string }[]
  relatedGuides: { title: string; href: string }[]
  relatedTools: { title: string; href: string }[]
}

export type BenchmarkReport = {
  slug: string
  title: string
  description: string
  publishedAt: string
  reviewedAt: string
  status: string
  sample: string
  methodology: string[]
  headline: { label: string; value: string; note: string }[]
  rows: BenchmarkRow[]
  decisions: { signal: string; meaning: string; action: string }[]
  limitations: string[]
  sources: { name: string; url: string; note: string }[]
  relatedGuides: { title: string; href: string }[]
  relatedTools: { title: string; href: string }[]
  kind?: 'benchmark' | 'technical'
  technical?: TechnicalReport
}

export const benchmarkReports: BenchmarkReport[] = [
  {
    slug: 'turkiye-e-ticaret-karlilik-nabzi-2026',
    title: 'Türkiye E-Ticaret Kârlılık Nabzı 2026',
    description:
      'Ürün marjı, iade oranı, başabaş ROAS ve MER arasındaki ilişkiyi açıkça etiketlenmiş simülasyon verisiyle inceleyen benchmark notu.',
    publishedAt: '2026-08-02',
    reviewedAt: '2026-08-02',
    status: 'Simülasyon benchmarkı · gerçek pazar ortalaması değildir',
    sample: '5 ürün ekonomisi senaryosu · 12 aylık planlama varsayımı · açık yöntem',
    methodology: [
      'Her senaryoda satış fiyatı, değişken maliyet, beklenen iade etkisi ve reklam gideri aynı para biriminde tanımlandı.',
      'Başabaş ROAS, reklam öncesi katkı marjının tersinden; MER, toplam gelir ÷ toplam pazarlama harcaması olarak hesaplandı.',
      'Değerler gerçek işletmelerden toplanmış pazar ortalaması değildir. Kullanıcı kendi muhasebe ve reklam verisiyle yeniden hesaplamalıdır.',
      'Amaç tek bir “iyi oran” ilan etmek değil, oranların ürün ekonomisiyle nasıl hareket ettiğini görünür kılmaktır.',
    ],
    headline: [
      { label: 'Orta senaryo başabaş ROAS', value: '3,1x', note: 'Katkı marjı %32 varsayımı' },
      { label: 'Yüksek iade etkisi', value: '+0,8x', note: 'Başabaş eşiğinde simüle artış' },
      { label: 'Planlama sinyali', value: 'MER + katkı', note: 'Tek başına ROAS yerine' },
    ],
    rows: [
      {
        segment: 'Yüksek marj / düşük iade',
        margin: '%45',
        returnRate: '%4',
        breakEvenRoas: '2,2x',
        mer: '5,0x',
        signal: 'Ölçekleme alanı geniş',
      },
      {
        segment: 'Orta marj / düşük iade',
        margin: '%32',
        returnRate: '%6',
        breakEvenRoas: '3,1x',
        mer: '4,2x',
        signal: 'Kontrollü büyüme',
      },
      {
        segment: 'Orta marj / yüksek iade',
        margin: '%25',
        returnRate: '%14',
        breakEvenRoas: '4,0x',
        mer: '3,4x',
        signal: 'İade ve ürün deneyimini çöz',
      },
      {
        segment: 'Düşük marj / düşük iade',
        margin: '%18',
        returnRate: '%4',
        breakEvenRoas: '5,6x',
        mer: '2,6x',
        signal: 'İndirim ve CPA baskısı',
      },
      {
        segment: 'Düşük marj / yüksek iade',
        margin: '%10',
        returnRate: '%18',
        breakEvenRoas: '10,0x',
        mer: '1,8x',
        signal: 'Kampanya öncesi yeniden fiyatla',
      },
    ],
    decisions: [
      {
        signal: 'ROAS hedefi başabaş eşiğin altında',
        meaning: 'Atfedilen gelir iyi görünse de reklam sonrası katkı negatif olabilir.',
        action: 'Bütçeyi artırmadan ürün marjı, teklif ve iade etkisini yeniden hesapla.',
      },
      {
        signal: 'ROAS sabit, MER düşüyor',
        meaning: 'Platform atfı korunurken şirket düzeyi toplam verimlilik bozuluyor olabilir.',
        action: 'Organik gelir, diğer kanallar ve tam pazarlama gideriyle uzlaştır.',
      },
      {
        signal: 'İade oranı yükseliyor',
        meaning:
          'Gelecekte gerçekleşecek maliyet bugünkü kampanya kararını olduğundan iyi gösterir.',
        action: 'Beklenen iade etkisini sipariş ekonomisine ekle ve ürün deneyimini incele.',
      },
    ],
    limitations: [
      'Senaryolar gerçek işletme örneklemi değildir; pazar payı veya sektör ortalaması iddiası taşımaz.',
      'Vergi, sabit gider, stok sermayesi, ödeme vadesi ve kanal bazlı atıf farkları kapsam dışıdır.',
      'Başabaş ROAS kârlılık eşiğidir; büyüme hedefi, nakit ihtiyacı ve müşteri yaşam boyu değeri ayrıca değerlendirilmelidir.',
      'Türkiye’de kategori, platform, sezon ve sözleşme koşulları değiştiği için değerler doğrudan kopyalanmamalıdır.',
    ],
    sources: [
      {
        name: 'T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü',
        url: 'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
        note: 'Pazar bağlamı için başvurulabilecek resmî kaynak; bu simülasyonun veri seti değildir.',
      },
      {
        name: 'Veri Mimarı — Başabaş ROAS yöntemi',
        url: '/rehberler/basabas-roas-nasil-hesaplanir',
        note: 'Hesaplama tanımı ve ekonomik eşik açıklaması.',
      },
    ],
    relatedGuides: [
      { title: 'E-ticaret kârlılığı: baştan sona rehber', href: '/rehberler/e-ticaret-karliligi' },
      {
        title: 'ROAS yüksekken kâr neden düşebilir?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      {
        title: 'İade oranı kârlılık hesabına nasıl eklenir?',
        href: '/rehberler/iade-orani-karlilik-hesabina-nasil-eklenir',
      },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      {
        title: 'Kampanya Öncesi Marj Kontrol Listesi',
        href: '/sablonlar/kampanya-oncesi-marj-kontrol-listesi',
      },
    ],
  },
  {
    slug: 'iki-mac-mini-m4-qwen38-27b-exo-mlx',
    title: 'İki Mac mini M4 ile Qwen3.8-27B: Çalışıyor; peki sürdürülebilir mi?',
    description:
      'İki base Mac mini M4 16 GB’ı Thunderbolt 4 ve EXO ile birleştirerek Qwen3.8-27B 4-bit modeli gerçek bir inference iş yükünde test ettik. Model çalıştı; ancak yaklaşık 6 tok/s, swap ve uzun yükte 90°C üzeri sıcaklıklar “sığıyor” ile “verimli çalışıyor” arasındaki farkı gösterdi.',
    publishedAt: '2026-08-31',
    reviewedAt: '2026-08-31',
    status: 'Gerçek cihaz ölçümü · simülasyon değildir · akademik benchmark değildir',
    sample: '2 × base Mac mini M4 16 GB · EXO + MLX · Thunderbolt 4',
    kind: 'technical',
    technical: {
      category: 'AI / Apple Silicon / Dağıtık inference',
      readingTime: '16 dk',
      testDate: '29–30 Ağustos 2026',
      outcome: 'Proof-of-concept başarılı; sürekli günlük kullanım için önerilmiyor.',
      metrics: [
        {
          label: 'GENERATION',
          value: '≈6,0 tok/s',
          note: 'Kısa testlerde gözlenen aralık: 5,9–6,1 tok/s',
        },
        {
          label: 'THUNDERBOLT 4',
          value: '≈37,7 Gbit/s',
          note: 'Teorik 40 Gbit/s sınırının yaklaşık %94’ü',
        },
        {
          label: 'UZUN PROMPT TTFT',
          value: '≈83 s',
          note: 'Uzun prompt testlerinden görülen ağır örnek',
        },
        {
          label: 'BELLEK / NODE',
          value: '12,5–14+ GB',
          note: '16 GB unified memory içinde, node başına gözlem',
        },
        {
          label: 'SWAP',
          value: '≈1,2 GB',
          note: 'İki node’da normal ağır test ölçümü',
        },
        {
          label: 'UZUN YÜK SICAKLIĞI',
          value: '>90°C',
          note: 'Thermal throttling kesin olarak kanıtlanmadı',
        },
      ],
      architecture: [
        {
          label: '01 / NODE 1',
          title: 'İlk model shard’ı',
          detail: 'Instance’a göre layer 0–32 veya 0–26 aralığı; Mac 1 üzerinde.',
        },
        {
          label: '02 / LINK',
          title: 'Thunderbolt 4 hattı',
          detail: 'Doğrudan Thunderbolt Bridge, yaklaşık 0,439 ms RTT ve 37,7 Gbit/s iperf3.',
        },
        {
          label: '03 / NODE 2',
          title: 'İkinci model shard’ı',
          detail: 'Kalan katmanlar Mac 2 üzerinde; gözlenen placement 33/31 ve 27/37 oldu.',
        },
        {
          label: '04 / DECODE',
          title: 'Tek akış üretim',
          detail: 'İki node aynı token üretim zincirinin farklı katmanlarını sırayla işledi.',
        },
      ],
      sections: [
        {
          id: 'soru',
          eyebrow: '01 / SORU',
          title: 'İki ayrı 16 GB node, tek bir 32 GB makine değildir.',
          paragraphs: [
            'Deneyin başlangıç sorusu basitti: Tek bir bilgisayara sığmayan 27B sınıfı bir modeli iki Apple Silicon cihazın belleğini kullanarak çalıştırabilir miyiz?',
            'Cevap evet; fakat iki Mac’in belleği işletim sistemi açısından tek bir 32 GB unified memory havuzuna dönüşmüyor. Her node kendi 16 GB belleğine, GPU’suna, işletim sistemine ve runtime’ına sahip. EXO’nun yaptığı fiziksel belleği birleştirmek değil, modelin katmanlarını node’lara bölmek.',
          ],
        },
        {
          id: 'kurulum',
          eyebrow: '02 / KURULUM',
          title: 'Test sistemi: iki base M4, EXO ve MLX Ring.',
          paragraphs: [
            'Her iki cihaz da 10 çekirdek CPU, 10 çekirdek GPU, 16 GB unified memory ve 256 GB SSD içeren base Mac mini M4’tü. Model olarak mlx-community/Qwen3.8-27B-4bit, dağıtım için EXO + MLX kullanıldı.',
            'EXO aynı namespace içinde iki node ile başlatıldı. Sharding stratejisi Pipeline, instance ise MLX Ring’di. RDMA kullanılmadı. Test build’ine Qwen3.8 ve hibrit SSM/attention pipeline sharding için hazırlanan açık EXO PR’larındaki düzeltmeler dahil edildi.',
          ],
          bullets: [
            'Model: 27B parametre, 64 language-model layer, 4-bit MLX dönüşümü, yaklaşık 16,1 GB paket.',
            'Qwen3.8 mimarisi: Gated DeltaNet linear-attention ve full-attention katmanlarını birlikte kullanıyor.',
            'EXO branch: qwen38-m4x2 · test HEAD: df2112a71765ef772b7d2f6bd4dd15225f8c7729.',
          ],
        },
        {
          id: 'baglanti',
          eyebrow: '03 / AĞ',
          title: 'Thunderbolt darboğazın kolay açıklaması olmadı.',
          paragraphs: [
            'İki Mac’i Wi-Fi veya Ethernet yerine doğrudan Thunderbolt 4 üzerinden bağladık. Ping yaklaşık 0,439 ms RTT, iperf3 ise dört paralel stream ile yaklaşık 37,7 Gbit/s gerçek throughput verdi.',
            'Bu değer teorik 40 Gbit/s sınırının yaklaşık %94’ü. Bu nedenle düşük token hızını kötü kablo veya yavaş bir ağ bağlantısıyla açıklamak mümkün değil. Yerel node belleği ile node’lar arası aktarımın aynı maliyete sahip olmadığı ise değişmiyor: Apple’ın base M4 için belirttiği 120 GB/s local unified-memory bant genişliği ile ölçülen yaklaşık 4,7 GB/s ağ throughput’u farklı ölçekler.',
          ],
        },
        {
          id: 'iki-node',
          eyebrow: '04 / DOĞRULAMA',
          title: 'Model gerçekten iki Mac’te çalıştı.',
          paragraphs: [
            'EXO dashboard bazı anlarda Mac 1’i %0 yükte gösterdi. Tek başına bu telemetry görüntüsü modelin yalnızca Mac 2’de çalıştığı izlenimini verebilirdi.',
            'Bunu EXO /state çıktısı, macmon ve cihaz seviyesinde GPU, güç ve sıcaklık gözlemleriyle çapraz kontrol ettik. İki node da modelin farklı shard’larını hesapladı; Mac 2’de bir uzun cevap sırasında yaklaşık %100 GPU kullanımı ve 1578 MHz civarı GPU frekansı gözlendi.',
          ],
        },
        {
          id: 'performans',
          eyebrow: '05 / PERFORMANS',
          title: '6 tok/s kullanılabilir; akıcı bir agent sistemi değil.',
          paragraphs: [
            'Kısa ve orta uzunluktaki chat testlerinde generation değeri 5,9–6,1 tok/s çevresinde kaldı. Rapor için temsilî sonucu yaklaşık 6,0 tok/s olarak alıyoruz. Model Türkçe cevap, HTML, Python/FastAPI kodu ve uzun çıktılar üretebildi; yani yalnızca belleğe yüklenmiş bir model değil, gerçek inference gerçekleştirdi.',
            'Ancak uzun promptlarda ilk token süresi ayrı bir sorun olarak ortaya çıktı. Bir ağır örnekte TTFT yaklaşık 83 saniyeydi. Prefill, KV cache, pipeline senkronizasyonu ve bellek tahsisleri uzadıkça generation hızı benzer kalsa bile kullanıcı deneyimi belirgin biçimde ağırlaşıyor.',
          ],
        },
        {
          id: 'bellek-termal',
          eyebrow: '06 / SINIR',
          title: 'Asıl sınır model dosyasından sonra başlıyor.',
          paragraphs: [
            'İki cihazda tipik RAM kullanımı node başına 12,5–14+ GB seviyesine çıktı. Yaklaşık 1,2 GB swap iki node’da da gözlendi; Mac 1’in daha ağır bir durumunda 2,7–3 GB seviyesine ulaşan anlar oldu.',
            'Unified memory avantajlı çünkü CPU ve GPU aynı fiziksel havuza erişiyor; fakat bu havuz macOS, tarayıcı, EXO, Metal allocations, KV cache ve diğer uygulamalarla paylaşılıyor. Uzun inference sırasında 90°C üzeri sıcaklıklar gördük. Bu tek başına hasar veya thermal throttling kanıtı değildir; ancak sistemin 7/24 agent sunucusu olarak ne kadar ağır bir rejime girdiğini gösterir.',
          ],
        },
        {
          id: 'pipeline',
          eyebrow: '07 / MİMARİ',
          title: 'İki node, tek istekte otomatik olarak 2× hız demiyor.',
          paragraphs: [
            'Pipeline sharding’in birincil kazancı kapasite. Aynı tokenın tamamlanması için ilk shard’ın ve ikinci shard’ın kendi katmanlarını bitirmesi gerekiyor; iki Mac iki bağımsız cevap üretmiyor.',
            'Bu yüzden sistemin sonucu “model tek 16 GB node’a sığmadığı halde çalıştı” şeklinde okunmalı. İki node’u bağlamak tek-stream decode hızını iki katına çıkarmadı. Fit, fast ve sustainable üç farklı değerlendirme.',
          ],
        },
        {
          id: 'karar',
          eyebrow: '08 / KARAR',
          title: 'Proof-of-concept başarılı; sürekli kullanım için zayıf.',
          paragraphs: [
            'Bu konfigürasyonu uzun süreli günlük kullanım için önermiyoruz. Model çalışıyor, iki node aktif ve bağlantı sağlıklı; fakat yaklaşık 6 tok/s, yüksek bellek baskısı, swap, uzun promptlarda yüksek TTFT ve 90°C üzeri uzun yük sıcaklıkları bir araya geliyor.',
            'İki Mac’i tek 27B model için pipeline’a bağlamak yerine, iki ayrı küçük/orta modelle iki ayrı işi paralel yürütmek daha verimli olabilir: bir node reasoning veya ana agent, diğer node coding, scraping ya da tool worker. Bu, özellikle agentic sistemlerde toplam throughput’u artırma ihtimali daha yüksek bir mimari.',
          ],
        },
      ],
      methodology: [
        'İki özdeş base Mac mini M4 16 GB doğrudan Thunderbolt 4 ile bağlandı; statik Thunderbolt Bridge ve özel bir namespace kullanıldı.',
        'iperf3 dört paralel stream ile, ping doğrudan node adresleri arasında ölçüldü; ağ sonucunu EXO inference gözlemlerinden ayrı değerlendirdik.',
        'EXO Pipeline Sharding + MLX Ring ile iki node çalıştırıldı; RDMA/JACCL kullanılmadı.',
        'Model yerleşimi EXO /state çıktısı ile; GPU, güç ve sıcaklık macmon ile; bellek pressure ve swap macOS araçlarıyla kontrol edildi.',
        '6,0 tok/s değeri standartlaştırılmış akademik benchmark değil, gerçek chat workload’larında 5,9–6,1 tok/s bandında gözlenen temsilî generation sonucudur.',
      ],
      limitations: [
        'Bu çalışma kontrollü akademik benchmark değil, gerçek dünya mühendislik deneyidir.',
        'İki node’un macOS build’leri test sırasında birebir aynı değildi; dashboard’da mismatch uyarısı görüldü.',
        'Mac 1 günlük kullanım cihazıydı ve arka planda tarayıcı, AnyDesk, geliştirme araçları ve diğer uygulamalar çalışıyordu.',
        'Ortam sıcaklığı, fan RPM’i ve prizden çekilen toplam güç harici ölçüm cihazıyla standartlaştırılmadı.',
        'Thermal throttling kesin olarak kanıtlanmadı; 90°C üzeri değer yalnızca gözlenen termal yükü ifade ediyor.',
        'Prompt uzunlukları aynı değildi ve final sonuç için standart EXO exo-bench serisi tamamlanmadı.',
        'EXO tarafında Qwen3.8 desteği test döneminde aktif geliştirme aşamasındaydı.',
      ],
      sources: [
        {
          name: 'Qwen — Qwen3.8-27B model kartı',
          url: 'https://huggingface.co/Qwen/Qwen3.8-27B',
          note: '27B parametre, 64 layer, 262.144 native context ve hibrit attention düzeni için resmî model kaynağı.',
        },
        {
          name: 'mlx-community — Qwen3.8-27B-4bit',
          url: 'https://huggingface.co/mlx-community/Qwen3.8-27B-4bit',
          note: 'Testte kullanılan MLX dönüşümünün modeli ve yaklaşık 16,1 GB paket boyutunu doğrulayan kaynak.',
        },
        {
          name: 'Apple Support — Mac mini (2024) teknik özellikleri',
          url: 'https://support.apple.com/en-us/121555',
          note: 'Base M4 için 10-core CPU, 10-core GPU, 16 GB unified memory, 120 GB/s bandwidth ve Thunderbolt 4 özellikleri.',
        },
        {
          name: 'MLX — Unified Memory dokümantasyonu',
          url: 'https://ml-explore.github.io/mlx/build/html/usage/unified_memory.html',
          note: 'Apple Silicon’da CPU ve GPU’nun aynı unified memory havuzuna eriştiğini açıklayan resmî dokümantasyon.',
        },
        {
          name: 'EXO — dağıtık inference deposu',
          url: 'https://github.com/exo-explore/exo',
          note: 'EXO’nun model sharding, node koordinasyonu ve inference yaklaşımı için proje kaynağı.',
        },
        {
          name: 'EXO PR #2264 ve PR #2265',
          url: 'https://github.com/exo-explore/exo/pull/2264',
          note: 'Test build’inde değerlendirilen hibrit SSM/attention pipeline corruption ve Qwen3.8 EOS düzeltmeleri; test tarihinde açık PR durumundaydı.',
        },
        {
          name: 'EXO PR #2265 — Qwen3.8 EOS düzeltmesi',
          url: 'https://github.com/exo-explore/exo/pull/2265',
          note: 'Qwen3.8 EOS token ID ve model yükleme düzeltmesinin ayrı kaynak kaydı.',
        },
      ],
      relatedGuides: [
        { title: 'AI ve otomasyon rehberleri', href: '/rehberler/ai-otomasyon' },
        { title: 'Yapay zekâ laboratuvarı', href: '/yapay-zeka/model-laboratuvari' },
      ],
      relatedTools: [
        { title: 'Yapay zekâ görünürlük analizi', href: '/araclar/yapay-zeka-gorunurluk-analizi' },
        { title: 'Veri Asistanı', href: '/araclar/veri-asistani' },
      ],
    },
    headline: [
      { label: 'Generation', value: '≈6,0 tok/s', note: '5,9–6,1 tok/s gözlendi' },
      { label: 'Thunderbolt 4', value: '≈37,7 Gbit/s', note: 'Gerçek iperf3 throughput’u' },
      { label: 'Uzun yük', value: '>90°C', note: 'Termal baskı gözlendi' },
    ],
    rows: [
      { segment: 'Model placement', margin: '33 / 31', returnRate: '—', breakEvenRoas: '27 / 37', mer: 'layer', signal: 'Dinamik' },
      { segment: 'Generation', margin: '—', returnRate: '5,9–6,1', breakEvenRoas: '≈6,0', mer: 'tok/s', signal: 'Temsilî' },
      { segment: 'Uzun prompt TTFT', margin: '—', returnRate: '—', breakEvenRoas: '≈83', mer: 'saniye', signal: 'Ağır örnek' },
      { segment: 'Bellek / node', margin: '16 GB', returnRate: '12,5–14+', breakEvenRoas: 'GB', mer: 'unified', signal: 'Yüksek baskı' },
      { segment: 'Uzun inference', margin: '—', returnRate: '>90°C', breakEvenRoas: '—', mer: 'swap var', signal: 'Sürdürülebilir değil' },
    ],
    decisions: [
      {
        signal: 'Model iki node’a sığıyor',
        meaning: 'EXO katmanları iki fiziksel Mac’e bölerek gerçek inference üretebildi.',
        action: 'Kapasite kazanımını tek akış decode hızından ayrı değerlendir.',
      },
      {
        signal: 'Generation yaklaşık 6 tok/s',
        meaning: 'Sistem kullanılabilir cevap veriyor ancak akıcı agent deneyimi sunmuyor.',
        action: 'Uzun prompt, TTFT ve görev süresini token hızının yanında ölç.',
      },
      {
        signal: 'Bellek ve termal baskı yüksek',
        meaning: 'Sığma, uzun süreli production uygunluğu anlamına gelmiyor.',
        action: '7/24 kullanım yerine iki node’u ayrı işlere bölmeyi test et.',
      },
    ],
    methodology: [
      'İki base Mac mini M4 16 GB doğrudan Thunderbolt 4 ile bağlandı.',
      'EXO Pipeline Sharding + MLX Ring ile iki node çalıştırıldı.',
      'GPU, güç, sıcaklık, memory pressure ve swap cihaz seviyesinde izlendi.',
      'Generation sonucu gerçek chat workload’larından ölçüldü.',
    ],
    limitations: [
      'Kontrollü akademik benchmark değildir.',
      'macOS build’leri test sırasında birebir aynı değildi.',
      'Ortam, güç ve fan koşulları laboratuvar standardında kontrol edilmedi.',
      'Thermal throttling kesin olarak kanıtlanmadı.',
    ],
    sources: [
      {
        name: 'Qwen — Qwen3.8-27B model kartı',
        url: 'https://huggingface.co/Qwen/Qwen3.8-27B',
        note: 'Model mimarisi ve kapasite bilgileri.',
      },
      {
        name: 'Apple Support — Mac mini (2024)',
        url: 'https://support.apple.com/en-us/121555',
        note: 'Base M4 teknik özellikleri.',
      },
      {
        name: 'EXO — dağıtık inference deposu',
        url: 'https://github.com/exo-explore/exo',
        note: 'Sharding ve node koordinasyonu.',
      },
    ],
    relatedGuides: [
      { title: 'AI ve otomasyon rehberleri', href: '/rehberler/ai-otomasyon' },
      { title: 'Yapay zekâ laboratuvarı', href: '/yapay-zeka/model-laboratuvari' },
    ],
    relatedTools: [
      { title: 'Yapay zekâ görünürlük analizi', href: '/araclar/yapay-zeka-gorunurluk-analizi' },
      { title: 'Veri Asistanı', href: '/araclar/veri-asistani' },
    ],
  },
]

export function getBenchmarkReport(slug: string) {
  return benchmarkReports.find((item) => item.slug === slug)
}

export const aiVisibilityFaqs = [
  {
    question: 'AI görünürlük analizi neyi ölçer?',
    answer:
      'Beta sürüm, dört markasız soruya ücretsiz ChatGPT ve Perplexity web oturumlarında aldığınız ve manuel olarak yapıştırdığınız yanıtlarda markanın anılma, sıra ve kaynak gösterilme sinyallerini örnekler. Ana sayfa teknik sinyali bu sonuçtan ayrı gösterilir.',
  },
  {
    question: 'Bu sonuç ChatGPT veya Gemini uygulamasında herkesin gördüğü sonucu temsil eder mi?',
    answer:
      'Hayır. Manuel benchmark yalnızca sizin yapıştırdığınız yanıtlara dayanır. Sonuçlar konum, zaman, model sürümü, kullanıcı bağlamı ve arama moduna göre değişebilir.',
  },
  {
    question: 'Bu araç ücretli AI API çağrısı yapar mı?',
    answer:
      'Hayır. Teknik ön analiz Veri Mimarı sunucusunda çalışır; AI görünürlük hesabı ise ücretsiz web oturumlarından sizin getirdiğiniz yanıtlarla tarayıcınızda yapılır. OpenAI, Perplexity veya başka bir sağlayıcı API’sine ücretli istek gönderilmez.',
  },
  {
    question: 'Ön analiz sırasında hangi veriler kontrol edilir?',
    answer:
      'Herkese açık ana sayfanın erişimi, title, meta açıklama, H1, canonical, robots.txt, sitemap.xml ve temel JSON-LD türleri kontrol edilir. Bu hızlı kontrol tüm siteyi taramaz ve giriş gerektiren alanlara erişmez.',
  },
  {
    question: 'Düşük görünürlük puanı ne anlama gelir?',
    answer:
      'Yalnızca ölçülen geçerli cevaplarda markanın az anıldığını gösterir. “Hiçbir yapay zekâ markayı tanımıyor” anlamına gelmez; örneklem ve güven aralığıyla birlikte yorumlanmalıdır.',
  },
  {
    question: 'Araç AI platformlarında sıralama garantisi verir mi?',
    answer:
      'Hayır. Araç ölçüm, kanıt ve öncelik üretir; üçüncü taraf AI platformlarında anılma, kaynak seçimi veya sıralama garantisi vermez.',
  },
] as const

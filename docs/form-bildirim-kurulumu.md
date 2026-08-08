# Form kayıt ve e-posta bildirimi kurulumu

Geri bildirim widget'ı ve iş birliği formu aynı sunucu akışını kullanır:

1. Gönderim sunucu tarafında doğrulanır ve hız sınırından geçirilir.
2. Kayıt Supabase'e yazılır.
3. Resend üzerinden `verimimaridestek@gmail.com` adresine bildirim gönderilir.
4. E-posta sonucu Supabase kaydındaki `notification_status` alanına yazılır.

## 1. Supabase şemasını oluşturun

Supabase projesindeki **SQL Editor** ekranında
[`supabase/migrations/202608040001_submissions.sql`](../supabase/migrations/202608040001_submissions.sql)
dosyasını çalıştırın.

Kayıtları Supabase panelindeki **Table Editor** bölümünde şu tablolardan görebilirsiniz:

- `feedback_submissions`
- `contact_submissions`

Tablolarda RLS açıktır ve tarayıcı rolleri için doğrudan erişim kapalıdır. Yazma işlemleri yalnızca
sunucu tarafındaki service role anahtarıyla yapılır.

## 2. Resend gönderici alan adını doğrulayın

Resend üzerinde `verimimari.com` alan adını doğrulayın ve bu alan adına ait bir gönderici adresi
belirleyin. Örnek: `Veri Mimarı <bildirim@verimimari.com>`.

## 3. Vercel ortam değişkenlerini ekleyin

Production, Preview ve gerekiyorsa Development ortamlarına aşağıdaki değişkenleri ekleyin:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NOTIFICATION_FROM_EMAIL
NOTIFICATION_TO_EMAIL=verimimaridestek@gmail.com
```

Anahtarları `NEXT_PUBLIC_` önekiyle tanımlamayın. Service role ve Resend anahtarları yalnızca
sunucuda bulunmalıdır.

## 4. Yeniden deploy edin

Ortam değişkenleri kaydedildikten sonra projeyi yeniden deploy edin. Başarılı bir gönderimde:

- form kullanıcıya teşekkür durumunu gösterir,
- Supabase kaydı oluşur,
- `notification_status` değeri `sent` olur,
- bildirim destek e-posta kutusuna ulaşır.

E-posta sağlayıcısı geçici olarak hata verirse kayıt kaybolmaz; Supabase'te kalır ve
`notification_status = failed` olarak işaretlenir.

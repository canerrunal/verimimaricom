import { describe, expect, it } from 'vitest'
import { analyzeProductFeed, parseProductFeed } from '@/lib/feed-health'

const healthyFeed = `item_id,title,description,url,image_url,price,availability,brand,gtin
SKU-1,Koşu Ayakkabısı Siyah 42,"Su geçirmez saya ve destekli tabana sahip günlük koşu ayakkabısı.",https://example.com/sku-1,https://example.com/sku-1.jpg,1299.90 TRY,in_stock,Örnek,8691234567890
SKU-2,Koşu Ayakkabısı Mavi 41,"Nefes alan file yüzeyi ve darbe emici tabanıyla hafif koşu ayakkabısı.",https://example.com/sku-2,https://example.com/sku-2.jpg,1199.90 TRY,out_of_stock,Örnek,8691234567891`

describe('feed health parser', () => {
  it('quoted semicolon-delimited descriptions are parsed', () => {
    const parsed = parseProductFeed('id;title;description\n1;Ürün;"Pamuklu; hafif ürün"')
    expect(parsed.delimiter).toBe(';')
    expect(parsed.rows[0].description).toBe('Pamuklu; hafif ürün')
  })

  it('scores a complete common feed highly', () => {
    const result = analyzeProductFeed(healthyFeed)
    expect(result.score).toBeGreaterThanOrEqual(95)
    expect(result.rowCount).toBe(2)
    expect(result.criticalCount).toBe(0)
    expect(result.platforms[0].score).toBe(100)
  })

  it('finds duplicate ids and malformed prices', () => {
    const result = analyzeProductFeed(
      `${healthyFeed}\nSKU-2,Kısa,"Eksik ama satır var",notaurl,notaimage,99,in stock,Örnek,`,
    )
    expect(result.issues.some((issue) => issue.id === 'duplicate-id')).toBe(true)
    expect(result.issues.some((issue) => issue.id === 'invalid-price')).toBe(true)
    expect(result.score).toBeLessThan(95)
  })
})

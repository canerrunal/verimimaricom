import { describe, expect, it } from 'vitest'
import { parseContactSubmission, parseFeedbackSubmission } from './submission-validation'

describe('submission validation', () => {
  it('normalizes a valid feedback submission', () => {
    expect(
      parseFeedbackSubmission({
        toolName: ' Kâr Marjı Hesaplayıcı ',
        vote: 'yes',
        comment: ' Faydalı oldu. ',
        pagePath: '/araclar/kar-marji-hesaplayici',
      }),
    ).toEqual({
      ok: true,
      data: {
        toolName: 'Kâr Marjı Hesaplayıcı',
        vote: 'yes',
        comment: 'Faydalı oldu.',
        pagePath: '/araclar/kar-marji-hesaplayici',
      },
    })
  })

  it('rejects feedback without a supported vote', () => {
    expect(parseFeedbackSubmission({ toolName: 'Araç', vote: 'maybe' })).toEqual({
      ok: false,
      error: 'vote-required',
    })
  })

  it('normalizes a valid contact submission', () => {
    const result = parseContactSubmission({
      name: ' Ada Yılmaz ',
      email: ' ADA@EXAMPLE.COM ',
      projectType: 'Genel Danışmanlık',
      budget: '50.000 TL - 100.000 TL',
      message: 'Bir proje konuşmak istiyorum.',
      pagePath: '/is-birligi',
      website: '',
    })

    expect(result).toMatchObject({
      ok: true,
      data: { name: 'Ada Yılmaz', email: 'ada@example.com' },
    })
  })

  it('rejects an invalid contact email', () => {
    expect(
      parseContactSubmission({
        name: 'Ada Yılmaz',
        email: 'yanlis-adres',
        projectType: 'Genel Danışmanlık',
        budget: '50.000 TL - 100.000 TL',
      }),
    ).toEqual({ ok: false, error: 'valid-email-required' })
  })
})

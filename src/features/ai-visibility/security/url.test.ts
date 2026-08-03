import { describe, expect, it } from 'vitest'
import { isPublicIp } from './url'

describe('AI visibility URL security', () => {
  it.each(['127.0.0.1', '10.0.0.1', '169.254.169.254', '192.168.1.1', '::1', 'fc00::1'])(
    'rejects private address %s',
    (address) => expect(isPublicIp(address)).toBe(false),
  )

  it.each(['1.1.1.1', '8.8.8.8', '2606:4700:4700::1111'])('accepts public address %s', (address) =>
    expect(isPublicIp(address)).toBe(true),
  )
})

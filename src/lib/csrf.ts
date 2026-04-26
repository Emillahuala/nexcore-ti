/**
 * CSRF token utilities (server-side only).
 * Tokens are HMAC-SHA256 signed with CSRF_SECRET to prevent forgery.
 */

const SECRET = process.env.CSRF_SECRET ?? 'dev-secret-change-in-production'

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

/** Generate a signed CSRF token: `<random>.<hmac>` */
export async function generateCsrfToken(): Promise<string> {
  const random = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  const key  = await getKey()
  const sig  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(random))
  const hex  = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')

  return `${random}.${hex}`
}

/** Verify a token matches its HMAC signature */
export async function verifyCsrfToken(token: string): Promise<boolean> {
  try {
    const [random, hex] = token.split('.')
    if (!random || !hex) return false

    const key      = await getKey()
    const expected = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(random))
    const expectedHex = Array.from(new Uint8Array(expected))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Constant-time comparison to prevent timing attacks
    if (expectedHex.length !== hex.length) return false
    let diff = 0
    for (let i = 0; i < expectedHex.length; i++) {
      diff |= expectedHex.charCodeAt(i) ^ hex.charCodeAt(i)
    }
    return diff === 0
  } catch {
    return false
  }
}

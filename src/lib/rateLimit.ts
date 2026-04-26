/**
 * In-memory rate limiter for API routes.
 * Pairs with the DB-level check_contact_rate_limit() function.
 *
 * NOTE: The in-memory store resets on each cold start. For multi-region
 * deployments, use Upstash Redis or rely solely on the DB rate limit.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS  = Number(process.env.RATE_LIMIT_WINDOW_MS  ?? 600_000) // 10 min
const MAX_REQS   = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 5)

/** Hash an IP address with SHA-256 for privacy-safe rate limiting */
export async function hashIp(ip: string): Promise<string> {
  const data   = new TextEncoder().encode(ip)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Returns true if the request is allowed, false if rate-limited */
export function checkRateLimit(key: string): boolean {
  const now   = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_REQS) return false

  entry.count++
  return true
}

/** Prune expired entries to avoid unbounded memory growth */
export function pruneStore(): void {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key)
  }
}

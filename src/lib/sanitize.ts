/**
 * Escapes HTML entities to prevent XSS injection.
 * Use on all user-supplied strings before storing or rendering.
 */
export function sanitize(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/** Strips all HTML tags, useful for plain-text storage */
export function stripTags(input: unknown): string {
  return String(input ?? '').replace(/<[^>]*>/g, '')
}

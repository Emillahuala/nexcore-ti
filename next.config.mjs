
const isDev = process.env.NODE_ENV !== 'production';
const csp = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000"
    : "script-src 'self' 'unsafe-inline'",
  isDev
    ? "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:3000 blob:"
    : "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
  isDev
    ? "font-src 'self' https://fonts.gstatic.com data:"
    : "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  isDev
    ? "connect-src 'self' ws://localhost:3000 https://*.supabase.co"
    : "connect-src 'self' https://*.supabase.co",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy',   value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig

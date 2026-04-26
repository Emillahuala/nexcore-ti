import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NexCore TI — Tecnología que Genera Resultados',
  description:
    'Soluciones TI de alto impacto: automatización de procesos, SEO, marketing digital y desarrollo de software a medida. Transforma tu empresa con tecnología que genera ROI real.',
  keywords: 'automatización, SEO, marketing digital, desarrollo software, soluciones TI, ROI, España',
  authors: [{ name: 'NexCore TI' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'NexCore TI — Tecnología que Genera Resultados',
    description: 'Soluciones TI de alto impacto para empresas en crecimiento.',
    siteName: 'NexCore TI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Hydration fix: forcibly remove 'hidden' class from <html> on client */}
        <script src="/fix-hydration.js" suppressHydrationWarning />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  )
}

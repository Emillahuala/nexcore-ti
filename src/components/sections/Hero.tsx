'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { HERO, HERO_METRICS, TRUST_LOGOS } from '@/data/content'

const Rain3DCanvas = dynamic(() => import('@/components/ui/Rain3DCanvas'), { ssr: false })
const ParticlesCanvas = dynamic(() => import('@/components/ui/ParticlesCanvas'), { ssr: false })

const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 28 },
  animate:  { opacity: 1, y: 0  },
  transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
})

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-headline"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Fondo azul principal */}
      <div className="absolute inset-0" aria-hidden="true" style={{ pointerEvents: 'none', backgroundColor: '#000000' }}>
        <ParticlesCanvas />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--grad-hero)', opacity: 0.2, mixBlendMode: 'overlay', zIndex: 1 }}
        />
        {/* Lluvia 3D solo sobre el fondo negro, debajo de overlays */}
        <div className="absolute inset-0" style={{ zIndex: 2, opacity: 1 }}>
          <Rain3DCanvas />
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
            zIndex: 3,
          }}
        />
        {/* Glows */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full -top-32 -left-32 blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #0F2035, transparent 70%)', zIndex: 4 }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full bottom-0 right-1/4 blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #173252, transparent 70%)', zIndex: 4 }}
        />
      </div>

      <div className="section-container relative z-10 w-full py-24">
        <div className="flex items-center gap-16">
          {/* Content */}
          <div className="flex-1 max-w-[620px]">
            {/* Badge */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-teal-accent border border-teal-accent/30 bg-teal-accent/5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-accent animate-pulse" aria-hidden="true" />
                {HERO.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              id="hero-headline"
              className="text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[1.1] text-white mb-6"
            >
              {HERO.headline}{' '}
              <span className="gradient-text">{HERO.headlineGradient}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-[clamp(1.0625rem,2vw,1.25rem)] text-text-secondary leading-relaxed mb-10"
            >
              {HERO.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-14">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-[15px] rounded-full text-base font-semibold text-white bg-grad-brand shadow-brand hover:-translate-y-0.5 hover:shadow-glow transition-all no-underline"
              >
                {HERO.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-[15px] rounded-full text-base font-semibold border border-border-accent text-blue-action hover:bg-blue-action/10 transition-all no-underline"
              >
                {HERO.ctaSecondary}
              </a>
            </motion.div>

            {/* Metrics */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {HERO_METRICS.map(m => (
                <AnimatedCounter key={m.label} target={m.count} unit={m.unit} label={m.label} />
              ))}
            </motion.div>
          </div>

          {/* 3D Rain removido del contenido principal, ahora ocupa toda la sección */}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">{HERO.scrollLabel}</span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-action to-transparent" />
      </div>
    </section>
  )
}

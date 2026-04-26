'use client'

import { motion } from 'framer-motion'
import CardTilt      from '@/components/ui/CardTilt'
import SectionHeader from '@/components/ui/SectionHeader'
import { ABOUT, DIFFERENTIATORS } from '@/data/content'
import Rain3DCanvas from '../ui/Rain3DCanvas'

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#000] overflow-hidden" aria-labelledby="about-title">
      {/* Fondo lluvia 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain3DCanvas />
      </div>
      <div className="section-container relative z-10">

        {/* Intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0,0,.2,1] }}
          >
            <SectionHeader
              tag={ABOUT.sectionTag}
              title={
                <>
                  {ABOUT.headline}{' '}
                  <span className="gradient-text">{ABOUT.headlineGradient}</span>
                </>
              }
              align="left"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0,0,.2,1], delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-[1.0625rem] text-text-secondary leading-relaxed">
                {p}
              </p>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 w-fit mt-2 px-6 py-3 rounded-full text-sm font-semibold border border-[var(--border-accent)] text-blue-action hover:bg-blue-action/10 transition-all no-underline"
            >
              {ABOUT.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </motion.div>
        </div>

        {/* Differentiators (Carousel loop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 select-none overflow-hidden flex gap-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="flex shrink-0 animate-marquee gap-5">
            {[...DIFFERENTIATORS, ...DIFFERENTIATORS].map((d, i) => (
              <div
                key={`${d.title}-${i}`}
                className="w-[280px] sm:w-[320px] shrink-0"
              >
                <CardTilt className="h-full flex flex-col gap-3 p-6 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-bg-card hover:border-[var(--border-accent)] transition-all duration-250">
                  <div className="w-8 h-8 rounded-lg bg-blue-action/10 border border-blue-action/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-action" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{d.title}</h3>
                  <p className="text-[0.8125rem] text-text-secondary leading-relaxed">{d.description}</p>
                </CardTilt>
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="flex shrink-0 animate-marquee gap-5"
          >
            {[...DIFFERENTIATORS, ...DIFFERENTIATORS].map((d, i) => (
              <div
                key={`copy-${d.title}-${i}`}
                className="w-[280px] sm:w-[320px] shrink-0"
              >
                <CardTilt className="h-full flex flex-col gap-3 p-6 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-bg-card hover:border-[var(--border-accent)] transition-all duration-250">
                  <div className="w-8 h-8 rounded-lg bg-blue-action/10 border border-blue-action/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-action" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{d.title}</h3>
                  <p className="text-[0.8125rem] text-text-secondary leading-relaxed">{d.description}</p>
                </CardTilt>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

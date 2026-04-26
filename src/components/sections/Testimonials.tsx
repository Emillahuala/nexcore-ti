'use client'

import { motion } from 'framer-motion'
import CardTilt        from '@/components/ui/CardTilt'
import SectionHeader   from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/data/content'
import dynamic from "next/dynamic"

// Evita problemas SSR con canvas / three.js
const Rain3DCanvas = dynamic(() => import('../ui/Rain3DCanvas'), {
  ssr: false,
})

export default function Testimonials() {
  return (
    <section className="py-24 bg-black relative overflow-hidden" aria-label="Testimonios de clientes">
      
      {/* 🌧️ Fondo lluvia */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain3DCanvas />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          tag="Resultados Reales"
          title={
            <>
              Lo que dicen quienes ya{' '}
              <span className="gradient-text">transformaron su empresa</span>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.55, ease: [0,0,.2,1], delay: i * 0.1 }}
            >
              <CardTilt className="h-full flex flex-col gap-6 p-8 rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-bg-card hover:border-[var(--border-accent)] transition-all duration-250">
                
                <span className="text-7xl font-black leading-none text-blue-action/20 select-none">
                  &ldquo;
                </span>

                <blockquote className="text-[0.9375rem] text-text-secondary leading-relaxed flex-1 -mt-8">
                  {t.quote}
                </blockquote>

                <div className="px-4 py-3 rounded-xl bg-blue-action/[.08] border border-blue-action/20 text-center">
                  <span className="text-2xl font-black gradient-text">{t.metric.value}</span>
                  <span className="text-xs text-text-muted ml-1 block">{t.metric.label}</span>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-white/[.06]">
                  <div className="w-10 h-10 rounded-full bg-grad-brand flex items-center justify-center text-white text-sm font-bold">
                    {t.author.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{t.author.name}</p>
                    <p className="text-xs text-text-muted">{t.author.role}, {t.author.company}</p>
                  </div>
                </div>

              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
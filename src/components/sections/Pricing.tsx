'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardTilt      from '@/components/ui/CardTilt'
import SectionHeader from '@/components/ui/SectionHeader'
import { PRICING_PLANS, PRICING_GUARANTEE } from '@/data/content'
import Rain3DCanvas from '../ui/Rain3DCanvas'

type Cycle = 'monthly' | 'annual'

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>('monthly')

  return (
    <section id="pricing" className="relative py-24 bg-[#000] overflow-hidden" aria-labelledby="pricing-title">
      {/* Fondo lluvia 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain3DCanvas />
      </div>
      <div className="section-container relative z-10">
        <SectionHeader
          tag="Planes y Precios"
          title={
            <>
              Inversión clara,{' '}
              <span className="gradient-text">retorno medible</span>
            </>
          }
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <button
            onClick={() => setCycle('monthly')}
            aria-pressed={cycle === 'monthly'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              cycle === 'monthly'
                ? 'bg-grad-brand text-white shadow-brand'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setCycle('annual')}
            aria-pressed={cycle === 'annual'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              cycle === 'annual'
                ? 'bg-grad-brand text-white shadow-brand'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Anual
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-accent/20 text-teal-accent">
              -20%
            </span>
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6 items-stretch max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => {
            const price = cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0,0,.2,1], delay: i * 0.1 }}
                className="h-full w-full md:w-[350px] lg:w-[380px]"
              >
                <CardTilt
                  className={[
                    'relative h-full flex flex-col gap-6 p-8 rounded-[var(--r-xl)] border transition-all duration-250',
                    plan.featured
                      ? 'border-blue-action/50 bg-gradient-to-br from-navy-brand/30 to-blue-action/10 hover:border-blue-action hover:shadow-glow md:-translate-y-2'
                      : 'border-[var(--border-subtle)] bg-bg-card hover:border-[var(--border-accent)]',
                  ].join(' ')}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-grad-brand text-white shadow-brand whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                      {plan.tag}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${plan.id}-${cycle}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="text-4xl font-black text-text-primary"
                      >
                        {price != null ? `$${price.toLocaleString('es-CL')}` : plan.priceNote}
                      </motion.span>
                    </AnimatePresence>
                    {price != null && (
                      <span className="text-text-muted text-sm mb-1">{plan.priceNote}</span>
                    )}
                  </div>

                  <p className="text-[0.875rem] text-text-secondary leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1 list-none">
                    {plan.features.map(f => (
                      <li key={f.text} className={`flex items-start gap-2.5 text-[0.875rem] ${f.included ? 'text-text-secondary' : 'text-text-muted line-through'}`}>
                        <svg
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${f.included ? 'text-teal-accent' : 'text-text-muted'}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                        >
                          {f.included
                            ? <polyline points="20 6 9 17 4 12"/>
                            : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                          }
                        </svg>
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={[
                      'block w-full text-center py-3.5 rounded-full text-sm font-semibold transition-all no-underline mt-2',
                      plan.ctaVariant === 'primary'
                        ? 'bg-grad-brand text-white shadow-brand hover:shadow-glow hover:-translate-y-0.5'
                        : 'border border-[var(--border-accent)] text-blue-action hover:bg-blue-action/10',
                    ].join(' ')}
                  >
                    {plan.ctaLabel}
                  </a>
                </CardTilt>
              </motion.div>
            )
          })}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3 p-5 rounded-2xl border border-teal-accent/20 bg-teal-accent/[.04] max-w-xl mx-auto"
        >
          <svg className="w-5 h-5 text-teal-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p className="text-sm text-text-secondary text-center">{PRICING_GUARANTEE}</p>
        </motion.div>
      </div>
    </section>
  )
}

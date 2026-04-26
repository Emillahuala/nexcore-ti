'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardTilt      from '@/components/ui/CardTilt'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES }  from '@/data/content'
import Rain3DCanvas from '../ui/Rain3DCanvas'


export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      id="services"
      className="relative py-24 bg-[#000] overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Fondo lluvia 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain3DCanvas />
      </div>
      <div className="section-container relative z-10">
        <SectionHeader
          tag="Nuestras Soluciones"
          title={
            <>
              Tecnología diseñada para{' '}
              <span className="gradient-text">escalar tu negocio</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start max-w-6xl mx-auto px-0 md:px-8 xl:px-20">
          {/* Columna Izquierda: Botonera o Tabs */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-3">
            {SERVICES.map((svc, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={svc.title}
                  onClick={() => setActiveIndex(i)}
                  className={[
                    'text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group border',
                    isActive 
                      ? 'bg-blue-action/10 border-blue-action/30 shadow-[0_4px_20px_rgba(46,138,208,0.15)]' 
                      : 'hover:bg-white/5 border-transparent'
                  ].join(' ')}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-grad-brand"
                    />
                  )}
                  <div className="flex items-start gap-4 relative z-10">
                    <span className={`text-[10px] font-mono leading-none pt-1.5 ${isActive ? 'text-teal-accent' : 'text-text-muted group-hover:text-text-secondary'}`}>
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className={`text-base font-bold ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                        {svc.title}
                      </h4>
                      <span className={`text-[10px] uppercase tracking-widest mt-1 block ${isActive ? 'text-teal-accent' : 'text-text-muted'}`}>
                        {svc.tag}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Columna Derecha: Contenido Detallado */}
          <div className="col-span-1 lg:col-span-7 relative min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full"
              >
                <CardTilt className="h-full flex flex-col gap-6 p-8 md:p-10 rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-bg-card relative overflow-hidden group">
                  {/* Glow decorativo de fondo */}
                  <div className="absolute -top-32 -right-32 w-[250px] h-[250px] bg-blue-action/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-action/30 transition-colors duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-4">
                      {SERVICES[activeIndex].title}
                    </h3>
                    <p className="text-base text-text-secondary leading-relaxed">
                      {SERVICES[activeIndex].description}
                    </p>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-2" />

                  <ul className="flex flex-col gap-4 list-none relative z-10">
                    {SERVICES[activeIndex].benefits.map(b => (
                      <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
                        <svg className="w-5 h-5 flex-shrink-0 text-teal-accent mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/[.06] relative z-10">
                    <div className="inline-block px-5 py-3 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm">
                      <div className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">El Impacto</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-black gradient-text">
                          {SERVICES[activeIndex].metric.value}
                        </span>
                        <span className="text-[0.875rem] font-medium text-text-secondary">
                          {SERVICES[activeIndex].metric.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

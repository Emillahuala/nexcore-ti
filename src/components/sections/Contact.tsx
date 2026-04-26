'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  CONTACT, SERVICE_OPTIONS, BUDGET_OPTIONS,
} from '@/data/content'
import type { ApiResponse } from '@/types/contact'
import Rain3DCanvas from '../ui/Rain3DCanvas'

const schema = z.object({
  name:    z.string().min(2,  'Por favor ingresa tu nombre completo.'),
  company: z.string().min(2,  'Ingresa el nombre de tu empresa.'),
  email:   z.string().email('Ingresa un email corporativo válido.'),
  phone:   z.string().optional(),
  service: z.string().min(1,  'Selecciona el servicio que te interesa.'),
  budget:  z.string().optional(),
  message: z.string().min(20, 'Cuéntanos un poco más (mínimo 20 caracteres).'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Debes aceptar la política de privacidad.' }) }),
  _honey:  z.string().max(0),
  _csrf:   z.string(),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'form-input w-full bg-white/[.04] border border-[rgba(200,205,212,.14)] rounded-xl text-white text-[0.9375rem] px-4 py-3 outline-none transition-all focus:border-blue-action focus:shadow-[0_0_0_3px_rgba(46,138,208,.15)] placeholder:text-[#8A919A]'

const labelClass = 'block text-sm font-medium text-text-secondary mb-1.5'

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { _honey: '', _csrf: '' },
  })

  // Generate CSRF token on mount
  useEffect(() => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    sessionStorage.setItem('_nc_csrf', token)
    setValue('_csrf', token)
  }, [setValue])

  async function onSubmit(data: FormData) {
    // Client-side rate limit check
    const KEY = '_nc_rl', WINDOW = 10 * 60 * 1000, MAX = 3
    let rec: { ts: number; count: number } | null = null
    try { rec = JSON.parse(localStorage.getItem(KEY) ?? 'null') } catch { rec = null }
    const now = Date.now()
    if (!rec || now - rec.ts > WINDOW) rec = { ts: now, count: 0 }
    if (rec.count >= MAX) {
      const mins = Math.ceil((WINDOW - (now - rec.ts)) / 60000)
      setErrorMessage(`Demasiados intentos. Espera ${mins} min e inténtalo de nuevo.`)
      setSubmitStatus('error')
      return
    }
    rec.count++
    localStorage.setItem(KEY, JSON.stringify(rec))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': data._csrf,
        },
        body: JSON.stringify(data),
      })

      const json: ApiResponse = await res.json()

      if (res.ok && json.ok) {
        setSubmitStatus('success')
      } else {
        setErrorMessage(json.message ?? 'Error al enviar. Inténtalo de nuevo.')
        setSubmitStatus('error')
      }
    } catch {
      setErrorMessage('Error de conexión. Comprueba tu internet e inténtalo de nuevo.')
      setSubmitStatus('error')
    }
  }

  if (submitStatus === 'success') {
    return (
      <section id="contact" className="py-24 bg-bg-dark-2">
        <div className="section-container flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center gap-4 max-w-md"
            role="alert"
            aria-live="polite"
          >
            <div className="w-16 h-16 rounded-full bg-teal-accent/10 border border-teal-accent/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text-primary">¡Mensaje recibido!</h3>
            <p className="text-text-secondary">Te contactaremos con tu diagnóstico en menos de 48 horas.</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-24 bg-[#000] overflow-hidden" aria-labelledby="contact-title">
      {/* Fondo lluvia 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain3DCanvas />
      </div>
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0,0,.2,1] }}
          >
            <SectionHeader
              tag={CONTACT.sectionTag}
              title={
                <>
                  {CONTACT.headline}{' '}
                  <span className="gradient-text">{CONTACT.headlineGradient}</span>{' '}
                  {CONTACT.headlineSuffix}
                </>
              }
              subtitle={CONTACT.description}
              align="left"
            />

            <div className="flex flex-col gap-5 mt-2">
              {[
                { icon: 'phone', text: CONTACT.phone },
                { icon: 'mail',  text: CONTACT.email },
                { icon: 'clock', text: CONTACT.responseTime },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-action/10 border border-blue-action/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-action" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      {item.icon === 'phone' && <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>}
                      {item.icon === 'mail'  && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                      {item.icon === 'clock' && <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
                    </svg>
                  </div>
                  <p className="text-[0.9375rem] text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0,0,.2,1], delay: 0.1 }}
            className="bg-bg-card border border-[rgba(200,205,212,.08)] rounded-[var(--r-xl)] p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulario de contacto">
              {/* CSRF + Honeypot */}
              <input type="hidden" {...register('_csrf')} />
              <input
                type="text"
                {...register('_honey')}
                className="form-honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Nombre <span className="text-blue-action">*</span></label>
                  <input id="name" type="text" placeholder="Tu nombre completo" autoComplete="name" className={`${inputClass} ${errors.name ? 'border-red-400' : ''}`} {...register('name')} />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Empresa <span className="text-blue-action">*</span></label>
                  <input id="company" type="text" placeholder="Nombre de tu empresa" autoComplete="organization" className={`${inputClass} ${errors.company ? 'border-red-400' : ''}`} {...register('company')} />
                  {errors.company && <span className="form-error">{errors.company.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="email" className={labelClass}>Email corporativo <span className="text-blue-action">*</span></label>
                  <input id="email" type="email" placeholder="tu@empresa.com" autoComplete="email" className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`} {...register('email')} />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Teléfono</label>
                  <input id="phone" type="tel" placeholder="+56 9 00000000" autoComplete="tel" className={inputClass} {...register('phone')} />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="service" className={labelClass}>¿Qué solución te interesa? <span className="text-blue-action">*</span></label>
                <select id="service" className={`${inputClass} ${errors.service ? 'border-red-400' : ''}`} {...register('service')}>
                  <option value="">Selecciona una opción</option>
                  {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.service && <span className="form-error">{errors.service.message}</span>}
              </div>

              <div className="mb-5">
                <label htmlFor="budget" className={labelClass}>Presupuesto mensual estimado</label>
                <select id="budget" className={inputClass} {...register('budget')}>
                  <option value="">Rango de inversión (opcional)</option>
                  {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="message" className={labelClass}>Cuéntanos tu reto <span className="text-blue-action">*</span></label>
                <textarea id="message" rows={4} placeholder="¿Cuál es el principal proceso o área que quieres mejorar?" className={`${inputClass} resize-none ${errors.message ? 'border-red-400' : ''}`} {...register('message')} />
                {errors.message && <span className="form-error">{errors.message.message}</span>}
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-blue-action flex-shrink-0" {...register('consent')} />
                  <span className="text-sm text-text-secondary">
                    Acepto la{' '}
                    <a href="#" className="text-blue-action hover:underline" rel="noopener noreferrer">
                      política de privacidad
                    </a>{' '}
                    y el tratamiento de mis datos para recibir el diagnóstico gratuito.
                  </span>
                </label>
                {errors.consent && <span className="form-error">{errors.consent.message}</span>}
              </div>

              {submitStatus === 'error' && (
                <p className="text-sm text-red-400 mb-4" role="alert">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-base font-semibold text-white bg-grad-brand shadow-brand hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Solicitar diagnóstico gratuito'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

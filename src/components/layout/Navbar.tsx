'use client'

import { useState, useEffect, useCallback } from 'react'
import { useNavScroll } from '@/hooks/useNavScroll'
import { NAV_LINKS } from '@/data/content'

export default function Navbar() {
  const scrolled = useNavScroll()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Detectar sección activa
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.slice(1)
      const target = document.getElementById(id)
      if (!target) return

      const navHeight = 80
      window.scrollTo({
        top: target.offsetTop - navHeight - 8,
        behavior: 'smooth',
      })

      setOpen(false)
    },
    []
  )

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/[.06]'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* NAV */}
      <nav className="grid grid-cols-3 items-center w-full max-w-[1920px] mx-auto px-6 md:px-12 h-20">

        {/* IZQUIERDA - Logo */}
        <div className="flex items-center">
          <a
            href="#home"
            onClick={e => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5"
          >
            <span className="w-8 h-8 rounded-lg bg-grad-brand" />
            <span className="text-xl text-white font-bold">
              Nex<strong className="gradient-text">Core</strong>
            </span>
          </a>
        </div>

        {/* CENTRO - Links (solo desktop) */}
        <div className="flex justify-center">
          <ul className="flex justify-center items-center gap-8 list-none max-md:hidden">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.href)}
                  className={[
                    'text-sm font-medium transition-colors',
                    active === link.href.slice(1)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DERECHA - CTAs + Hamburger */}
        <div className="flex justify-end items-center gap-3">

          {/* CTAs desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => handleLinkClick(e, '#contact')}
              className="px-5 py-2 rounded-full text-sm text-white/70 border border-white/20 hover:text-white hover:bg-white/10 transition"
            >
              Hablar con un experto
            </a>
            <a
              href="#pricing"
              onClick={e => handleLinkClick(e, '#pricing')}
              className="px-5 py-2 rounded-full text-sm text-white bg-grad-brand hover:opacity-90 transition"
            >
              Ver planes
            </a>
          </div>

          {/* Hamburger mobile (pegado a la derecha) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(v => !v)}
          >
            <span className={`w-6 h-0.5 bg-white transition ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* MENÚ MOBILE */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Fondo */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-lg"
          onClick={() => setOpen(false)}
        />

        {/* Contenido */}
        <div className="relative z-50 flex flex-col items-center justify-center h-full gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleLinkClick(e, link.href)}
              className="text-xl text-white/80 hover:text-white transition"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={e => handleLinkClick(e, '#contact')}
            className="mt-6 px-6 py-3 rounded-full text-white bg-grad-brand"
          >
            Solicitar diagnóstico
          </a>
        </div>
      </div>
    </header>
  )
}
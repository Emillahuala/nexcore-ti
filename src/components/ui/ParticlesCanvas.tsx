'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number; y: number
  r: number
  vx: number; vy: number
  a: number
  color: string
}

const COLORS = ['rgba(46,138,208', 'rgba(110,207,209', 'rgba(28,79,143']
const MAX_DIST = 130

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced   = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let W = 0, H = 0
    let particles: Particle[] = []
    let rafId: number
    let isVisible = true

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting
    })
    observer.observe(canvas)

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
      const count = Math.min(Math.floor(W * H / 14000), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        a: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    function draw() {
      rafId = requestAnimationFrame(draw)
      if (!isVisible) return

      ctx!.clearRect(0, 0, W, H)
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15
            ctx!.strokeStyle = `rgba(46,138,208,${alpha})`
            ctx!.lineWidth   = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
      // Draw & move particles
      particles.forEach(p => {
        ctx!.fillStyle = `${p.color},${p.a})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })
    }

    resize()
    rafId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

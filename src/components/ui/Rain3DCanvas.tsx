'use client'

import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  z: number
  len: number
  speed: number
}

const DROP_COUNT = 160 // Más gotas para mayor densidad
const GRAVITY = 0.16   // Caída más suave
const DEPTH = 700      // Más profundidad para mayor realismo

export default function Rain3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let W = 0, H = 0
    let drops: Drop[] = []
    let rafId: number
    let isVisible = true

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting
    })
    observer.observe(canvas)

    function resize() {
      W = canvas!.width = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
      drops = Array.from({ length: DROP_COUNT }, () => {
        const z = Math.random() * DEPTH;
        const scale = 180 / (z + 180);
        // Distribuimos aleatoriamente en el espacio 2D real y lo invertimos a 3D
        const renderX = Math.random() * W;
        const renderY = Math.random() * H;
        return {
          x: (renderX - W / 2) / scale,
          y: (renderY - H / 2) / scale,
          z,
          len: Math.random() * 22 + 18,
          speed: Math.random() * 1.1 + 1.8,
        };
      })
    }

    function project3D(x: number, y: number, z: number) {
      const scale = 180 / (z + 180)
      return {
        x: x * scale + W / 2,
        y: y * scale + H / 2,
        scale,
      }
    }

    function draw() {
      rafId = requestAnimationFrame(draw)
      if (!isVisible) return

      // Fondo transparente para heredar el negro de backgound padre
      ctx!.clearRect(0, 0, W, H);
      for (const drop of drops) {
        // Lluvia diagonal e inclinación de la gota a 120°
        const angleRad = (120 * Math.PI) / 180;
        const speed = 2.1 * (1 - drop.z / DEPTH) + 1.1;
        drop.x += Math.cos(angleRad) * speed;
        drop.y += Math.sin(angleRad) * speed;
        const dx = Math.cos(angleRad) * drop.len;
        const dy = Math.sin(angleRad) * drop.len;
        const start = project3D(drop.x, drop.y, drop.z);
        const end = project3D(drop.x + dx, drop.y + dy, drop.z);
        // Dibujamos la gota con opacidad basada en su profundidad en lugar de crear un gradiente por frame
        // Esto optimiza el rendimiento enormemente, evitando createLinearGradient y shadowBlur
        const opacity = start.scale * 0.8 + 0.2;
        ctx!.strokeStyle = `rgba(110, 207, 209, ${opacity * 0.5})`
        ctx!.lineWidth = 1.2 * start.scale + 0.2
        ctx!.beginPath()
        ctx!.moveTo(start.x, start.y)
        ctx!.lineTo(end.x, end.y)
        ctx!.stroke()
        
        // Gota brillante al final (sin shadowBlur para mejor rendimiento)
        const radius = 1.5 * start.scale;
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx!.beginPath()
        ctx!.arc(end.x, end.y, radius < 0.5 ? 0.5 : radius, 0, 2 * Math.PI)
        ctx!.fill()
        
        // Movimiento
        // Chequeamos si la gota proyectada sale por debajo o por el costado izquierdo de la PANTALLA
        if (end.y > H + 60 || end.x < -60) {
          drop.z = Math.random() * DEPTH;
          const newScale = 180 / (drop.z + 180);
          
          // Reinicia arriba (o arriba-derecha) distribuyendo uniformemente el X real de pantalla
          const renderX = Math.random() * (W + H * 0.8); // Margen extra a la derecha por la diagonal
          const renderY = -60; // Arriba del viewport
          
          drop.x = (renderX - W / 2) / newScale;
          drop.y = (renderY - H / 2) / newScale;
          
          drop.len = Math.random() * 22 + 18;
          drop.speed = Math.random() * 1.1 + 1.8;
        }
      }
    }

    resize()
    rafId = requestAnimationFrame(draw)
    
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ display: 'block', zIndex: 2, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}

'use client'

import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from '@/styles/card-tilt.module.css'

interface CardTiltProps {
  children:  ReactNode
  className?: string
}

const MAX = 12 // max tilt degrees

export default function CardTilt({ children, className = '' }: CardTiltProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const r  = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top)  / r.height
    ref.current.style.setProperty('--rx', `${(py - 0.5) * -MAX}deg`)
    ref.current.style.setProperty('--ry', `${(px - 0.5) *  MAX}deg`)
    if (glareRef.current) {
      glareRef.current.style.setProperty('--gx', `${px * 100}%`)
      glareRef.current.style.setProperty('--gy', `${py * 100}%`)
    }
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      className={`${styles.tiltCard} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glareRef} className={styles.tiltGlare} aria-hidden="true" />
      {children}
    </div>
  )
}

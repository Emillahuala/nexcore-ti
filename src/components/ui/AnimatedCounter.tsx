'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target:    number
  unit:      string
  label:     string
  duration?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  target,
  unit,
  label,
  duration = 1800,
}: AnimatedCounterProps) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const start = performance.now()
    function update(now: number) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [isInView, target, duration])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-[clamp(1.5rem,3vw,2rem)] font-black text-text-primary leading-none">
        {count.toLocaleString('es')}
        <span className="gradient-text">{unit}</span>
      </span>
      <span className="text-xs text-text-muted text-center leading-snug">{label}</span>
    </div>
  )
}

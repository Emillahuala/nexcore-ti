'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from '@/styles/hero-cube.module.css'

export default function HeroCube() {
  const mouseRef = useRef<HTMLDivElement>(null)
  const reduced  = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = mouseRef.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      if (!el) return
      if (window.scrollY > window.innerHeight * 0.7) return
      const cx = (e.clientX / window.innerWidth  - 0.5) * 14
      const cy = (e.clientY / window.innerHeight - 0.5) * -9
      el.style.setProperty('--smy', `${cx}deg`)
      el.style.setProperty('--smx', `${cy}deg`)
    }
    function onMouseLeave() {
      if (!el) return
      el.style.setProperty('--smy', '0deg')
      el.style.setProperty('--smx', '0deg')
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [reduced])

  return (
    <div className={styles.heroScene} aria-hidden="true">
      <div className={styles.sceneFloat}>
        <div className={styles.sceneMouse} ref={mouseRef}>
          {/* Outer cube */}
          <div className={styles.geoOuter}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.geoFace} />
            ))}
          </div>
          {/* Inner cube */}
          <div className={styles.geoInner}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.geoFace} />
            ))}
          </div>
          {/* Micro cube */}
          <div className={styles.geoMicro}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.geoFace} />
            ))}
          </div>
          {/* Rings */}
          <div className={`${styles.geoRing} ${styles.geoRing1}`} />
          <div className={`${styles.geoRing} ${styles.geoRing2}`} />
          <div className={`${styles.geoRing} ${styles.geoRing3}`} />
          {/* Core */}
          <div className={styles.geoCore} />
          {/* Beams */}
          <div className={`${styles.geoBeam} ${styles.geoBeamH}`} />
          <div className={`${styles.geoBeam} ${styles.geoBeamV}`} />
        </div>
      </div>
    </div>
  )
}

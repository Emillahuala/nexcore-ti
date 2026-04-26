'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Options {
  threshold?: number
  margin?:    string
  once?:      boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { threshold = 0.12, margin = '0px 0px -40px 0px', once = true } = options
  const ref     = useRef<T>(null)
  const isInView = useInView(ref, { amount: threshold, margin, once })

  return { ref, isInView }
}

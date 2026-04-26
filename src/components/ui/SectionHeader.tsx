import { type ReactNode } from 'react'

interface SectionHeaderProps {
  tag:       string
  title:     ReactNode
  subtitle?: string
  align?:    'center' | 'left'
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 mb-16 ${alignClass}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-accent">
        <span
          className="w-1.5 h-1.5 rounded-full bg-teal-accent"
          aria-hidden="true"
        />
        {tag}
      </span>

      <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-bold leading-tight text-text-primary max-w-3xl">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[1.0625rem] text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

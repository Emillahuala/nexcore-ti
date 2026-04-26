import Link from 'next/link'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant:   'primary' | 'ghost' | 'outline'
  size?:     'default' | 'lg'
  fullWidth?: boolean
  href?:     string
  loading?:  boolean
}

const baseClass =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-250 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-action disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-grad-brand text-white shadow-brand hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0',
  ghost:
    'bg-white/[.06] border border-white/[.12] text-text-secondary backdrop-blur-sm hover:bg-white/[.1] hover:text-white hover:border-white/20',
  outline:
    'border border-border-accent text-blue-action hover:bg-blue-action/10 hover:border-blue-action',
}

const sizes = {
  default: 'px-6 py-2.5 text-[0.9375rem]',
  lg:      'px-8 py-[15px] text-base',
}

export default function Button({
  variant,
  size = 'default',
  fullWidth,
  href,
  loading,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const cls = [
    baseClass,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <>
          <svg
            className="animate-spin"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Enviando...
        </>
      ) : (
        children
      )}
    </button>
  )
}

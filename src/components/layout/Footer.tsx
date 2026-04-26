import { SITE, FOOTER_LINKS, SOCIAL_LINKS } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg-dark-2 border-t border-white/[.06] pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="#home" className="flex items-center gap-2.5 no-underline w-fit">
              <span className="w-8 h-8 rounded-lg bg-grad-brand flex-shrink-0" aria-hidden="true" />
              <span className="text-xl text-white font-bold tracking-tight">
                Nex<strong className="gradient-text">Core</strong>
              </span>
            </a>
            <p className="text-[0.875rem] text-text-muted leading-relaxed max-w-xs">
              Tecnología que genera resultados reales para empresas que no pueden permitirse perder tiempo.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/[.12] flex items-center justify-center text-text-muted hover:text-white hover:border-blue-action transition-colors no-underline text-xs font-semibold"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {(
            [
              { title: 'Servicios', links: FOOTER_LINKS.servicios },
              { title: 'Empresa',   links: FOOTER_LINKS.empresa   },
              { title: 'Legal',     links: FOOTER_LINKS.legal     },
            ] as const
          ).map(group => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3 list-none">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.875rem] text-text-secondary hover:text-white transition-colors no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

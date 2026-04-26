// ═══════════════════════════════════════════════════════════
// NEXCORE TI — All static copy
// Single source of truth for every text string in the app
// ═══════════════════════════════════════════════════════════

// ── Site ─────────────────────────────────────────────────
export const SITE = {
  name:        'NexCore TI',
  tagline:     'Tecnología que Genera Resultados',
  description: 'Soluciones TI de alto impacto: automatización de procesos, SEO, marketing digital y desarrollo de software a medida.',
}

// ── Navigation ───────────────────────────────────────────
export const NAV_LINKS = [
  { href: '#services', label: 'Servicios'  },
  { href: '#pricing',  label: 'Precios'    },
  { href: '#about',    label: 'Nosotros'   },
  { href: '#contact',  label: 'Contacto'   },
] as const

// ── Hero ─────────────────────────────────────────────────
export const HERO = {
  badge:       'Tecnología de alto rendimiento para empresas en crecimiento',
  headline:    'Convertimos Procesos Lentos en',
  headlineGradient: 'Ventajas Competitivas',
  subheadline: 'Automatizamos lo repetitivo, posicionamos tu marca y construimos software que escala. Todo con métricas reales y ROI demostrable.',
  ctaPrimary:  'Solicitar diagnóstico gratuito',
  ctaSecondary:'Explorar soluciones',
  scrollLabel: 'Scroll',
}

export const HERO_METRICS = [
  { count: 340, unit: '%', label: 'ROI promedio en 12 meses'       },
  { count: 65,  unit: '%', label: 'Reducción en tiempo operativo'  },
  { count: 50,  unit: '+', label: 'Proyectos entregados'           },
  { count: 98,  unit: '%', label: 'Satisfacción del cliente'       },
] as const

export const TRUST_LOGOS = [
  'TechCorp', 'InnovaGroup', 'DataSphere', 'BuildNext', 'VenturaLabs',
] as const

// ── Services ─────────────────────────────────────────────
export interface ServiceData {
  tag:       string
  title:     string
  description: string
  benefits:  string[]
  metric:    { value: string; label: string }
  featured?: boolean
}

export const SERVICES: ServiceData[] = [
  {
    tag:         'Proceso',
    title:       'Automatización de Procesos',
    description: 'Elimina el trabajo manual y repetitivo. Integramos tus sistemas y automatizamos flujos para que tu equipo se enfoque en lo que realmente importa.',
    benefits:    ['Integración de sistemas empresariales', 'RPA y bots inteligentes', 'Dashboards en tiempo real'],
    metric:      { value: '-65%', label: 'tiempo en tareas repetitivas' },
    featured:    true,
  },
  {
    tag:         'Visibilidad',
    title:       'Posicionamiento SEO Avanzado',
    description: 'Estrategias SEO técnico y de contenido que llevan tu negocio a los primeros resultados de búsqueda y mantienen tu presencia digital.',
    benefits:    ['Auditoría técnica completa', 'Estrategia de contenido B2B', 'Reportes KPI semanales'],
    metric:      { value: '+280%', label: 'tráfico orgánico en 6 meses' },
  },
  {
    tag:         'Crecimiento',
    title:       'Marketing de Alto Rendimiento',
    description: 'Campañas data-driven que generan leads cualificados y maximizan tu retorno en cada canal digital.',
    benefits:    ['Campañas PPC y Social Ads', 'Marketing automation', 'Analítica avanzada y atribución'],
    metric:      { value: '3.8x', label: 'ROAS promedio' },
  },
  {
    tag:         'Ingeniería',
    title:       'Desarrollo de Software a Medida',
    description: 'Construimos aplicaciones web, móviles y APIs que resuelven los problemas únicos de tu empresa con arquitectura escalable.',
    benefits:    ['Apps web y móvil', 'APIs y microservicios', 'Soporte y escalado continuo'],
    metric:      { value: '2–4 sem', label: 'de MVP a producción' },
  },
]

// ── Testimonials ─────────────────────────────────────────
export interface TestimonialData {
  quote:  string
  author: { initials: string; name: string; role: string; company: string }
  metric: { value: string; label: string }
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    quote:  'La automatización que implementó NexCore redujo un proceso que nos llevaba 4 días a menos de 2 horas. El impacto en productividad fue inmediato y medible.',
    author: { initials: 'MR', name: 'Marcos Reyes',   role: 'COO',                    company: 'InnovaGroup' },
    metric: { value: '94%', label: 'menos tiempo en el proceso' },
  },
  {
    quote:  'Pasamos de la página 4 a ser el #1 en nuestro sector en menos de 5 meses. El tráfico creció un 312% y los leads de calidad se multiplicaron.',
    author: { initials: 'AL', name: 'Andrea López',   role: 'Marketing Director',      company: 'TechCorp Latam' },
    metric: { value: '312%', label: 'más tráfico orgánico' },
  },
  {
    quote:  'Entregaron un MVP en 3 semanas que aguanta 50.000 usuarios concurrentes. Su arquitectura nos ahorró 18 meses de desarrollo interno.',
    author: { initials: 'CF', name: 'Carlos Fernández', role: 'CTO',                   company: 'DataSphere Technologies' },
    metric: { value: '50k', label: 'usuarios concurrentes' },
  },
]

// ── Pricing ──────────────────────────────────────────────
export interface PricingFeature {
  text:     string
  included: boolean
}

export interface PricingPlan {
  id:           string
  name:         string
  tag:          string
  monthlyPrice: number | null
  annualPrice:  number | null
  priceNote:    string
  description:  string
  features:     PricingFeature[]
  ctaLabel:     string
  ctaVariant:   'primary' | 'outline'
  featured?:    boolean
  badge?:       string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id:           'enterprise',
    name:         'Enterprise',
    tag:          'Solución completa',
    monthlyPrice: null,
    annualPrice:  null,
    priceNote:    'A medida',
    description:  'Para organizaciones que necesitan una transformación digital integral con un equipo completo de ingeniería y estrategia.',
    ctaLabel:     'Hablar con ventas',
    ctaVariant:   'outline',
    features: [
      { text: 'Los 4 servicios incluidos',              included: true  },
      { text: 'Equipo dedicado (Dev + Estrategia)',     included: true  },
      { text: 'Desarrollo de software ilimitado',      included: true  },
      { text: 'Cloud & DevOps',                        included: true  },
      { text: 'SLA 99.9% garantizado',                  included: true  },
      { text: 'Soporte 24/7 + Account Manager',        included: true  },
      { text: 'NDA + opción on-premise',               included: true  },
    ],
  },
]

export const PRICING_GUARANTEE = '90 días de garantía de resultados o te devolvemos el dinero'

// ── About ────────────────────────────────────────────────
export interface DiffData {
  title:       string
  description: string
}

export const ABOUT = {
  sectionTag: 'Sobre NexCore TI',
  headline:   'No somos una agencia. Somos tu equipo de',
  headlineGradient: 'ingeniería estratégica.',
  paragraphs: [
    'Nacimos para cerrar la brecha entre tecnología y estrategia de negocio. Mientras las agencias tradicionales ejecutan campañas y los consultores entregan documentos, nosotros implementamos soluciones que funcionan y medimos cada resultado.',
    'Cada proyecto parte de una premisa simple: ¿cuánto ROI genera esta inversión? Si no podemos demostrarlo con datos, no lo hacemos.',
  ],
  ctaLabel: 'Conocer al equipo',
}

export const DIFFERENTIATORS: DiffData[] = [
  { title: 'Enfoque en ROI, no en actividades',           description: 'Cada acción que tomamos está vinculada a un KPI de negocio. Sin vanity metrics, sin reportes vacíos.' },
  { title: 'Tecnología de punta, sin complejidad',         description: 'Usamos las mejores herramientas del mercado y te las entregamos operativas, sin curvas de aprendizaje.' },
  { title: 'Equipo senior, sin juniors en producción',     description: 'Tu proyecto es ejecutado por especialistas con más de 5 años de experiencia en cada disciplina.' },
  { title: 'Velocidad de startup, solidez enterprise',    description: 'Iteramos rápido con metodologías ágiles sin sacrificar la calidad y estabilidad que una empresa necesita.' },
  { title: 'Transparencia radical en métricas',           description: 'Acceso en tiempo real a todos tus dashboards. Sin información opaca, sin sorpresas en los reportes.' },
  { title: 'Garantía real, no promesas de venta',         description: 'Si no alcanzamos los KPIs acordados en 90 días, trabajamos sin costo hasta conseguirlos.' },
]

// ── Contact ──────────────────────────────────────────────
export const CONTACT = {
  sectionTag:  'Contacto',
  headline:    'El primer paso hacia tu',
  headlineGradient: 'transformación digital',
  headlineSuffix: 'es una conversación.',
  description: 'Cuéntanos tu reto y te prepararemos un diagnóstico gratuito con el plan de acción específico para tu empresa.',
  phone:       '+56 9 00000000',
  email:       'nextcoretech@gmail.com',
  responseTime:'Respuesta garantizada en menos de 48 horas.',
}

export const SERVICE_OPTIONS = [
  { value: 'automatizacion', label: 'Automatización de Procesos'    },
  { value: 'seo',            label: 'SEO y Posicionamiento'         },
  { value: 'marketing',      label: 'Marketing Digital'             },
  { value: 'software',       label: 'Desarrollo de Software a Medida' },
  { value: 'multiple',       label: 'Múltiples servicios (Growth / Enterprise)' },
  { value: 'diagnostico',    label: 'Solo quiero el diagnóstico gratuito' },
] as const

export const BUDGET_OPTIONS = [
  { value: 'lt250k',   label: 'Menos de $250.000/mes' },
  { value: '250-500k', label: '$250.000 – $500.000/mes' },
  { value: '500-1m',   label: '$500.000 – $1.000.000/mes' },
  { value: 'gt1m',     label: 'Más de $1.000.000/mes' },
  { value: 'unknown',  label: 'Aún no lo sé' },
] as const

// ── Footer ───────────────────────────────────────────────
export const FOOTER_LINKS = {
  servicios: [
    { label: 'Automatización',      href: '#services' },
    { label: 'SEO',                 href: '#services' },
    { label: 'Marketing Digital',   href: '#services' },
    { label: 'Software a Medida',   href: '#services' },
  ],
  empresa: [
    { label: 'Sobre Nosotros',      href: '#about'   },
    { label: 'Casos de Éxito',      href: '#'        },
    { label: 'Blog',                href: '#'        },
    { label: 'Contacto',            href: '#contact' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '#'     },
    { label: 'Términos de Uso',        href: '#'     },
    { label: 'Cookies',                href: '#'     },
  ],
}

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter',  href: '#' },
  { label: 'GitHub',   href: '#' },
] as const

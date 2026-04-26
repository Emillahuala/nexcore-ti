import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyCsrfToken }        from '@/lib/csrf'
import { sanitize }               from '@/lib/sanitize'
import { hashIp, checkRateLimit, pruneStore } from '@/lib/rateLimit'
import { createServerClient }     from '@/lib/supabase'

// Zod schema mirrors the RLS table constraints in rls.sql
const ContactSchema = z.object({
  name:    z.string().min(2).max(200),
  company: z.string().min(2).max(200),
  email:   z.string().email(),
  phone:   z.string().max(30).optional(),
  service: z.enum(['automatizacion','seo','marketing','software','multiple','diagnostico']),
  budget:  z.string().optional(),
  message: z.string().min(20).max(5000),
  consent: z.union([z.literal(true), z.literal('true')]),
  _honey:  z.string().max(0, 'Honeypot triggered'),
  _csrf:   z.string().min(1),
})

export async function POST(req: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON' }, { status: 400 })
  }

  // ── 2. Zod validation ──────────────────────────────────
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Datos inválidos.', errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data

  // ── 3. Honeypot ────────────────────────────────────────
  if (data._honey !== '') {
    // Silent reject — bots think they succeeded
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  // ── 4. CSRF validation ─────────────────────────────────
  const csrfHeader = req.headers.get('X-CSRF-Token') ?? ''
  const isValidCsrf = await verifyCsrfToken(csrfHeader).catch(() => false)
  if (!isValidCsrf) {
    return NextResponse.json({ ok: false, message: 'CSRF token inválido.' }, { status: 403 })
  }

  // ── 5. Rate limiting ───────────────────────────────────
  const rawIp   = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
              ?? req.headers.get('x-real-ip')
              ?? '0.0.0.0'
  const ipHash  = await hashIp(rawIp)
  pruneStore()
  if (!checkRateLimit(ipHash)) {
    return NextResponse.json(
      { ok: false, message: 'Demasiadas solicitudes. Inténtalo más tarde.' },
      { status: 429 }
    )
  }

  // ── 6. Sanitize ────────────────────────────────────────
  const payload = {
    name:       sanitize(data.name),
    company:    sanitize(data.company),
    email:      sanitize(data.email),
    phone:      data.phone ? sanitize(data.phone) : null,
    service:    data.service,
    budget:     data.budget ?? null,
    message:    sanitize(data.message),
    ip_hash:    ipHash,
    user_agent: req.headers.get('user-agent')?.slice(0, 512) ?? null,
  }

  // ── 7. Insert into Supabase ────────────────────────────
  try {
    const supabase = createServerClient()

    // Optional: DB-level rate limit via the check_contact_rate_limit function
    const { data: allowed, error: rlErr } = await supabase.rpc(
      'check_contact_rate_limit',
      { p_ip_hash: ipHash }
    )
    if (rlErr) console.error('[contact] RPC error:', rlErr)
    if (allowed === false) {
      return NextResponse.json(
        { ok: false, message: 'Demasiadas solicitudes. Inténtalo más tarde.' },
        { status: 429 }
      )
    }

    const { error } = await supabase.from('contacts').insert(payload)
    if (error) {
      console.error('[contact] Supabase insert error:', error)
      return NextResponse.json(
        { ok: false, message: 'Error al guardar tu solicitud. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { ok: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

// Handle preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

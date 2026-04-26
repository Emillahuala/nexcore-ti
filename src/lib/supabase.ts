import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service_role key.
 * This bypasses RLS — only use in API routes, never expose to the client.
 */
export function createServerClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

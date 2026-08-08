import { createClient } from '@supabase/supabase-js'

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase =
  publicSupabaseUrl && publicSupabaseAnonKey
    ? createClient(publicSupabaseUrl, publicSupabaseAnonKey)
    : null

export function createServiceClient() {
  const url = process.env.SUPABASE_URL || publicSupabaseUrl
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!url || !serviceRoleKey) return null

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function hasSupabaseConfig() {
  return Boolean(publicSupabaseUrl && publicSupabaseAnonKey)
}

export function hasSupabaseServiceConfig() {
  return Boolean(
    (process.env.SUPABASE_URL || publicSupabaseUrl) && process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = null

export function createServiceClient() {
  return null
}

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

import { supabaseAdmin } from './supabaseServer';

export async function requireUser(token?: string) {
  if (!token) {
    return { user: null, error: 'no token provided' };
  }
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return { user: null, error: error?.message || 'invalid token' };
  return { user: data.user, error: null };
}

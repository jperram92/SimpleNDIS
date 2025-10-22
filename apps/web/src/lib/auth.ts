// Supabase-based auth helper shim
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

export async function getUserFromToken(token?: string) {
  if (!token) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export const authShim = { getUserFromToken };

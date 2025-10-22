import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!url || !serviceKey) {
  // eslint-disable-next-line no-console
  console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

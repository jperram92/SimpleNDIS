import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

export const dynamic = 'force-dynamic';

async function getUserFromRequest(): Promise<{
  id?: string;
  email?: string;
  role?: string;
} | null> {
  // Attempt to read token from environment cookie in server components via process (Next.js doesn't provide req here).
  // We expect pages that need server-side auth to instead call APIs or rely on middleware for redirects. Keep a best-effort check.
  try {
    const token = process.env.__SB_ACCESS_TOKEN__;
    if (!token) return null;
    const { data } = await supabaseAdmin.auth.getUser(token);
    return data.user
      ? {
          id: data.user.id,
          email: data.user.email || undefined,
          role: (data.user.user_metadata as Record<string, unknown> | undefined)?.role as
            | string
            | undefined,
        }
      : null;
  } catch (err) {
    return null;
  }
}

export default async function Home() {
  const user = await getUserFromRequest();

  if (user) {
    if (user.role === 'ADMIN') return redirect('/admin');
    return redirect('/dashboard');
  }

  return redirect('/auth/signin');
}

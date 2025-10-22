import { NextResponse } from 'next/server';
import { prisma } from '@ndis/database';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Try to extract Bearer token from Authorization header
    const authHeader = request.headers.get('authorization') || '';
    let token: string | null = null;
    if (authHeader.startsWith('Bearer ')) token = authHeader.substring(7);

    // Fallback to cookie (sb:token by default)
    if (!token) {
      const cookieStore = cookies();
      token = cookieStore.get(process.env.SUPABASE_COOKIE_NAME ?? 'sb:token')?.value ?? null;
    }

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Validate token with supabase admin client
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    // Prefer authoritative values from the Supabase user
    const supUser = data.user;
    const id = supUser.id;
    const email = supUser.email ?? body.email;
    const user_metadata =
      (supUser.user_metadata as Record<string, any> | undefined) ?? body.user_metadata ?? {};
    const name = user_metadata.name ?? body.user_metadata?.name ?? null;
    const image = user_metadata.avatar ?? body.user_metadata?.avatar ?? null;
    const role = (user_metadata.role as string) ?? (body.user_metadata?.role as string) ?? 'USER';

    const user = await prisma.user.upsert({
      where: { id },
      create: { id, email: email ?? '', name, image, role },
      update: { email: email ?? '', name, image, role },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error('internal mirror-user error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

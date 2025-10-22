import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return NextResponse.json({ error: 'missing token' }, { status: 401 });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return NextResponse.json({ error: 'invalid token' }, { status: 401 });

  return NextResponse.json({ user: data.user });
}

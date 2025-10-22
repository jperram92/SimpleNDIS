import { NextResponse } from 'next/server';
import { prisma } from '@ndis/database';

export async function POST(request: Request) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const auth = request.headers.get('authorization') || '';
  if (!serviceKey || auth !== `Bearer ${serviceKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, email, user_metadata } = body;
    if (!id || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const role = (user_metadata && user_metadata.role) || 'USER';

    const user = await prisma.user.upsert({
      where: { id },
      create: { id, email, role },
      update: { email, role },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error('mirror-user error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

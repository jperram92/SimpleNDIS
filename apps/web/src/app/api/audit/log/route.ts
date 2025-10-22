import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { action, resource, details } = await request.json();

    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const cookieToken =
      token ||
      request.cookies.get('sb-access-token')?.value ||
      request.cookies.get('sb:token')?.value ||
      null;

    if (!cookieToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabaseAdmin.auth.getUser(cookieToken);
    if (error || !data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const auditEvent = await prisma.auditEvent.create({
      data: {
        userId: data.user.id,
        action,
        resource,
        details: details || {},
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({ success: true, auditEvent });
  } catch (error) {
    console.error('Audit log error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

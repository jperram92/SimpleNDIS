import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { action, resource, details } = await request.json();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auditEvent = await prisma.auditEvent.create({
      data: {
        userId: session.user.id,

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

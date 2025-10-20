import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@ndis/database';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, action, resource, details, ipAddress, userAgent } = await request.json();

    await prisma.auditEvent.create({
      data: {
        userId: userId || null,
        action,
        resource,
        details,
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Audit logging error:', error);
    return NextResponse.json({ error: 'Failed to log audit event' }, { status: 500 });
  }
}

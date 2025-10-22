import { NextRequest, NextResponse } from 'next/server';
import { ROLES, checkPermission } from '@ndis/config';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

async function logAudit(origin: string, payload: Record<string, unknown>) {
  try {
    await fetch(`${origin}/api/audit/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to log audit event:', err);
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  if (pathname.startsWith('/auth/') || pathname === '/' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Extract token from Authorization header or Supabase cookies
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  // Supabase client stores tokens in cookies named 'sb:token' or 'sb-access-token'
  const cookieToken =
    token ||
    req.cookies.get('sb-access-token')?.value ||
    req.cookies.get('sb:token')?.value ||
    null;

  if (!cookieToken) {
    await logAudit(req.nextUrl.origin, {
      action: 'ACCESS_DENIED',
      resource: pathname,
      details: 'No token provided',
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    });
    // Redirect to sign-in
    const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
    return NextResponse.redirect(signInUrl);
  }

  // Validate token via Supabase admin client
  const { data, error } = await supabaseAdmin.auth.getUser(cookieToken);
  if (error || !data.user) {
    await logAudit(req.nextUrl.origin, {
      action: 'ACCESS_DENIED',
      resource: pathname,
      details: 'Invalid token',
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    });
    const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
    return NextResponse.redirect(signInUrl);
  }

  // Get role from Supabase user metadata if present
  const role = (data.user.user_metadata as Record<string, unknown> | undefined)?.role as
    | keyof typeof ROLES
    | undefined;

  // Role-based route protection
  let hasAccess = true;
  if (pathname.startsWith('/admin')) {
    hasAccess = role ? checkPermission(role, 'admin', 'read') : false;
  } else if (pathname.startsWith('/finance')) {
    hasAccess = role ? checkPermission(role, 'finance', 'read') : false;
  } else if (pathname.startsWith('/scheduler')) {
    hasAccess = role ? checkPermission(role, 'schedules', 'read') : false;
  } else if (pathname.startsWith('/support')) {
    hasAccess = role ? checkPermission(role, 'clients', 'read') : false;
  } else {
    hasAccess = true; // default: authenticated users allowed
  }

  if (!hasAccess) {
    await logAudit(req.nextUrl.origin, {
      userId: data.user.id,
      action: 'ACCESS_DENIED',
      resource: pathname,
      details: `Role ${role ?? 'unknown'} denied access`,
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    });
    const forbiddenUrl = new URL('/auth/signin', req.nextUrl.origin);
    return NextResponse.redirect(forbiddenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};

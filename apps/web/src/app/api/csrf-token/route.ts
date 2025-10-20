import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Simple in-memory CSRF token store
const csrfTokens = new Map<string, { token: string; expires: number }>();
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

function generateCSRFToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + CSRF_TOKEN_EXPIRY;
  csrfTokens.set(sessionId, { token, expires });
  return token;
}

function getSessionId(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
  const userAgent = req.headers.get('user-agent') || '';
  return crypto.createHash('sha256').update(`${ip}:${userAgent}`).digest('hex');
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = getSessionId(request);
    const csrfToken = generateCSRFToken(sessionId);

    const response = NextResponse.json({
      csrfToken,
    });

    // Set CSRF token as HttpOnly cookie
    response.headers.set('Set-Cookie',
      `csrf-token=${csrfToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${CSRF_TOKEN_EXPIRY / 1000}`
    );

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:");
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
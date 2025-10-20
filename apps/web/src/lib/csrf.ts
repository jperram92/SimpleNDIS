import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In-memory CSRF token store (use Redis/database in production)
const csrfTokens = new Map<string, { token: string; expires: number }>();

const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

/**
 * Generate a CSRF token for a session/user
 */
export function generateCSRFToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + CSRF_TOKEN_EXPIRY;

  // Store token with session ID
  csrfTokens.set(sessionId, { token, expires });

  // Clean up expired tokens periodically
  if (Math.random() < 0.01) {
    cleanupExpiredTokens();
  }

  return token;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);

  if (!stored) {
    return false;
  }

  // Check if token is expired
  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId);
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(token, 'hex'),
    Buffer.from(stored.token, 'hex')
  );
}

/**
 * Validate CSRF token for authentication (simpler check)
 */
export function validateAuthCSRFToken(token: string): boolean {
  // For authentication, we do a simpler check - just verify the token format and existence
  // In a real app, you'd want more sophisticated validation
  if (!token || typeof token !== 'string' || token.length !== 64) {
    return false;
  }

  // Check if token exists in any session (simplified for auth)
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (Date.now() > data.expires) {
      csrfTokens.delete(sessionId);
      continue;
    }

    try {
      if (crypto.timingSafeEqual(
        Buffer.from(token, 'hex'),
        Buffer.from(data.token, 'hex')
      )) {
        return true;
      }
    } catch {
      // Continue checking other tokens
    }
  }

  return false;
}

/**
 * Clean up expired CSRF tokens
 */
function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now > data.expires) {
      csrfTokens.delete(sessionId);
    }
  }
}

/**
 * Get session ID from request (simplified - use proper session management)
 */
export function getSessionId(req: NextRequest): string {
  // In a real app, this would come from a session cookie or JWT
  // For now, use a combination of IP and user agent as a simple identifier
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
  const userAgent = req.headers.get('user-agent') || '';
  return crypto.createHash('sha256').update(`${ip}:${userAgent}`).digest('hex');
}

/**
 * CSRF protection middleware
 */
export async function csrfProtection(req: NextRequest): Promise<NextResponse | null> {
  // Only protect state-changing operations
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return null;
  }

  const sessionId = getSessionId(req);
  const csrfToken = req.headers.get('x-csrf-token') || req.nextUrl.searchParams.get('csrfToken');

  if (!csrfToken) {
    return new NextResponse(
      JSON.stringify({
        error: 'CSRF token missing',
        message: 'CSRF token is required for this request',
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!validateCSRFToken(sessionId, csrfToken)) {
    return new NextResponse(
      JSON.stringify({
        error: 'CSRF token invalid',
        message: 'CSRF token is invalid or expired',
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return null; // CSRF validation passed
}

/**
 * Double submit cookie pattern for CSRF protection
 */
export function createCSRFCookie(token: string): string {
  return `csrf-token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${CSRF_TOKEN_EXPIRY / 1000}`;
}
import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { authRateLimit } from '../../../../lib/rate-limit';
import { csrfProtection } from '../../../../lib/csrf';
import { NextRequest, NextResponse } from 'next/server';

// Create the handlers with NextAuth - doing this at import time allows
// the handlers to be properly initialized and cached by Next.js
const { handlers } = NextAuth(authOptions);

// Rate-limited and CSRF-protected wrapper for authentication endpoints
async function protectedHandler(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Apply rate limiting first
    const rateLimitResult = await authRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult; // Rate limited
    }

    // Apply CSRF protection for state-changing operations
    const csrfResult = await csrfProtection(request);
    if (csrfResult) {
      return csrfResult;
    }

    // Proceed with NextAuth handler
    const response = await handler(request);

    // Add rate limiting headers to successful responses
    if (response instanceof Response && rateLimitResult && !rateLimitResult.isLimited) {
      response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toISOString());
    }

    return response;
  } catch (error) {
    console.error('Handler error:', error);
    return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return protectedHandler(request, handlers.GET);
}

export async function POST(request: NextRequest) {
  return protectedHandler(request, handlers.POST);
}

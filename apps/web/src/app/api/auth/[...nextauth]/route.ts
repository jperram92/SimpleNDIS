import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { authRateLimit } from '../../../../lib/rate-limit';
import { csrfProtection } from '../../../../lib/csrf';
import { NextRequest } from 'next/server';

// Create the NextAuth handler for app router
export const {
  handlers: { GET: nextAuthGET, POST: nextAuthPOST },
} = NextAuth(authOptions);

// Rate-limited and CSRF-protected wrapper for authentication endpoints
async function protectedHandler(request: NextRequest, handler: any) {
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
}

export async function GET(request: NextRequest) {
  return protectedHandler(request, nextAuthGET);
}

export async function POST(request: NextRequest) {
  return protectedHandler(request, nextAuthPOST);
}

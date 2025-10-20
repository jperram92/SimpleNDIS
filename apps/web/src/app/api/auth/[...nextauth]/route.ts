import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { authRateLimit } from '../../../../lib/rate-limit';
import { csrfProtection } from '../../../../lib/csrf';
import { NextRequest, NextResponse } from 'next/server';

// Lazy-load NextAuth handlers to ensure Prisma is initialized
let cachedHandlers: {
  GET: (req: NextRequest) => Promise<NextResponse>;
  POST: (req: NextRequest) => Promise<NextResponse>;
} | null = null;

function getHandlers() {
  if (!cachedHandlers) {
    try {
      const { handlers } = NextAuth(authOptions);
      if (!handlers?.GET || !handlers?.POST) {
        console.error('NextAuth handlers not properly initialized');
        throw new Error('NextAuth handlers not available');
      }
      cachedHandlers = handlers as {
        GET: (req: NextRequest) => Promise<NextResponse>;
        POST: (req: NextRequest) => Promise<NextResponse>;
      };
    } catch (error) {
      console.error('Failed to initialize NextAuth handlers:', error);
      throw error;
    }
  }
  return cachedHandlers;
}

// Rate-limited and CSRF-protected wrapper for authentication endpoints
async function protectedHandler(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
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
  try {
    const handlers = getHandlers();
    return protectedHandler(request, handlers.GET);
  } catch (error) {
    console.error('GET handler error:', error);
    return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const handlers = getHandlers();
    return protectedHandler(request, handlers.POST);
  } catch (error) {
    console.error('POST handler error:', error);
    return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 500 });
  }
}

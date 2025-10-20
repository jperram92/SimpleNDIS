import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting store
// In production, use Redis or a database
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string; // Function to generate rate limit key
}

const defaultKeyGenerator = (req: NextRequest): string => {
  // Use IP address as the key, with fallback for forwarded headers
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'test-agent';
  return `${ip}:${userAgent}`;
};

export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    maxRequests,
    keyGenerator = defaultKeyGenerator,
  } = options;

  return async (req: NextRequest) => {
    const key = keyGenerator(req);
    const now = Date.now();

    // Get current rate limit data
    let rateLimitData = rateLimitStore.get(key);

    if (!rateLimitData || now > rateLimitData.resetTime) {
      // Reset or initialize rate limit data
      rateLimitData = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Increment counter (do this before checking limit)
    rateLimitData.count++;
    rateLimitStore.set(key, rateLimitData);

    // Check if rate limit exceeded
    if (rateLimitData.count > maxRequests) {
      const resetTime = new Date(rateLimitData.resetTime);
      const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);

      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toISOString(),
          },
        }
      );
    }

    // Clean up old entries periodically (simple cleanup)
    if (Math.random() < 0.01) { // 1% chance to clean up
      for (const [k, v] of rateLimitStore.entries()) {
        if (now > v.resetTime) {
          rateLimitStore.delete(k);
        }
      }
    }

    // For successful requests, return rate limit info but don't block
    // This allows the route handler to add these headers to its response
    return {
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - rateLimitData.count),
      resetTime: new Date(rateLimitData.resetTime),
      isLimited: false,
    };
  };
}

// Pre-configured rate limiters for common use cases
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
  keyGenerator: (req: NextRequest) => {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
    return `auth:${ip}`;
  },
});

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
});

export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
});
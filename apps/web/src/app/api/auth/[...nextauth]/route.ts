import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

// NextAuth v4 pattern with fallback for build-time issues
let handlers: {
  GET?: (req: Request) => Promise<NextResponse>;
  POST?: (req: Request) => Promise<NextResponse>;
} = {};

try {
  const nextAuthResult = NextAuth(authOptions);
  if (nextAuthResult?.handlers) {
    handlers = nextAuthResult.handlers;
  }
} catch (error) {
  console.warn('NextAuth initialization failed during build, using fallback handlers:', error);
}

// Provide fallback handlers if NextAuth failed to initialize
const GET = handlers.GET || (async () => NextResponse.json({ error: 'Auth service initializing' }, { status: 503 }));
const POST = handlers.POST || (async () => NextResponse.json({ error: 'Auth service initializing' }, { status: 503 }));

export { GET, POST };

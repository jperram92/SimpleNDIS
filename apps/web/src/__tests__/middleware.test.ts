/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';

// Test the authorized callback logic directly
const authorizedCallback = ({ token, req }: { token: any; req: NextRequest }) => {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  if (pathname.startsWith('/auth/') || pathname === '/' || pathname.startsWith('/api/auth/')) {
    return true;
  }

  // All other routes require authentication
  return !!token;
};

describe('Middleware Authorization Logic', () => {
  describe('Public Routes', () => {
    it('should allow access to signin page', () => {
      const mockRequest = {
        nextUrl: { pathname: '/auth/signin' },
      } as NextRequest;

      const result = authorizedCallback({ req: mockRequest, token: null });
      expect(result).toBe(true);
    });

    it('should allow access to signup page', () => {
      const mockRequest = {
        nextUrl: { pathname: '/auth/signup' },
      } as NextRequest;

      const result = authorizedCallback({ req: mockRequest, token: null });
      expect(result).toBe(true);
    });

    it('should allow access to root path', () => {
      const mockRequest = {
        nextUrl: { pathname: '/' },
      } as NextRequest;

      const result = authorizedCallback({ req: mockRequest, token: null });
      expect(result).toBe(true);
    });

    it('should allow access to API auth routes', () => {
      const mockRequest = {
        nextUrl: { pathname: '/api/auth/session' },
      } as NextRequest;

      const result = authorizedCallback({ req: mockRequest, token: null });
      expect(result).toBe(true);
    });
  });

  describe('Protected Routes', () => {
    it('should deny access without token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/dashboard' },
      } as NextRequest;

      const result = authorizedCallback({ req: mockRequest, token: null });
      expect(result).toBe(false);
    });

    it('should allow access with valid token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/dashboard' },
      } as NextRequest;

      const mockToken = { role: 'SUPPORT_WORKER' };
      const result = authorizedCallback({ req: mockRequest, token: mockToken });
      expect(result).toBe(true);
    });

    it('should allow access to admin routes with token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/admin' },
      } as NextRequest;

      const mockToken = { role: 'ADMIN' };
      const result = authorizedCallback({ req: mockRequest, token: mockToken });
      expect(result).toBe(true);
    });

    it('should allow access to finance routes with token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/finance' },
      } as NextRequest;

      const mockToken = { role: 'FINANCE' };
      const result = authorizedCallback({ req: mockRequest, token: mockToken });
      expect(result).toBe(true);
    });

    it('should allow access to scheduler routes with token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/scheduler' },
      } as NextRequest;

      const mockToken = { role: 'SCHEDULER' };
      const result = authorizedCallback({ req: mockRequest, token: mockToken });
      expect(result).toBe(true);
    });

    it('should allow access to support routes with token', () => {
      const mockRequest = {
        nextUrl: { pathname: '/support' },
      } as NextRequest;

      const mockToken = { role: 'SUPPORT_WORKER' };
      const result = authorizedCallback({ req: mockRequest, token: mockToken });
      expect(result).toBe(true);
    });
  });
});

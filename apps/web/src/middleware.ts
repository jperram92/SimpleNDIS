import { withAuth } from 'next-auth/middleware';
import { ROLES, checkPermission } from '@ndis/config';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // Public routes that don't require authentication
      if (pathname.startsWith('/auth/') || pathname === '/' || pathname.startsWith('/api/auth/')) {
        return true;
      }

      // Check if user has token
      if (!token || !token.role) {
        // Log unauthorized access attempt
        try {
          await fetch(`${req.nextUrl.origin}/api/audit/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'ACCESS_DENIED',
              resource: pathname,
              details: 'No token or role',
              ipAddress:
                req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
              userAgent: req.headers.get('user-agent') || 'unknown',
            }),
          });
        } catch (error) {
          console.error('Failed to log audit event:', error);
        }
        return false;
      }

      const userRole = token.role as keyof typeof ROLES;

      // Role-based route protection
      let hasAccess = false;
      if (pathname.startsWith('/admin')) {
        hasAccess = checkPermission(userRole, 'admin', 'read');
      } else if (pathname.startsWith('/finance')) {
        hasAccess = checkPermission(userRole, 'finance', 'read');
      } else if (pathname.startsWith('/scheduler')) {
        hasAccess = checkPermission(userRole, 'schedules', 'read');
      } else if (pathname.startsWith('/support')) {
        hasAccess = checkPermission(userRole, 'clients', 'read');
      } else {
        // Default: authenticated users can access
        hasAccess = true;
      }

      if (!hasAccess) {
        // Log access denial
        try {
          await fetch(`${req.nextUrl.origin}/api/audit/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: token.sub,
              action: 'ACCESS_DENIED',
              resource: pathname,
              details: `Role ${userRole} denied access`,
              ipAddress:
                req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
              userAgent: req.headers.get('user-agent') || 'unknown',
            }),
          });
        } catch (error) {
          console.error('Failed to log audit event:', error);
        }
      }

      return hasAccess;
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

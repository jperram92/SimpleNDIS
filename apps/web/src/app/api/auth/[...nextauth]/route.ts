import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';

// Export handlers directly from NextAuth - this is the recommended NextAuth v4 approach
export const {
  handlers: { GET, POST },
} = NextAuth(authOptions);

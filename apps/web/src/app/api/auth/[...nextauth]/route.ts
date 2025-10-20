import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';

// NextAuth v4 pattern - export handlers directly
const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;

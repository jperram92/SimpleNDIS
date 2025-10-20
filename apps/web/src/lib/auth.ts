import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@ndis/database';
import { verifyPassword } from './utils/password';
import { jwtCallback, sessionCallback } from './callbacks';
import { loginSchema, sanitizeEmail, validateInput } from './validation';
import { validateAuthCSRFToken } from './csrf';

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        csrfToken: { label: 'CSRF Token', type: 'text' },
      },
      async authorize(credentials) {
        // Input validation and sanitization
        if (!credentials?.email || !credentials?.password || !credentials?.csrfToken) {
          return null;
        }

        // Validate CSRF token first
        const isValidCSRF = validateAuthCSRFToken(credentials.csrfToken);
        if (!isValidCSRF) {
          console.warn('Invalid CSRF token');
          return null;
        }

        const sanitizedEmail = sanitizeEmail(credentials.email);

        // Validate input using schema
        const validation = validateInput(loginSchema, {
          email: sanitizedEmail,
          password: credentials.password,
        });

        if (!validation.success) {
          console.warn('Invalid login credentials:', validation.errors);
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: sanitizedEmail,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await verifyPassword(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

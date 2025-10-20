import { User } from '@ndis/types';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

// JWT callback for NextAuth
export const jwtCallback = async ({ token, user }: { token: JWT; user?: User }) => {
  if (user) {
    token.role = user.role;
  }
  return token;
};

// Session callback for NextAuth
export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  if (token && session.user && token.sub) {
    session.user.id = token.sub;
    session.user.role = token.role as string;
  }
  return session;
};

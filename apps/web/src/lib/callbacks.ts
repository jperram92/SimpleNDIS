/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

// JWT callback for NextAuth - matches NextAuth's jwt callback signature
export const jwtCallback = async (params: {
  token: JWT;
  user?: any;
  account?: any;
  profile?: any;
  trigger?: 'signIn' | 'signUp' | 'update';
  isNewUser?: boolean;
  session?: any;
}): Promise<JWT> => {
  const { token, user } = params;
  if (user) {
    token.role = user.role;
  }
  return token;
};

// Session callback for NextAuth - matches NextAuth's session callback signature
export const sessionCallback = async (params: {
  session: Session;
  token: JWT;
  user?: any;
  newSession?: any;
  trigger?: 'update' | 'getSession';
}): Promise<Session> => {
  const { session, token } = params;
  if (token && session.user && token.sub) {
    session.user.id = token.sub;
    session.user.role = token.role as string;
  }
  return session;
};

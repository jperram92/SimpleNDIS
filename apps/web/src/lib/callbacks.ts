import { User } from '@ndis/types';

// JWT callback for NextAuth
export const jwtCallback = async ({ token, user }: any) => {
  if (user) {
    token.role = (user as User).role;
  }
  return token;
};

// Session callback for NextAuth
export const sessionCallback = async ({ session, token }: any) => {
  if (token && session.user && token.sub) {
    session.user.id = token.sub;
    session.user.role = token.role;
  }
  return session;
};

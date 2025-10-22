/* eslint-disable @typescript-eslint/no-explicit-any */

// Generic JWT callback shim used by tests — stores role on token when user is present
export const jwtCallback = async (params: {
  token: Record<string, any>;
  user?: Record<string, any> | undefined;
  account?: any;
  profile?: any;
  trigger?: 'signIn' | 'signUp' | 'update';
  isNewUser?: boolean;
  session?: any;
}): Promise<Record<string, any>> => {
  const { token, user } = params;
  if (user) token.role = user.role;
  return token;
};

// Generic session callback shim used by tests — attaches id and role from token
export const sessionCallback = async (params: {
  session: Record<string, any>;
  token: Record<string, any>;
  user?: any;
  newSession?: any;
  trigger?: 'update' | 'getSession';
}): Promise<Record<string, any>> => {
  const { session, token } = params;
  if (token && session.user && token.sub) {
    session.user.id = token.sub;
    session.user.role = token.role as string;
  }
  return session;
};

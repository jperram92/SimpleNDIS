/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtCallback, sessionCallback } from '../callbacks';

describe('NextAuth Configuration', () => {
  describe('JWT Callbacks', () => {
    it('should include role in JWT token', async () => {
      const token = { role: 'USER' } as any;
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await jwtCallback({
        token,
        user,
        account: null,
        profile: undefined,
        trigger: 'signIn',
        isNewUser: false,
        session: undefined,
      } as any);

      expect(result).toEqual({
        ...token,
        role: 'ADMIN',
      });
    });

    it('should preserve existing token properties', async () => {
      const token = { sub: 'user-123', iat: 1234567890, role: 'USER' } as any;
      const user = undefined;

      const result = await jwtCallback({
        token,
        user,
        account: null,
        profile: undefined,
        trigger: 'update',
        isNewUser: false,
        session: undefined,
      } as any);

      expect(result).toEqual(token);
    });
  });

  describe('Session Callbacks', () => {
    it('should include user id and role in session', async () => {
      const session = {
        user: { id: '', role: '' },
        expires: '2024-01-01',
      } as any;
      const token = {
        sub: 'user-123',
        role: 'SCHEDULER',
      } as any;

      const result = await sessionCallback({
        session,
        token,
        user: null,
      } as any);

      expect(result?.user).toEqual({
        id: 'user-123',
        role: 'SCHEDULER',
      });
    });
  });
});

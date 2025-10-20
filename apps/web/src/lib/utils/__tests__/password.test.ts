import { hashPassword, verifyPassword } from '../password';

describe('Password Utilities', () => {
  const testPassword = 'testPassword123!';

  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const hashedPassword = await hashPassword(testPassword);

      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
      expect(hashedPassword).not.toBe(testPassword);
    });

    it('should generate different hashes for the same password', async () => {
      const hash1 = await hashPassword(testPassword);
      const hash2 = await hashPassword(testPassword);

      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty passwords', async () => {
      const hashedPassword = await hashPassword('');

      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const hashedPassword = await hashPassword(testPassword);
      const isValid = await verifyPassword(testPassword, hashedPassword);

      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const hashedPassword = await hashPassword(testPassword);
      const isValid = await verifyPassword('wrongPassword', hashedPassword);

      expect(isValid).toBe(false);
    });

    it('should reject empty password', async () => {
      const hashedPassword = await hashPassword(testPassword);
      const isValid = await verifyPassword('', hashedPassword);

      expect(isValid).toBe(false);
    });

    it('should handle empty hashed password', async () => {
      const isValid = await verifyPassword(testPassword, '');

      expect(isValid).toBe(false);
    });

    it('should handle invalid hash format', async () => {
      const isValid = await verifyPassword(testPassword, 'invalid-hash');

      expect(isValid).toBe(false);
    });
  });

  describe('Integration', () => {
    it('should hash and verify multiple passwords correctly', async () => {
      const passwords = ['password1', 'Password123!', 'complex!@#$%^&*()'];

      for (const password of passwords) {
        const hashed = await hashPassword(password);
        const isValid = await verifyPassword(password, hashed);
        const isInvalid = await verifyPassword('wrong', hashed);

        expect(isValid).toBe(true);
        expect(isInvalid).toBe(false);
      }
    });
  });
});

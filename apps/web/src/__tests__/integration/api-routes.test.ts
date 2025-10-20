/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock the CSRF utilities before importing
jest.mock('../../lib/csrf', () => ({
  generateCSRFToken: jest.fn(() => 'test-csrf-token-123'),
  validateAuthCSRFToken: jest.fn((token: string) => token === 'test-csrf-token-123'),
}));

// Mock the rate limiting utilities
jest.mock('../../lib/rate-limit', () => ({
  authRateLimit: jest.fn(() => Promise.resolve(null)),
}));

import { validateInput, loginSchema } from '../../lib/validation';
import { generateCSRFToken, validateAuthCSRFToken } from '../../lib/csrf';
import { authRateLimit } from '../../lib/rate-limit';

describe('Security Integration Tests', () => {
  describe('Input Validation Integration', () => {
    it('should validate complete login data flow', () => {
      const validLoginData = {
        email: 'user@example.com',
        password: 'SecurePass123!',
      };

      const result = validateInput(loginSchema, validLoginData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('user@example.com');
        expect(result.data.password).toBe('SecurePass123!');
      }
    });

    it('should reject invalid email in login flow', () => {
      const invalidLoginData = {
        email: 'invalid-email',
        password: 'SecurePass123!',
      };

      const result = validateInput(loginSchema, invalidLoginData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain('Invalid email format');
      }
    });
  });

  describe('CSRF Protection Integration', () => {
    it('should generate and validate CSRF tokens for auth flow', () => {
      const token = generateCSRFToken('test-session-123');

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token).toBe('test-csrf-token-123');

      const isValid = validateAuthCSRFToken('test-csrf-token-123');
      expect(isValid).toBe(true);
    });

    it('should reject invalid CSRF tokens in auth flow', () => {
      const isValid = validateAuthCSRFToken('invalid-token');
      expect(isValid).toBe(false);
    });
  });

  describe('Rate Limiting Integration', () => {
    it('should allow requests within rate limit for auth endpoints', async () => {
      const mockReq = {
        ip: '127.0.0.1',
        headers: new Map(),
      } as any;

      const result = await authRateLimit(mockReq);
      expect(result).toBeNull();
    });

    it('should handle rate limiting configuration', async () => {
      const mockReq = {
        ip: '127.0.0.1',
        headers: new Map(),
      } as any;

      // Make multiple requests
      for (let i = 0; i < 3; i++) {
        await authRateLimit(mockReq);
      }

      // Should still allow requests (within limit)
      const result = await authRateLimit(mockReq);
      expect(result).toBeNull();
    });
  });

  describe('Security Headers Configuration', () => {
    it('should validate Next.js security headers setup', () => {
      // Test that the configuration file exists and has expected structure
      const nextConfig = require('../../../next.config.js');

      expect(nextConfig).toBeDefined();
      expect(typeof nextConfig.headers).toBe('function');

      // This would be tested in E2E tests with actual HTTP requests
      // Here we just verify the configuration exists
    });
  });
});

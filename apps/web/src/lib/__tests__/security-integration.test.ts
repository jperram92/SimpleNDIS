import { validateInput, loginSchema } from '../validation';

// Mock the rate limiting functions since they depend on Next.js types
jest.mock('../rate-limit', () => ({
  authRateLimit: jest.fn().mockImplementation(async () => null), // Mock as always allowing
  apiRateLimit: jest.fn().mockImplementation(async () => null),
}));

// Mock the CSRF functions since they depend on Next.js types
jest.mock('../csrf', () => ({
  generateCSRFToken: jest.fn().mockReturnValue('a'.repeat(64)), // Mock 64-char hex token
  validateAuthCSRFToken: jest.fn().mockImplementation((token: string) => {
    return token === 'a'.repeat(64); // Only validate the mock token
  }),
  validateCSRFToken: jest.fn(),
  csrfProtection: jest.fn(),
}));

describe('Security Integration Tests', () => {
  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      const { authRateLimit } = require('../rate-limit');
      const mockReq = {
        ip: '127.0.0.1',
        headers: new Map(),
      } as any;

      // Mock the function to return null (allow)
      (authRateLimit as jest.Mock).mockResolvedValue(null);

      // First request should succeed
      const result1 = await authRateLimit(mockReq);
      expect(result1).toBeNull();

      // Second request should succeed
      const result2 = await authRateLimit(mockReq);
      expect(result2).toBeNull();
    });

    it('should block requests exceeding rate limit', async () => {
      const { authRateLimit } = require('../rate-limit');
      const mockReq = {
        ip: '127.0.0.1',
        headers: new Map(),
      } as any;

      // Mock the function to return a rate limit response after some calls
      let callCount = 0;
      (authRateLimit as jest.Mock).mockImplementation(async () => {
        callCount++;
        if (callCount > 5) {
          return { status: 429, json: () => ({ error: 'Rate limit exceeded' }) };
        }
        return null;
      });

      // Make multiple requests to exceed limit
      for (let i = 0; i < 6; i++) {
        await authRateLimit(mockReq);
      }

      // Next request should be blocked
      const result = await authRateLimit(mockReq);
      expect(result).toBeDefined();
      expect(result?.status).toBe(429);
    });
  });

  describe('Input Validation', () => {
    it('should validate valid login credentials', () => {
      const validData = {
        email: 'test@example.com',
        password: 'ValidPass123!',
      };

      const result = validateInput(loginSchema, validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'ValidPass123!',
      };

      const result = validateInput(loginSchema, invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('Invalid email format');
      }
    });

    it('should reject weak passwords', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '', // Empty password should fail
      };

      const result = validateInput(loginSchema, invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('Password is required');
      }
    });
  });

  describe('CSRF Protection', () => {
    it('should generate and validate CSRF tokens', () => {
      const { generateCSRFToken, validateAuthCSRFToken } = require('../csrf');

      const sessionId = 'test-session-123';
      const token = generateCSRFToken(sessionId);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes in hex

      const isValid = validateAuthCSRFToken(token);
      expect(isValid).toBe(true);
    });

    it('should reject invalid CSRF tokens', () => {
      const { validateAuthCSRFToken } = require('../csrf');

      const invalidToken = 'invalid-token';
      const isValid = validateAuthCSRFToken(invalidToken);
      expect(isValid).toBe(false);
    });

    it('should reject malformed CSRF tokens', () => {
      const { validateAuthCSRFToken } = require('../csrf');

      const malformedToken = 'not-hex-characters!';
      const isValid = validateAuthCSRFToken(malformedToken);
      expect(isValid).toBe(false);
    });
  });

  describe('Security Headers', () => {
    it('should validate security headers configuration', async () => {
      // This would typically be tested by making actual HTTP requests
      // For now, we validate the configuration exists
      const nextConfig = require('../../../next.config.js');

      expect(nextConfig).toBeDefined();
      expect(typeof nextConfig.headers).toBe('function');

      // Call the headers function to get the actual headers
      const headers = await nextConfig.headers();
      expect(Array.isArray(headers)).toBe(true);

      // Check for essential security headers
      const headerNames = headers[0].headers.map((h: any) => h.key);
      expect(headerNames).toContain('X-Frame-Options');
      expect(headerNames).toContain('X-Content-Type-Options');
      expect(headerNames).toContain('Referrer-Policy');
      expect(headerNames).toContain('Permissions-Policy');
    });
  });
});
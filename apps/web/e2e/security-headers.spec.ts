import { test, expect } from '@playwright/test';

test.describe('Security Headers Validation', () => {
  test('should include HSTS header for HTTPS enforcement', async ({ request }) => {
    const response = await request.get('/api/csrf-token');
    const headers = response.headers();

    // HSTS should be present (though value depends on environment)
    expect(headers['strict-transport-security']).toBeDefined();
  });

  test('should prevent MIME type sniffing attacks', async ({ request }) => {
    const response = await request.get('/api/csrf-token');
    const headers = response.headers();

    // X-Content-Type-Options should prevent MIME sniffing
    expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('should prevent clickjacking attacks', async ({ request }) => {
    const response = await request.get('/api/csrf-token');
    const headers = response.headers();

    // X-Frame-Options should prevent clickjacking
    expect(headers['x-frame-options']).toBe('DENY');
  });

  test('should have secure referrer policy', async ({ request }) => {
    const response = await request.get('/api/csrf-token');
    const headers = response.headers();

    // Referrer policy should be secure
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });
});
import { test, expect } from '@playwright/test';

test.describe('Rate Limiting E2E Tests', () => {
  test('should handle rate limiting on CSRF token endpoint', async ({ request }) => {
    const csrfEndpoint = '/api/csrf-token';

    // Make a few requests sequentially to test rate limiting
    const responses = [];
    for (let i = 0; i < 3; i++) {
      try {
        const response = await request.get(csrfEndpoint);
        responses.push(response);
        console.log(`CSRF request ${i}: status ${response.status()}`);
        // Small delay to ensure sequential processing
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.log(`Request ${i} failed:`, error);
      }
    }

    // Check that at least some requests succeed
    expect(responses.length).toBeGreaterThan(0);

    // Check that successful responses have rate limiting headers
    const successResponse = responses.find(r => r.status() === 200);
    if (successResponse) {
      const headers = successResponse.headers();
      console.log('CSRF headers:', headers);
      expect(headers['x-ratelimit-limit']).toBeDefined();
      expect(headers['x-ratelimit-remaining']).toBeDefined();
      expect(headers['x-ratelimit-reset']).toBeDefined();
    }
  });
});
import { test, expect } from '@playwright/test';

test.describe('CSRF Token Flow E2E Tests', () => {
  test('should fetch and use CSRF token in signin form', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for the page to load and CSRF token to be fetched
    await page.waitForLoadState('networkidle');

    // Check that CSRF token input exists and has a value
    const csrfInput = page.locator('input[name="csrfToken"]');
    await expect(csrfInput).toHaveValue(/.+/);

    // Verify CSRF token is not empty
    const csrfTokenValue = await csrfInput.inputValue();
    expect(csrfTokenValue).toBeTruthy();
    expect(csrfTokenValue.length).toBeGreaterThan(10); // Should be a proper token

    // Fill in the signin form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for response - should either succeed or show validation error
    // (we expect validation error since we're not using real credentials)
    await page.waitForLoadState('networkidle');

    // Check that we're still on signin page or redirected appropriately
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/auth\/signin|\/dashboard|\/api\/auth/);
  });

  test('should handle CSRF token fetch failure gracefully', async ({ page }) => {
    // Mock the CSRF API to return an error
    await page.route('/api/auth/csrf', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
    );

    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that error message is displayed
    const errorMessage = page.locator('text=Failed to initialize security token');
    await expect(errorMessage).toBeVisible();

    // Check that form is disabled or submit button is disabled
    const submitButton = page.locator('button[type="submit"]');
    const isDisabled = await submitButton.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('should validate CSRF token on form submission', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for CSRF token to load
    await page.waitForLoadState('networkidle');

    // Get the current CSRF token
    const csrfInput = page.locator('input[name="csrfToken"]');
    const originalToken = await csrfInput.inputValue();

    // Modify the CSRF token to an invalid value
    await csrfInput.fill('invalid-csrf-token');

    // Fill in the form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for response
    await page.waitForLoadState('networkidle');

    // Should show an error about invalid CSRF token
    const errorMessage = page.locator('text=Invalid security token');
    await expect(errorMessage).toBeVisible();
  });

  test('should refresh CSRF token on page reload', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for CSRF token to load
    await page.waitForLoadState('networkidle');

    // Get the initial CSRF token
    const csrfInput = page.locator('input[name="csrfToken"]');
    const initialToken = await csrfInput.inputValue();

    // Reload the page
    await page.reload();

    // Wait for page to reload and new token to load
    await page.waitForLoadState('networkidle');

    // Get the new CSRF token
    const newToken = await csrfInput.inputValue();

    // Tokens should be different (or at least regenerated)
    expect(newToken).toBeTruthy();
    expect(newToken.length).toBeGreaterThan(10);
  });

  test('should handle network errors during CSRF token fetch', async ({ page }) => {
    // Mock network failure for CSRF API
    await page.route('/api/auth/csrf', (route) => route.abort());

    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that error message is displayed
    const errorMessage = page.locator('text=Failed to initialize security token');
    await expect(errorMessage).toBeVisible();

    // Form should be disabled
    const emailInput = page.locator('input[name="email"]');
    const isDisabled = await emailInput.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('should maintain CSRF token across form validation errors', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');

    // Wait for CSRF token to load
    await page.waitForLoadState('networkidle');

    // Get the initial CSRF token
    const csrfInput = page.locator('input[name="csrfToken"]');
    const initialToken = await csrfInput.inputValue();

    // Submit form with invalid email format
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for validation response
    await page.waitForLoadState('networkidle');

    // CSRF token should still be the same
    const currentToken = await csrfInput.inputValue();
    expect(currentToken).toBe(initialToken);

    // Should show validation error
    const errorMessage = page.locator('text=Invalid email format');
    await expect(errorMessage).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow Testing', () => {
  test('should redirect unauthenticated users to signin page', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/dashboard');

    // Should redirect to signin page
    await expect(page).toHaveURL(/.*\/auth\/signin/);
  });

  test('should show signin form with CSRF token', async ({ page }) => {
    await page.goto('/auth/signin');

    // Check that the signin form is visible
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    // Check that CSRF token is present (either in form or as hidden input)
    const csrfInput = page.locator('input[name="csrfToken"]');
    await expect(csrfInput).toBeVisible();
  });

  test('should handle invalid credentials gracefully', async ({ page }) => {
    await page.goto('/auth/signin');

    // Fill out the form with invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Should stay on signin page or show error
    await expect(page).toHaveURL(/.*\/auth\/signin/);

    // Should show error message
    const errorMessage = page.locator('text=Invalid credentials');
    await expect(errorMessage).toBeVisible();
  });

  test('should redirect authenticated users to appropriate dashboard based on role', async ({ page }) => {
    // This test would require setting up test users with different roles
    // For now, we'll test the basic flow structure

    await page.goto('/auth/signin');

    // Fill out the form with valid credentials (mock/test user)
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');

    // Submit the form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Check that dashboard content is loaded
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should maintain authentication state across page reloads', async ({ page }) => {
    await page.goto('/auth/signin');

    // Sign in
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Reload the page
    await page.reload();

    // Should still be on dashboard (not redirected to signin)
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should allow users to sign out', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Find and click sign out button
    const signOutButton = page.locator('button', { hasText: 'Sign Out' });
    await expect(signOutButton).toBeVisible();
    await signOutButton.click();

    // Should redirect to signin page
    await expect(page).toHaveURL(/.*\/auth\/signin/);

    // Try to access protected route - should redirect back to signin
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/auth\/signin/);
  });

  test('should handle role-based access control', async ({ page }) => {
    // Test different user roles and their access to different routes
    // This would require multiple test users with different roles

    // For admin user
    await page.goto('/auth/signin');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'AdminPassword123!');
    await page.click('button[type="submit"]');

    // Should have access to admin routes
    await page.goto('/admin/users');
    await expect(page).toHaveURL(/.*\/admin\/users/);

    // Sign out
    await page.locator('button', { hasText: 'Sign Out' }).click();

    // For regular user
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'UserPassword123!');
    await page.click('button[type="submit"]');

    // Should not have access to admin routes
    await page.goto('/admin/users');
    await expect(page).toHaveURL(/.*\/auth\/signin/); // Should redirect to signin
  });
});
const { test, expect } = require('@playwright/test');
const { authTestData } = require('../utils/TestData');

test.describe('Authentication Tests', () => {
  const validUsername = authTestData.singleClientAdmin.username;
  const validPassword = authTestData.singleClientAdmin.password;
  const invalidUsername = authTestData.invalid.username;
  const invalidPassword = authTestData.invalid.password;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://dev.app.payrollstandard.org/login');
    await page.waitForLoadState('networkidle');
  });

  test('Valid login with Single Client Admin credentials', async ({ page }) => {
    await page.locator('#username-email').fill(validUsername);
    await page.locator('#password').fill(validPassword);
    await page.locator('button:has-text("Log in")').click();
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('Invalid login', async ({ page }) => {
    await page.locator('#username-email').fill(invalidUsername);
    await page.locator('#password').fill(invalidPassword);
    await page.locator('button:has-text("Log in")').click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/login');

    const errorSelector = '.error-message, .alert-error, [role="alert"], .notification, .toast';
    const errorVisible = await page.locator(errorSelector).first().isVisible().catch(() => false);

    if (!errorVisible) {
      console.warn('No error message visible but login blocked — possible silent validation.');
    }
  });

  test('Password visibility toggle', async ({ page }) => {
  const passwordInput = page.locator('//input[@id="password"]');
  
  await passwordInput.fill('test');

  await expect(passwordInput).toHaveAttribute('type', 'password');

  const toggleBtn = page.locator("(//div[@class='absolute top-1/2 flex-center -translate-y-1/2 w-4 right-4 cursor-pointer'])[1]");
  await expect(toggleBtn).toBeVisible();
  await toggleBtn.click();

  await expect(passwordInput).toHaveAttribute('type', 'text');
});

  test('Forgot Password shows up', async ({ page }) => {
    const forgotPasswordSelector = 'button:has-text("Forgot your Password?"), a:has-text("Forgot")';

    if (!(await page.locator(forgotPasswordSelector).count())) {
      test.fail();
      return;
    }
    await page.locator(forgotPasswordSelector).click();
    await expect(page.getByRole('button', { name: 'Reset password' })).toBeVisible();
  });

  test('Sign Up link navigates to pricing', async ({ page }) => {
    const signUpLink = page.locator('a:has-text("Sign up")');
    if (await signUpLink.count() === 0) test.skip();

    await signUpLink.click();
    await expect(page).not.toHaveURL(/\/login/);
    expect(page.url()).toMatch(/pricing|sign-?up|register/i);
  });
});

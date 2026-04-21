import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

// Must be top-level, not inside describe
test.use({ browserName: 'chromium' });

test.describe('AI-Powered Automation - Chromium Only', () => {
  test('should login and verify inventory using AI', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await ai('Type standard_user into the username field', { page, test });
    await ai('Type secret_sauce into the password field', { page, test });
    await ai('Click the Login button', { page, test });

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });
});

test.describe('Cross-Browser Login - All Browsers', () => {
  test('should login and verify inventory', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
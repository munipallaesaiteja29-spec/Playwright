// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Functionality', () => {
    
    let loginPage: LoginPage;

    // This runs before each test, keeping our tests clean and independent
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        // Use the standard user provided by SauceDemo
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Verify successful login by checking the URL or an element on the next page
        await expect(page).toHaveURL(/.*inventory.html/);
        
        // Secondary assertion to ensure the products page loaded
        const inventoryHeader = page.locator('.title');
        await expect(inventoryHeader).toHaveText('Products');
    });

    test('should display an error message for a locked out user', async () => {
        // Use the locked out user provided by SauceDemo
        await loginPage.login('locked_out_user', 'secret_sauce');

        // Assertion: Verify the exact error message appears
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('should display an error message for invalid credentials', async () => {
        // Test with fake data
        await loginPage.login('invalid_user', 'wrong_password');

        // Assertion: Verify the invalid credentials error
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
});
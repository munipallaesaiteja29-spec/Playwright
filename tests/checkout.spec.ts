// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('E2E Checkout Flow', () => {
    
    test('should successfully complete a purchase', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        // 1. Log in
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // 2. Add an item and go to cart
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        // 3. Complete the checkout process
        await checkoutPage.completeCheckoutFlow('Test', 'Engineer', '500001');

        // 4. Verify successful purchase
        await expect(checkoutPage.successMessage).toBeVisible();
        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    });
});
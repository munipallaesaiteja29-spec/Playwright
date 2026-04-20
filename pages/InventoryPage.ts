// pages/InventoryPage.ts
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    // Dynamic method to add any specific item to the cart
    async addItemToCart(itemName: string) {
        // SauceDemo converts item names to lowercase with hyphens for their locators
        const formattedName = itemName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}
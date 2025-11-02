/**
 * Base page class for UI tests using Playwright's Page object.
 * Provides common functionality and reusable methods for page objects.
 */
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a given URL or path.
   * If baseURL is configured, relative paths are resolved against it.
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Waits for an element to be visible and returns it.
   * Prioritizes ID selectors for better reliability.
   */
  async waitForElement(selector: string, options: { state?: 'visible' | 'hidden' | 'attached' | 'detached', timeout?: number } = { state: 'visible', timeout: 15000 }): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor(options);
    return locator;
  }

  /**
   * Gets the page title.
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}


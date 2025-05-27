/**
 * Helper class for handling selectors and element interactions
 */
class ElementHelper {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible and return it
   * @param {string} selector - Element selector
   * @param {Object} options - Wait options
   * @returns {Promise<import('@playwright/test').Locator>} - Element locator
   */
  async waitForElement(selector, options = { timeout: 5000 }) {
    await this.page.locator(selector).waitFor({ state: 'visible', ...options });
    return this.page.locator(selector);
  }

  /**
   * Click element with retry logic
   * @param {string} selector - Element selector
   * @param {Object} options - Click options
   */
  async clickWithRetry(selector, options = { timeout: 5000, retries: 3 }) {
    let attempts = 0;
    while (attempts < options.retries) {
      try {
        const element = await this.waitForElement(selector, { timeout: options.timeout });
        await element.click();
        return;
      } catch (error) {
        attempts++;
        if (attempts >= options.retries) {
          throw new Error(`Failed to click element ${selector} after ${options.retries} attempts: ${error.message}`);
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  /**
   * Fill input field with retry logic
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   * @param {Object} options - Fill options
   */
  async fillWithRetry(selector, value, options = { timeout: 5000, retries: 3 }) {
    let attempts = 0;
    while (attempts < options.retries) {
      try {
        const element = await this.waitForElement(selector, { timeout: options.timeout });
        await element.fill(value);
        return;
      } catch (error) {
        attempts++;
        if (attempts >= options.retries) {
          throw new Error(`Failed to fill element ${selector} after ${options.retries} attempts: ${error.message}`);
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  /**
   * Check if element exists
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - True if element exists
   */
  async exists(selector) {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get text from element with retry logic
   * @param {string} selector - Element selector
   * @param {Object} options - Options
   * @returns {Promise<string>} - Element text
   */
  async getTextWithRetry(selector, options = { timeout: 5000, retries: 3 }) {
    let attempts = 0;
    while (attempts < options.retries) {
      try {
        const element = await this.waitForElement(selector, { timeout: options.timeout });
        return await element.innerText();
      } catch (error) {
        attempts++;
        if (attempts >= options.retries) {
          throw new Error(`Failed to get text from element ${selector} after ${options.retries} attempts: ${error.message}`);
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}

module.exports = ElementHelper;

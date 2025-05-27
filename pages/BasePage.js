/**
 * Base Page Object class that all page objects will extend
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://dev.app.payrollstandard.org';
  }

  /**
   * Navigate to a specific URL path
   * @param {string} path - Path to navigate to (will be appended to baseUrl)
   */
  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   * @returns {Promise<string>} - Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - True if element is visible
   */
  async isVisible(selector) {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {Object} options - Wait options
   */
  async waitForElement(selector, options = {}) {
    await this.page.locator(selector).waitFor({ state: 'visible', ...options });
  }

  /**
   * Click on element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   */
  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Get text from element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} - Element text
   */
  async getText(selector) {
    return await this.page.locator(selector).innerText();
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./reports/screenshots/${name}.png` });
  }
}

module.exports = BasePage;

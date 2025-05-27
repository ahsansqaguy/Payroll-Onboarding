/**
 * Debug utility for troubleshooting headless test execution
 */
class DebugHelper {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Take a screenshot with timestamp and custom name
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `./reports/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
    console.log(`Screenshot saved: ${name}-${timestamp}.png`);
  }

  /**
   * Log page HTML for debugging
   * @param {string} name - Log name for identification
   */
  async logPageHtml(name) {
    const html = await this.page.content();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fs = require('fs');
    
    // Ensure directory exists
    if (!fs.existsSync('./reports/html_logs')) {
      fs.mkdirSync('./reports/html_logs', { recursive: true });
    }
    
    // Write HTML to file
    fs.writeFileSync(`./reports/html_logs/${name}-${timestamp}.html`, html);
    console.log(`HTML logged: ${name}-${timestamp}.html`);
  }

  /**
   * Log current page URL and title
   */
  async logPageInfo() {
    const url = this.page.url();
    const title = await this.page.title();
    console.log(`Current page: URL=${url}, Title=${title}`);
  }

  /**
   * Check if element exists and log result
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - True if element exists
   */
  async checkElementExists(selector) {
    const exists = await this.page.locator(selector).count() > 0;
    console.log(`Element ${selector} exists: ${exists}`);
    return exists;
  }

  /**
   * Log all form elements on the page
   */
  async logFormElements() {
    const inputCount = await this.page.locator('input').count();
    console.log(`Found ${inputCount} input elements`);
    
    for (let i = 0; i < inputCount; i++) {
      const input = this.page.locator('input').nth(i);
      const type = await input.getAttribute('type') || 'unknown';
      const name = await input.getAttribute('name') || 'unnamed';
      const id = await input.getAttribute('id') || 'no-id';
      const placeholder = await input.getAttribute('placeholder') || 'no-placeholder';
      console.log(`Input ${i}: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
    }
    
    const buttonCount = await this.page.locator('button').count();
    console.log(`Found ${buttonCount} button elements`);
    
    for (let i = 0; i < buttonCount; i++) {
      const button = this.page.locator('button').nth(i);
      const text = await button.textContent() || 'no-text';
      const type = await button.getAttribute('type') || 'unknown';
      const id = await button.getAttribute('id') || 'no-id';
      console.log(`Button ${i}: text=${text}, type=${type}, id=${id}`);
    }
  }
}

module.exports = DebugHelper;

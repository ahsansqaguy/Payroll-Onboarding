/**
 * Cross-browser configuration and utilities for Payroll Standard application
 */
class CrossBrowserHelper {
  /**
   * Get browser-specific configurations
   * @param {string} browserName - Name of the browser (chromium, firefox, webkit)
   * @returns {Object} - Browser-specific configuration
   */
  static getBrowserConfig(browserName) {
    const baseConfig = {
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      bypassCSP: true,
      timeout: 60000
    };
    
    // Browser-specific configurations
    switch (browserName.toLowerCase()) {
      case 'chromium':
        return {
          ...baseConfig,
          args: ['--disable-dev-shm-usage', '--no-sandbox']
        };
      case 'firefox':
        return {
          ...baseConfig,
          firefoxUserPrefs: {
            'browser.cache.disk.enable': false,
            'browser.cache.memory.enable': false
          }
        };
      case 'webkit': // Safari
        return {
          ...baseConfig,
          // Safari-specific settings
          hasTouch: true, // Enable touch events for Safari testing
          isMobile: false,
          colorScheme: 'light'
        };
      default:
        return baseConfig;
    }
  }

  /**
   * Get browser-specific selectors for the same element
   * @param {string} elementName - Name of the element
   * @returns {Object} - Browser-specific selectors
   */
  static getBrowserSpecificSelectors(elementName) {
    const selectors = {
      // Login page
      'username': {
        chromium: '#username-email',
        firefox: '#username-email',
        webkit: '#username-email, input[type="email"], input[name="username"]'
      },
      'password': {
        chromium: '#password',
        firefox: '#password',
        webkit: '#password, input[type="password"], input[name="password"]'
      },
      'loginButton': {
        chromium: 'button:has-text("Log in")',
        firefox: 'button:has-text("Log in")',
        webkit: 'button:has-text("Log in"), button[type="submit"]'
      },
      
      // Dashboard
      'dashboardMenu': {
        chromium: 'nav, .sidebar, .menu',
        firefox: 'nav, .sidebar, .menu',
        webkit: 'nav, .sidebar, .menu, aside'
      },
      
      // Common elements
      'table': {
        chromium: 'table',
        firefox: 'table',
        webkit: 'table, [role="table"]'
      },
      'button': {
        chromium: 'button',
        firefox: 'button',
        webkit: 'button, [role="button"]'
      },
      'input': {
        chromium: 'input',
        firefox: 'input',
        webkit: 'input, [role="textbox"]'
      }
    };
    
    return selectors[elementName] || {
      chromium: '',
      firefox: '',
      webkit: ''
    };
  }

  /**
   * Get browser-specific wait times
   * @param {string} browserName - Name of the browser (chromium, firefox, webkit)
   * @returns {Object} - Browser-specific wait times
   */
  static getBrowserWaitTimes(browserName) {
    const baseWaitTimes = {
      navigation: 5000,
      animation: 1000,
      action: 2000
    };
    
    switch (browserName.toLowerCase()) {
      case 'webkit': // Safari tends to need longer waits
        return {
          navigation: 8000,
          animation: 2000,
          action: 3000
        };
      case 'firefox':
        return {
          navigation: 6000,
          animation: 1500,
          action: 2500
        };
      default:
        return baseWaitTimes;
    }
  }

  /**
   * Apply browser-specific workarounds
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} browserName - Name of the browser (chromium, firefox, webkit)
   */
  static async applyBrowserWorkarounds(page, browserName) {
    switch (browserName.toLowerCase()) {
      case 'webkit': // Safari workarounds
        // Fix for Safari's handling of shadow DOM
        await page.addInitScript(() => {
          window.safariShadowDomWorkaround = true;
        });
        break;
      case 'firefox':
        // Fix for Firefox's handling of certain events
        await page.addInitScript(() => {
          window.firefoxEventWorkaround = true;
        });
        break;
    }
  }
}

module.exports = CrossBrowserHelper;

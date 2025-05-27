/**
 * Utility for handling test data and environment configuration
 */
class TestConfig {
  /**
   * Get base URL based on environment
   * @param {string} env - Environment (dev, staging, prod)
   * @returns {string} - Base URL for the environment
   */
  static getBaseUrl(env = 'dev') {
    const urls = {
      dev: 'https://dev.app.payrollstandard.org',
      staging: 'https://staging.app.payrollstandard.org',
      prod: 'https://app.payrollstandard.org'
    };
    return urls[env] || urls.dev;
  }

  /**
   * Get timeout configuration
   * @returns {Object} - Timeout configuration
   */
  static getTimeouts() {
    return {
      navigation: 30000,
      element: 5000,
      animation: 1000
    };
  }

  /**
   * Get screenshot configuration
   * @returns {Object} - Screenshot configuration
   */
  static getScreenshotConfig() {
    return {
      path: './reports/screenshots',
      takeOnFailure: true
    };
  }
}

module.exports = TestConfig;

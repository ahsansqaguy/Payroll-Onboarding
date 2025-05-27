/**
 * Utility functions for test automation
 */
class Utils {
  /**
   * Generate a random string
   * @param {number} length - Length of the string
   * @returns {string} - Random string
   */
  static generateRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Wait for a specific amount of time
   * @param {number} ms - Time to wait in milliseconds
   * @returns {Promise<void>}
   */
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Format date to string
   * @param {Date} date - Date to format
   * @param {string} format - Format string
   * @returns {string} - Formatted date
   */
  static formatDate(date = new Date(), format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  }

  /**
   * Log message with timestamp
   * @param {string} message - Message to log
   */
  static log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
}

module.exports = Utils;

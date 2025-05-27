/**
 * Enhanced LoginPage with more robust selectors and error handling
 */
class LoginPage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - updated with more specific and robust selectors
    this.usernameInput = 'input[placeholder="Username"], input[type="text"]';
    this.passwordInput = 'input[placeholder="Password"], input[type="password"]';
    this.loginButton = 'button:has-text("Log in"), button[type="submit"]';
    this.forgotPasswordLink = 'button:has-text("Forgot your Password?"), a:has-text("Forgot")';
    this.signUpLink = 'a:has-text("Sign up")';
    this.eyeIcon = 'button.eye-icon, button.password-toggle';
    this.errorMessage = '.error-message, .alert-error, [role="alert"]';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.navigate('/login');
    await this.waitForPageLoad();
    console.log('Navigated to login page');
  }

  /**
   * Login with credentials using retry logic
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    console.log(`Attempting to login with username: ${username}`);
    try {
      await this.elementHelper.fillWithRetry(this.usernameInput, username);
      await this.elementHelper.fillWithRetry(this.passwordInput, password);
      await this.elementHelper.clickWithRetry(this.loginButton);
      console.log('Login attempt completed');
    } catch (error) {
      console.error(`Login failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click on forgot password link with retry
   */
  async clickForgotPassword() {
    await this.elementHelper.clickWithRetry(this.forgotPasswordLink);
  }

  /**
   * Click on sign up link with retry
   */
  async clickSignUp() {
    await this.elementHelper.clickWithRetry(this.signUpLink);
  }

  /**
   * Toggle password visibility with retry
   */
  async togglePasswordVisibility() {
    await this.elementHelper.clickWithRetry(this.eyeIcon);
  }

  /**
   * Check if password is visible
   * @returns {Promise<boolean>} - True if password is visible
   */
  async isPasswordVisible() {
    const type = await this.page.getAttribute(this.passwordInput, 'type');
    return type === 'text';
  }

  /**
   * Get error message text with retry
   * @returns {Promise<string>} - Error message text
   */
  async getErrorMessage() {
    if (await this.elementHelper.exists(this.errorMessage)) {
      return await this.elementHelper.getTextWithRetry(this.errorMessage);
    }
    return '';
  }

  /**
   * Take screenshot of login page
   */
  async takeLoginScreenshot() {
    await this.takeScreenshot('login-page');
  }
}

module.exports = LoginPage;

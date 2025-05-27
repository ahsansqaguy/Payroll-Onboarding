/**
 * Dashboard page object for dashboard functionality
 */
class DashboardPage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - using specific IDs and attributes where possible
    this.dashboardTitle = 'h1:has-text("Profiles"), .dashboard-title';
    this.sidebarMenu = '.sidebar-menu, .side-nav';
    this.profilesLink = 'a:has-text("Profiles"), a[href*="profiles"]';
    this.settingsLink = 'a:has-text("Settings"), a[href*="settings"]';
    this.recycleBinLink = 'a:has-text("Recycle Bin"), a[href*="recycle"]';
    this.userRoleLabel = '.user-role, .role-indicator';
    this.logoutButton = 'button.logout-button, button:has-text("Logout"), button:has-text("Log out")';
    this.payflowsCounter = '.payflows-counter, .counter:has-text("Payflows")';
    this.usersCounter = '.users-counter, .counter:has-text("Users")';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Check if user is logged in and dashboard is loaded
   * @returns {Promise<boolean>} - True if dashboard is loaded
   */
  async isDashboardLoaded() {
    return await this.elementHelper.exists(this.dashboardTitle);
  }

  /**
   * Get dashboard title text
   * @returns {Promise<string>} - Dashboard title text
   */
  async getDashboardTitle() {
    if (await this.elementHelper.exists(this.dashboardTitle)) {
      return await this.elementHelper.getTextWithRetry(this.dashboardTitle);
    }
    return '';
  }

  /**
   * Navigate to profiles section
   */
  async navigateToProfiles() {
    await this.elementHelper.clickWithRetry(this.profilesLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to settings section
   */
  async navigateToSettings() {
    await this.elementHelper.clickWithRetry(this.settingsLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to recycle bin
   */
  async navigateToRecycleBin() {
    await this.elementHelper.clickWithRetry(this.recycleBinLink);
    await this.waitForPageLoad();
  }

  /**
   * Get user role text
   * @returns {Promise<string>} - User role text
   */
  async getUserRole() {
    if (await this.elementHelper.exists(this.userRoleLabel)) {
      return await this.elementHelper.getTextWithRetry(this.userRoleLabel);
    }
    return '';
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.elementHelper.clickWithRetry(this.logoutButton);
    await this.waitForPageLoad();
  }

  /**
   * Get payflows count
   * @returns {Promise<string>} - Payflows count
   */
  async getPayflowsCount() {
    if (await this.elementHelper.exists(this.payflowsCounter)) {
      return await this.elementHelper.getTextWithRetry(this.payflowsCounter);
    }
    return '';
  }

  /**
   * Get users count
   * @returns {Promise<string>} - Users count
   */
  async getUsersCount() {
    if (await this.elementHelper.exists(this.usersCounter)) {
      return await this.elementHelper.getTextWithRetry(this.usersCounter);
    }
    return '';
  }

  /**
   * Check if sidebar menu is visible
   * @returns {Promise<boolean>} - True if sidebar menu is visible
   */
  async isSidebarVisible() {
    return await this.elementHelper.exists(this.sidebarMenu);
  }

  /**
   * Get all navigation links in sidebar
   * @returns {Promise<string[]>} - Array of navigation link texts
   */
  async getSidebarLinks() {
    const links = [];
    if (await this.elementHelper.exists(this.sidebarMenu)) {
      const linksLocator = this.page.locator(`${this.sidebarMenu} a`);
      const count = await linksLocator.count();
      for (let i = 0; i < count; i++) {
        const text = await linksLocator.nth(i).textContent();
        if (text) links.push(text.trim());
      }
    }
    return links;
  }
}

module.exports = DashboardPage;

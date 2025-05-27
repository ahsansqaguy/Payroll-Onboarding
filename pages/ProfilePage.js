/**
 * Profile page object for individual profile functionality
 */
class ProfilePage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - using flexible selectors based on DOM exploration
    this.profileTitle = 'h1:has-text("Profile"), .profile-title, [data-testid="profile-title"]';
    this.profileDetails = '.profile-details, .details-container, [data-testid="profile-details"]';
    this.tabsContainer = '.tabs, .tab-container, [role="tablist"], [data-testid="tabs"]';
    this.tabItems = '[role="tab"], .tab, .tab-item, [data-testid="tab"]';
    this.editButton = 'button:has-text("Edit"), [aria-label="edit"], [data-testid="edit-button"]';
    this.saveButton = 'button:has-text("Save"), [aria-label="save"], [data-testid="save-button"]';
    this.cancelButton = 'button:has-text("Cancel"), [aria-label="cancel"], [data-testid="cancel-button"]';
    this.versionHistory = '.version-history, .history, [data-testid="version-history"]';
    this.childProfiles = '.child-profiles, .children, [data-testid="child-profiles"]';
    this.documentsSection = '.documents, .attachments, [data-testid="documents"]';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Check if profile page is loaded
   * @returns {Promise<boolean>} - True if profile page is loaded
   */
  async isProfilePageLoaded() {
    return await this.elementHelper.exists(this.profileDetails);
  }

  /**
   * Get profile title text
   * @returns {Promise<string>} - Profile title text
   */
  async getProfileTitle() {
    if (await this.elementHelper.exists(this.profileTitle)) {
      return await this.elementHelper.getTextWithRetry(this.profileTitle);
    }
    return '';
  }

  /**
   * Get all available tabs
   * @returns {Promise<string[]>} - Array of tab names
   */
  async getAvailableTabs() {
    const tabs = [];
    if (await this.elementHelper.exists(this.tabItems)) {
      const count = await this.page.locator(this.tabItems).count();
      for (let i = 0; i < count; i++) {
        const text = await this.page.locator(this.tabItems).nth(i).textContent();
        if (text) tabs.push(text.trim());
      }
    }
    return tabs;
  }

  /**
   * Click on a tab by name or index
   * @param {string|number} tabNameOrIndex - Tab name or index to click
   */
  async clickTab(tabNameOrIndex) {
    if (typeof tabNameOrIndex === 'string') {
      await this.elementHelper.clickWithRetry(`${this.tabItems}:has-text("${tabNameOrIndex}")`);
    } else {
      await this.page.locator(this.tabItems).nth(tabNameOrIndex).click();
    }
    await this.waitForPageLoad();
  }

  /**
   * Click edit button
   */
  async clickEdit() {
    await this.elementHelper.clickWithRetry(this.editButton);
    await this.waitForPageLoad();
  }

  /**
   * Click save button
   */
  async clickSave() {
    await this.elementHelper.clickWithRetry(this.saveButton);
    await this.waitForPageLoad();
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.elementHelper.clickWithRetry(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if version history is visible
   * @returns {Promise<boolean>} - True if version history is visible
   */
  async isVersionHistoryVisible() {
    return await this.elementHelper.exists(this.versionHistory);
  }

  /**
   * Check if child profiles section is visible
   * @returns {Promise<boolean>} - True if child profiles section is visible
   */
  async isChildProfilesVisible() {
    return await this.elementHelper.exists(this.childProfiles);
  }

  /**
   * Check if documents section is visible
   * @returns {Promise<boolean>} - True if documents section is visible
   */
  async isDocumentsSectionVisible() {
    return await this.elementHelper.exists(this.documentsSection);
  }

  /**
   * Get profile details text
   * @returns {Promise<string>} - Profile details text
   */
  async getProfileDetailsText() {
    if (await this.elementHelper.exists(this.profileDetails)) {
      return await this.elementHelper.getTextWithRetry(this.profileDetails);
    }
    return '';
  }

  /**
   * Check if edit mode is active
   * @returns {Promise<boolean>} - True if edit mode is active
   */
  async isEditModeActive() {
    return await this.elementHelper.exists(this.saveButton);
  }
}

module.exports = ProfilePage;

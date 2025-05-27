/**
 * Profiles List page object for profiles list functionality
 */
class ProfilesListPage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - using flexible selectors based on DOM exploration
    this.profilesTitle = 'h1:has-text("Profiles"), .profiles-title, [data-testid="profiles-title"]';
    this.profilesList = '.profiles-list, .list-container, table, [data-testid="profiles-list"]';
    this.profileItems = '.profile-item, tr, .list-item, [data-testid="profile-item"]';
    this.searchInput = 'input[type="search"], input[placeholder*="Search"], [data-testid="search-input"]';
    this.filterButton = 'button:has-text("Filter"), [data-testid="filter-button"]';
    this.sortButton = 'button:has-text("Sort"), [data-testid="sort-button"]';
    this.paginationControls = '.pagination, nav[aria-label="pagination"], [data-testid="pagination"]';
    this.nextPageButton = 'button:has-text("Next"), [aria-label="next page"], [data-testid="next-page"]';
    this.prevPageButton = 'button:has-text("Previous"), [aria-label="previous page"], [data-testid="prev-page"]';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Check if profiles list is loaded
   * @returns {Promise<boolean>} - True if profiles list is loaded
   */
  async isProfilesListLoaded() {
    return await this.elementHelper.exists(this.profilesList);
  }

  /**
   * Get profiles list title text
   * @returns {Promise<string>} - Profiles list title text
   */
  async getProfilesListTitle() {
    if (await this.elementHelper.exists(this.profilesTitle)) {
      return await this.elementHelper.getTextWithRetry(this.profilesTitle);
    }
    return '';
  }

  /**
   * Get count of profile items in the list
   * @returns {Promise<number>} - Count of profile items
   */
  async getProfileItemsCount() {
    if (await this.elementHelper.exists(this.profileItems)) {
      return await this.page.locator(this.profileItems).count();
    }
    return 0;
  }

  /**
   * Search for profiles
   * @param {string} searchText - Text to search for
   */
  async searchProfiles(searchText) {
    if (await this.elementHelper.exists(this.searchInput)) {
      await this.elementHelper.fillWithRetry(this.searchInput, searchText);
      await this.page.keyboard.press('Enter');
      await this.waitForPageLoad();
    } else {
      console.log('Search input not found');
    }
  }

  /**
   * Click on filter button
   */
  async clickFilterButton() {
    await this.elementHelper.clickWithRetry(this.filterButton);
  }

  /**
   * Click on sort button
   */
  async clickSortButton() {
    await this.elementHelper.clickWithRetry(this.sortButton);
  }

  /**
   * Check if pagination controls are visible
   * @returns {Promise<boolean>} - True if pagination controls are visible
   */
  async isPaginationVisible() {
    return await this.elementHelper.exists(this.paginationControls);
  }

  /**
   * Navigate to next page
   * @returns {Promise<boolean>} - True if navigation was successful
   */
  async goToNextPage() {
    if (await this.elementHelper.exists(this.nextPageButton)) {
      await this.elementHelper.clickWithRetry(this.nextPageButton);
      await this.waitForPageLoad();
      return true;
    }
    return false;
  }

  /**
   * Navigate to previous page
   * @returns {Promise<boolean>} - True if navigation was successful
   */
  async goToPreviousPage() {
    if (await this.elementHelper.exists(this.prevPageButton)) {
      await this.elementHelper.clickWithRetry(this.prevPageButton);
      await this.waitForPageLoad();
      return true;
    }
    return false;
  }

  /**
   * Click on a profile item by index
   * @param {number} index - Index of the profile item to click
   */
  async clickProfileItem(index) {
    if (await this.elementHelper.exists(this.profileItems)) {
      await this.page.locator(this.profileItems).nth(index).click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Get text content of all profile items
   * @returns {Promise<string[]>} - Array of profile item texts
   */
  async getProfileItemsText() {
    const texts = [];
    if (await this.elementHelper.exists(this.profileItems)) {
      const count = await this.page.locator(this.profileItems).count();
      for (let i = 0; i < count; i++) {
        const text = await this.page.locator(this.profileItems).nth(i).textContent();
        if (text) texts.push(text.trim());
      }
    }
    return texts;
  }

  /**
   * Check if search input is visible
   * @returns {Promise<boolean>} - True if search input is visible
   */
  async isSearchInputVisible() {
    return await this.elementHelper.exists(this.searchInput);
  }
}

module.exports = ProfilesListPage;

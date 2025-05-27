/**
 * Parent/Child Flow page object for parent/child relationship functionality
 */
class ParentChildFlowPage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - using flexible selectors based on DOM exploration
    this.parentChildTitle = 'h1:has-text("Parent"), h1:has-text("Child"), .parent-child-title, [data-testid="parent-child-title"]';
    this.parentSection = '.parent-section, [data-testid="parent-section"]';
    this.childSection = '.child-section, [data-testid="child-section"]';
    this.relationshipIndicator = '.relationship, .connection, [data-testid="relationship"]';
    this.workflowControls = '.workflow-controls, .controls, [data-testid="workflow-controls"]';
    this.stateIndicator = '.state, .status, [data-testid="state"]';
    this.approvalButton = 'button:has-text("Approve"), [aria-label="approve"], [data-testid="approve-button"]';
    this.rejectButton = 'button:has-text("Reject"), [aria-label="reject"], [data-testid="reject-button"]';
    this.transitionButton = 'button:has-text("Transition"), [aria-label="transition"], [data-testid="transition-button"]';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Check if parent/child flow page is loaded
   * @returns {Promise<boolean>} - True if parent/child flow page is loaded
   */
  async isParentChildFlowPageLoaded() {
    return await this.elementHelper.exists(this.parentSection) || await this.elementHelper.exists(this.childSection);
  }

  /**
   * Get parent/child title text
   * @returns {Promise<string>} - Parent/child title text
   */
  async getParentChildTitle() {
    if (await this.elementHelper.exists(this.parentChildTitle)) {
      return await this.elementHelper.getTextWithRetry(this.parentChildTitle);
    }
    return '';
  }

  /**
   * Check if parent section is visible
   * @returns {Promise<boolean>} - True if parent section is visible
   */
  async isParentSectionVisible() {
    return await this.elementHelper.exists(this.parentSection);
  }

  /**
   * Check if child section is visible
   * @returns {Promise<boolean>} - True if child section is visible
   */
  async isChildSectionVisible() {
    return await this.elementHelper.exists(this.childSection);
  }

  /**
   * Check if relationship indicator is visible
   * @returns {Promise<boolean>} - True if relationship indicator is visible
   */
  async isRelationshipIndicatorVisible() {
    return await this.elementHelper.exists(this.relationshipIndicator);
  }

  /**
   * Get state indicator text
   * @returns {Promise<string>} - State indicator text
   */
  async getStateIndicatorText() {
    if (await this.elementHelper.exists(this.stateIndicator)) {
      return await this.elementHelper.getTextWithRetry(this.stateIndicator);
    }
    return '';
  }

  /**
   * Click approve button
   */
  async clickApprove() {
    await this.elementHelper.clickWithRetry(this.approvalButton);
    await this.waitForPageLoad();
  }

  /**
   * Click reject button
   */
  async clickReject() {
    await this.elementHelper.clickWithRetry(this.rejectButton);
    await this.waitForPageLoad();
  }

  /**
   * Click transition button
   */
  async clickTransition() {
    await this.elementHelper.clickWithRetry(this.transitionButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if workflow controls are visible
   * @returns {Promise<boolean>} - True if workflow controls are visible
   */
  async areWorkflowControlsVisible() {
    return await this.elementHelper.exists(this.workflowControls);
  }
}

module.exports = ParentChildFlowPage;

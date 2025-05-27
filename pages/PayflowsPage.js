/**
 * Payflows page object for payflows functionality
 */
class PayflowsPage extends require('./BasePage') {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors - using flexible selectors based on DOM exploration
    this.payflowsTitle = 'h1:has-text("Payflows"), .payflows-title, [data-testid="payflows-title"]';
    this.canvas = 'canvas, .canvas, [data-testid="canvas"]';
    this.toolbar = '.toolbar, .tools, [data-testid="toolbar"]';
    this.shapeButtons = '.shape-button, button[title*="shape" i], [data-testid*="shape"]';
    this.connectionButton = 'button:has-text("Connect"), button[title*="connect" i], [data-testid="connect-button"]';
    this.stickyNoteButton = 'button:has-text("Note"), button[title*="note" i], [data-testid="note-button"]';
    this.exportButton = 'button:has-text("Export"), button[title*="export" i], [data-testid="export-button"]';
    this.saveButton = 'button:has-text("Save"), button[title*="save" i], [data-testid="save-button"]';
    this.scenariosList = '.scenarios-list, .list, [data-testid="scenarios-list"]';
    this.gherkinOutput = '.gherkin, .output, [data-testid="gherkin-output"]';
    
    // Add ElementHelper for more robust interactions
    this.elementHelper = new (require('../utils/ElementHelper'))(page);
  }

  /**
   * Check if payflows page is loaded
   * @returns {Promise<boolean>} - True if payflows page is loaded
   */
  async isPayflowsPageLoaded() {
    return await this.elementHelper.exists(this.canvas);
  }

  /**
   * Get payflows title text
   * @returns {Promise<string>} - Payflows title text
   */
  async getPayflowsTitle() {
    if (await this.elementHelper.exists(this.payflowsTitle)) {
      return await this.elementHelper.getTextWithRetry(this.payflowsTitle);
    }
    return '';
  }

  /**
   * Check if canvas is visible
   * @returns {Promise<boolean>} - True if canvas is visible
   */
  async isCanvasVisible() {
    return await this.elementHelper.exists(this.canvas);
  }

  /**
   * Check if toolbar is visible
   * @returns {Promise<boolean>} - True if toolbar is visible
   */
  async isToolbarVisible() {
    return await this.elementHelper.exists(this.toolbar);
  }

  /**
   * Click on a shape button
   * @param {number} index - Index of the shape button to click
   */
  async clickShapeButton(index = 0) {
    const buttons = await this.page.locator(this.shapeButtons).all();
    if (buttons.length > index) {
      await buttons[index].click();
    } else {
      throw new Error(`Shape button at index ${index} not found`);
    }
  }

  /**
   * Click on canvas at specified coordinates
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  async clickCanvas(x, y) {
    const canvas = await this.page.locator(this.canvas).first();
    const box = await canvas.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + x, box.y + y);
    } else {
      throw new Error('Canvas not found or not visible');
    }
  }

  /**
   * Create a shape on canvas
   * @param {number} shapeIndex - Index of the shape to create
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  async createShape(shapeIndex, x, y) {
    await this.clickShapeButton(shapeIndex);
    await this.clickCanvas(x, y);
  }

  /**
   * Connect two points on canvas
   * @param {number} x1 - X coordinate of first point
   * @param {number} y1 - Y coordinate of first point
   * @param {number} x2 - X coordinate of second point
   * @param {number} y2 - Y coordinate of second point
   */
  async connectPoints(x1, y1, x2, y2) {
    const canvas = await this.page.locator(this.canvas).first();
    const box = await canvas.boundingBox();
    if (box) {
      await this.elementHelper.clickWithRetry(this.connectionButton);
      await this.page.mouse.move(box.x + x1, box.y + y1);
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + x2, box.y + y2);
      await this.page.mouse.up();
    } else {
      throw new Error('Canvas not found or not visible');
    }
  }

  /**
   * Add sticky note to canvas
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {string} text - Text for the sticky note
   */
  async addStickyNote(x, y, text) {
    await this.elementHelper.clickWithRetry(this.stickyNoteButton);
    await this.clickCanvas(x, y);
    await this.page.keyboard.type(text);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Export payflow
   */
  async exportPayflow() {
    await this.elementHelper.clickWithRetry(this.exportButton);
  }

  /**
   * Save payflow
   */
  async savePayflow() {
    await this.elementHelper.clickWithRetry(this.saveButton);
  }

  /**
   * Check if scenarios list is visible
   * @returns {Promise<boolean>} - True if scenarios list is visible
   */
  async isScenariosListVisible() {
    return await this.elementHelper.exists(this.scenariosList);
  }

  /**
   * Check if gherkin output is visible
   * @returns {Promise<boolean>} - True if gherkin output is visible
   */
  async isGherkinOutputVisible() {
    return await this.elementHelper.exists(this.gherkinOutput);
  }

  /**
   * Get gherkin output text
   * @returns {Promise<string>} - Gherkin output text
   */
  async getGherkinOutputText() {
    if (await this.elementHelper.exists(this.gherkinOutput)) {
      return await this.elementHelper.getTextWithRetry(this.gherkinOutput);
    }
    return '';
  }
}

module.exports = PayflowsPage;

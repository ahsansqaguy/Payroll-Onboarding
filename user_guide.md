# Payroll Standard Automation Project - User Guide

## Introduction
This document provides instructions for running and maintaining the automated test suite for the Payroll Standard application. The test suite is implemented using Playwright with JavaScript and covers all major modules, roles, and cross-browser compatibility.

## Project Structure
```
payroll_automation/
├── pages/               # Page Object Model classes
│   ├── BasePage.js      # Base page class with common methods
│   ├── LoginPage.js     # Authentication page object
│   ├── DashboardPage.js # Dashboard page object
│   ├── ProfilesListPage.js # Profiles list page object
│   ├── ProfilePage.js   # Profile page object
│   ├── PayflowsPage.js  # Payflows page object
│   └── ParentChildFlowPage.js # Parent/Child flow page object
├── tests/               # Test specifications
│   ├── authentication.spec.js # Authentication tests
│   ├── dashboard.spec.js # Dashboard tests
│   ├── profiles-list.spec.js # Profiles list tests
│   ├── profile.spec.js  # Profile tests
│   ├── payflows.spec.js # Payflows tests
│   ├── parent-child-flow.spec.js # Parent/Child flow tests
│   ├── cross-browser.spec.js # Cross-browser tests
│   └── role-specific.spec.js # Role-specific tests
├── utils/               # Utility functions and helpers
│   ├── Utils.js         # Common utility functions
│   ├── TestData.js      # Test data management
│   ├── TestConfig.js    # Test configuration
│   ├── ElementHelper.js # Element interaction helper
│   ├── DebugHelper.js   # Debugging utilities
│   └── CrossBrowserHelper.js # Cross-browser utilities
├── reports/             # Test reports and screenshots
│   ├── screenshots/     # Screenshots captured during test runs
│   └── html_logs/       # HTML logs for debugging
├── playwright.config.js # Playwright configuration
├── package.json         # Project dependencies
└── validation_report.md # Test validation report
```

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Playwright browsers:
   ```
   npx playwright install
   ```
4. Install browser dependencies:
   ```
   npx playwright install-deps
   ```

## Running Tests
### Run all tests
```
npx playwright test
```

### Run specific test file
```
npx playwright test tests/authentication.spec.js
```

### Run tests in specific browser
```
npx playwright test --project=chromium
npx playwright test --project=webkit
npx playwright test --project=firefox
```

### Run tests with UI mode
```
npx playwright test --ui
```

### Run tests with debug mode
```
npx playwright test --debug
```

## Test Data
Test data is managed in `utils/TestData.js`. Update this file to change test credentials or other test data.

## Known Limitations
1. Multi-Client Admin tests are implemented as placeholders since credentials were not available.
2. Payflows canvas interactions are limited to basic verification due to complex canvas interactions.
3. Safari/Edge tests run in headless mode with browser-specific configurations.
4. Some tests use soft assertions to handle conditional UI elements.

## Troubleshooting
1. **Element not found errors**: Check if selectors need to be updated due to UI changes.
2. **Timeout errors**: Increase timeout values in `utils/TestConfig.js`.
3. **Browser-specific issues**: Check browser-specific workarounds in `utils/CrossBrowserHelper.js`.
4. **Screenshots and logs**: Check the `reports/` directory for debugging information.

## Extending the Test Suite
1. Add new page objects in the `pages/` directory
2. Add new test files in the `tests/` directory
3. Update test data in `utils/TestData.js`
4. Update browser-specific configurations in `utils/CrossBrowserHelper.js`

## Maintenance
Regular maintenance is recommended to ensure the test suite remains effective:
1. Update selectors if the application UI changes
2. Update test data if test accounts change
3. Add tests for new features
4. Review and update browser-specific workarounds as browsers evolve

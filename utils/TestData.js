/**
 * Test data management for authentication tests
 */
const authTestData = {
  singleClientAdmin: {
    username: 'saqibpayrollstandard+sca@proton.me',
    password: 'A1b2c3d4x@1234',
    role: 'Single Client Admin'
  },
  employee: {
    username: 'saqibpayrollstandard+emp@proton.me',
    password: 'Test-123456!!@',
    role: 'Employee'
  },
  invalid: {
    username: 'invalid@example.com',
    password: 'wrongpassword'
  }
};

module.exports = {
  authTestData
};

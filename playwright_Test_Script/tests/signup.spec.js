const { test, expect } = require('@playwright/test');

const testData = {
  valid: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'doe@example.com',
    phone: '1234567890',
    dob: '2000-01-01',
    city: 'Delhi',
    state: 'DL',
    password: 'Password@123',
    repassword: 'Password@123'
  },
  invalid: {
    email: 'invalidemail',
    phone: '12345',
    password: 'short',
    repassword: 'mismatch',
    first_name: 'test123'
  },
  EdgeCase:{
    
  }
};


async function commonField(page, overrides = {}) {
  await page.goto('http://localhost/webkul/signup.php');
  
  await page.fill('#first_name', overrides.first_name || testData.valid.first_name);
  await page.fill('#last_name', overrides.last_name || testData.valid.last_name);
  await page.fill('#email', overrides.email || testData.valid.email);
  await page.fill('#phone', overrides.phone || testData.valid.phone);
  await page.fill('#dob', overrides.dob || testData.valid.dob);
  await page.fill('#city', overrides.city || testData.valid.city);
  await page.fill('#state', overrides.state || testData.valid.state);
  await page.fill('#password', overrides.password || testData.valid.password);
  await page.fill('#repassword', overrides.repassword || testData.valid.repassword);
}

test.describe('Form Submission Tests', () => {
  
  test('Verify Form Submission is valid', async ({ page }) => {
    await commonField(page, testData.valid);
    await page.click('button[type="submit"]');
    await expect(page.locator('.submitMsg')).toHaveText(/Thanks for submitting your form/i);
  });

});

test.describe('Validation Error Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/webkul/signup.php');
  });

  test('Verify valid First Name', async ({ page }) => {
    await commonField(page, { first_name: testData.invalid.first_name });
    await page.click('button[type="submit"]');

    await expect(page.locator('#errorMessages')).toContainText(/First Name is required and must contain only letters./, {timeout: 10000});
  });

  test('Verify invalid Email', async ({ page }) => {
    await commonField(page, { email: testData.invalid.email });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/A valid email is required./);
  });commonField

  test('Verify mismatched passwords', async ({ page }) => {
    await commonField(page, { password: testData.invalid.password , repassword: testData.invalid.repassword });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/Passwords do not match./);
  });

  test('Verify the format of phone number', async ({ page }) => {
    await commonField(page, { phone: testData.invalid.phone });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/Phone number must be exactly 10 digits./);
  });

  test('Verify password is Strong Or weak', async ({ page }) => {
    await commonField(page, { password: 'short', repassword: 'short' });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/Password must be at least 6 characters long and contain A-Z, a-z, 0-9, and special characters./);
  });

});


test.describe('Edge Case Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/webkul/signup.php');
  });

  test('Long First Name', async ({ page }) => {
    const longName = 'a'.repeat(300);
    await commonField(page, { first_name: longName });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/First Name is required and must contain only letters./i, {timeout: 10000});
  });

  test('Special Characters in City/State', async ({ page }) => {
    await commonField(page, { city: '@#$%', state: '%%!!' });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/City must contain only letters./i);
    await expect(page.locator('#errorMessages')).toContainText(/State must contain only letters./i);
  });

  test('Whitespace-Only Inputs', async ({ page }) => {
    await commonField(page, {
      first_name: '   ',
      city: '   ',
      state: '   '
    });
    await page.click('button[type="submit"]');
    await expect(page.locator('#errorMessages')).toContainText(/First Name is required and must contain only letters./i);
  });

  test('Duplicate Email Submission', async ({ page }) => {
    const duplicateEmail = 'duptest@example.com';

    await commonField(page, { email: duplicateEmail });
    await page.click('button[type="submit"]');
    await expect(page.locator('.submitMsg')).toHaveText(/Thanks for submitting your form/i);

    await page.goto('http://localhost/webkul/signup.php');
    await commonField(page, { email: duplicateEmail });
    await page.click('button[type="submit"]');
    await expect(page.locator('#serverErrors')).toContainText(/Email already exists./i); 
  });

});
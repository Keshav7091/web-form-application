const {test, expect} = require('@playwright/test');


test("Verify Form Submission is valid", async function({page}){

    await page.goto("http://localhost/webkul/signup.php");

    await page.getByPlaceholder("Enter your first name").type("Test");

    await page.getByPlaceholder("Enter your last name").type("Case");

    await page.getByPlaceholder("Enter your email").type("test@example.com");
    
    await page.getByPlaceholder("Enter your phone number").type("1234567890");
    
    await page.locator("//input[@id='password']").type("Test@123")
    
    await page.locator("input[name='repassword']").type("Test@123");
    
    await page.locator("input[name='dob']").fill("2000-01-01");

    await page.getByPlaceholder("City").type("Noida");

    await page.getByPlaceholder("State").type("UP");

    await page.locator("button[type='submit']").click();

    await expect(page.locator('.submitMsg')).toHaveText(/Thanks for submitting your form/i);
    
})


test.describe('Verify field validation errors', () => {

  test('Verify valid First Name', async ({ page }) => {
    await page.goto('http://localhost/webkul/signup.php');

    await page.getByPlaceholder("Enter your first name").type("test12");

    await page.locator('input[name="email"]').type("test@example.com");

    await page.locator('input[name="password"]').type('Test@123');

    await page.locator('input[name="repassword"]').type('Test@123');

    await page.click('button[type="submit"]');


    await expect(page.locator('#errorMessages')).toHaveText(/First name must contain only letters./i);
  });

  test('Verify invalid Email', async ({ page }) => {
    await page.goto('http://localhost/webkul/signup.php');

    await page.getByPlaceholder("Enter your first name").type("Test");

    await page.locator('input[name="email"]').type('Test123');

    await page.locator('input[name="password"]').type('Test@123');

    await page.locator('input[name="repassword"]').type('Test@123');

    await page.click('button[type="submit"]');

    await expect(page.locator('#errorMessages')).toContainText('A valid email is required.');
  });

  test('Verify mismatched passwords', async ({ page }) => {
    await page.goto('http://localhost/webkul/signup.php');

    await page.fill('input[name="first_name"]', 'Test');

    await page.fill('input[name="email"]', 'test@example.com');

    await page.fill('input[name="password"]', 'Test@123');

    await page.fill('input[name="repassword"]', 'Test@321');

    await page.click('button[type="submit"]');

    await expect(page.locator('#errorMessages')).toContainText('Passwords do not match');
  });

});


test('Verify phone number validation', async ({ page }) => {
  await page.goto('http://localhost/webkul/signup.php'); 

  await page.fill('#first_name', 'Nguyen');
  await page.fill('#last_name', 'Shane');
  await page.fill('#email', 'nathan.roberts@example.com');
  await page.fill('#password', 'Test@123');
  await page.fill('#repassword', 'Test@123');
  await page.fill('#dob', '1990-01-01');
  await page.fill('#city', 'Austin');
  await page.fill('#state', 'Arkanas');
  
  await page.fill('#phone', '12345');
  await page.click('.btn');  
  
  await expect(page.locator('#errorMessages')).toContainText('Phone number must be exactly 10 digits.');

  await page.fill('#phone', '123456789012');
  await page.click('.btn');  
  
  await expect(page.locator('#errorMessages')).toContainText('Phone number must be exactly 10 digits.');

  await page.fill('#phone', '1234567890');
  await page.click('.btn');  

  await expect(page.locator('#errorMessages')).toHaveText('');
});


test('Verify password is Strong Or Not', async ({ page }) => {
  await page.goto('http://localhost/webkul/signup.php'); 

  await page.fill('#first_name', 'Nguyen');
  await page.fill('#last_name', 'Shane');
  await page.fill('#email', 'nathan.roberts@example.com');
  await page.fill('#phone', '1234567890');
  await page.fill('#dob', '1990-01-01');
  await page.fill('#city', 'Austin');
  await page.fill('#state', 'Arkanas');

  await page.fill('#password', 'short');
  await page.fill('#repassword', 'short');
  await page.click('.btn');  
  
  await expect(page.locator('#errorMessages')).toContainText('Password must be at least 6 characters long and contain A-Z, a-z, 0-9, and special characters.');

  await page.fill('#password', 'Password123');
  await page.fill('#repassword', 'Password123');
  await page.click('.btn');  
  
  await expect(page.locator('#errorMessages')).toContainText('Password must be at least 6 characters long and contain A-Z, a-z, 0-9, and special characters.');

  await page.fill('#password', 'Password@123');
  await page.fill('#repassword', 'Password@123');
  await page.click('.btn');  

  await expect(page.locator('#errorMessages')).toHaveText('');
});

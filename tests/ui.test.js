const {expect, test} = require('@playwright/test');
const baseURL = "http://localhost:4000";
const user = 'peter@abv.bg';
const password = '123456'

//----Navigation Bar for Guest Users ----

//--- Test1: Verify That the "All Books" Link Is Visible for Guest Users
test("Verify AllBooks link is visible", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});


//--- Tets2: Verify That the "Login" Button Is Visible
test('Verify that the Login Button is visible', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
 });
 
 //--- Test3: Verify That the "Register" Button Is Visible
 test('Verify That Register Button Is Visible', async ({ page }) => {
     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     const registerButton = await page.$('a[href="/register"]');
     const isRegisterButtonVisible = await registerButton.isVisible();
     expect(isRegisterButtonVisible).toBe(true);
 });

 //-------- Navigation Bar for Logged-In Users
 
 //---Test1: Verify That the "All Books" Link Is Visible
//test.only to verify just this test:
 test('Verify "All Books" link is visible after user login', async ({ page}) => {
   //Using the code guidance from the exercise:
    //await page.goto('http://localhost:4000/login');
    //await page.fill('input[name="email"]', 'peter@abv.bg');
    //await page.fill('input[name="password"]', '123456');
    //await page.click('input[type="submit"]');


    //Using Dimo's code fromm Video using copy selector from the dev console F12:
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');
    await page.fill('#email', user);
    await page.fill('#password', password);
    await page.click('#login-form > fieldset > input');

    //check if Logout button is visible(to prove we are loggedin)
    const logoutButton = await page.$('#logoutBtn')
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true);


    //check if All Books link is visible:
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
 });

 test('Verify "My Books" link is visible after user login', async ({ page}) => {
     //Using Dimo's code fromm Video using copy selector from the dev console F12:
     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     await page.click('a[href="/login"]');
     await page.fill('#email', "peter@abv.bg");
     await page.fill('#password', "123456");
     await page.click('#login-form > fieldset > input');
 
     //check if MyBooks link is visible:
     const myBooksLink = await page.$('a[href="/profile"]');
     const isMyBooksLinkVisible = await myBooksLink.isVisible();
     expect(isMyBooksLinkVisible).toBe(true);
  });
     

  test('Verify "Add Book" link is visible after user login', async ({ page}) => {
    //Using Dimo's code fromm Video using copy selector from the dev console F12:
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    //check if Add Book link is visible:
    const addBooksLink = await page.$('a[href="/create"]');
    const isAddBooksLinkVisible = await addBooksLink.isVisible();
    expect(isAddBooksLinkVisible).toBe(true);
 });

 test('Verify user email is visible after user login', async ({ page}) => {
    
     //Using Dimo's code fromm Video using copy selector from the dev console F12:
     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     await page.click('a[href="/login"]');
     await page.fill('#email', "peter@abv.bg");
     await page.fill('#password', "123456");
     await page.click('#login-form > fieldset > input');
      
     //check if user's email link is visible:
     const userEmailLink = await page.$('#user > span');
     const isuserEmailLinkVisible = await userEmailLink.isVisible();
     expect(isuserEmailLinkVisible).toBe(true);
  });
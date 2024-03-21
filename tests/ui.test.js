const {expect, test} = require('@playwright/test');
const baseURL = "http://localhost:4001";
const loginURL = "http://localhost:4001/login";
const registerURL = "http://localhost:4001/register";
const catalogURL = "http://localhost:4001/catalog";
const user = 'peter@abv.bg';
const regularUser = 'john@abv.bg'
const password = '123456';
const password2 = 'differentpassword123';
const passreguser = '123456'

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
 /*test('Verify "All Books" link is visible after user login', async ({ page}) => {



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
*/

test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto(loginURL);
    console.log('Success navigate to loginpage');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    console.log('success filling in email');
    await page.fill('input[name="password"]', '123456');
    console.log('success filling in password');
    await page.click('input[type="submit"]');
  
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
  
    expect(isAllBooksLinkVisible).toBe(true);
  });
  
 test('Verify "My Books" link is visible after user login', async ({ page}) => {
     //Using Dimo's code fromm Video using copy selector from the dev console F12:
     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     await page.click('a[href="/login"]');
     await page.fill('#email', user);
     await page.fill('#password', password);
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
    await page.fill('#email', user);
    await page.fill('#password', password);
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
     await page.fill('#email', user);
     await page.fill('#password', password);
     await page.click('#login-form > fieldset > input');
      
     //check if user's email link is visible:
     const userEmailLink = await page.$('#user > span');
     const isuserEmailLinkVisible = await userEmailLink.isVisible();
     expect(isuserEmailLinkVisible).toBe(true);
  });

  //-----LOGIN PAGE -----
  //Test1: Submit the Form with Valid Credentials:
  test('Login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');
    await page.fill('#email', user);
    await page.fill('#password', password);
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:4001/catalog');
  });

  //Test2: Submit the Form with Empty Input Fields:
test('Login with empty input fields', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(loginURL);
  });

  test('Submit the form with empty email input field', async ({ page }) => {
    //Navigate to the login page
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');

    //Fill the password field with a valid password
    await page.fill('#password', password);

    //Submit the form with an empty email field:
    await page.click('input[type="submit"]');
    
    //Expect a dialog with an alert message that email is required
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Allfields are required');
        await dialog.accept();
    });
  });

  test('Submit the form with empty password input field', async ({ page }) => {
    //Navigate to the login page
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/login"]');

    //Fill the password field with a valid password
    await page.fill('#email', user);

    //Submit the form with an empty email field:
    await page.click('input[type="submit"]');
    
    //Expect a dialog with an alert message that email is required
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Password field is required');
        await dialog.accept();
    });
  });

  //-----REGISTER PAGE -----
  //Test1: Submit the Form with Valid values:
  test('Register with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/register"]');
    await page.fill('#email', user);
    await page.fill('#password', password);
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:4001/register');
  });
  
  //Test2: Submit the Form with Empty Input Fields:
test('Register with empty input fields', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/register"]');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:4001/register');
  });

  test('Submit register form with empty email input field', async ({ page }) => {
    //Navigate to the register page
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/register"]');

    //Fill the password field with a valid password
    await page.fill('#password', password);

    //Submit the form with an empty email field:
    await page.click('input[type="submit"]');
    
    //Expect a dialog with an alert message that email is required
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Email is required');
        await dialog.accept();
    });
  });

  test('Submit the register form with empty password input field', async ({ page }) => {
    //Navigate to the login page
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/register"]');

    //Fill the password field with a valid password
    await page.fill('#email', user);

    //Submit the form with an empty email field:
    await page.click('input[type="submit"]');
    
    //Expect a dialog with an alert message that email is required
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Email field is required');
        await dialog.accept();
    });
  });

  test('Submit the register form with empty confirm password input field', async ({page}) =>{
        // Navigate to the register page:
        await page.goto(baseURL);
        await page.waitForSelector('nav.navbar');
        await page.click('a[href="/register"]');
        // Fill the email field with a valid email:
        await page.fill('#email', user);
        // Fill the password field with a valid password:
        await page.fill('#password', password);
        // Submit the form with an empty confirm password field:
        await page.click('input[type="submit"]');

        // Expect a dialog with an alert message indicating that the confirm password field is required
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('Confirm password field is required');
            await dialog.accept();
        });
  });

  test('Submit the form with different passwords', async ({ page }) => {
    // Navigate to the register page
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    await page.click('a[href="/register"]');

    // Fill the email field with a valid email
    await page.fill('#email', user);

    // Fill the password fields with different passwords
    await page.fill('#password', password);
    await page.fill('#repeat-pass', password2);

    // Submit the form
    await page.click('input[type="submit"]');
   
    // Expect a dialog with an alert message that passwords do not match
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords do not match');
        await dialog.accept();
    });
});

test('Add Book with correct data', async ({ page }) => {
    //go to the "Login" page and fill in the predefined email & password & click on the [Submit] button, as only logged-in users can add books
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')

    ]);
    
    //go to the "Add Book" page via the navigation menu link:
    await page.click('a[href="/create"]');
    
    //wait for the form to load:
    await page.waitForSelector('#create-form');

    //After the form has been loaded, we start filling in the book details with some dummy data:
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book descritpion');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    //After we are finished with filling in the book information, we click on the [Submit] button:
    await page.click('#create-form input[type="submit"]');

    //verify that we're being redirected to the correct page:
    await page.waitForURL('http://localhost:4001/catalog');
    expect(page.url()).toBe('http://localhost:4001/catalog');
});


//Submit the Form with Empty Title Field:
test('Add Book with empty title field', async ({ page }) => {
    //step 1: go to the "Login", login & go to the "Add Book" page:
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);  
    //go to the "Add Book" page via the navigation menu link:
    await page.click('a[href="/create"]');
    //wait for the form to load:
    await page.waitForSelector('#create-form');
    //Start filling in the book details, but leave the title field empty:
    await page.fill('#description', 'This is a test book descritpion');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    // check if an alert popup window appears, that has the " All fields are required!" text message:
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });
    //check if we're redirected to some other page or if we're navigated to the "Add Book" page:
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:4001/create');
});

//Submit the Form with Empty Description Field:
test('Add Book with empty description field', async ({ page }) => {
    //step 1: go to the "Login", login & go to the "Add Book" page:
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);  
    //go to the "Add Book" page via the navigation menu link:
    await page.click('a[href="/create"]');
    //wait for the form to load:
    await page.waitForSelector('#create-form');
    //Start filling in the book details, but leave the title field empty:
    await page.fill('#title', 'Test Book');
    //await page.fill('#description', 'This is a test book descritpion');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    // check if an alert popup window appears, that has the " All fields are required!" text message:
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Field Description is required');
        await dialog.accept();
    });
    //check if we're redirected to some other page or if we're navigated to the "Add Book" page:
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:4001/create');
});


//Submit the Form with Empty Image URL Field:
test('Add Book with empty image URL field', async ({ page }) => {
    //step 1: go to the "Login", login & go to the "Add Book" page:
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);  
    //go to the "Add Book" page via the navigation menu link:
    await page.click('a[href="/create"]');
    //wait for the form to load:
    await page.waitForSelector('#create-form');
    //Start filling in the book details, but leave the title field empty:
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book descritpion');
    //await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    // check if an alert popup window appears, that has the " All fields are required!" text message:
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Field Image URL is required');
        await dialog.accept();
    });
    //check if we're redirected to some other page or if we're navigated to the "Add Book" page:
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:4001/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
   await page.goto('http://localhost:4001/login');
   await page.fill('#email', user);
   await page.fill('#password', password);

   await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:4001/catalog')
   ]);
   //to get the book list, we have to wait for it to load and get it via the CSS class that is assigned to it:
   await page.waitForSelector('.dashboard');
   //get all of the book elements and verify that they are displayed by checking whether their count is greater than 0:
   const bookElements = await page.$$('.other-books-list li');
   expect(bookElements.length).toBeGreaterThan(0);
});

//test ('Verify That No Books Are Displayed')....


test('Login and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');
    //verify that the correct "Details" page has been opened:
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book'); 
});

test('Check if guest user sees Details page', async ({ page }) => {
    await page.goto("http://localhost:4001/catalog");
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    
    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');
    //verify that the correct "Details" page has been opened:
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Verify That All Info Is Displayed Correctly', async ({ page }) => {
    // Navigate to the catalog page & wait for the book elements to load:
    await page.goto('http://localhost:4001/catalog');
    //await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    // Click on a book to view its details:
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    //Get book information:
    const detailsPageTitle = await page.textContent('.book-information h3');
    const detailsPageType = await page.textContent('.book-information p.type');
    const detailsPageDescription = await page.textContent('.book-description');

    // Verify book information:
    expect(detailsPageTitle).toBe('Test Book');
    expect(detailsPageType).toBe('Type: Fiction');
    expect(detailsPageDescription.trim()).not.toBe('');
});


test('Check if Verify Edit and Delete Buttons are visible for Creator', async ({ page }) => {
    //Navigate to the login page and login to All books: 
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);

    //go to Details page:
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);
    //go to Details page:
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');

    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');

    //check if Edit and Delete buttons are visible:
    const editButton = await page.$('.actions a.button[href^="/edit"]')
    const deleteButton = await page.$('.actions a.button[href="javascript:void(0)"]');
    const isEditButtonVisible = await editButton.isVisible();
    const isDeleteButtonVisible = await deleteButton.isVisible();
    expect(isEditButtonVisible).toBe(true);
    expect(isDeleteButtonVisible).toBe(true);

});

test('Check if Edit and Delete Buttons are not visible for Non-Creator', async ({ page}) => {
     //navigate to details page:   
    await page.goto("http://localhost:4001/catalog");
    await page.click('a[href="/catalog"]');
    //wait for details page to load:
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    
    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');
       // Wait for the .actions container to appear:
    await page.waitForSelector('.actions');
    //verify that the correct "Details" page has been opened:
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
    
            //check if Edit and Delete buttons are visible:
            const editButton = await page.$('.actions a.button[href^="/edit"]')
            const deleteButton = await page.$('.actions a.button[href="javascript:void(0)"]');
            
            //const isEditButtonVisible = await editButton.toBeHidden();
            //const isDeleteButtonVisible = await deleteButton.tobeHidden();
            
            await expect(editButton).toBeHidden;
            await expect(deleteButton).toBeHidden;
});

test('Check if Like Button is not visible for Creator', async ({ page }) => {
    //Navigate to the login page and login to All books: 
    await page.goto('http://localhost:4001/login');
    await page.fill('#email', user);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:4001/catalog')
    ]);
    //go to Details page:
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');

    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');

    // Create a Locator object for the Like button:
    const likeButtonLocator =page.locator('.actions a.button[href="javascript:void(0)"]');

    //check if Like button is visible:
    expect(likeButtonLocator).toBeHidden;

});

test('verify Like button is visible for non-creator', async ({ page }) => {
try{
    //Using Dimo's code fromm Video using copy selector from the dev console F12:

     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     await page.click('a[href="/login"]');
     await page.fill('#email', regularUser);
     await page.fill('#password', passreguser);
     await page.click('#login-form > fieldset > input');
 
     //check if Logout button is visible(to prove we are loggedin)
     const logoutButton = await page.$('#logoutBtn')
     const isLogoutButtonVisible = await logoutButton.isVisible();
     expect(isLogoutButtonVisible).toBe(true);

    //await page.goto(baseURL + '/login');
    console.log('navigated to login page');

    //go to Details page:
    await page.click('a[href="/catalog"]');
    console.log("Navigated to the catalog page");
    
    await page.waitForSelector('.otherBooks');
    console.log("otherBooks selector loaded");
    
    await page.click('.otherBooks a.button');
    console.log("clicked on otherBooks button");
    
    //wait for the "Details" page to load:
    await page.waitForSelector('.book-information');
    console.log("book-information selector loaded");


    // Wait for the like button to become visible:
    console.log("waiting for Like button to become visible");
    
        await page.waitForSelector('#likeButton', { visible:true, timeout: 30000 });
        console.log("Like button is visible");

    // Ensure that the Like button is not clicked and hidden:
    await page.evaluate(() => {
         // Override the likeBook function to prevent hiding the button:
         window.likeBook = () => {};
    });

    // Create a constant variable for the Like button:
    const likeButton = await page.$('#likeButton');
    console.log("Selected Like button");

    if (likeButton) {
        const isLikeButtonVisible = await likeButton.isVisible();
        console.log("checked if Like button is visible:", isLikeButtonVisible);
        
        //check if Like button is visible:
        expect(isLikeButtonVisible).toBe(true);
        console.log("verified that Like button is visible");
    } else {
        console.error("Like button not found.");
    }
} catch (error) {
    console.error("Test error: ", error);
}
// Log any errors in the browser console
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

});


test('Verify "Logout" link is visible after user login', async ({ page}) => {
 
     //Using Dimo's code fromm Video using copy selector from the dev console F12:
     await page.goto(baseURL);
     await page.waitForSelector("nav.navbar");
     await page.click('a[href="/login"]');
     await page.fill('#email', regularUser);
     await page.fill('#password', passreguser);
     await page.click('#login-form > fieldset > input');
 
     //check if Logout button is visible(to prove we are loggedin)
     const logoutButton = await page.$('#logoutBtn')
     const isLogoutButtonVisible = await logoutButton.isVisible();
     expect(isLogoutButtonVisible).toBe(true);
 
 

  });
 
test('Verify That the "Logout" Button Redirects Correctly', async({page}) => {
    await page.goto(loginURL);

    await page.fill('#email', user);
    await page.fill('#password', password);
    await page.click('input[type="submit"]');

    //check if Logout button is visible(to prove we are loggedin)
    const logoutButton = await page.$('#logoutBtn')
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true);

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();
    console.log("Current URL:", redirectedURL);
    expect(redirectedURL).toBe(catalogURL);
});
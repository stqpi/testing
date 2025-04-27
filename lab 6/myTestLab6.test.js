// Підключення бібліотек
const { Builder, By, until, Key } = require('selenium-webdriver');
const path = require('path');

jest.setTimeout(40000);

const createRandomUser = () => {
  const id = Math.floor(Math.random() * 99999);
  return {
    username: `TestUser${id}`,
    email: `user${id}@test.com`,
    password: 'StrongPass123',
    firstName: 'Jane',
    lastName: 'Smith',
    address: '221B Baker Street',
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    zipcode: 'NW1 6XE',
    phone: '07000000000'
  };
};

const testUser = createRandomUser();

// Головна сторінка

describe('Automation Exercise Website Tests', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  describe('Landing Page Elements', () => {
    it('Should display website logo with correct alt text', async () => {
      const logo = await browser.wait(
        until.elementLocated(By.xpath('//img[@alt="Website for automation practice"]')),
        10000
      );
      expect(await logo.getAttribute('alt')).toEqual('Website for automation practice');
    });

    it('Should show navigation menu', async () => {
      const navList = await browser.findElement(By.css('ul.nav.navbar-nav'));
      expect(navList).toBeTruthy();
    });

    it('Should have Signup/Login button', async () => {
      const loginLink = await browser.wait(
        until.elementLocated(By.partialLinkText('Signup')),
        8000
      );
      expect(await loginLink.isDisplayed()).toBe(true);
    });
  });
});

-

describe('Contact Us Form Submission', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should fill and submit the Contact Us form', async () => {
    const contactLink = await browser.findElement(By.linkText('Contact us'));
    await contactLink.click();

    const formHeader = await browser.wait(until.elementLocated(By.css('h2.title.text-center')), 5000);
    expect(await formHeader.getText()).toMatch(/contact us/i);

    await browser.findElement(By.name('name')).sendKeys('Support Tester');
    await browser.findElement(By.name('email')).sendKeys('support@testmail.com');
    await browser.findElement(By.name('subject')).sendKeys('Feedback');
    await browser.findElement(By.id('message')).sendKeys('Testing contact form functionality.');

    const fileInput = await browser.findElement(By.name('upload_file'));
    const filePath = path.resolve(__dirname, 'testfile.txt');
    await fileInput.sendKeys(filePath);

    await browser.findElement(By.name('submit')).click();
    await browser.switchTo().alert().accept();

    const successAlert = await browser.wait(until.elementLocated(By.css('.status.alert.alert-success')), 5000);
    expect(await successAlert.isDisplayed()).toBe(true);
  });
});

describe('Product Details Page', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should navigate to product details and verify elements', async () => {
    const productsLink = await browser.findElement(By.linkText('Products'));
    await productsLink.click();

    await browser.wait(until.titleContains('All Products'), 5000);

    const viewFirstProduct = await browser.findElement(By.css('a[href^="/product_details/"]'));
    await viewFirstProduct.click();

    await browser.wait(until.urlContains('/product_details/'), 5000);

    const productTitle = await browser.findElement(By.css('.product-information h2'));
    expect(await productTitle.isDisplayed()).toBe(true);
  });
});

describe('Search for a Product', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should find products by search query', async () => {
    await browser.findElement(By.linkText('Products')).click();
    await browser.wait(until.titleContains('All Products'), 5000);

    const searchField = await browser.findElement(By.id('search_product'));
    await searchField.sendKeys('Dress');

    const searchButton = await browser.findElement(By.id('submit_search'));
    await searchButton.click();

    const searchedHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Searched Products')]")), 5000);
    expect(await searchedHeader.isDisplayed()).toBe(true);

    const searchResults = await browser.findElements(By.css('.features_items .product-image-wrapper'));
    expect(searchResults.length).toBeGreaterThan(0);
  });
});

describe('Newsletter Subscription Tests', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should subscribe via homepage footer', async () => {
    await browser.get('https://automationexercise.com');

    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    const subscriptionHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Subscription')]")), 5000);
    expect(await subscriptionHeader.isDisplayed()).toBe(true);

    const emailField = await browser.findElement(By.id('susbscribe_email'));
    await emailField.sendKeys(`test${Date.now()}@mail.com`);

    const subscribeBtn = await browser.findElement(By.id('subscribe'));
    await subscribeBtn.click();

    const successMsg = await browser.wait(until.elementLocated(By.css('.alert-success.alert')), 8000);
    expect(await successMsg.isDisplayed()).toBe(true);
  });

  it('Should subscribe via Cart page footer', async () => {
    await browser.get('https://automationexercise.com/view_cart');

    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    const subscriptionHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Subscription')]")), 5000);
    expect(await subscriptionHeader.isDisplayed()).toBe(true);

    const emailField = await browser.findElement(By.id('susbscribe_email'));
    await emailField.sendKeys(`carttest${Date.now()}@mail.com`);

    const subscribeBtn = await browser.findElement(By.id('subscribe'));
    await subscribeBtn.click();

    const successMsg = await browser.wait(until.elementLocated(By.css('.alert-success.alert')), 8000);
    expect(await successMsg.isDisplayed()).toBe(true);
  });
});

describe('Test Cases Page Navigation', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should open Test Cases page', async () => {
    const testCasesLink = await browser.findElement(By.linkText('Test Cases'));
    await testCasesLink.click();

    await browser.wait(until.urlContains('/test_cases'), 5000);

    const testCasesHeader = await browser.findElement(By.css('h2.title.text-center'));
    expect(await testCasesHeader.getText()).toMatch(/test cases/i);
  });
});
describe('Contact Us Form Submission', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should fill and submit the Contact Us form', async () => {
    const contactLink = await browser.findElement(By.linkText('Contact us'));
    await contactLink.click();

    const formHeader = await browser.wait(until.elementLocated(By.css('h2.title.text-center')), 5000);
    expect(await formHeader.getText()).toMatch(/contact us/i);

    await browser.findElement(By.name('name')).sendKeys('Support Tester');
    await browser.findElement(By.name('email')).sendKeys('support@testmail.com');
    await browser.findElement(By.name('subject')).sendKeys('Feedback');
    await browser.findElement(By.id('message')).sendKeys('Testing contact form functionality.');

    const fileInput = await browser.findElement(By.name('upload_file'));
    const filePath = path.resolve(__dirname, 'testfile.txt');
    await fileInput.sendKeys(filePath);

    await browser.findElement(By.name('submit')).click();
    await browser.switchTo().alert().accept();

    const successAlert = await browser.wait(until.elementLocated(By.css('.status.alert.alert-success')), 5000);
    expect(await successAlert.isDisplayed()).toBe(true);
  });
});

describe('Product Details Page', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should navigate to product details and verify elements', async () => {
    const productsLink = await browser.findElement(By.linkText('Products'));
    await productsLink.click();

    await browser.wait(until.titleContains('All Products'), 5000);

    const viewFirstProduct = await browser.findElement(By.css('a[href^="/product_details/"]'));
    await viewFirstProduct.click();

    await browser.wait(until.urlContains('/product_details/'), 5000);

    const productTitle = await browser.findElement(By.css('.product-information h2'));
    expect(await productTitle.isDisplayed()).toBe(true);
  });
});

describe('Search for a Product', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should find products by search query', async () => {
    await browser.findElement(By.linkText('Products')).click();
    await browser.wait(until.titleContains('All Products'), 5000);

    const searchField = await browser.findElement(By.id('search_product'));
    await searchField.sendKeys('Dress');

    const searchButton = await browser.findElement(By.id('submit_search'));
    await searchButton.click();

    const searchedHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Searched Products')]")), 5000);
    expect(await searchedHeader.isDisplayed()).toBe(true);

    const searchResults = await browser.findElements(By.css('.features_items .product-image-wrapper'));
    expect(searchResults.length).toBeGreaterThan(0);
  });
});

describe('Newsletter Subscription Tests', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should subscribe via homepage footer', async () => {
    await browser.get('https://automationexercise.com');

    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    const subscriptionHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Subscription')]")), 5000);
    expect(await subscriptionHeader.isDisplayed()).toBe(true);

    const emailField = await browser.findElement(By.id('susbscribe_email'));
    await emailField.sendKeys(`test${Date.now()}@mail.com`);

    const subscribeBtn = await browser.findElement(By.id('subscribe'));
    await subscribeBtn.click();

    const successMsg = await browser.wait(until.elementLocated(By.css('.alert-success.alert')), 8000);
    expect(await successMsg.isDisplayed()).toBe(true);
  });

  it('Should subscribe via Cart page footer', async () => {
    await browser.get('https://automationexercise.com/view_cart');

    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    const subscriptionHeader = await browser.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Subscription')]")), 5000);
    expect(await subscriptionHeader.isDisplayed()).toBe(true);

    const emailField = await browser.findElement(By.id('susbscribe_email'));
    await emailField.sendKeys(`carttest${Date.now()}@mail.com`);

    const subscribeBtn = await browser.findElement(By.id('subscribe'));
    await subscribeBtn.click();

    const successMsg = await browser.wait(until.elementLocated(By.css('.alert-success.alert')), 8000);
    expect(await successMsg.isDisplayed()).toBe(true);
  });
});

describe('Test Cases Page Navigation', () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://automationexercise.com');
  });

  afterAll(async () => {
    await browser.quit();
  });

  it('Should open Test Cases page', async () => {
    const testCasesLink = await browser.findElement(By.linkText('Test Cases'));
    await testCasesLink.click();

    await browser.wait(until.urlContains('/test_cases'), 5000);

    const testCasesHeader = await browser.findElement(By.css('h2.title.text-center'));
    expect(await testCasesHeader.getText()).toMatch(/test cases/i);
  });
});

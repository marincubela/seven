const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

chrome.setDefaultService(new chrome.ServiceBuilder('C:/Program Files (x86)/ChromeDriver/bin/chromedriver.exe').build());

describe('Add parking test', () => {
  it('Parking not added', async () => {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://app.parkirajme.xyz/login');

    // Prijava tvrtka
    await driver.wait(until.elementLocated(By.css('input[name="login-email"]')));
    const emailInput = driver.findElement(By.css('input[name="login-email"]'));

    await driver.actions().click(emailInput).sendKeys('tvrtka', String.fromCharCode(64), 'mail.com').perform();

    await driver.wait(until.elementLocated(By.css('input[name="login-password"]')));
    await (await driver.findElement(By.css('input[name="login-password"]'))).sendKeys('12345678');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    // Dodavanje parkinga
    await driver.wait(until.elementLocated(By.css('a[href="/parkings"]')));
    await (await driver.findElement(By.css('a[href="/parkings"]'))).click();

    await driver.wait(until.elementLocated(By.css('a[href="/parkings/add"]')));
    await (await driver.findElement(By.css('a[href="/parkings/add"]'))).click();

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-name"]')));
    await (await driver.findElement(By.css('input[name="add-parking-name"]'))).sendKeys('Parking Test');

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-capacity"]')));
    await (await driver.findElement(By.css('input[name="add-parking-capacity"]'))).sendKeys('100');

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-disabledCapacity"]')));
    await (await driver.findElement(By.css('input[name="add-parking-disabledCapacity"]'))).sendKeys('10');

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-coordinates"]')));
    await (await driver.findElement(By.css('input[name="add-parking-coordinates"]'))).sendKeys(
      '45.800981050589584, 15.970422520530551',
    );

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-oneTimePrice"]')));
    await (await driver.findElement(By.css('input[name="add-parking-oneTimePrice"]'))).sendKeys('10');

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-repetitivePrice"]')));
    await (await driver.findElement(By.css('input[name="add-parking-repetitivePrice"]'))).sendKeys('10');

    await driver.wait(until.elementLocated(By.css('input[name="add-parking-permanentPrice"]')));
    await (await driver.findElement(By.css('input[name="add-parking-permanentPrice"]'))).sendKeys('10');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    expect(await driver.getCurrentUrl()).toBe('http://app.parkirajme.xyz/parkings/add');

    await driver.quit();
  });
});

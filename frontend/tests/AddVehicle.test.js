const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

chrome.setDefaultService(new chrome.ServiceBuilder(`${process.env.HOME}/chromedriver/bin/chromedriver`).build());
// chrome.setDefaultService(new chrome.ServiceBuilder('C:/Program Files (x86)/ChromeDriver/bin/chromedriver.exe').build());

describe('Add vehicle test', () => {
  test('Vehicle successfully added', async () => {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://app.parkirajme.xyz/login');

    // Prijava klijenta
    await driver.wait(until.elementLocated(By.css('input[name="login-email"]')));
    const emailInput = driver.findElement(By.css('input[name="login-email"]'));

    await driver.actions().click(emailInput).sendKeys('klijent', String.fromCharCode(64), 'mail.com').perform();

    await driver.wait(until.elementLocated(By.css('input[name="login-password"]')));
    await (await driver.findElement(By.css('input[name="login-password"]'))).sendKeys('12345678');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    // Dodavanje vozila
    await driver.wait(until.elementLocated(By.css('a[href="/vehicles"]')));
    await (await driver.findElement(By.css('a[href="/vehicles"]'))).click();

    await driver.wait(until.elementLocated(By.css('a[href="/vehicles/add"]')));
    await (await driver.findElement(By.css('a[href="/vehicles/add"]'))).click();

    await driver.wait(until.elementLocated(By.css('input[name="add-vehicle-name"]')));
    await (await driver.findElement(By.css('input[name="add-vehicle-name"]'))).sendKeys('Auto');

    await driver.wait(until.elementLocated(By.css('input[name="add-vehicle-registration"]')));
    await (await driver.findElement(By.css('input[name="add-vehicle-registration"]'))).sendKeys('1234 ZG');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    await driver.wait(until.elementLocated(By.css('.chakra-toast')));

    expect(await driver.getCurrentUrl()).toBe('http://app.parkirajme.xyz/vehicles');

    await driver.quit();
  });
});

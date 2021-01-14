const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

chrome.setDefaultService(new chrome.ServiceBuilder('C:/Program Files (x86)/ChromeDriver/bin/chromedriver.exe').build());

describe('Login client test', () => {
  test('Valid client login', async () => {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://app.parkirajme.xyz');

    await driver.wait(until.elementLocated(By.css('a[href="/login"]')));

    await (await driver.findElement(By.css('a[href="/login"]'))).click();

    await driver.wait(until.elementLocated(By.css('input[name="login-email"]')));

    const emailInput = driver.findElement(By.css('input[name="login-email"]'));

    await driver.actions().click(emailInput).sendKeys('klijent', String.fromCharCode(64), 'mail.com').perform();

    await driver.wait(until.elementLocated(By.css('input[name="login-password"]')));

    await (await driver.findElement(By.css('input[name="login-password"]'))).sendKeys('12345678');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));

    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    await driver.wait(until.elementLocated(By.css('.leaflet-container')));

    expect(await driver.getCurrentUrl()).toBe('http://app.parkirajme.xyz/');

    await driver.quit();
  });
});

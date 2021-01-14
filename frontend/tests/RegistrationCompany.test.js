const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

chrome.setDefaultService(new chrome.ServiceBuilder(`${process.env.HOME}/chromedriver/bin/chromedriver`).build());
// chrome.setDefaultService(new chrome.ServiceBuilder('C:/Program Files (x86)/ChromeDriver/bin/chromedriver.exe').build());

describe('Registration company test', () => {
  test('Wrong registration', async () => {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://app.parkirajme.xyz');

    await driver.wait(until.elementLocated(By.css('a[href="/registration"]')));

    await (await driver.findElement(By.css('a[href="/registration"]'))).click();

    await driver.wait(until.elementLocated(By.css('a[href="/registration/company"]')));

    await (await driver.findElement(By.css('a[href="/registration/company"]'))).click();

    await driver.wait(until.elementLocated(By.css('input[name="register-company-name"]')));
    await (await driver.findElement(By.css('input[name="register-company-name"]'))).sendKeys('Tvrtka Test');

    await driver.wait(until.elementLocated(By.css('input[name="register-company-email"]')));
    const emailInput = driver.findElement(By.css('input[name="register-company-email"]'));

    await driver.actions().click(emailInput).sendKeys('testTvrtka', String.fromCharCode(64), 'mail.com').perform();

    await driver.wait(until.elementLocated(By.css('input[name="register-company-password"]')));
    await (await driver.findElement(By.css('input[name="register-company-password"]'))).sendKeys('12345678');

    await driver.wait(until.elementLocated(By.css('input[name="register-company-password-repeat"]')));
    await (await driver.findElement(By.css('input[name="register-company-password-repeat"]'))).sendKeys('12345678');

    await driver.wait(until.elementLocated(By.css('input[name="register-company-oib"]')));
    await (await driver.findElement(By.css('input[name="register-company-oib"]'))).sendKeys('32190831234g');

    await driver.wait(until.elementLocated(By.css('input[name="register-company-address"]')));
    await (await driver.findElement(By.css('input[name="register-company-address"]'))).sendKeys('Adresa tvrtke test');

    await driver.wait(until.elementLocated(By.css('div[class="chakra-checkbox__control css-1srs2zk"]')));
    await (await driver.findElement(By.css('div[class="chakra-checkbox__control css-1srs2zk"]'))).click();

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    const actual = (await driver.getCurrentUrl()).includes('app.parkirajme.xyz/registration/company');

    await driver.quit();

    expect(actual).toBe(true);
  });
});

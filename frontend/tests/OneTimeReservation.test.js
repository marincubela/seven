const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

chrome.setDefaultService(new chrome.ServiceBuilder(`${process.env.HOME}/chromedriver/bin/chromedriver`).build());
// chrome.setDefaultService(new chrome.ServiceBuilder('C:/Program Files (x86)/ChromeDriver/bin/chromedriver.exe').build());

describe('Reservation test', () => {
  it('Create one time reservation', async () => {
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

    await driver.wait(until.elementLocated(By.css('img.leaflet-marker-icon.leaflet-interactive')));
    await (await driver.findElements(By.css('img.leaflet-marker-icon.leaflet-interactive')))[0].click();

    await driver.wait(until.elementLocated(By.css('a[href="/addReservation"]')));
    await (await driver.findElement(By.css('a[href="/addReservation"]'))).click();

    await driver.wait(until.elementLocated(By.css('a[href="/addOneTimeReservation"]')));
    await (await driver.findElement(By.css('a[href="/addOneTimeReservation"]'))).click();

    // TODO: add input values
    await driver.wait(until.elementLocated(By.css('main button[type="button"]')));
    await (await driver.findElement(By.css('main button[type="button"]'))).click();

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
    await (await driver.findElement(By.css('button[type="submit"]'))).click();

    await driver.wait(until.elementLocated(By.css('.chakra-toast')));

    const actual = !(await driver.getCurrentUrl()).includes('app.parkirajme.xyz/addOneTimeReservation');

    await driver.quit();

    expect(actual).toBe(true);
  });
});

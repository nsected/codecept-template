Feature('demo_publisher_1');

Scenario('demo publisher ',  async (I) => {
    cookies = require('../../tmp/cookies.json');
    await I.amOnPage('/signin');
    await I.waitForElement('button[type="submit"]', 30);
    await I.clearCookie();
    cookies.forEach(cookie=>{
        I.setCookie(cookie);
    });
    await I.amOnPage('/2340/dashboard');
    await I.waitForElement('//*[contains(@class, "balance-data")]', 60);
});

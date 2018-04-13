Feature('demo_publisher_1');

Scenario('demo publisher ',  async (I) => {
    cookies = require('../tmp/cookies.json');
    await I.amOnPage('/signin');
    await I.waitForElement('button[type="submit"]', 30);
    await I.wait(10);
    await I.clearCookie();
    cookies.forEach(cookie=>{
        I.setCookie(cookie);
    });
    let cookie = await I.grabCookie();
    await console.log('!!!!!!!!!!!!!!!!!');
    await console.log(cookie);
    await I.wait(100000);
    await I.amOnPage('/1/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-user-id")]', 30);
    await console.log('end');
});

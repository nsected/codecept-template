const fs = require('fs');
const tmp = './tmp';
const rimraf = require('rimraf');
rimraf.sync(tmp, {}, function () {});
fs.mkdirSync(tmp);
Feature('demo publisher login');

Scenario('demo publisher ',  async (I) => {
    I.clearCookie();
    I.amOnPage('/signin');
    I.fillField('');
    I.fillField('');
    I.clickOn('//button[@type="submit"]');
    I.waitForElement('//*[@class="panel-body balance-data"]', 30);
    let cookie = await I.grabCookie();
    await fs.writeFileSync(tmp + "/cookies.json", JSON.stringify(cookie), function(err) {
        if(err) {
            console.error(err);
        }
    });
});

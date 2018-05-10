const config = require('codeceptjs').config.get();
Feature('coupons', {timeout: config.timeout, retries: config.retries});
Scenario('coupons', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/coupons`);
    await I.seeElement(`//*[contains(text(),'demo_campaign')]`)
});

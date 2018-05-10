const config = require('codeceptjs').config.get();
Feature('payrank', {timeout: config.timeout, retries: config.retries});
Scenario('payrank', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/payrank`);
    await I.seeElement(`//*[@title="Credit Card"]`)
});

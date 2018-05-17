const config = require('codeceptjs').config.get();
Feature('Gateway Settings', {timeout: config.timeout, retries: config.retries});
Scenario('Gateway Settings', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/direct-account`);
    I.seeText('E-Wallet');
});

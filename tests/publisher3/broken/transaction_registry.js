const config = require('codeceptjs').config.get();
Feature('Transaction Registry finance', {timeout: config.timeout, retries: config.retries});
Scenario('Transaction Registry finance', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/transactions`);
    await I.clickOn('[type="submit"]');
    await I.elementTextEquals('[dir="ltr"]', maskList.currency_any)
});

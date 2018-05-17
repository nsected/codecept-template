const config = require('codeceptjs').config.get();
Feature('Recurring payments', {timeout: config.timeout, retries: config.retries});
Scenario('Recurring payments', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/cards/recurring-charges`);
    await I.elementTextEquals('[dir="ltr"]', maskList.currency_any)
});
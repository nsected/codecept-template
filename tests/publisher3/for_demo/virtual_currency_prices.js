const config = require('codeceptjs').config.get();
Feature('virtual_currency_prices', {timeout: config.timeout, retries: config.retries});
Scenario('virtual_currency_prices', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/virtual-currency`);
    await I.seeText(`3. Demo Project for Universal Protocol`);
    await I.seeText(`Virtual currency`);
    await I.seeText(`1 Gold = 1 EUR`);
    await I.seeText(`1 Gold = 0.1 USD`);
});

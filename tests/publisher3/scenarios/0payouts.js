const config = require('codeceptjs').config.get();
console.log(config.timeout);
console.log(config.retries);
Feature('0Payouts', {timeout: config.timeout, retries: config.retries});
Scenario('Payouts', async (I, login, vars, maskList) => {
    const loginScript = require('../publisher_smart_login');
    await loginScript(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/transfers`);
    await I.clickOn(`//label[contains(text(),'2015')]`);
    await I.elementTextEquals('.list-region td', maskList.short_date)
});

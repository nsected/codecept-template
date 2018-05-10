const config = require('codeceptjs').config.get();
Feature('payment Conversion', {timeout: config.timeout, retries: config.retries});
Scenario('payment conversion ', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/payment-conversion`);
    await I.elementTextEquals(`//*[@class='data-table'] //*[contains(text(),'%')]`, maskList.percentage)
});

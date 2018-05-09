const config = require('codeceptjs').config.get();
Feature('Gross Revenue by Payment Systems', {timeout: config.timeout, retries: config.retries});
Scenario('Gross Revenue by Payment Systems', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/ps-gross-revenue`);
    await I.elementTextEquals('.table td', maskList.any_word)
});

const config = require('codeceptjs').config.get();
Feature('antifraud', {timeout: config.timeout, retries: config.retries});
Scenario('antifraud', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/antifraud/blacklist/logs`);
    await I.elementTextEquals('.projectTypeColumnClass', maskList.any_word)
});

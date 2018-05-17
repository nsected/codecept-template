const config = require('codeceptjs').config.get();
Feature('Documents', {timeout: config.timeout, retries: config.retries});
Scenario('Documents', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/boxnet`);
    await I.elementTextEquals('h4', maskList.any_word)
});

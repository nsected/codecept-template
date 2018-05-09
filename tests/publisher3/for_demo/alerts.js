const config = require('codeceptjs').config.get();
Feature('alerts', {timeout: config.timeout, retries: config.retries});
Scenario('alerts', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/alerts`);
    await I.elementTextEquals('//*[@class="m-t m-b-small message-description-short"]', maskList.any_word)
});

const config = require('codeceptjs').config.get();
Feature('2Projects', {timeout: config.timeout, retries: config.retries});
Scenario('Projects', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects`);
    await I.elementTextEquals('//*[@class = "projects-list-wrapper"]//h5//a', maskList.any_word)
});

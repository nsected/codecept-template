const config = require('codeceptjs').config.get();
Feature('Users operations', {timeout: config.timeout, retries: config.retries});
Scenario('Users operations', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/users/operations`);
    await I.elementTextEquals('.project-users time', maskList.short_date)
});

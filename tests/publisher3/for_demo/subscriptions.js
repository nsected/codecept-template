const config = require('codeceptjs').config.get();
Feature('Subscriptions', {timeout: config.timeout, retries: config.retries});
Scenario('Subscriptions', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/recurring`);
    await I.seeText(`Subscriptions`);
    await I.elementTextEquals('//*[@title="Edit"]', maskList.any_word); //Plan ID в таблице
    await I.clickOn('//*[@title="Edit"]');
    await I.seeText(`Edit recurring plan`);
    await I.seeText(`Plan name`);
});
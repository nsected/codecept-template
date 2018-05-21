const config = require('codeceptjs').config.get();
Feature('pay2play', {timeout: config.timeout, retries: config.retries});
Scenario('pay2play', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/pay2play`);
    await I.seeText(`Create new add-on`);
    await I.elementTextEquals('//p[@class="small text-muted m-b-none"]', maskList.digit); //Name/ Keys available
    await I.clickOn('//*[@ class="fa fa-pencil"]');
    await I.seeContainsText(`Game name`);
    await I.seeContainsText(`Grand Theft Auto V`);
});
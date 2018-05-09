const config = require('codeceptjs').config.get();
Feature('profile', {timeout: config.timeout, retries: config.retries});
Scenario('profile', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/profile`);
    await I.seeText(`English`);
    await I.seeElement(`//*[@value="demo@example.com"]`);
    await I.seeElement(`//*[@value="Demo"]`);
    await I.seeElement(`//*[@value="+79120000000"]`);
    await I.seeElement(`//*[@value="en"]`);
    await I.seeElement(`//*[@value="ru"]`);
    await I.seeElement(`//*[@value="ko"]`);
    await I.seeElement(`//*[@value="zh"]`);
});

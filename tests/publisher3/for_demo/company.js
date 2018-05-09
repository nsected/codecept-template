const config = require('codeceptjs').config.get();
Feature('Company info', {timeout: config.timeout, retries: config.retries});
Scenario('Company info', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/company`);
    await I.seeElement(`//*[@value="demo.example.com"]`);
    await I.seeElement(`//*[@value="demo_api_key"]`);
    await I.seeElement(`//*[@value="USD"]`);
});

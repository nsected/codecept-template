const config = require('codeceptjs').config.get();
Feature('Company users', {timeout: config.timeout, retries: config.retries});
Scenario('Company users', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/company/users`);
    await I.seeText(`Demo User`);
    await I.seeText(`demo@xsolla.com`);
    await I.seeText(`+18184356613`);
    await I.seeText(`Accounting`);
    await I.seeElement(`//*[@value="ROLE_ACCOUTING"]`);
});

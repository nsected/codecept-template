const config = require('codeceptjs').config.get();
Feature('project details', {timeout: config.timeout, retries: config.retries});
Scenario('project details', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project}`);
    await I.seeText(`1. Demo Project [Virtual Currency]`);
    await I.seeText(`Demo Project for demo-merchant.xsolla.com [Virtual Currency]`);
    await I.seeElement(`//*[@value="Demo Project [Virtual Currency]"]`);
    await I.seeElement(`//*[@value="http://xsolla.com"]`);
});

const config = require('codeceptjs').config.get();
Feature('Simple checkout', {timeout: config.timeout, retries: config.retries});
Scenario('Simple checkout', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/launch`);
    await I.seeText(`Simple checkout`);
    await I.seeText(`The module is launched`);
});
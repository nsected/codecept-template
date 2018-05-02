Feature('Promotions');
Scenario('Promotions', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);
    await I.amOnPage(`/${vars.publisher}/promotions`);
    let elemDate = await I.grabDateFrom('.described-time-value');
    I.assert.ok(elemDate instanceof Date);
});
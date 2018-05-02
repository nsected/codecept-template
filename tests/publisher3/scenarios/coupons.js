Feature('Transaction Search');
Scenario('Transaction Search', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/coupons`);
    await I.seeElement(`//*[contains(text(),'demo_campaign')]`)
});

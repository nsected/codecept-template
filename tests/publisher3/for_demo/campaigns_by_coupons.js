Feature('Campaigns by coupons');
Scenario('Campaigns by coupons', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/coupons`);
    await I.elementTextEquals('.table td', maskList.any_word)
});

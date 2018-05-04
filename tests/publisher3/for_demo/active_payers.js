Feature('Active payers');
Scenario('Active payers', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/active-payers`);
    await I.elementTextEquals('.data-table td', maskList.short_date)
});

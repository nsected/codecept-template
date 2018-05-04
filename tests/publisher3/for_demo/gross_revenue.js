Feature('Gross Revenue');
Scenario('Gross Revenue', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/gross-revenue`);
    await I.elementTextEquals('.data-table td', maskList.short_date)
});

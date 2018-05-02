Feature('reports');
Scenario('reports', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/reports`);
    await I.clickOn('.fa-search');
    await I.elementTextEquals('.described-time-value', maskList.short_date)
});

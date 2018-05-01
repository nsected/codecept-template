Feature('!!!!!test analytics');
Scenario('transactions_search', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);
    await I.amOnPage(`/${vars.publisher}/analytics/geo`);
    await I.elementTextEquals('.sorting_1', maskList.digit)
});

Feature('Payouts');
Scenario('Payouts', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/transfers`);
    await I.clickOn(`//label[contains(text(),'2015')]`);
    await I.elementTextEquals('.list-region td', maskList.short_date)
});

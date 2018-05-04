Feature('Recurring payments');
Scenario('Recurring payments', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/cards/recurring-charges`);
    await I.elementTextEquals('[dir="ltr"]', maskList.currency_any)
});
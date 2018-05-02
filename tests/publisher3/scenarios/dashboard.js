Feature('test dashboard');
Scenario('test dashboard', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/dashboard`);
    await I.elementTextEquals('[dir="ltr"]', maskList.digit)
});
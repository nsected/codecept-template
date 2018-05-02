Feature('Transaction Search');
Scenario('Transaction Search', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/users/operations`);
    await I.elementTextEquals('.project-users time', maskList.short_date)
});

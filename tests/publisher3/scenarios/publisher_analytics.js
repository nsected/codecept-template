Feature('!!!!!');
Scenario('!!!!!!!!!!', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/aaaaaaaaaa`);
    await I.elementTextEquals('aaaaaaaaaaa', maskList.digit)
});

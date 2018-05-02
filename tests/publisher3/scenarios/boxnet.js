Feature('Documents');
Scenario('Documents', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/boxnet`);
    await I.elementTextEquals('h4', maskList.any_word)
});

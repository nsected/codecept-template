Feature('test transactions');
Scenario('test transactions', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.clickOn('.nav-item-finance');
    await I.fillField('.search-query', 'тест');
    await I.clickOn('[type="submit"]');
    await I.elementTextEquals('.highlight-cell', /тест/)

});

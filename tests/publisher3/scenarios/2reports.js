Feature('0reports');
Scenario('reports', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/finance/reports`);
    await I.clickOn('.fa-search');
    await I.clickOn('//*[@class="project-filter-tab"]');
    await I.clickOn('//*[@class="tab-pane fade project-filter-tab active in"]//button[@type="submit"]');
    await I.elementTextEquals('//time', maskList.short_date)
});

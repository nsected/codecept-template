const config = require('codeceptjs').config.get();
Feature('virtual_items_settings', {timeout: config.timeout, retries: config.retries});
Scenario('virtual_items_settings', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/items`);
    await I.seeText(`Virtual items`);
    await I.clickOn('(//h5)[3]'); //Tanks (5) в дереве выбора итемов
    await I.clickOn('.list-group a'); //первый итем в группе
    await I.seeText(`Edit Item`);
    await I.seeText(`SKU`);
    await I.seeText(`Item code`);
    await I.seeText(`Virtual Item name`);
});

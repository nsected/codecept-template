const config = require('codeceptjs').config.get();
Feature('project_coupons_campaigns', {timeout: config.timeout, retries: config.retries});
Scenario('project_coupons_campaigns', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/projects/${vars.project_addons}/coupons`);
    await I.seeText(`Campaigns`);
    await I.elementTextEquals('//*[@class="table table-vertical-middle table-hover m-b-none"]//a', maskList.any_word); //Coupon Campaign
    await I.clickOn('//*[@class="table table-vertical-middle table-hover m-b-none"]//a');
    await I.seeText(`Campaign details`);
    await I.seeText(`Campaign code`);
});
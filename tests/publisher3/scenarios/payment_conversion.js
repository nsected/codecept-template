Feature('Conversion');
Scenario('Conversion', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/analytics/payment-conversion`);
    await I.elementTextEquals(`//*[@class='data-table'] //*[contains(text(),'%')]`, maskList.percentage)
});

Feature('demo_publisher_Payment systems list');

Scenario('demo publisher Payment systems list',  async (I) => {
    await require('./login_demo')(I);
    await I.amOnPage('/1/matrix');
    await I.waitForElement('//*[contains(@class, "payment-systems-prices")]', 30);
    await I.seeText('2.5%')

});

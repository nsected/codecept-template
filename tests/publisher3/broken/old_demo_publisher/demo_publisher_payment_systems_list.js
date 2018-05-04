Feature('demo_publisher_Payment systems list');

Scenario('demo publisher Payment systems list',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/1/matrix');
    await I.waitForElement('//*[contains(@class, "payment-systems-prices")]');
    await I.seeText('2.5%')

});

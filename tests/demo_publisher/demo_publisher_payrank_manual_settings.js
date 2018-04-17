Feature('demo_publisher_payrank');

Scenario('demo publisher payrank',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/1/payrank');
    await I.waitForElement('//*[@data-original-title="Fix payment method"]');
});

Feature('demo_publisher_transactions');

Scenario('demo publisher transactions',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/1/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-user-id")]');
});

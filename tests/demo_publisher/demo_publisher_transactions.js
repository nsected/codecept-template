Feature('demo_publisher_transactions');

Scenario('demo publisher transactions',  async (I) => {
    await require('./login_demo')(I);
    await I.amOnPage('/1/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-user-id")]', 30);
});

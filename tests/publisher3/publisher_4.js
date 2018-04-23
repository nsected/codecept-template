Feature('44444444444444444444');

Scenario('44444444444444444444',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/42505/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
});

Feature('2222222222222222222222');

Scenario('222222222222222222222222222',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/42505/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
});

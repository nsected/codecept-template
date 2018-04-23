Feature('1111111111111111111');

Scenario('111111111111111111111111111',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/42505/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
});

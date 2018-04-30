Feature('1111111111111111111');

Scenario('111111111111111111111111111',  async (I, login) => {
    await login.login(I);
    await I.amOnPage('/42505/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
});

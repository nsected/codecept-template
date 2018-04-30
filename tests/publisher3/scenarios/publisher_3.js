Feature('33333333333333333333333333');

Scenario('333333333333333333333333333333',  async (I, login) => {
    await login.login(I);
    await I.amOnPage('/42505/finance/transactions/search');
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
});

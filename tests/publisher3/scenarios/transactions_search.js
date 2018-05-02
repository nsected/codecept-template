Feature('transactions_search');
Scenario('transactions_search', async (I, login, vars) => {
    await require('../publisher_smart_login')(I, login, vars);
    await I.amOnPage(`/${vars.publisher}/finance/transactions/search`);
    await I.waitForElement('//*[contains(@class, "finance-transactions")]');
    
});
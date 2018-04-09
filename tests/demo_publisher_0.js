Feature('demo_publisher_0');

Scenario('demo publisher ',   (I) => {
     I.amOnPage('/');
     I.clickOn('button[type="submit"]');
     I.seeElement('.balance-data');
     I.amOnPage('/1/finance/transactions/search');
     I.seeElement('//*[contains(@class, "finance-user-id")]');
});

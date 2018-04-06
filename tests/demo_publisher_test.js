
Feature('demo publisher');

Scenario('demo publisher ',  (I) => {
    I.amOnPage('/signin');
    I.clickOn('button[type="submit"]');
    I.seeText('Balance');
    I.seeText('Chargeback notification');
    I.seeText('€637');
});

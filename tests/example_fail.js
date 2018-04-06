
Feature('error example');

Scenario('it should fails ',  (I) => {
    I.amOnPage('/helpers/WebDriverIO/codeceptjs');
    I.amOnPage('/helpers/WebDriverIO/11111codeceptjs gt');
    I.see('тест');
});

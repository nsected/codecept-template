
Feature('kabinet');

Scenario('test something',  (I) => {
    I.amOnPage('/helpers/WebDriverIO/codeceptjs');
    I.amOnPage('/helpers/WebDriverIO/11111codeceptjs gt');
    I.see('Почта');
    let title =  browser.getTitle();
    console.log(title);
});

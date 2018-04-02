
Feature('kabinet');

Scenario('test something', (I) => {
    console.log(1);
    I.amOnPage('/helpers/WebDriverIO/');
    console.log(2);
    I.see('Почта');
    console.log(3);
});

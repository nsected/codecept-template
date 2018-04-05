
Feature('kabinet');

Scenario('test something', async (I) => {
    console.log(1);
    I.amOnPage('/helpers/WebDriverIO/11111codeceptjs gt');
    console.log(2);
    I.see('Почта');
    console.log(3);
    let title = await browser.getTitle();
    console.log(title);
});

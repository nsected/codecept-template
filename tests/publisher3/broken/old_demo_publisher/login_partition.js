module.exports = async function login(I) {
    I.amOnPage('/signin');
    I.fillField('');
    I.fillField('');
    I.clickOn('//button[@type="submit"]');
    I.waitForElement('//*[@class="panel-body balance-data"]', 30);
};
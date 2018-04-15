module.exports = async function login(I) {
    await I.amOnPage('/signin');
    await I.clickOn('button[type="submit"]');
    await I.waitForElement('.adaptive-size');
};
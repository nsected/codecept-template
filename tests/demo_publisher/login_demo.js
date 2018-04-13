module.exports = async function login(I) {
    await I.amOnPage('/signin');
    await I.clickOn('button[type="submit"]', 30);
    await I.waitForElement('.adaptive-size', 30);
};
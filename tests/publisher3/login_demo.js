module.exports = async function login(I) {
    I.amOnPage('/signin');
    I.clickOn('//button[@type="submit"]');
    I.waitForElement('.username');
};
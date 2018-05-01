module.exports = async function login(I) {
    I.amOnPage('/signin');
    await I.clickOn('//button[@type="submit"]');
    await I.fillField('#email', 'kochetovatest+40@gmail.com');
    await I.fillField('#password', 'U6GRTnlxz');
    await I.clickOn('//button[@type="submit"]');
    await I.waitForElement('.username');
};
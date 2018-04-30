module.exports = async function login(I) {
    I.amOnPage('/signin');
    I.fillField('#email', 'kochetovatest+40@gmail.com');
    I.fillField('#password', 'U6GRTnlxz');
    I.clickOn('//button[@type="submit"]');
    I.waitForElement('.username');
};
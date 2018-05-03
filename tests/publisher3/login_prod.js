module.exports = async function login(I, vars) {
    I.amOnPage('/signin');
    await I.clickOn('//button[@type="submit"]');
    await I.fillField('#email', vars.email);
    await I.fillField('#password', vars.password);
    await I.clickOn('//button[@type="submit"]');
    await I.waitForElement('.username');
};
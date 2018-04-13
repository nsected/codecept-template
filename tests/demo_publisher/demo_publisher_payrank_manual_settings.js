Feature('demo_publisher_payrank');

Scenario('demo publisher payrank',  async (I) => {
    await require('./login_demo')(I);
    await I.amOnPage('/1/payrank');
    await I.waitForElement('//*[@data-original-title="Fix payment method"]', 30);
});

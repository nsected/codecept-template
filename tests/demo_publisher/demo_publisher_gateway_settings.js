Feature('demo_publisher_Gateway Settings');

Scenario('demo publisher Gateway Settings',  async (I) => {
    await require('./login_demo')(I);
    await I.amOnPage('/1/direct-account');
    await I.clickOn('//*[contains(@class, "ps-edit")]');
    await I.waitForElement('//*[@name="parameters.merchantAccountName.value"]', 30);
});

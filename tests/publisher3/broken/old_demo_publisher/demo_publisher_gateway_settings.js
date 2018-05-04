Feature('demo_publisher_Gateway Settings');

Scenario('demo publisher Gateway Settings',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/1/direct-account');
    await I.clickOn('//*[contains(@class, "ps-edit")]//*[contains(@class, "fa-pencil")]');
    await I.waitForElement('//*[@name="parameters.merchantAccountName.value"]');
});
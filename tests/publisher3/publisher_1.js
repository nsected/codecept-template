Feature('1111111111111111111');

Scenario('111111111111111111111111111',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/50432/projects');
    await I.waitForElement('//*[contains(@class, "projects-list-wrapper")]');
});

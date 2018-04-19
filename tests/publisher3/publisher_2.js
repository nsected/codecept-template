Feature('2222222222222222222222');

Scenario('222222222222222222222222222',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/50432/projects');
    await I.waitForElement('//*[contains(@class, "projects-list-wrapper")]');
});

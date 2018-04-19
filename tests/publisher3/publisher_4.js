Feature('44444444444444444444');

Scenario('444',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/50432/projects');
    await I.waitForElement('//*[contains(@class, "projects-list-wrapper")]');
    await I.wait(10)
});

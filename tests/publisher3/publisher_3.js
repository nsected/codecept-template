Feature('33333333333333333333333333');

Scenario('333333333333333333333333333333',  async (I, service) => {
    await service.login(I);
    await I.amOnPage('/50432/projects');
    await I.waitForElement('//*[contains(@class, "projects-list-wrapper")]');
    await I.wait(10)
});

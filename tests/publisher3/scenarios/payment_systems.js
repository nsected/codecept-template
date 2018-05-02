module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('Payment systems list', () => {})();

    await libse.open('/1/matrix');
    await libse.verifyText(by.css('.m-b-mini'), libse.masklist.digit)

};

Feature('!!!!!');
Scenario('!!!!!!!!!!', async (I, login, vars, maskList) => {
    await require('../publisher_smart_login')(I, login, vars);

    await I.amOnPage(`/${vars.publisher}/aaaaaaaaaa`);
    await I.elementTextEquals('aaaaaaaaaaa', maskList.digit)
});

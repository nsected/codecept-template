module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Transaction Search', () => {})();

    await libse.open('/1/users/operations');
    await libse.verifyText(by.css('.project-users time'), libse.masklist.short_date)


};
module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('Documents', () => {})();

    await libse.open('/1/boxnet');
    await libse.verifyText(by.css('h4'), libse.masklist.any_word)

};
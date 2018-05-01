module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Projects', () => {})();

    await libse.open('/1/projects');
    await libse.verifyText(by.css('h5'), libse.masklist.any_word)

};
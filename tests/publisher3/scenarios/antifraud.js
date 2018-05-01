module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('antifraud', () => {})();

    await libse.open('/1/antifraud/blacklist/logs');
    await libse.verifyText(by.css('.projectTypeColumnClass'), libse.masklist.any_word)

};
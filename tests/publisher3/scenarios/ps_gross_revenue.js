module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Gross Revenue by Payment Systems', () => {})();

    await libse.open('/1/analytics/ps-gross-revenue');
    await libse.verifyText(by.css('.table td'), libse.masklist.any_word)


};
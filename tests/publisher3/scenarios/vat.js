module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!VAT Statistics', () => {})();

    await libse.open('/1/analytics/vat');
    await libse.verifyText(by.css('.data-table td'), libse.masklist.any_word)


};
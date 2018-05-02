module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Conversion', () => {})();

    await libse.open('/1/analytics/payment-conversion');
    await libse.verifyText(by.xpath(`//*[@class='data-table'] //*[contains(text(),'%')]`), libse.masklist.percentage)


};
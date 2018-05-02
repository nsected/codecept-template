module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Gross Revenue', () => {})();

    await libse.open('/1/analytics/gross-revenue');
    await libse.verifyText(by.css('.data-table td'), libse.masklist.short_date)


};
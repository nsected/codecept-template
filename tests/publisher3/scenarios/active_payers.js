module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Active payers', () => {})();

    await libse.open('/1/analytics/active-payers');
    await libse.verifyText(by.css('.data-table td'), libse.masklist.short_date)


};
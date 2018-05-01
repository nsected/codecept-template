module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!reports', () => {})();

    await libse.open('/1/finance/reports');
    await libse.click(by.css(`.fa-search`));
    await libse.verifyText(by.css('.described-time-value'), libse.masklist.short_date)


};
module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Payouts', () => {})();

    await libse.open('/1/finance/transfers');
    await libse.click(by.xpath(`//label[contains(text(),'2015')]`));
    await libse.verifyText(by.css('.list-region td'), libse.masklist.short_date)


};
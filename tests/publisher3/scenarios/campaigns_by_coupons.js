module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Campaigns by coupons', () => {})();

    await libse.open('/1/analytics/coupons');
    await libse.verifyText(by.css('.table td'), libse.masklist.any_word)


};
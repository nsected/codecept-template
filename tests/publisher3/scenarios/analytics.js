module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!test analytics', () => {})();

    await libse.open('/1/analytics/geo');
    await libse.verifyText(by.css('.sorting_1'), libse.masklist.digit)

};
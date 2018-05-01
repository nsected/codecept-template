module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('Promotions', () => {})();

    await libse.open('/1/promotions');
    let elemDate = await libse.getDate(by.css('.described-time-value'));
    await libse.assert.ok(elemDate instanceof Date);
};
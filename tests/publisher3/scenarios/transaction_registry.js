module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Transaction Registry finance', () => {})();

    await libse.open('/1/finance/transactions');
    await libse.click(by.css('[type="submit"]'));
    await libse.verifyText(by.css('[dir="ltr"]'), libse.masklist.currency_any)


};
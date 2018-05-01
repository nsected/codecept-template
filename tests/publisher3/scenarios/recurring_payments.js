module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Recurring payments', () => {})();

    await libse.open('/1/finance/cards/recurring-charges');
    await libse.verifyText(by.css('[dir="ltr"]'), libse.masklist.currency_any)


};
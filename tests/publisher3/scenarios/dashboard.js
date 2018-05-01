module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!test dashboard', () => {})();

    await libse.open('/1/dashboard');
    await libse.verifyText(by.css('[dir="ltr"]'), libse.masklist.digit)

};
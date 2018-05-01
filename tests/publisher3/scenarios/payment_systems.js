module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('Payment systems list', () => {})();

    await libse.open('/1/matrix');
    await libse.verifyText(by.css('.m-b-mini'), libse.masklist.digit)

};
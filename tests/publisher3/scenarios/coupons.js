module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!Transaction Search', () => {})();

    await libse.open('/1/coupons');
    await libse.waitForPresent(by.xpath(`//*[contains(text(),'demo_campaign')]`));

};
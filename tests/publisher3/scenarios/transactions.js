module.exports =  async function test_suit_example(config, done, libse){
    const by = libse.By;
    allure.createStep('!!!!!test transactions', () => {})();

    await libse.click(by.css('.nav-item-finance'));
    await libse.type(by.css('.search-query'), 'тест');
    await libse.click(by.css('[type="submit"]'));
    await libse.waitForTextMatch(by.css('.highlight-cell'), /тест/);

};
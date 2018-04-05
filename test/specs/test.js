var assert = require('assert');

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function () {

        browser.url('http://webdriver1111111.io');
        var title = browser.getTitle();
        assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
        assert.equal(title, 'skldfnsdkafngdksnfgkejf');
    });
});
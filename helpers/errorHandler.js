'use strict';
let Codecept = require('codeceptjs').codecept;
let container = require('codeceptjs').container;
let helpers = container.helpers();
let event = require('codeceptjs').event;
let config = require('codeceptjs').config.get();
let support = container.support();
let UserPage = container.support('UserPage');
let mocha = container.mocha();

module.exports = function(done) {
    event.dispatcher.on(event.test.failed, async function (test, error) {
        let client = await container.helpers('WebDriverIO');
        let step;
        let url;
        let driverScreenData;
        let screenShot;



            client.browser.getUrl()
                .then(_url => {
                    url = _url;
                    client.browser.screenshot().then(scr=>{
                        driverScreenData = scr.value;
                        handleError(error);
                    })
                        .catch(error=>{
                        handleError(error);
                    });
                });




        function handleError() {
            console.error(' ❌ test fail');
            console.error('url: ' + url);
            console.log(driverScreenData.length);

            if (driverScreenData.length > 0){
                screenShot = new Buffer(
                    driverScreenData,
                    "base64"
                );

                allure.createAttachment(
                    "error screenShot",
                    screenShot
                );
            }
            allure.createStep(' ❌ error: '+ error.name, () => {})();
        }
    });
    done()
};
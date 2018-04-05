'use strict';
let Codecept = require('codeceptjs').codecept;
let container = require('codeceptjs').container;
let helpers = container.helpers();
let event = require('codeceptjs').event;
let config = require('codeceptjs').config.get();
let support = container.support();
let UserPage = container.support('UserPage');
let mocha = container.mocha();

module.exports = function (done) {
    event.dispatcher.on(event.step.started, async function (step) {
        let client = await container.helpers('WebDriverIO');
        let url = await client.browser.getUrl();
        console.log(`${step.actor} ${step.name} ${step.args} at page ${url}`);
        allure.createStep(`${step.actor} ${step.name} ${step.args} at page ${url}`, () => {
        })();
    });

    event.dispatcher.on(event.test.failed, async function (test, error) {
        let client = await container.helpers('WebDriverIO');
        let step;
        let url;
        let driverScreenData;
        let screenShot;
        console.log(test);
        client.browser.getUrl()
            .then(_url => {
                url = _url;
                client.browser.screenshot().then(scr => {
                    driverScreenData = scr.value;
                    handleError(error);
                })
                    .catch(error => {
                        handleError(error);
                    });
            });

        function handleError(error) {
            console.error('test ' + test + 'fail');
            console.error(error);
            console.error('at url: ' + url);

            if (driverScreenData.length > 0) {
                screenShot = new Buffer(
                    driverScreenData,
                    "base64"
                );

                allure.createAttachment(
                    "❌ error screenShot",
                    screenShot
                );
            }
            try {
                allure.createStep(' ❌ error: '+ error.name, () => {throw new Error(error)})();
            } catch (err){}

        }
    });
    done()
};
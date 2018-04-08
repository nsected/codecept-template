'use strict';
let Codecept = require('codeceptjs').codecept;
let container = require('codeceptjs').container;
let helpers = container.helpers();
let event = require('codeceptjs').event;
let config = require('codeceptjs').config.get();
let support = container.support();
let UserPage = container.support('UserPage');
let mocha = container.mocha();
let cookies = [];
try {
    cookies = require('../tmp/cookies.json')
} catch (error){}

// console.log(cookies);

module.exports = function (done) {
    event.dispatcher.on(event.test.started, async function (test) {
        // let client = await container.helpers('WebDriverIO');
        // console.log(config.helpers.WebDriverIO.url);
        // await client.browser.getUrl(config.helpers.WebDriverIO.url);
        // console.log(cookies.length);
        // console.log(client.browser);
        // await client.browser.setCookie(cookies);
    });

    event.dispatcher.on(event.test.started, async function () {
        let minConfig = Object.assign({}, config);
        delete minConfig.mocha;
        allure.createAttachment('config', JSON.stringify(minConfig))
    });

    event.dispatcher.on(event.step.started, async function (step) {
        let client = await container.helpers('WebDriverIO');
        let url = await client.browser.getUrl();
        console.log(`       ${step.actor} ${step.name} ${step.args} at page ${url}`);
        allure.createStep(`${step.actor} ${step.name} ${step.args} at page ${url}`, () => {
        })();
    });

    event.dispatcher.on(event.test.failed, async function (test, error) {
        let client = await container.helpers('WebDriverIO');
        let url;
        let driverScreenData;
        let screenShot;
        let failedStep = test.steps.filter(step => step.status === 'failed');
        client.browser.getUrl()
            .then(_url => {
                url = _url;
                client.browser.screenshot().then(scr => {
                    driverScreenData = scr.value;
                    handleError(error, failedStep[0]);
                })
                    .catch(error => {
                        handleError(error, failedStep[0]);
                    });
            });

        function handleError(error, failedStep) {
            console.error('');
            console.error('❌');
            console.error('❌         test ' + test.title + 'fail');
            console.error('❌         ' + error);
            console.error('❌         at url: ' + url);
            console.error(`❌         on step: ${failedStep.actor} ${failedStep.name} ${failedStep.args}`);
            console.error('❌');
            console.error('');

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
                allure.createStep(`❌ ${failedStep.actor} ${failedStep.name} ${failedStep.args} at page ${url}`, () => {throw error})();
            } catch (err){}

        }
    });
    done()
};
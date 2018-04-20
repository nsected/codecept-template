//логин для теста
const path = require("path");
const config = require('codeceptjs').config.get();

module.exports = function (I) {
    return actor({
        login: async function (I) {
            if (config.isAsync === false && !!config.loginScript) {
                console.log('Login with login script ' + config.loginScript);
                let loginPartition = path.join(process.cwd(), config.loginScript);
                let login = await require(loginPartition);
                await login(I);
            }

            if (config.isAsync === true && !!config.loginScript) {
                cookies = await require('../tmp/cookies.json');
                await console.log('Login with stored cookies ' + cookies.length);
                await I.amOnPage('/');
                await I.clearCookie();
                for (let cookie of cookies) {
                    await I.setCookie(cookie);
                }
            }
        },
    });
};

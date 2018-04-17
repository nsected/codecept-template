const path = require("path");
const config = require('codeceptjs').config.get();

module.exports = function (I) {
    return actor({
        login: async function (I) {
                if (config.isAsync === false && !!config.loginScript) {
                    console.log('!!!!!');
                    let loginPartition = path.join(process.cwd(), config.loginScript);
                    let login = await require(loginPartition);
                    await login(I);
                }
        },
    });
};

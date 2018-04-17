const path = require("path");
const config = require('codeceptjs').config.get();

module.exports = function (I) {
    return actor({
        login: async function (I) {
            try {
                if (config.isAsync === false && !!config.loginScript) {
                    let loginPartition = path.join(process.cwd(), config.loginScript);
                    await require(loginPartition)(I);
                }
            }
            catch (e) {
                console.log(e)
            }
        },
    });
};

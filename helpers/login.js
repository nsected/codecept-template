const path = require("path");
const config = require('codeceptjs').config.get();


Feature('demo_publisher_login');

Scenario('demo_publisher_login', async (I) => {
        try {
            if (!!config.loginScript) {
                console.log(config.loginScript);
                let loginPartition = path.join(process.cwd(), config.loginScript);
                let login = await require(loginPartition);
                await login(I);
            }
        }
        catch
            (e) {
            console.log(e)
        }
    }
);

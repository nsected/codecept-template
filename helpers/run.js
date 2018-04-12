//todo: ограничение потоков
//todo: разделить проект на хелперы и ядро проекта
//todo: cli команды для скрипта запуска тестов
//todo: поддержка всех опций запуска тестов из codecept.js в cli
//todo: поддержка всех опций запуска тестов из codecept.js в конфиге
//todo: выложить проект в локальный репозиторий
//todo: одни сценарии для синхронных и асинхронных тестов
//todo: единый механизм запуска для синхронных и асинхронных тестов, отличие только в опции --async
//todo: поддержка асинхронных тестов в рамках одного инстанса браузера (разные тесты в разных вкладках браузера)

const {spawn} = require('child_process');
const fs = require("fs");
const path = require("path");
const configName = 'publisher3.json';
const baseConfig = require(path.join(process.cwd(), configName));
const test_folder = baseConfig.asyncTestsFolder;
let testsQueue = [];
let processQueue = {};
const testsList = fs.readdirSync(test_folder);
const loginScript = baseConfig.loginScript;
process.env.multi = 'spec=- mocha-allure-reporter=-';

for (let i = 0; i < testsList.length; i++) {
    testsQueue[i] = {
        name: testsList[i],
        testFile: test_folder + testsList[i],
        status: 'waiting'

    };
}

console.log(path.basename(loginScript));

spawnProcess(
    {
    name: path.basename(loginScript),
    testFile: loginScript,
    status: 'waiting'
    },
    'login',
    processQueue,
    configName
)
    .then(()=>{
    testsQueue.forEach(test=>{
        spawnProcess(test, 'main', processQueue, configName)
            .catch(error=>{})
    });
}).catch(error=>{});



function spawnProcess(test, multipleConfig, processQueue, configName) {
    return new Promise((resolve, reject) =>{
        processQueue[test.name] = spawn(
            `npx`,
            [
                `codeceptjs`,
                `run-multiple`,
                `${multipleConfig}`,
                `--reporter`,
                `mocha-multi`,
                `--config`,
                `./${configName}`,
                `--override`,
                `{
                    "tests": "${test.testFile}"
                }`
            ],
            {
                cwd: process.cwd(),
                env: process.env
            }
        );

        processQueue[test.name].stdout.on('data', (data) => {
            console.log(`[${test.name}]: ${data}`);
        });

        processQueue[test.name].stderr.on('data', (data) => {
            console.error(`[${test.name}]: ${data}`);
        });

        processQueue[test.name].on('close', (code) => {
            console.log(`${test.name} exited with code ${code}`);
            if (code===0){
                resolve (true)
            }
            else {
                reject (new Error(`${test.name} exited with code ${code}`))
            }
        });
    })
}
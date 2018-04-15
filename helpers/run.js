



//todo: разделить проект на хелперы и ядро проект
//todo: выложить проект в локальный репозиторий
//todo: написать инструкцию

//todo: ограничение потоков
//todo: сделать гитигнор

//todo: единый механизм запуска для синхронных и асинхронных тестов, отличие только в опции --async
//todo: поддержка мультибраузерности из асинхронной опции кодцепта
//todo: поддержка асинхронных тестов в рамках одного инстанса браузера (разные тесты в разных вкладках браузера)?
//todo: статистика по тестам?

const program = require('commander');
const {spawn} = require('child_process');
const fs = require("fs");
const path = require("path");
const glob = require("glob");

if (process.argv.length <= 2) {
    console.log(`run test with command run and option --config `);
}

program
    .command('run')
    .option('-c, --config [file]', 'configuration file to be used')
    .option('-o, --override [value]', 'override provided config options')
    .option('-a, --async', 'run tests asynchronously')
    .action(function (cmd) {
        let configPath = cmd.config;
        let override = cmd.override;
        let isAsync = cmd.async;
        run(configPath, isAsync, override);
    });
program.parse(process.argv);

async function run(configPath, isAsync, overrideArguments) {
    const config = require(path.join(process.cwd(), configPath));
    const loginScript = config.loginScript;
    let processQueue = {};
    let loginTestQueue;
    let testsQueue;
    process.env.multi = 'spec=- mocha-allure-reporter=-'; //todo: разхардкодить опции моки

    if (isAsync) {
        loginTestQueue = makeAsyncTestsQueue(configPath, overrideArguments, config, true);
        testsQueue = makeAsyncTestsQueue(configPath, overrideArguments, config, false)
    }
    else {
        loginTestQueue = false;
        testsQueue = makeSyncTestsQueue(configPath, overrideArguments, config);
    }

    await handleTestsQueue(loginTestQueue, processQueue);
    await handleTestsQueue(testsQueue, processQueue)
}


function handleTestsQueue(testsQueue, processQueue) {
    return new Promise((resolve, reject) => {
        if (testsQueue === false) resolve(true);

        testsQueue.forEach(test => {
            console.log(test);
            spawnProcess(test, processQueue)
                .then(() => {
                    resolve(true)
                })
                .catch(error => {
                    reject(error)
                })
        });
    });
}

function makeSyncTestsQueue(configPath, overrideArguments, config) {
    return [{
        name: config.name,
        status: 'waiting',
        overrideArguments: overrideArguments,
        configPath: configPath,
        specificTestFile: false
    }]
}

function makeAsyncTestsQueue(configPath, overrideArguments, config, isLoginScript) {
    let asyncTestsQueue = [];
    let testsList;
    if (isLoginScript) {
        if (!config.loginScript) throw new Error('must provide login script');
        testsList = glob.sync(config.loginScript, {});

    }
    else {
        if (!config.loginScript) throw new Error('must provide tests scripts');
        testsList = glob.sync(config.tests, {});
    }

    console.log(testsList);
    for (let i = 0; i < testsList.length; i++) {
        asyncTestsQueue[i] = {
            name: path.basename(testsList[i]),
            status: 'waiting',
            overrideArguments: overrideArguments,
            configPath: configPath,
            specificTestFile: testsList[i]
        };
    }
    return asyncTestsQueue;
}

function buildCodeceptjsArguments(overrideArguments, configPath, specificTestFile) {
    let baseArguments = {
        'codeceptjs': 'run',
        '--reporter': 'mocha-multi', //todo: разхардкодить опции моки
        '--config': configPath,
        '--override': {}
    };

    if (overrideArguments) {
        baseArguments['--override'] = JSON.parse(overrideArguments);
    }

    if (specificTestFile) {
        baseArguments['--override'].tests = specificTestFile;
    }

    if (baseArguments['--override']) {
        baseArguments['--override'] = JSON.stringify(baseArguments['--override']);
    }

    let argumentsArray = [];
    for (let key in baseArguments) {
        argumentsArray.push(key);
        argumentsArray.push(baseArguments[key]);
    }

    return argumentsArray
}

function spawnProcess(test, processQueue) {
    let commandLineArguments = buildCodeceptjsArguments(
        test.overrideArguments,
        test.configPath,
        test.specificTestFile
    );

    return new Promise((resolve, reject) => {
        processQueue[test.name] = spawn(
            `npx`,
            commandLineArguments,
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
            if (code === 0) {
                resolve(true)
            }
            else {
                reject(new Error(`${test.name} exited with code ${code}`))
            }
        });
    })
}



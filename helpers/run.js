//todo: разделить проект на хелперы и ядро проект
//todo: выложить проект в локальный репозиторий

//todo: передавать дополнительные опции codecept.js через run.js

//todo: объеденить очередь тестов и очередь выполняемых потоков в одну
//todo: обсервить ошибки в консоли браузера и записывать их в отчет
//todo: вынести механизм обмена куками в хук кодцепта
//todo: после завершения тестов выдавать в консоль summary
//todo: поддержка мультибраузерности из асинхронной опции кодцепта
//todo: помечать шаги желтым, если при их выполнении в консоли ошибки
//todo: поддержка асинхронных тестов во вкладках одного инстанса браузера?
//todo: статистика по тестам?
//todo: запись видео?

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
    let config = require(path.join(process.cwd(), configPath));
    config.isAsync = isAsync;
    const loginScript = config.loginScript;
    if (!Number.isInteger(config.threadsLimit)) config.threadsLimit = 2;

    let processQueue = {};
    let loginTestQueue;
    let testsQueue;
    process.env.multi = 'spec=- mocha-allure-reporter=-'; //todo: разхардкодить опции моки

    if (isAsync) {
        loginTestQueue = makeAsyncTestsQueue(configPath, overrideArguments, config, 'login');
        testsQueue = makeAsyncTestsQueue(configPath, overrideArguments, config, 'regularTest')
    }
    else {
        loginTestQueue = false;
        testsQueue = makeSyncTestsQueue(configPath, overrideArguments, config);
    }

    await handleTestsQueue(loginTestQueue, processQueue, config);
    await handleTestsQueue(testsQueue, processQueue, config)
}


function handleTestsQueue(testsQueue, processQueue, config) {
    return new Promise((resolve, reject) => {
        if (testsQueue === false) resolve(true);

        let testsQueueCount = testsQueue.length;
        let tempQueue = [];
        let threadsCount;
        let inProgressTestsCount = Object.keys(processQueue).length;
        let freeSlots = config.threadsLimit - inProgressTestsCount;

        if (testsQueueCount >= freeSlots) {
            threadsCount = freeSlots
        }
        else {
            threadsCount = testsQueueCount
        }

        console.log('----------------------------------threadsLimit ' + config.threadsLimit);
        console.log('----------------------------------threadsCount ' + threadsCount);
        console.log('----------------------------------testsQueueCount ' + testsQueueCount);
        console.log('----------------------------------freeSlots ' + freeSlots);

        for (let i = 0; i < threadsCount; i++) {
            tempQueue.push(
                testsQueue.splice(0, 1)[0]
            );
        }
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(tempQueue);
        tempQueue.forEach(test => {

            spawnProcess(test, testsQueue, processQueue, config)
                .then(() => {
                    resolve(true)
                })
                .catch(result => {
                    if (result.test.testType === 'login') {
                        console.error('!!!!!!!! login scenario failed. Exiting');
                        process.exit(1)
                    }
                    else {
                        console.error(result.error)
                    }
                })
        });
    });
}

function spawnProcess(test, testsQueue, processQueue, config) {
    let commandLineArguments = buildCodeceptjsArguments(
        test.overrideArguments,
        test.configPath,
        test.specificTestFile,
        config.isAsync
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

        console.log("multi='spec=- mocha-allure-reporter=-'" + processQueue[test.name].spawnargs.join(' '));

        processQueue[test.name].stdout.on('data', (data) => {
            console.log(`[${test.name}]: ${data}`);
        });

        processQueue[test.name].stderr.on('data', (data) => {
            console.error(`[${test.name}]: ${data}`);
        });

        processQueue[test.name].on('close', (code) => {
            console.log(`${test.name} exited with code ${code}`);
            delete processQueue[test.name];
            if (code === 0) {
                resolve(true)
            }
            else {
                reject({
                    error: new Error(`${test.name} exited with code ${code}`),
                    test: test
                })
            }
            handleTestsQueue(testsQueue, processQueue, config)
        });
    })
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

function makeAsyncTestsQueue(configPath, overrideArguments, config, testType) {
    let asyncTestsQueue = [];
    let testsList;
    if (testType === 'login') {
        if (!config.loginScript) {
            console.log('you not provide login script');
            return false
        }
        else {
            testsList = ['./helpers/login.js'];
        }
    }
    else {
        if (!config.tests) throw new Error('must provide test scripts');
        testsList = glob.sync(config.tests, {});
    }

    for (let i = 0; i < testsList.length; i++) {
        asyncTestsQueue[i] = {
            name: path.basename(testsList[i]),
            status: 'waiting',
            overrideArguments: overrideArguments,
            configPath: configPath,
            specificTestFile: testsList[i],
            testType: testType
        };
    }
    return asyncTestsQueue;
}

function buildCodeceptjsArguments(overrideArguments, configPath, specificTestFile, isAsync) {
    let baseArguments = {
        'codeceptjs': 'run',
        '--debug': '--steps',
        '--reporter': 'mocha-multi', //todo: разхардкодить опции моки
        '--config': configPath,
        '--override': {isAsync: !!isAsync},
    };

    if (overrideArguments) {
        baseArguments['--override'] = JSON.parse(overrideArguments);
    }

    if (specificTestFile) {
        baseArguments['--override'].tests = specificTestFile;
    }

    baseArguments['--override'] = JSON.stringify(baseArguments['--override']);

    let argumentsArray = [];
    for (let key in baseArguments) {
        argumentsArray.push(key);
        argumentsArray.push(baseArguments[key]);
    }

    return argumentsArray
}
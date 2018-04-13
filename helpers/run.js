
//todo: cli команды для скрипта запуска тестов
//todo: поддержка всех опций запуска тестов из codecept.js в cli


//todo: ограничение потоков
//todo: разделить проект на хелперы и ядро проект
//todo: выложить проект в локальный репозиторий

//todo: поддержка мультибраузерности из асинхронной опции кодцепта
//todo: поддержка всех опций запуска тестов из codecept.js в конфиге
//todo: одни сценарии для синхронных и асинхронных тестов
//todo: единый механизм запуска для синхронных и асинхронных тестов, отличие только в опции --async
//todo: поддержка асинхронных тестов в рамках одного инстанса браузера (разные тесты в разных вкладках браузера)
//todo: статистика по тестам?

const program = require('commander');
const {spawn} = require('child_process');
const fs = require("fs");
const path = require("path");

if (process.argv.length <= 2) {
    console.log(`run test with command run and option --config `);
}

program
    .command('run')
    .option('-c, --config [file]', 'configuration file to be used')
    .action(function (cmd) {
        configPath = cmd.config;
        run(configPath);
    });

program.parse(process.argv);






function run(configPath) {
    const baseConfig = require(path.join(process.cwd(), configPath));
    const test_folder = baseConfig.asyncTestsFolder;
    const testsList = fs.readdirSync(test_folder);
    const loginScript = baseConfig.loginScript;
    let testsQueue = [];
    let processQueue = {};
    process.env.multi = 'spec=- mocha-allure-reporter=-';


for (let i = 0; i < testsList.length; i++) {
    testsQueue[i] = {
        name: testsList[i],
        testFile: test_folder + testsList[i],
        status: 'waiting'

    };
}

spawnProcess(
    {
        name: path.basename(loginScript),
        testFile: loginScript,
        status: 'waiting'
    },
    processQueue,
    configPath
)
    .then(() => {
        testsQueue.forEach(test => {
            spawnProcess(test, processQueue, configPath)
                .catch(error => {
                    console.error(error)
                })
        });
    })
    .catch(error => {
        console.error(error)
    });

function buildCodeceptjsArguments(overrideArguments, configPath, testFile) {
    let baseArguments = [
        `codeceptjs`,
        'run',
        `--reporter`,
        `mocha-multi`,
        `--config`,
        configPath,
        `--override`,
        `{
            "tests": "${testFile}"
        }`
    ]
}

function spawnProcess(test, processQueue, configName) {
    return new Promise((resolve, reject) => {
        processQueue[test.name] = spawn(
            `npx`,
            [
                `codeceptjs`,
                'run',
                `--reporter`,
                `mocha-multi`,
                `--config`,
                `./${configPath}`,
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
            if (code === 0) {
                resolve(true)
            }
            else {
                reject(new Error(`${test.name} exited with code ${code}`))
            }
        });
    })
}
}


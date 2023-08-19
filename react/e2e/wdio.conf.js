export const config = {
    path: '/wd/hub',
    port: 4723,
    runner: 'local',
    specs: ['./e2e/specs/Spec.test.js'],
    capabilities: [
        {
            maxInstances: 1,
            platformName: 'Android',
            deviceName: 'emulator-5554',
            automationName: 'UiAutomator2',
            appWaitForLaunch: false
        },
        {
            platformName: 'IOS',
            platformVersion: '15.4',
            deviceName: 'iPhone 13'
        }
    ],

    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};

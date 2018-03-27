exports.config = {
    reporters: ['dot', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
    }
};
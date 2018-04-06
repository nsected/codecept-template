
Feature('demo publisher');

function text(text) {
    return `//*[text() = '${text}']`
}
function contains(text) {
    return `//*[contains(text(), '${text}')]`
}

Scenario('demo publisher ',  (I) => {
    I.amOnPage('/');
    I.click(text('Go!'));
    I.seeElement(text('Balance'));
    I.seeElement(text('Chargeback notification'));
    I.seeElement(text('€637'));
});

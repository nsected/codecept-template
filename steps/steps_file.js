
'use strict';
// in this file you can append custom step methods to 'I' object
const config = require('codeceptjs').config.get();
const smartWait = config.helpers.WebDriverIO.smartWait;
function xpathTextEquals(text) {
    return `//*[text() = '${text}']`
}
function xpathTextContains(text) {
    return `//*[contains(text(), '${text}')]`
}
module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

      seeText: function (text) {
          this.seeElement(xpathTextEquals(text));
      },

      seeContainsText: function (text) {
          this.seeElement(xpathTextContains(text));
      },

      clickOn: function (selector) {
          this.waitForElement(selector, smartWait);
          this.click(selector)
      },

  });
};

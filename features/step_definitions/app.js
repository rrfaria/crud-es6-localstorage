let seleniumWebdriver = require('selenium-webdriver');

module.exports = function () {
    this.Given(/^the initial page$/, function() {
        this.driver.get('https://github.com/cucumber/cucumber-js/tree/master');
        callback(null, 'pending');
    });
    this.Given(/^I have the content table in body$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should have a title {stringInDoubleQuotes} on page$/, function (stringInDoubleQuotes, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });


};
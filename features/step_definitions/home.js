
var seleniumWebdriver = require('selenium-webdriver');

module.exports = function () {
    this.Given(/^the initial page$/, function(done) {
        helpers.loadPage('http://mywebsite.dev:3001/')
        .then(
            done()
        );

    });

    this.When(/^I have the content table in body$/, function (done) {
        driver.findElement(by.id("txtFullname")).then(function(element) {
            //expect(elements.length).to.not.equal(0);
            done();
        });
    });

    this.Then(/^I should have a title "([^"]*)" on page$/, function (text) {
        var xpath = "//*[contains(text(),'" + text + "')]";
        var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
        return this.driver.wait(condition, 5000);
    });
};
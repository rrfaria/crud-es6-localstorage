
var seleniumWebdriver = require('selenium-webdriver');

module.exports = function () {
    this.Given(/^the initial page$/, function() {
        return helpers.loadPage('http://mywebsite.dev:3001/')
        .then(function () {
               return driver.wait(until.elementsLocated(by.css('body')),30000).then(function(){

                   // return the promise of an element to the following then.
                   return driver.findElements(by.css('body'));
               })
        });

    });

    this.When(/^there is the content table in body$/, function () {
        driver.wait(until.elementsLocated(by.id("tablerows")), 20000).then(function(element) {
            return driver.findElements(by.css('#tablerows'));
        });
    });

    this.Then(/^I should have a title "([^"]*)" on page$/, function (text) {
        driver.findElement(by.css('h2.title')).then(function(h2) {
            h2.getText().then(function(content){
                expect(content).to.be.a('string');
                expect(content).to.equal(text);
            })
        })
    });
};
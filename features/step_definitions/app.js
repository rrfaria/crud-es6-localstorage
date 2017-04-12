let seleniumWebdriver = require('selenium-webdriver');
let {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
    Given('the initial page', function() {
        return this.driver.get('http://localhost:8080/');
    });

});
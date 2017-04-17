
var seleniumWebdriver = require('selenium-webdriver');
var  path  = require('path');

module.exports = function () {
    this.Given(/^the initial page$/, () =>{
        return helpers.loadPage('http://mywebsite.dev:3001/')
        .then( () =>{
           return driver.wait(until.elementsLocated(by.css('body')),30000).then(()=>{

               // return the promise of an element to the following then.
               return driver.findElements(by.css('body'));
           })
        });
    });

    this.When(/^there is a title "([^"]*)"$/, (title) =>{
        return driver.findElement(by.css('h2.title')).then((h2)=> {
            h2.getText().then(function(content){
                expect(content).to.be.a('string');
                expect(content).to.equal(title);
            })
        });
    });

    this.When(/^there are some field Named "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)" ,"([^"]*)" and a button "([^"]*)"$/, function (arg1, arg2, arg3, arg4, arg5, arg6, arg7)  {

        const args = [arg1,arg2,arg3,arg4,arg5,arg6];

        function exists(arg){
            return driver.findElement(by.name(arg)).then((element)=> {
               return expect(element).to.exist;
            });

        }
        return ()=>{
            args.map(exists);
            driver.findElement(by.css("."+arg7)).then((element)=> {
                return expect(element).to.exist;
            })
        }
    });

    this.When(/^there is the content table "([^"]*)"$/, (table)=> {
        return driver.findElements(by.css('#'+table));
    });

    this.Then(/^Should exists (\d+) panels$/,(arg1)=>{
        let iCount;
        driver.findElements(by.css('.block-container')).then((elements)=> {
            return expect(elements.length).to.be.at.least(arg1);
        });
    });


    this.When(/^click on image "([^"]*)" to upload file$/,(arg1, callback) =>{
        // Write code here that turns the phrase above into concrete actions
        const fileToUpload = './features/bdd-test.png';
        const absolutePath = path.resolve(__dirname, fileToUpload);
        console.log('path:',absolutePath);
        driver.findElement(by.css('input[type=file]')).sendKeys(absolutePath);
        callback();
    });

    this.When(/^Fill those fields "([^"]*)" with "([^"]*)","([^"]*)" with a validated cpf "([^"]*)","([^"]*)" with phone "([^"]*)"$/, (nameField, nameText, cpfField, cpfText, phoneField, phoneText, callback)=> {
        driver.findElement(by.name(nameField)).sendKeys(nameText);
        driver.findElement(by.name(cpfField)).sendKeys(cpfText);
        driver.findElement(by.name(phoneField)).sendKeys(phoneText);

        callback();
    });

    this.When(/^start fill "([^"]*)" with "([^"]*)" should show google places suggestion an address$/,(AddressField, AddressText)=> {
         return driver.findElement(by.name(AddressField)).sendKeys(AddressText);
    });

    this.When(/^click in first Suggestion at field "([^"]*)"$/,  (AddressField) =>{
        return driver.findElement(by.name(AddressField)).sendKeys(selenium.Key.ARROW_DOWN);
    });

    this.When(/^On field "([^"]*)" fill with a text "([^"]*)"$/,  (compField, compText, callback)=> {
        driver.findElement(by.name(compField)).sendKeys(compText);
        callback();
    });

    this.When(/^Click submit$/, function () {
        return driver.findElement(by.css('.btnSave')).click();
    });

    this.Then(/^There is a new user added$/,  (callback)=> {
        // Write code here that turns the phrase above into concrete actions
        setTimeout(function(){
            callback(null, 'pending');
        }, 21000);
    });






};
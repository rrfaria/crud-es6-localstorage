# Crud using ES6 and localStorage

[![PayPal](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/rafaelfaria)
[![GitHub release](https://img.shields.io/badge/version%3A-1.0.0--beta-green.svg?style=flat-square)](https://github.com/rrfaria/crud-es6-localstorage/)

Crud using es6 , webpack, sass, cloudnary,babel and small js engine

## Run example locally on Dev
```bash
$ git clone
$ npm install
```

### using the Cloudnary

Create your account on cloudinary and then make sure you did the following steps:

* go to there : [https://cloudinary.com](https://cloudinary.com)

* get cloud name on Account Details and you can use upload without api key. Just go to settings
click in upload and go to Upload presets. Now you have to enable Unsigned uploading
after you do that
there is a name. get it.

Those information you will replace on ``` src/utils/cloudnary ``` at line 9 upload preset and cloud name at line 5

 After That you can Run the dev mode:

 ```
 npm run dev
 ```

  ### Possible issues:

 if you are running on windows

 First you need add a custom host in C:\WINDOWS\System32\drivers\etc into host file

 On webpack config you can see on dev-server settings:
  ```
  host: "mywebsite.dev"
  ```
  So to it works on windows you need add:
```
  127.0.0.1 mywebsite.dev
```

 if there is some issue with node-sass use
 ```
 npm rebuild node-sass
 ```

 ### TODO / Developing

 - [x] webpack setup
 - [x] hot reload
 - [x] dist folder organization
 - [x] use html template
 - [x] Add new user
 - [x] Cloudnary integration
 - [x] image update
 - [x] tooltip help/info
 - [x] input animation (css)
 - [x] auto prefix webpack setup (css)
 - [x] Edit action
 - [x] Use promise
 - [x] Sha1 using ES6
 - [x] mask CPF
 - [x] validation CPF
 - [x] mask phone
 - [x] validation phone
 - [x] localStorage Class
 - [x] selector class
 - [x] event Handle to queryselector
 - [x] Google places integrated on "Endereço" field
 - [X] Js engine to create virtualDOM
 - [x] Jsx syntax running
 - [x] Delete action
 - [x] Mocha and Chai installation
 - [ ] Mocha web interface see tests
 - [ ] Unit test
 - [x] behavior test
 - [ ] CSS Regression test (possible tool to use backstop.js)
 - [ ] Acceptance test
 - [ ] optimize event function
 - [ ] Bower integration with webpack


  ### Running Tests:

  to unit test :
  ```
    npm run test
  ```
  to Behavior test :
```
  npm run testb
```
  The behavior test generate a report inside ```features/reports```
  you can open on your browser to see graphical representation.

```
features
    reports
      cucumber-report.html
```
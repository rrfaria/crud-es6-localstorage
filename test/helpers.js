//it is a global settings
import suppertest from 'supertest';
import chai from 'chai';
import General from '../src/utils/general';

global.General = General;
global.request =suppertest(General);
global.expect = chai.expect;
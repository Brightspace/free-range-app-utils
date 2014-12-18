'use strict';

var chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

'use strict';

var htmlAppConfigBuilder = require('./src/htmlAppConfigBuilder');
var umdAppConfigBuilder = require('./src/umdAppConfigBuilder');

var appConfigBuilder = umdAppConfigBuilder;
appConfigBuilder.umd = umdAppConfigBuilder;
appConfigBuilder.html = htmlAppConfigBuilder;

module.exports = {
    localAppResolver: require('./src/localAppResolver'),
    appConfigBuilder: appConfigBuilder
};

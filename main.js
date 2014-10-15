'use strict';

var umdAppConfigBuilder = require('./umdAppConfigBuilder');

var appConfigBuilder = umdAppConfigBuilder;
appConfigBuilder.umd = umdAppConfigBuilder;

module.exports = {
    localAppResolver: require('./src/localAppResolver'),
    appConfigBuilder: appConfigBuilder
};

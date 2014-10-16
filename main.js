'use strict';

var umdAppConfigBuilder = require('./src/umdAppConfigBuilder');

var appConfigBuilder = umdAppConfigBuilder;
appConfigBuilder.umd = umdAppConfigBuilder;

module.exports = {
    localAppResolver: require('./src/localAppResolver'),
    appConfigBuilder: appConfigBuilder
};

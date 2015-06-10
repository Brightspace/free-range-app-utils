'use strict';

var htmlAppConfigBuilder = require('./src/htmlAppConfigBuilder');
var umdAppConfigBuilder = require('./src/umdAppConfigBuilder');

var appConfigBuilder = umdAppConfigBuilder;
appConfigBuilder.umd = umdAppConfigBuilder;
appConfigBuilder.html = htmlAppConfigBuilder;
appConfigBuilder.iframe = require('./src/iframeAppConfigBuilder');

module.exports = {
    localAppResolver: require('./src/localAppResolver'),
    appConfigBuilder: appConfigBuilder
};

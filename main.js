'use strict';

var appConfigBuilder = require('./src/umdAppConfigBuilder');
appConfigBuilder.html = require('./src/htmlAppConfigBuilder');
appConfigBuilder.iframe = require('./src/iframeAppConfigBuilder');
appConfigBuilder.umd = appConfigBuilder;

module.exports = {
	localAppResolver: require('./src/localAppResolver'),
	appConfigBuilder: appConfigBuilder
};

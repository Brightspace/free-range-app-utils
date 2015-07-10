'use strict';

var corsProxy = require('superagent-d2l-cors-proxy'),
	chalk = require('chalk'),
	os = require('os');

function getHostname(opts) {
	var hostname = opts.hostname || os.hostname();
	if(hostname.indexOf('.local', hostname.length-6) !== -1) {
		hostname = hostname.substr(0, hostname.length-6);
	}
	return hostname;
}

function LocalAppRegistry(appClass, opts) {

	if (!appClass) {
		console.log(chalk.red('As of free-range-app-utils@0.8.0, Use localAppResolver(appClass, options) to specify an appClass when using the local app resolver.\n'));
		throw new Error('appClass is a required argument for LocalAppResolver.');
	} else if (require('./packageJson').read().appClass) {
		console.log(chalk.red('As of free-range-app-utils@0.8.0, appClass in package.json is not supported.\n'));
	}

	opts = opts || {};
	opts.appClass = appClass;
	opts.hostname = getHostname(opts);
	opts.port = opts.port || 3000;
	opts.dist = opts.dist || 'dist';
	opts.configFile = opts.configFile || 'appconfig.json';

	this._opts = opts;
}

LocalAppRegistry.prototype.host = function() {
	var self = this;

	var app = require('express')();
	var cors = require('cors');
	var serveStatic = require('serve-static');

	app.use(cors());

	app.use('/app', serveStatic(self._opts.dist));

	var encodedAppClass = encodeURIComponent(self._opts.appClass);
	app.get('/resolve/' + encodedAppClass, function(req, res) {
		res.json({ url: self.getConfigUrl() });
	});

	app.get(
		corsProxy.getProxyDefaultLocation(),
		function(req, res) {
			res.sendFile(corsProxy.getProxyFilePath());
		}
	);

	app.listen(self._opts.port);
};

LocalAppRegistry.prototype.getUrl = function() {
	return 'http://' + this._opts.hostname + ':' + this._opts.port + '/app/';
};

LocalAppRegistry.prototype.getConfigUrl = function() {
	return this.getUrl() + this._opts.configFile;
};

module.exports = function(appClass, opts) {
	return new LocalAppRegistry(appClass, opts);
};

'use strict';

var path = require('path');
var packageJson = path.join( process.cwd(), 'package.json' );

function LocalAppRegistry(key, opts) {
    opts = opts || {};
    opts.key = key || require( packageJson ).name;
    opts.hostname = opts.hostname || 'localhost';
    opts.port = opts.port || 3000;
    opts.dist = opts.dist || 'dist';
    opts.configFile = opts.configFile || 'appconfig.json';

    this._opts = opts;
}

LocalAppRegistry.prototype.host = function() {
    var self = this;

    var app = require('express')();
    var serveStatic = require('serve-static');

    app.use('/app', serveStatic(self._opts.dist));

    app.get('/resolve/' + self._opts.key, function(req, res) {
        res.json({ url: self.getConfigUrl() });
    });

    app.listen(self._opts.port);
};

LocalAppRegistry.prototype.getUrl = function() {
    return 'http://' + this._opts.hostname + ':' + this._opts.port + '/app';
};

LocalAppRegistry.prototype.getConfigUrl = function() {
    return this.getUrl() + '/' + this._opts.configFile;
};

module.exports = function(key, opts) {
    return new LocalAppRegistry(key, opts);
};


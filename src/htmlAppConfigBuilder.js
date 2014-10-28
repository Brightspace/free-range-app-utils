"use strict";

var streamifier = require('streamifier');
var source = require('vinyl-source-stream');
var packageJson = require('./packageJson');

function build(opts) {
	var pjson = packageJson.read();

	opts = opts || {};
	opts.name = opts.name || pjson.name;
	opts.version = opts.version || pjson.version;
	opts.id = opts.id || pjson.appId;
	opts.description = opts.description || pjson.description;
	opts.defaultResource = opts.defaultResource || pjson.appDefaultResource;
	opts.additionalResources = opts.additionalResources || pjson.appAccessibleResources;

	var appConfig = {
		"schema": "http://apps.d2l.com/uiapps/config/v1.json",
		"metadata": {
			"name": opts.name,
			"version": opts.version,
			"id": opts.id,
			"description" :opts.description
		},
		"loader": {
			"schema": "http://apps.d2l.com/uiapps/htmlschema/v1.json",
			"defaultResource": opts.defaultResource,
			"additionalResources": opts.additionalResources
		}
	}

	return appConfig;
}

function buildStream(opts) {
	var appConfig = build(opts);
	return streamifier
		.createReadStream( JSON.stringify( appConfig, null, '\t' ) )
		.pipe( source('appconfig.json') );
}

module.exports = {
	build: build,
	buildStream: buildStream
};

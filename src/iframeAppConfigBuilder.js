'use strict';

var streamifier = require('streamifier'),
	source = require('vinyl-source-stream'),
	builder = require( './appConfigBuilder' );

function build(target, opts) {

	if(!target) {
		throw new Error('Missing target');
	}

	var loader = {
		schema: "http://apps.d2l.com/uiapps/iframeschema/v1.json",
		endpoint: target
	};

	return builder.build(opts, loader);

}

function buildStream(target, opts) {
	var appConfig = build(target, opts);
	return streamifier
		.createReadStream(JSON.stringify(appConfig, null, '\t'))
		.pipe(source('appconfig.json'));
}

module.exports = {
	build: build,
	buildStream: buildStream
};

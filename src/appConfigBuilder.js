'use strict';

var packageJson = require('./packageJson');

function build(opts, loader) {
	if(!loader) {
		throw new Error('Missing loader information');
	}

	opts = opts || {};

	var pjson = packageJson.read();

	var values = {
		name: opts.name || pjson.name,
		version: opts.version || pjson.version,
		id: opts.id || pjson.appId,
		description: opts.description || pjson.description
	};

	if (!values.name) {
		throw new Error( 'name was not specified and can\'t be found in package.json' );
	}

	if (!values.version) {
		throw new Error( 'version was not specified and can\'t be found in package.json' );
	}

	if (!values.id) {
		throw new Error( 'id was not specified and can\'t be found in package.json' );
	}

	if (!values.description) {
		throw new Error( 'description was not specified and can\'t be found in package.json' );
	}

	var appConfig = {
		schema: "http://apps.d2l.com/uiapps/config/v1.json",
		metadata: {
			name: values.name,
			version: values.version,
			id: values.id,
			description: values.description
		},
		loader: loader
	};

	return appConfig;
}

module.exports = {
	build: build
};

'use strict';

var packageJson = require('./packageJson');

function build(opts, loader) {
	if(!loader) {
		throw new Error('Missing loader information');
	}

	opts = opts || {};

	var pjson = packageJson.read();

	var values = {
		version: opts.version || pjson.version,
		id: opts.id || pjson.appId,
		description: opts.description || pjson.description
	};

	validateId(values.id);
	validateVersion(values.version);
	validateDescription(values.description);

	var appConfig = {
		schema: "http://apps.d2l.com/uiapps/config/v1.1.json",
		metadata: {
			id: values.id,
			version: values.version,
			description: values.description
		},
		loader: loader
	};

	return appConfig;
}

var ID_REGEX = new RegExp("^urn:[a-zA-Z0-9][a-zA-Z0-9-]{0,31}:[a-zA-Z\-.:]+$");
function validateId(id) {
	if (!id) {
		throw new Error( 'id was not specified and can\'t be found in package.json' );
	}

	if (!ID_REGEX.test(id)) {
		throw new Error( 'id "' + id + '" is invalid, must be a URN.' );
	}
}

var VERSION_REGEX = new RegExp('^[0-9]+\\.[0-9]+\\.[0-9]+(\\.[0-9]+)?$');
function validateVersion(version) {
	if (!version) {
		throw new Error( 'version was not specified and can\'t be found in package.json' );
	}

	if (!VERSION_REGEX.test(version)) {
		throw new Error( 'version "' + version + '" is not in the form "#.#.#" or "#.#.#.#"');
	}
}

function validateDescription(description) {
	if (!description) {
		throw new Error( 'description was not specified and can\'t be found in package.json' );
	}

	if (description.length > 1024) {
		throw new Error( 'description is too long')
	}
}

module.exports = {
	build: build
};

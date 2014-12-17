'use strict';

var streamifier = require('streamifier');
var source = require('vinyl-source-stream');
var builder = require( './appConfigBuilder' );

function build(target, opts) {
    if ( !target ) {
        throw new Error('Missing target');
    }

    var loader = {
        schema: "http://apps.d2l.com/uiapps/umdschema/v1.json",
        endpoint: target.charAt(target.length - 1) === '/' ?
          target + "app.js" :
          target + "/app.js"
    };

    return builder.build( opts, loader );
}

function buildStream(target, opts) {
    var appConfig = build(target, opts);
    return streamifier
        .createReadStream( JSON.stringify( appConfig, null, '\t' ) )
        .pipe( source('appconfig.json') );
}

module.exports = {
    build: build,
    buildStream: buildStream
};

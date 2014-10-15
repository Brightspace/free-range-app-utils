'use strict';

var path = require('path');
var packageJson = path.join( process.cwd(), 'package.json' );

module.exports = {
    read: function() {
        return require( packageJson );
    }
};

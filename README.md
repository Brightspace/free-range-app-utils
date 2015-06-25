# Free-Range App Utils ([Frau](http://en.wiktionary.org/wiki/Frau))
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

Utilities for building free-range apps.

## Usage

Install `free-range-app-utils` as a dev dependency:

```shell
npm install --save-dev free-range-app-utils
```

Require the package:

```javascript
var frau = require('free-range-app-utils');
```

## Utilities

### Local app resolver
A utility to host and resolve your app on your local instance.

```javascript
var appresolver = frau.localAppResolver();

// or...

var appresolver = frau.localAppResolver( appClass, options );

// Host an app resolver
appresolver.host();

// Get where the app content is hosted.  Needed when creating the appconfig.
var target = appresolver.getUrl();
```

**Parameters**:

- `appClass` (optional) - The app class to resolve.  If not specified, the `appClass` field from the package.json is used.
- `options` (optional) - An object containing:
  - `dist` - The directory containing the app files to serve.  By default, the `dist` directory is used.
  - `port` - The port to listen on.  By default, port `3000` is used, which is the port that the LMS expects it on.
  - `hostname` - The hostname (or IP) to listen on. By default, `localhost` is used.  You should not need to change this.
  - `configFile` - The name of the app config file.  By default, `appconfig.json` is used.  You should not need to change this.

### Build appconfig (UMD Apps)
A utility to create the appconfig file for free-range UMD apps.

```javascript
// Returns a JSON object with the appconfig
var appConfig = frau.appConfigBuilder.build( target, options );
```

```javascript
gulp.task('appconfig', function(){
    // Returns a vinyl stream with the appconfig.  Convenience method for use with gulp.
    return frau.appConfigBuilder.buildStream( target, options )
           .pipe(gulp.dest('dist'));
});
```

**Parameters**:

The `build` and `buildStream` functions take the same parameters:

- `target` (required) - The target url that the app will be served from.
- `options` (optional) - An object that contains the following:
  - `id` - The app's id.  Defaults to the `appId` from package.json.
  - `version` - The app's version.  Defaults to the `version` value from package.json.
  - `description` - The app's description.  Defaults to `description` from package.json.

You should generally not need to provide `options` because the values can be obtained from the app's *package.json* file.

> **Note**: If the app does not have a valid id, version, and description, you'll receive an error when you try and build the appconfig file.

### Build appconfig (HTML Apps)
A utility to create the appconfig file for free-range HTML apps.

```javascript
// Returns a JSON object with the appconfig
var appConfig = frau.appConfigBuilder.html.build( options );
```

```javascript
gulp.task('appconfig', function(){
    // Returns a vinyl stream with the appconfig.  Convenience method for use with gulp.
    return frau.appConfigBuilder.html.buildStream( options )
           .pipe(gulp.dest('dist'));
});
```

**Parameters**:

The `build` and `buildStream` functions take the same parameters:

- `options` (optional) - An object that contains the following:
  - `id` - The app's ID.  Defaults to the `name` from package.json.
  - `version` - The app's version.  Defaults to the `version` value from package.json.
  - `description` - The app's description.  Defaults to the `description` from package.json.
  - `defaultResource` - The default resource to point to when the app is loaded. Defaults to `appDefaultResource` resource object in package.json.
  - `additionalResources` - An array of additional resource objects that the app makes accessible. Defaults to `appAccessibleResources` in package.json.

Resource objects contain the following properties:

- `uri` - The URI, relative to the application's root, at which the resource can be found.
- `type` - The type of resource (e.g. html).
- `pageTemplate` - The page template to use when the app is loaded.

You should generally not need to provide `options` because the values can be obtained from the app's *package.json* file..

> **Note**: If the app does not have a valid id, version, and description, you'll receive an error when you try and build the appconfig file.

## Tests

Run the tests locally:

- Install mocha: `npm i -g mocha`
- Run mocha: `mocha`

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and contributions should make use of them.

[npm-url]: https://www.npmjs.org/package/free-range-app-utils
[npm-image]: https://img.shields.io/npm/v/free-range-app-utils.svg
[ci-url]: https://travis-ci.org/Brightspace/free-range-app-utils
[ci-image]: https://travis-ci.org/Brightspace/free-range-app-utils.svg?branch=master
[coverage-url]: https://coveralls.io/r/Brightspace/free-range-app-utils?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/free-range-app-utils.svg
[dependencies-url]: https://david-dm.org/brightspace/free-range-app-utils
[dependencies-image]: https://img.shields.io/david/Brightspace/free-range-app-utils.svg

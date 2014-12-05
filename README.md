# Free-Range App Utils ([Frau](http://en.wiktionary.org/wiki/Frau))
[![NPM version][npm-image]][npm-url]
[![travis badge](http://img.shields.io/travis/Brightspace/free-range-app-utils.svg)](https://travis-ci.org/Brightspace/free-range-app-utils)
[![coveralls badge](http://img.shields.io/coveralls/Brightspace/free-range-app-utils.svg)](https://coveralls.io/r/Brightspace/free-range-app-utils)

```javascript
var frau = require('free-range-app-utils');
```
## Usage

Install as a development dependency:

```shell
npm install --save-dev free-range-app-utils
```

Require as normal:

```javascript
var frau = require('free-range-app-utils');
```

## Utilities

### Local app resolver

```javascript
var appresolver = frau.localAppResolver( key, options );

// Host an app resolver
appresolver.host();

// Get where the app content is hosted.  Needed when creating the appconfig.
var target = appresolver.getUrl();
```
Parameters:

- `key` (optional) - The key to resolve.  Defaults to `name` field from package.json.
- `options` (optional) - Object containing:
  - `dist` - folder containing the app files to serve.  Defaults to `dist`.
  - `port` - port to listen on.  Defaults to `3000`, which is the port that the LMS expects it on by default.
  - `hostname` - hostname (or IP) to listen on.  Defaults to `localhost`.  You should not need to change this.
  - `configFile` - name off the app config file.  Defaults to `appconfig.json`.  You should not need to change this.

### Build appconfig (UMD Apps)

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

Both `build` and `buildStream` take the same parameters:

- `target` (required) - The target url that the app will be served from.
- `options` (optional) - Object containing:
  - `name` - The app's name.  Defaults to `name` from package.json.
  - `version` - The app's version.  Defaults to `version` from package.json.
  - `id` - The app's id.  Defaults to `name` from package.json.
  - `description` - The app's description.  Defaults to `description` from package.json.

You should generally not need to provide `options`.

### Build appconfig (HTML Apps)

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

Both `build` and `buildStream` take the same parameter:

- `options` (optional) - Object containing:
  - `name` - The app's name.  Defaults to `name` from package.json.
  - `version` - The app's version.  Defaults to `version` from package.json.
  - `id` - The app's id.  Defaults to `name` from package.json.
  - `description` - The app's description.  Defaults to `description` from package.json.
  - `defaultResource` - The default resource to point to when the app is loaded. Defaults to `appDefaultResource` resource object in package.json.
  - `additionalResources` - An array of additional resource objects that the app makes accessible. Defaults to `appAccessibleResources` in package.json.

Resource objects contain the following properties:
- `uri` - The URI, relative to the application's root, at which the resouce can be found.
- `type` - The type of resource (e.g. html).
- `pageTemplate` - The page template to use when the app is loaded.

You should generally not need to provide `options`.

## Tests

Run the tests locally:

- Install mocha: `npm i -g mocha`
- Run mocha: `mocha`

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and
contributions should make use of them.

[npm-url]: https://npmjs.org/package/free-range-app-utils
[npm-image]: https://badge.fury.io/js/free-range-app-utils.png

# Free-Range App Utils ([Frau](http://en.wiktionary.org/wiki/Frau))
[![travis badge](http://img.shields.io/travis/Desire2Learn-Valence/free-range-app-utils.svg)](https://travis-ci.org/Desire2Learn-Valence/free-range-app-utils)
[![coveralls badge](http://img.shields.io/coveralls/Desire2Learn-Valence/free-range-app-utils.svg)](https://coveralls.io/r/Desire2Learn-Valence/free-range-app-utils)

```javascript
var frau = require('free-range-app-utils');
```
## Usage

Install as a development dependency:

```shell
npm install --save-dev vui-link
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

### Build appconfig

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

## Tests

Run the tests locally:

- Install mocha: `npm i -g mocha`
- Run mocha: `mocha`

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and
contributions should make use of them.

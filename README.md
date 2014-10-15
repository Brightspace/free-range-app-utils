sheepdog
========
[![travis badge](http://img.shields.io/travis/cpacey/sheepdog.svg)](https://travis-ci.org/cpacey/sheepdog)
[![coveralls badge](http://img.shields.io/coveralls/cpacey/sheepdog.svg)](https://coveralls.io/r/cpacey/sheepdog)

Sheepdog exposes utilities that help you build free-range apps.

## Utilities

### Local app resolver

```javascript
var appresolver = require('sheepdog').localAppResolver( key, options );

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

## Tests

Run the tests locally:

- Install mocha: `npm i -g mocha`
- Run mocha: `mocha`

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and
contributions should make use of them.

# Free-Range App Utils ([Frau](http://en.wiktionary.org/wiki/Frau))
[![travis badge](http://img.shields.io/travis/Desire2Learn-Valence/free-range-app-utils.svg)](https://travis-ci.org/Desire2Learn-Valence/free-range-app-utils)
[![coveralls badge](http://img.shields.io/coveralls/Desire2Learn-Valence/free-range-app-utils.svg)](https://coveralls.io/r/Desire2Learn-Valence/free-range-app-utils)

## Utilities

### Local app resolver

```javascript
var appresolver = require('free-range-app-utils').localAppResolver( key, options );

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

var appresolver = require('../src/localAppResolver'),
	corsProxy = require('superagent-d2l-cors-proxy'),
	request = require('request');

var APP_CLASS = 'urn:d2l:fra:class:some-class';

describe('localAppResolver', function() {

	describe('defaults', function() {
		it('should have _opts property', function() {
			appresolver().should.have.property('_opts').that.is.not.null;
		});

		it('class', function() {
			appresolver(APP_CLASS)._opts.should.have.property('appClass', APP_CLASS);
		});

		it('hostname', function() {
			appresolver()._opts.should.have.property('hostname', require('os').hostname());
		});

		it('port', function() {
			appresolver()._opts.should.have.property('port', 3000);
		});

		it('dist', function() {
			appresolver()._opts.should.have.property('dist', 'dist');
		});

		it('appconfig', function() {
			appresolver()._opts.should.have.property('configFile', 'appconfig.json');
		});
	});

	describe('hostname', function() {
		it('should strip ".local" domain from OSX hostname', function() {
			appresolver(APP_CLASS, { hostname: 'somehost.local' })
				.getUrl().should.equal('http://somehost:3000/app/');
		});
	});

	describe('getUrl', function() {
		it('should return expected url', function(){
			appresolver(APP_CLASS, { hostname: 'somehost.com', port: 11111 })
				.getUrl().should.equal('http://somehost.com:11111/app/');
		});
	});

	describe('getConfigUrl', function() {
		it('should return expected url', function(){
			appresolver(APP_CLASS, { hostname: 'somehost.com', port: 11111, configFile: 'someconf.js' })
				.getConfigUrl().should.equal('http://somehost.com:11111/app/someconf.js');
		});
	});

	describe('host', function(){

		var resolver = appresolver(APP_CLASS, { dist: 'test/testDist', hostname: 'localhost' });
		resolver.host();

		it('should serve resolution', function(cb) {
			request.get('http://localhost:3000/resolve/' + encodeURIComponent(APP_CLASS), function(error, response, body){
				if(error) {
					cb(error);
				} else if ( response.statusCode != 200 ) {
					cb(response.statusCode);
				} else if ( JSON.parse(body).url != 'http://localhost:3000/app/appconfig.json' ) {
					cb(JSON.parse(body));
				} else {
					cb();
				}
			});
		});

		it('should serve static files', function(cb) {
			request.get('http://localhost:3000/app/staticFileToBeServed.txt', function(error, response, body){
				if(error) {
					cb(error);
				} else if ( response.statusCode != 200 ) {
					cb(response);
				} else if ( body != 'some simple contents' ) {
					cb(body);
				} else {
					cb();
				}
			});
		});

		it('should serve CORS proxy', function(cb) {
			var url = 'http://localhost:3000' +
				corsProxy.getProxyDefaultLocation();
			request.get(url, function(err, res, body) {
				if(err)
					return cb(err);
				if(res.statusCode !== 200)
					return cb(res);
				cb();
			});
		});


	});

});

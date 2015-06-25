var builder = require('../src/iframeAppConfigBuilder'),
	stream = require('stream');

var TARGET = 'example.com/path/app.js';
var OPTS = {
	version: '1.0.0.1',
	description: 'It is a small world',
	id: 'urn:d2l:fra:id:some-id'
};

describe('iframeAppConfigBuilder', function(){

	describe('build', function() {

		var coreBuilder;

		beforeEach(function() {
			coreBuilder = sinon.spy(require('../src/appConfigBuilder'), 'build');
		});

		afterEach(function() {
			coreBuilder.restore();
		});

		it('should throw with no target', function(){
			expect(builder.build).to.throw('Missing target');
		});

		it('should pass opts to core builder', function(){
			builder.build(TARGET, OPTS);
			coreBuilder.should.have.been.calledWith(OPTS);
		});

		it('should create "loader" with schema and endpoint', function() {
			var val = builder.build(TARGET, OPTS);
			val.should.have.property('loader');
			val.loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/iframeschema/v1.json' );
			val.loader.should.have.property('endpoint', TARGET );
		});

	});

	describe('buildStream', function() {

		it('should return a stream', function() {
			var val = builder.buildStream(TARGET, OPTS);
			val.should.instanceOf(stream.Stream);
		});

	});

});

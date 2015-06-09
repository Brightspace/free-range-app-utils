var builder = require('../src/iframeAppConfigBuilder');

var TARGET = 'example.com/path/app.js';
var OPTS = {
	name: 'some-name',
	version: '1.0.0.1',
	description: 'It is a small world',
	id: 'some-id'
};

describe('iframeAppConfigBuilder', function(){
	describe('build', function(){
		it('no target', function(){
			expect(builder.build).to.throw('Missing target');
		});

		it('should pass opts', function(){
			var coreBuilder = sinon.spy(require('../src/appConfigBuilder'), 'build');

			builder.build(TARGET, OPTS);

			coreBuilder.should.have.been.calledWith(OPTS);

			coreBuilder.restore();
		});

		describe('loader', function(){
			it('should exist', function(){
				builder.build(TARGET, OPTS).should.have.property('loader');
			});

			it('should have correct schema', function(){
				builder.build(TARGET, OPTS).loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/iframeschema/v1.json' );
			});

			it('should have correct endpoint', function(){
				builder.build(TARGET, OPTS).loader.should.have.property('endpoint', TARGET );
			});
		});
	});
});

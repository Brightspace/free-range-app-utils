var builder = require('../src/umdAppConfigBuilder');

var TARGET = 'example.com';
var TARGET_WITH_TRAILING_SLASH = 'example.com/path/';

var OPTS = createValidOpts();

describe('umdAppConfigBuilder', function(){
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
                builder.build(TARGET, OPTS).loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/umdschema/v1.json' );
            });

            it('should have correct endpoint', function(){
                builder.build(TARGET, OPTS).loader.should.have.property('endpoint', TARGET + '/app.js' );
            });

            it('endpoint looks for trailing slashes in target', function(){
                builder.build(TARGET_WITH_TRAILING_SLASH, OPTS).loader.should.have.property(
                  'endpoint',
                  TARGET_WITH_TRAILING_SLASH + 'app.js'
                );
            });
        });
    });
});

function createValidOpts() {
    return {
        name: 'some-name',
        version: '1.0.0.1',
        description: 'It is a small world',
        id: 'some-id'
    };
}

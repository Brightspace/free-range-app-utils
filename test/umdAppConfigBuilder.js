var builder = require('../src/umdAppConfigBuilder');

var TARGET = 'example.com/path/app.js';

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
                builder.build(TARGET, OPTS).loader.should.have.property('endpoint', TARGET );
            });
            
            it('should have correct property showLoading', function() {
                builder.build(TARGET, OPTS).loader.should.have.property('showLoading', true);
                
            });
            
            it('should have property showLoading as false with OPTS undefined', function() {
                builder.build(TARGET).loader.should.have.property('showLoading', false);
            });
        });
    });
});

function createValidOpts() {
    return {
        name: 'some-name',
        version: '1.0.0.1',
        description: 'It is a small world',
        id: 'some-id',
        showLoading: true
    };
}

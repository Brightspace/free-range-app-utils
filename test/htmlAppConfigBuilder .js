var builder = require('../src/htmlAppConfigBuilder');

var OPTS = createValidOpts();

describe('htmlAppConfigBuilder', function(){
    describe('build', function(){
        it('should have correct schema', function(){
            builder.build(OPTS).should.have.property('schema', 'http://apps.d2l.com/uiapps/config/v1.json' );
        });

        describe('loader', function(){
            it('should exist', function(){
                builder.build(OPTS).should.have.property('loader');
            });

            it('should have correct schema', function(){
                builder.build(OPTS).loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/htmlschema/v1.json' );
            });

            describe('defaults', function(){
                var DEFAULT_RESOURCE = 'resource';
                var ACCESSIBLE_RESOURCES = 'other-resources';

                var stub;

                before(function(){
                    stub = sinon
                        .stub( require('../src/packageJson'), 'read' )
                        .returns({
                            appDefaultResource: DEFAULT_RESOURCE,
                            appAccessibleResources: ACCESSIBLE_RESOURCES
                        });
                });

                after(function(){
                    stub.restore();
                });

                it('defaultResource', function(){
                    var opts = createValidOptsWithout('defaultResource');

                    builder.build(opts).loader.should.have.property( 'defaultResource', DEFAULT_RESOURCE );
                });

                it('additionalResources', function(){
                    builder.build(OPTS).loader.should.have.property( 'additionalResources', ACCESSIBLE_RESOURCES );
                });

            });

            describe('arguments', function(){
                [ 'defaultResource', 'additionalResources' ].forEach(function(arg){
                    it(arg, function(){
                        var VALUE = 'some-value';
                        var opts = createValidOpts();
                        opts[arg] = VALUE;

                        builder.build(opts).loader.should.have.property( arg, VALUE );
                    });
                });
            });

            describe('missing values', function(){
                var VALUE = 'some-value';

                it('defaultResource', function(){
                    var opts = createValidOptsWithout('defaultResource');

                    expect(function(){
                        builder.build(opts);
                    }).to.throw('defaultResource was not specified and can\'t be found in package.json');
                });
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
        defaultResource: 'test'
    };
}

function createValidOptsWithout(str) {
    var opts = createValidOpts();
    delete opts[str];
    return opts;
}

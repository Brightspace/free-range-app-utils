var builder = require('../src/appConfigBuilder');

var SIMPLE_ARGUMENTS = ['name', 'version', 'id', 'description'];
var LOADER = 'test';

describe('appConfigBuilder', function(){
    describe('build', function(){
        it('should have correct schema', function(){
            builder.build(createValidOpts(), LOADER).should.have.property('schema', 'http://apps.d2l.com/uiapps/config/v1.json' );
        });

        it('should accept null options', function(){
            var spy = sinon.stub(require('../src/packageJson'), 'read')
                .returns({
                    name: 'some-name',
                    version: '1.0.0.0.0.1',
                    description: 'It is a small world',
                    appId: 'some-id'
                });

            expect( builder.build(null, LOADER) ).to.not.throw;

            spy.restore();
        });

        describe('loader', function(){
            it('should fail with no loader', function(){
                expect(function() {
                    builder.build(createValidOpts())
                }).to.throw('Missing loader information');
            });

            it('should use given loader', function(){
                var loader = 'test';

                builder.build(createValidOpts(), loader).should.have.property('loader', loader);
            });
        });

        describe('metadata', function(){
            it('should exist', function(){
                builder.build(createValidOpts(), LOADER).should.have.property('metadata');
            });

            describe('defaults', function(){
                var NAME = 'some-name';
                var VERSION = '1.0.0.0.0.1';
                var DESCRIPTION = 'It is a small world';
                var ID = 'some-id';

                var packageJson = require('../src/packageJson');

                before(function(){
                    packageJson.read_ = packageJson.read;
                    packageJson.read = function() {
                        return {
                            name: NAME,
                            version: VERSION,
                            description: DESCRIPTION,
                            appId: ID
                        };
                    };
                });

                after(function(){
                    packageJson.read = packageJson.read_;
                    packageJson.read_ = null;
                });

                it('name', function(){
                    builder.build(createValidOpts(), LOADER).metadata.should.have.property( 'name', NAME );
                });

                it('version', function(){
                    builder.build(createValidOpts(), LOADER).metadata.should.have.property( 'version', VERSION );
                });

                it('id', function(){
                    builder.build(createValidOpts(), LOADER).metadata.should.have.property( 'id', ID );
                });

                it('description', function(){
                    builder.build(createValidOpts(), LOADER).metadata.should.have.property( 'description', DESCRIPTION );
                });
            });

            describe('arguments', function(){
                var VALUE = 'special-explicit-value';

                SIMPLE_ARGUMENTS.forEach( function(arg){
                    it(arg, function(){
                        var opts = createValidOptsWithout(arg);
                        opts[arg] = VALUE;

                        builder.build(opts, LOADER).metadata.should.have.property( arg, VALUE );
                    });
                });
            });

            describe('no value', function(){
                var packageJson = require('../src/packageJson');

                before(function(){
                    packageJson.read_ = packageJson.read;
                    packageJson.read = function() {
                        return {};
                    };
                });

                after(function(){
                    packageJson.read = packageJson.read_;
                    packageJson.read_ = null;
                });

                SIMPLE_ARGUMENTS.forEach(function(prop){
                    it(prop, function(){
                        var opts = createValidOptsWithout(prop);

                        expect(function(){
                            builder.build(opts, LOADER);
                        }).to.throw( prop + ' was not specified and can\'t be found in package.json' );
                    });
                })
            });
        });
    });
});

function createValidOpts() {
    return {
        name: 'some-name',
        version: '1.0.0.0.0.1',
        description: 'It is a small world',
        id: 'some-id',
        loader: 'test'
    };
}

function createValidOptsWithout(str) {
    var opts = createValidOpts();
    delete opts[str];
    return opts;
}

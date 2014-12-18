var builder = require('../src/appConfigBuilder');

var SIMPLE_PARAMETERS = ['name', 'version', 'id', 'description'];
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
                    version: '1.0.0.1',
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
                var VERSION = '1.0.0.1';
                var DESCRIPTION = 'It is a small world';
                var ID = 'some-id';

                var stub;

                before(function(){
                    stub = sinon.stub(require('../src/packageJson'), 'read')
                });

                after(function(){
                    stub.restore();
                });

                it('name', function(){
                    var VALUE = 'defaults-name';
                    stub.returns({ name: VALUE });

                    builder.build(createValidOptsWithout('name'), LOADER).metadata.should.have.property( 'name', VALUE );
                });

                it('version', function(){
                    var VALUE = '12.123.124';
                    stub.returns({ version: VALUE });

                    builder.build(createValidOptsWithout('version'), LOADER).metadata.should.have.property( 'version', VALUE );
                });

                it('id', function(){
                    var VALUE = '12.123.124';
                    stub.returns({ appId: VALUE });

                    builder.build(createValidOptsWithout('id'), LOADER).metadata.should.have.property( 'id', VALUE );
                });

                it('description', function(){
                    var VALUE = '12.123.124';
                    stub.returns({ description: VALUE });

                    builder.build(createValidOptsWithout('description'), LOADER).metadata.should.have.property( 'description', VALUE );
                });
            });

            describe('valid arguments', function(){
                var VALUES = {
                    id: [ 'some-name', 'D2L.LP.App' ],
                    version: [ '0.0.0.0', '1.0.0' ],
                    name: [ 'some-name', 'some name', longString(256) ],
                    description: [ 'A simple description.', longString(1024) ],
                };

                SIMPLE_PARAMETERS.forEach(function(param){
                    describe(param, function(){
                        VALUES[param].forEach(function(value){
                            it(value, function(){
                                var opts = createValidOptsWithout(param);
                                opts[param] = value;

                                builder.build(opts, LOADER).metadata.should.have.property( param, value );
                            });
                        });
                    });
                });
            });

            describe('invalid arguments', function(){
                var VALUES = {
                    id: [ '....', '----', 'some--name' ],
                    version: [ '....', '1.0-something', '1.0.0.0.1', '1.0' ],
                    name: [ longString(257) ],
                    description: [ longString(1025) ],
                };

                SIMPLE_PARAMETERS.forEach(function(param){
                    describe(param, function(){
                        VALUES[param].forEach(function(value){
                            it(value, function(){
                                var opts = createValidOptsWithout(param);
                                opts[param] = value;

                                expect(function(){
                                    builder.build(opts, LOADER);
                                }).to.throw( new RegExp(param) ); // message should include parameter name
                            });
                        });
                    });
                });
            });

            describe('no value', function(){
                var stub;

                before(function(){
                    stub = sinon
                        .stub(require('../src/packageJson'), 'read')
                        .returns({});
                });

                after(function(){
                    stub.restore();
                });

                SIMPLE_PARAMETERS.forEach(function(param){
                    it(param, function(){
                        var opts = createValidOptsWithout(param);

                        expect(function(){
                            builder.build(opts, LOADER);
                        }).to.throw( param + ' was not specified and can\'t be found in package.json' );
                    });
                })
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
        loader: 'test'
    };
}

function createValidOptsWithout(str) {
    var opts = createValidOpts();
    delete opts[str];
    return opts;
}

function longString(len) {
    return Array(len + 1).join('a');
}

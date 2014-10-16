var builder = require('../src/umdAppConfigBuilder');

var TARGET = 'example.com';

describe('umdAppConfigBuilder', function(){
    describe('build', function(){
        it('no target', function(){
            expect(builder.build).to.throw();
        });


        it('should have correct schema', function(){
            builder.build(TARGET).should.have.property('schema', 'http://apps.d2l.com/uiapps/config/v1.json' );
        });

        describe('loader', function(){
            it('should exist', function(){
                builder.build(TARGET).should.have.property('loader');
            });

            it('should have correct schema', function(){
                builder.build(TARGET).loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/umdschema/v1.json' );
            });

            it('should have correct endpoint', function(){
                builder.build(TARGET).loader.should.have.property('endpoint', TARGET + '/app.js' );
            });
        });

        describe('metadata', function(){
            it('should exist', function(){
                builder.build(TARGET).should.have.property('metadata');
            });

            describe('defaults', function(){
                var NAME = 'some-name';
                var VERSION = '1.0.0.0.0.1';
                var DESCRIPTION = 'It is a small world';

                var packageJson = require('../src/packageJson');

                before(function(){
                    packageJson.read_ = packageJson.read;
                    packageJson.read = function() {
                        return {
                            name: NAME,
                            version: VERSION,
                            description: DESCRIPTION
                        };
                    };
                });

                after(function(){
                    packageJson.read = packageJson.read_;
                    packageJson.read_ = null;
                });

                it('name', function(){
                    builder.build(TARGET).metadata.should.have.property( 'name', NAME );
                });

                it('version', function(){
                    builder.build(TARGET).metadata.should.have.property( 'version', VERSION );
                });

                it('id', function(){
                    builder.build(TARGET).metadata.should.have.property( 'id', NAME );
                });

                it('description', function(){
                    builder.build(TARGET).metadata.should.have.property( 'description', DESCRIPTION );
                });
            });

            describe('arguments', function(){
                var VALUE = 'some-value';

                it('name', function(){
                    builder.build(TARGET, { name: VALUE }).metadata.should.have.property( 'name', VALUE );
                });

                it('version', function(){
                    builder.build(TARGET, { version: VALUE }).metadata.should.have.property( 'version', VALUE );
                });

                it('id', function(){
                    builder.build(TARGET, { id: VALUE }).metadata.should.have.property( 'id', VALUE );
                });

                it('description', function(){
                    builder.build(TARGET, { description: VALUE }).metadata.should.have.property( 'description', VALUE );
                });
            });
        });
    });
});

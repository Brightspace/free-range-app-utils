var builder = require('../src/htmlAppConfigBuilder');

describe('htmlAppConfigBuilder', function(){
    describe('build', function(){
        it('should have correct schema', function(){
            builder.build().should.have.property('schema', 'http://apps.d2l.com/uiapps/config/v1.json' );
        });

        describe('loader', function(){
            it('should exist', function(){
                builder.build().should.have.property('loader');
            });

            it('should have correct schema', function(){
                builder.build().loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/htmlschema/v1.json' );
            });

            describe('defaults', function(){
              var DEFAULT_RESOURCE = 'resource';
              var ACCESSIBLE_RESOURCES = 'other-resources';

              var packageJson = require('../src/packageJson');

              before(function(){
                packageJson.read_ = packageJson.read;
                packageJson.read = function() {
                  return {
                    appDefaultResource: DEFAULT_RESOURCE,
                    appAccessibleResources: ACCESSIBLE_RESOURCES
                  };
                };
              });

              after(function(){
                packageJson.read = packageJson.read_;
                packageJson.read_ = null;
              });

              it('defaultResource', function(){
                  builder.build().loader.should.have.property( 'defaultResource', DEFAULT_RESOURCE );
              });

              it('additionalResources', function(){
                  builder.build().loader.should.have.property( 'additionalResources', ACCESSIBLE_RESOURCES );
              });

            });

            describe('arguments', function(){
                var VALUE = 'some-value';

                it('defaultResource', function(){
                    builder.build({ defaultResource: VALUE }).loader.should.have.property( 'defaultResource', VALUE );
                });

                it('additionalResources', function(){
                    builder.build({ additionalResources: VALUE }).loader.should.have.property( 'additionalResources', VALUE );
                });

            });

        });

        describe('metadata', function(){
            it('should exist', function(){
                builder.build().should.have.property('metadata');
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
                    builder.build().metadata.should.have.property( 'name', NAME );
                });

                it('version', function(){
                    builder.build().metadata.should.have.property( 'version', VERSION );
                });

                it('id', function(){
                    builder.build().metadata.should.have.property( 'id', ID );
                });

                it('description', function(){
                    builder.build().metadata.should.have.property( 'description', DESCRIPTION );
                });
            });

            describe('arguments', function(){
                var VALUE = 'some-value';

                it('name', function(){
                    builder.build({ name: VALUE }).metadata.should.have.property( 'name', VALUE );
                });

                it('version', function(){
                    builder.build({ version: VALUE }).metadata.should.have.property( 'version', VALUE );
                });

                it('id', function(){
                    builder.build({ id: VALUE }).metadata.should.have.property( 'id', VALUE );
                });

                it('description', function(){
                    builder.build({ description: VALUE }).metadata.should.have.property( 'description', VALUE );
                });
            });
        });
    });
});

var main = require('../main');

describe('main', function() {
    it('should expose localAppRegistry', function() {
        main.localAppResolver.should.be.equal( require('../src/localAppResolver') );
    });

    describe('appConfigBuilder', function(){
        var umdAppConfigBuilder = require('../src/umdAppConfigBuilder');

        it('should default umd', function() {
            main.appConfigBuilder.should.be.equal( umdAppConfigBuilder );
        });

        it('should expose umd', function() {
            main.appConfigBuilder.should.have.property('umd').that.is.equal( umdAppConfigBuilder );
        });
    });
});

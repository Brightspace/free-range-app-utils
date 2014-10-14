var appresolver = require('../localappresolver');

var KEY = 'whatevs';

describe('localAppResolver', function() {
    describe('defaults', function() {
        it('should have _opts property', function() {
            appresolver().should.have.property('_opts').that.is.not.null;
        });

        it('key', function() {
            appresolver()._opts.should.have.property('key', 'sheepdog');
        });

        it('hostname', function() {
            appresolver()._opts.should.have.property('hostname', 'localhost');
        });

        it('port', function() {
            appresolver()._opts.should.have.property('port', 3000);
        });

        it('dist', function() {
            appresolver()._opts.should.have.property('dist', 'dist');
        });

        it('appconfig', function() {
            appresolver()._opts.should.have.property('configFile', 'appconfig.json');
        });
    });

    describe('getUrl', function(cb) {
        it('should return expected url', function(){
            appresolver(KEY, { hostname: 'somehost.com', port: 11111 })
                .getUrl().should.equal('http://somehost.com:11111/app');
        });
    });

    describe('getConfigUrl', function() {
        it('should return expected url', function(){
            appresolver(KEY, { hostname: 'somehost.com', port: 11111, configFile: 'someconf.js' })
                .getConfigUrl().should.equal('http://somehost.com:11111/app/someconf.js');
        });
    });
});

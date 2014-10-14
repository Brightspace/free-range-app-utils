var main = require('../main');

describe('main', function() {
    it('should expose localAppRegistry', function() {
        main.localAppResolver.should.be.equal( require('../localAppResolver') );
    });
});
var main = require('../main');

describe('main', function() {
    it('should expose localAppRegistry', function() {
        main.localAppRegistry.should.be.equal( require('../localAppResolver') );
    });
});
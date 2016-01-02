/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
var fermentable_1 = require('../src/fermentable');
var should = require('should');
describe('Fermentable', function () {
    var fermentable;
    before(function () {
        var test = 1;
        fermentable = new fermentable_1.Fermentable({
            name: 'Candi Sugar, Amber',
            color: 75.0,
            yield: 78.3
        });
    });
    describe('#properties', function () {
        it('should get the name', function () {
            should(fermentable.name).equal('Candi Sugar, Amber');
        });
        it('should get the color', function () {
            should(fermentable.color).equal(75);
        });
        it('should get the yield', function () {
            should(fermentable.yield).equal(78.3);
        });
    });
    describe('#functions', function () {
        it('should convert to css color', function () {
            should(fermentable.colorCss().toLowerCase()).equal('rgb(38, 0, 0)');
        });
        it('should calculate the addition', function () {
            should(fermentable.addition().toLowerCase()).equal('boil');
        });
    });
});
//# sourceMappingURL=fermentableTest.js.map
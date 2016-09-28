/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var spice_1 = require('../src/spice');
var should = require('should');
describe('Spice', function () {
    var spice;
    before(function () {
        spice = new spice_1.Spice({
            name: 'Galaxy',
            form: "pellet",
            time: 15,
            use: 'boil',
            aa: 14,
            weight: .02
        });
    });
    describe('#properties', function () {
        it('should get the form', function () {
            should(spice.form).equal('pellet');
        });
        it('should get the time', function () {
            should(spice.time).equal(15);
        });
        it('should get the use', function () {
            should(spice.use).equal('boil');
        });
        it('should get the aa', function () {
            should(spice.aa).equal(14);
        });
    });
    describe('#functions', function () {
        it('should find utilization factor', function () {
            should(spice.utilizationFactor()).equal(1.15);
        });
        it('should detect dry additions', function () {
            should(spice.dry()).equal(false);
        });
        it('should calculate the bitterness', function () {
            should(spice.bitterness('tinseth', 1.050, 20).toFixed(1)).equal('18.4');
        });
    });
});
//# sourceMappingURL=spiceTest.js.map
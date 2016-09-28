/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var util_1 = require('../src/util');
var should = require('should');
describe('Utils', function () {
    describe('#srmToColor()', function () {
        it('should convert 10 to Amber', function () {
            var result = util_1.Utils.srmToName(10);
            should(result).equal('amber');
        });
    });
});
//# sourceMappingURL=utilsTest.js.map
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

import {Utils} from '../src/util';
import * as should from 'should';

describe('Utils', () => {
    describe('#srmToColor()', () => {
        it('should convert 10 to Amber', () => {
            var result = Utils.srmToName(10);
            should(result).equal('amber');
        });
    });
});
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

import {Spice} from '../src/spice';
import * as should from 'should';

describe('Spice', () => {
    var spice: Spice;
    
    before(() => {
        spice = new Spice({
            name: 'Galaxy',
            form: "pellet",
            time: 15,
            use: 'boil',
            aa: 14,
            weight: .02
        });
    });
    
    describe('#properties', () => {
        it('should get the form', () => {            
            should(spice.form).equal('pellet');
        });
        it('should get the time', () => {
            should(spice.time).equal(15);
        });
        it('should get the use', () => {
            should(spice.use).equal('boil');
        });
        it('should get the aa', () => {
            should(spice.aa).equal(14);
        });
    });    
    
    describe('#functions', () => {
        it('should find utilization factor', () => {
            should(spice.utilizationFactor()).equal(1.15);
        });
        it('should detect dry additions', () => {
            should(spice.dry()).equal(false);
        });
        it('should calculate the bitterness', () => {
            should(spice.bitterness('tinseth', 1.050, 20).toFixed(1)).equal('18.4');            
        });
    });
});
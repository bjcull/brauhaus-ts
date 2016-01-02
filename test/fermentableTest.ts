/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

import {Fermentable} from '../src/fermentable';
import * as should from 'should';

describe('Fermentable', () => {
    var fermentable: Fermentable;
    
    before(() => {
        var test = 1;
        fermentable = new Fermentable({
            name: 'Candi Sugar, Amber',
            color: 75.0,
            yield: 78.3
        });
    });
    
    describe('#properties', () => {
        it('should get the name', () => {            
            should(fermentable.name).equal('Candi Sugar, Amber');
        });
        it('should get the color', () => {
            should(fermentable.color).equal(75);
        });
        it('should get the yield', () => {
            should(fermentable.yield).equal(78.3);
        });
    });    
    
    describe('#functions', () => {
        it('should convert to css color', () => {
            should(fermentable.colorCss().toLowerCase()).equal('rgb(38, 0, 0)');
        });
        it('should calculate the addition', () => {
            should(fermentable.addition().toLowerCase()).equal('boil');
        });
    });
});
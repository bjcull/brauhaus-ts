import {IIngredient, Ingredient} from './ingredient';
import {Globals} from './globals';
import {Utils, IPoundsAndOunces} from './util';

export interface ISpice extends IIngredient {
    /** Weight in kilograms */    
    weight: number;
    /** Alpha-acid percentage (0 - 100) */
    aa: number;
    /** When to use the spice (mash, boil, primary, etc) */
    use: string;
    /** Time in minutes to add the spice */
    time: number;
    /** Form, like pellet, whole, ground, crushed, etc */
    form: string;
}

/**
 * A spice ingredient, e.g. cascade hops or crushed coriander. Each spice
 * has a weight in kilograms, alpha acid (aa) percentage, use (mash, boil,
 * primary, secondary, etc), time in minutes to add the spice, and the
 * spice's form (whole, leaf, pellet, crushed, ground, etc).
 */
export class Spice extends Ingredient {
    /** Regular expressions to match for dry hopping vs. mash/boil additions */
    static DRY_SPICE = /primary|secondary|dry/i;

    /** Weight in kilograms */    
    public weight: number;
    /** Alpha-acid percentage (0 - 100) */
    public aa: number;
    /** When to use the spice (mash, boil, primary, etc) */
    public use: string;
    /** Time in minutes to add the spice */
    public time: number;
    /** Form, like pellet, whole, ground, crushed, etc */
    public form: string;

    constructor(spice?: ISpice) {
        super(spice);        
    }

    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON() {
        return {
            name: this.name,
            weight: this.weight,
            aa: this.aa,
            use: this.use,
            time: this.time,
            form: this.form
        };
    }

    /** True if this is an ingredient added after the boil */
    dry() {
        return Spice.DRY_SPICE.exec(this.use) != null || false;
    }

    /** Account for better utilization from pellets vs. whole */
    utilizationFactor() {
        return this.form == 'pellet' ? 1.15 : 1.0;
    }

    /** Get the bitterness of this spice */
    bitterness(ibuMethod, earlyOg, batchSize) {
        // Calculate bitterness based on chosen method
        if (ibuMethod == 'tinseth') {
            return 1.65 * Math.pow(0.000125, earlyOg - 1.0) * ((1 - Math.pow(Math.E, -0.04 * this.time)) / 4.15) * ((this.aa / 100.0 * this.weight * 1000000) / batchSize) * this.utilizationFactor();
        }
        else if (ibuMethod == 'rager') {
            var utilization = 18.11 + 13.86 * Globals.tanh((this.time - 31.32) / 18.27);
            var adjustment = Math.max(0, (earlyOg - 1.050) / 0.2);
            return this.weight * 100 * utilization * this.utilizationFactor() * this.aa / (batchSize * (1 + adjustment));
        }
        
        throw new Error("Unknown IBU method '#{ibuMethod}'!")
    }

    /** Get the weight in pounds */
    weightLb() {
        return Utils.kgToLb(this.weight);
    }

    /** Get the weight in pounds and ounces */
    weightLbOz() {
        return Utils.kgToLbOz(this.weight);
    }

    /** Get the price for this spice in USD */
    price() {
        var pricePerKg = this.nameRegexPickerArray([
            { regex: /.*/i, value: 17.64 }
        ]);

        return this.weight * pricePerKg;
    }
}
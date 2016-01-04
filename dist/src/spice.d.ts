import { Ingredient } from './ingredient';
import { IPoundsAndOunces } from './util';
/**
 * A spice ingredient, e.g. cascade hops or crushed coriander. Each spice
 * has a weight in kilograms, alpha acid (aa) percentage, use (mash, boil,
 * primary, secondary, etc), time in minutes to add the spice, and the
 * spice's form (whole, leaf, pellet, crushed, ground, etc).
 */
export declare class Spice extends Ingredient {
    /** Regular expressions to match for dry hopping vs. mash/boil additions */
    static DRY_SPICE: RegExp;
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
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON(): string;
    /** True if this is an ingredient added after the boil */
    dry(): boolean;
    /** Account for better utilization from pellets vs. whole */
    utilizationFactor(): number;
    /** Get the bitterness of this spice */
    bitterness(ibuMethod: any, earlyOg: any, batchSize: any): number;
    /** Get the weight in pounds */
    weightLb(): number;
    /** Get the weight in pounds and ounces */
    weightLbOz(): IPoundsAndOunces;
    /** Get the price for this spice in USD */
    price(): number;
}

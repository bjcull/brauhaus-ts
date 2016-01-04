import { Ingredient } from './ingredient';
/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export declare class Yeast extends Ingredient {
    type: string;
    form: string;
    attenuation: number;
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON(): string;
    /** Get the price for this yeast in USD */
    price(): number;
}

import { Ingredient } from './ingredient';
import { IPoundsAndOunces, IRGB } from './util';
/**
 * A fermentable ingredient, e.g. liquid malt extract. Each ingredient
 * has a name, weight in kilograms, yield as a percentage, color in
 * degrees SRM, and is marked as either late or normal. Late additions
 * affect hop utilization. Each fermentable also provides methods for
 * getting the type, addition, color name, and gravity units per volume
 * of liquid.
 */
export declare class Fermentable extends Ingredient {
    /** Regular expressions to match for steeping grains, such as caramel malts.
     *  This is used to create the recipe timeline.
     */
    static STEEP: RegExp;
    /** Regular expressions to match for boiling sugars (DME, LME, etc).
     *  This is used to create the recipe timeline.
     */
    static BOIL: RegExp;
    weight: number;
    yield: number;
    color: number;
    late: boolean;
    /** Convert to JSON, storing only values that cannot be easily computed */
    /** Get the type of fermentable based on its name, either extract
     *  or grain (steeping / mashing)
     */
    type(): string;
    /** When is this item added in the brewing process? Boil, steep, or mash? */
    addition(): string;
    /** Get the weight in pounds */
    weightLb(): number;
    /** Get the weight in pounds and ounces */
    weightLbOz(): IPoundsAndOunces;
    /** Get the parts per gallon for this fermentable */
    ppg(): number;
    /** Get the gravity for a specific liquid volume with 100% efficiency in degrees plato */
    plato(liters?: number): number;
    /** Get the gravity units for a specific liquid volume with 100% efficiency */
    gu(liters?: number): number;
    /** Get a rgb triplet for this fermentable's color */
    colorRgb(): IRGB;
    /** Get a CSS-friendly string for this fermentable's color */
    colorCss(): string;
    /** Get a friendly human-readable color name */
    colorName(): string;
    /** Get the price for this fermentable in USD */
    price(): number;
}

import { IIngredient, Ingredient } from './ingredient';
/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export interface IYeast extends IIngredient {
    /** Ale, lager, or other */
    type: string;
    /** Liquid or dry */
    form: string;
    /** Percentage of sugars the yeast can convert */
    attenuation: number;
    /** The lab this yeast is from. e.g. White Labs or Wyeast */
    lab: string;
    /** The code of the yeast. e.g. US-05 or WY1056 */
    code: string;
}
/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export declare class Yeast extends Ingredient {
    /** Ale, lager, or other */
    type: string;
    /** Liquid or dry */
    form: string;
    /** Percentage of sugars the yeast can convert */
    attenuation: number;
    /** The lab this yeast is from. e.g. White Labs or Wyeast */
    lab: string;
    /** The code of the yeast. e.g. US-05 or WY1056 */
    code: string;
    constructor(yeast?: IYeast);
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON(): {
        name: string;
        type: string;
        form: string;
        attenuation: number;
        lab: string;
        code: string;
    };
    /** Get the price for this yeast in USD */
    price(): number;
}
